import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../../baseApi/baseApi";
import { GetProfileResponseApi } from "../../types";
// Define a service using a base URL and expected endpoints

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting profile of auth user
    getProfile: builder.query<GetProfileResponseApi, void>({
      query: () => {
        return {
          url: "/api/get/profile",
          method: "GET",
        };
      },
    }),
    // endpoint for singup
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery } = profileApi;
