import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting profile of auth user
    getProfile: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/profile",
          method: "GET",
        };
      },
      providesTags: ["profile"],
    }),

    updateProfile: builder.mutation<any, any>({
      query: (employeeData) => {
        return {
          url: "/api/update/profile",
          method: "POST",
          body: employeeData,
        };
      },
      invalidatesTags: ["profile"],
    }),
    // endpoint for singup
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
