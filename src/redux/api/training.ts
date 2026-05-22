// src/redux/apis/training/trainingApi.ts

import { baseApi } from "../../baseApi/baseApi";

export interface TrainingData {
  id?: number;
  employee_id?: number;
  training_name?: string;
  trainer_name?: string;
  training_type?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  status?: string;
}

export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===============================
    // GET ALL TRAININGS
    // ===============================
    getAllTraining: builder.query<any, void>({
      query: () => ({
        url: "/api/employee/training/list",
        method: "GET",
      }),
      providesTags: ["training"],
    }),

    // ===============================
    // GET SINGLE TRAINING
    // ===============================
    getTrainingById: builder.query<any, number>({
      query: (id) => ({
        url: `/api/employee/training/edit/${id}`,
        method: "GET",
      }),
      providesTags: ["training"],
    }),

    // ===============================
    // CREATE TRAINING
    // ===============================
    postTraining: builder.mutation<any, TrainingData>({
      query: (trainingData) => ({
        url: "/api/employee/training/store",
        method: "POST",
        body: trainingData,
      }),
      invalidatesTags: ["training"],
    }),

    // ===============================
    // UPDATE TRAINING
    // ===============================
    updateTraining: builder.mutation<any, TrainingData>({
      query: (trainingData) => ({
        url: "/api/employee/training/store",
        method: "POST",
        body: trainingData,
      }),
      invalidatesTags: ["training"],
    }),

    // ===============================
    // DELETE TRAINING
    // ===============================
    deleteTraining: builder.mutation<any, number>({
      query: (id) => ({
        url: `/api/employee/training/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["training"],
    }),
  }),
});

export const {
  useGetAllTrainingQuery,
  useGetTrainingByIdQuery,
  usePostTrainingMutation,
  useUpdateTrainingMutation,
  useDeleteTrainingMutation,
} = trainingApi;