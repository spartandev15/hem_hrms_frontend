import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

// const BASE_API_URL = process.env.REACT_APP_BASE_URL;
export const punchInOutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting punchInOut details
    punchInOutDetails: builder.query<any, void>({
      query: () => {
        // const id = data.id;
        return {
          url: `api/projects/timers/get/detail`,
          method: "GET",
        };
      },
      providesTags: ["punchInOut"] as const,
    }),

    // endpoint for puchIn
    punchIn: builder.mutation<any, any>({
      query: (data) => {
        // const id = data.id;
        return {
          url: `api/projects/timers/punchin`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["punchInOut"],
    }),

    // endpoint for puchOut
    punchOut: builder.mutation<any, void>({
      query: () => {
        return {
          url: `api/projects/timers/punchout`,
          method: "POST",
        };
      },
      invalidatesTags: ["punchInOut"],
    }),

    // endpoint for resumeTime
    resumeTime: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `api/projects/timers/resumetime`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["punchInOut"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePunchInMutation,
  usePunchOutMutation,
  useResumeTimeMutation,
  usePunchInOutDetailsQuery,
} = punchInOutApi;
