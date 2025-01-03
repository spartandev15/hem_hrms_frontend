import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorageItem } from "../utils/getLocalStorageItem";
import { AUTH_TOKEN_KEY, BASE_API_URL } from "../constantsPaths/Constant";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["category", "employess", "leaves"],
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://sst.psghub.me/sstapi/api' }),
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_API_KEY_BASE_URL,
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = getLocalStorageItem(AUTH_TOKEN_KEY); // Replace with your actual cookie name
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add 'Bearer' prefix
      }
      return headers;
    },
  }),

  endpoints: () => ({}), // Define endpoints as needed
});
