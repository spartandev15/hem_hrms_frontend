import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const overTimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting ones's users overtime data
    getOverTime: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/overtime",
          method: "GET",
        };
      },
      providesTags: ["overtime"],
    }),

    // endpoint for getting all overtime data
    getAllOverTime: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/employees/overtimeRecords",
          method: "GET",
        };
      },
      providesTags: ["allOvertime"],
    }),

    // endpoint for create a overtime
    postOverTime: builder.mutation<any, any>({
      query: (overTimeData: any) => {
        return {
          url: "/api/add/overtime",
          method: "POST",
          body: overTimeData,
        };
      },
      invalidatesTags: ["overtime"],
    }),

    // endpoint for update a overtime
    updateOverTime: builder.mutation<any, any>({
      query: (overTimeData: any) => {
        return {
          url: "/api/update/overtime",
          method: "POST",
          body: overTimeData,
        };
      },
      invalidatesTags: ["overtime"],
    }),

    // endpoint for update status a overtime
    updateOverTimeStatus: builder.mutation<any, any>({
      query: (overTimeStatusData: any) => {
        return {
          url: "/api/update/overtimeRecordStatus",
          method: "POST",
          body: overTimeStatusData,
        };
      },
      invalidatesTags: ["allOvertime"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetOverTimeQuery,
  useGetAllOverTimeQuery,
  usePostOverTimeMutation,
  useUpdateOverTimeMutation,
  useUpdateOverTimeStatusMutation,
} = overTimeApi;
