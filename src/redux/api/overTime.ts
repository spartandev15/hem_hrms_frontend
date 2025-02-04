import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const overTimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for create a new category
    postOverTime: builder.mutation<any, any>({
      query: (overTimeData: any) => {
        return {
          url: "/api/add/overtime",
          method: "POST",
          body: overTimeData,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePostOverTimeMutation } = overTimeApi;
