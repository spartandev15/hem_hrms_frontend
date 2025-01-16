import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormData, SignUpFormData } from "../../types";
import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

// const BASE_API_URL = process.env.REACT_APP_BASE_URL;
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for login
    authLogin: builder.mutation<any, LoginFormData>({
      query: (auth: any) => {
        return {
          url: "/api/login",
          method: "POST",
          body: auth,
        };
      },
    }),

    // endpoint for singup
    authSignUp: builder.mutation<any, SignUpFormData>({
      query: (auth: SignUpFormData) => {
        return {
          url: "/api/signup",
          method: "POST",
          body: auth,
        };
      },
    }),

    // endpoint for logout
    authLogout: builder.mutation<any, void>({
      query: () => {
        return {
          url: "/api/logout",
          method: "POST",
        };
      },
    }),

    // endpoint for forgot password
    authForgotPassword: builder.mutation<any, void>({
      query: (data: any) => {
        return {
          url: "/api/forgot-password",
          method: "POST",
          body: data,
        };
      },
    }),

    // endpoint for change password
    authChangePassword: builder.mutation<any, any>({
      query: (data: any) => {
        return {
          url: "/api/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAuthLoginMutation,
  useAuthSignUpMutation,
  useAuthLogoutMutation,
  useAuthChangePasswordMutation,
  useAuthForgotPasswordMutation,
} = authApi;
