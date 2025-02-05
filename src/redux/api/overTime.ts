import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const overTimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting overtime
    getOverTime: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/overtime",
          method: "GET",
        };
      },
      providesTags: ["overtime"],
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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostOverTimeMutation,
  useGetOverTimeQuery,
  useUpdateOverTimeMutation,
} = overTimeApi;
