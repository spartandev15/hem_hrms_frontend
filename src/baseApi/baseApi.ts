import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorageItem } from "../utils/getLocalStorageItem";
import { AUTH_TOKEN_KEY } from "../constantsPaths/Constant";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "category",
    "employess",
    "leaves",
    "leaveStatus",
    "punchInOut",
    "allEmployess",
    "overtime",
    "allOvertime",
    "interview",
    "vacancy",
    "allDocuments",
    "documentsById",
    "userDocuments",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_KEY_BASE_URL,
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
