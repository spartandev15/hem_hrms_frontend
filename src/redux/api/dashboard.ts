import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormData, SignUpFormData } from "../../types";
import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

// const BASE_API_URL = process.env.REACT_APP_BASE_URL;
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for login
    getDashboardDetails: builder.query<any, void>({
      query: () => {
        return {
          url: "api/hr/dashboard",
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDashboardDetailsQuery } = authApi;
