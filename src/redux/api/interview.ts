import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const interviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting all interviews
    getALlInterviews: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/interviews",
          method: "GET",
        };
      },
      providesTags: ["interview"],
    }),

    // endpoint for scheduled interviews
    postInterview: builder.mutation<any, any>({
      query: (interviewData: any) => {
        return {
          url: "/api/create/interview",
          method: "POST",
          body: interviewData,
        };
      },
      invalidatesTags: ["interview"],
    }),

    // endpoint for update a interview
    updateInterview: builder.mutation<any, any>({
      query: (interviewData: any) => {
        return {
          url: "/api/update/interview",
          method: "POST",
          body: interviewData,
        };
      },
      invalidatesTags: ["interview"],
    }),

    // endpoint for delete a interview
    deleteInterview: builder.mutation<any, any>({
      query: (id: any) => {
        return {
          url: "/api/delete/interview",
          method: "POST",
          body: id,
        };
      },
      invalidatesTags: ["interview"],
    }),

    // endpoint for getting all vacancy
    getAllVacancy: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/vacancies",
          method: "GET",
        };
      },
      providesTags: ["vacancy"],
    }),

    getVacancyById: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/api/get/getVacancyById?id=${id.id}`,
          method: "GET",
        };
      },
      providesTags: ["vacancy"],
    }),

    // endpoint for post vacancies
    postVacancy: builder.mutation<any, any>({
      query: (vacancyData: any) => {
        return {
          url: "/api/create/vacancy",
          method: "POST",
          body: vacancyData,
        };
      },
      invalidatesTags: ["vacancy"],
    }),

    // endpoint for update a vacancy
    updateVacancy: builder.mutation<any, any>({
      query: (vacancywData: any) => {
        return {
          url: "/api/update/vacancy",
          method: "POST",
          body: vacancywData,
        };
      },
      invalidatesTags: ["vacancy"],
    }),

    // endpoint for delete vacancy
    deleteVacancy: builder.mutation<any, any>({
      query: (id: any) => {
        return {
          url: "/api/delete/vacancy",
          method: "POST",
          body: id,
        };
      },
      invalidatesTags: ["vacancy"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostInterviewMutation,
  useGetALlInterviewsQuery,
  useUpdateInterviewMutation,
  useDeleteInterviewMutation,
  usePostVacancyMutation,
  useGetAllVacancyQuery,
  useUpdateVacancyMutation,
  useDeleteVacancyMutation,
  useLazyGetVacancyByIdQuery,
  //   usePostNoticeMutation,
  //   useGetAllNoticesOfUsersQuery,
  //   useGetAllOverTimeQuery,
  //   usePostOverTimeMutation,
  //   useUpdateOverTimeMutation,
  //   useUpdateOverTimeStatusMutation,
} = interviewApi;
