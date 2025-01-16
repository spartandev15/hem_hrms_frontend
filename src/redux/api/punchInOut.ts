import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

// const BASE_API_URL = process.env.REACT_APP_BASE_URL;
export const punchInOutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { usePunchInMutation } = punchInOutApi;
