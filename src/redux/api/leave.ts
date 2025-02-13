import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting all leaves details of users
    getAllLeaves: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/employeesLeaves",
          method: "GET",
        };
      },
      providesTags: ["leaves"],
    }),

    // endpoint for getting all leaves who applied (users only)
    getAppliedLeaves: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/leaves",
          method: "GET",
        };
      },
      providesTags: ["leaveStatus"],
    }),

    // endpoint for getting  leaves status who applied (users only)
    getAppliedLeavesStatusById: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/api/get/employeeLeaves/${id}`,
          method: "GET",
        };
      },
      providesTags: ["leaveStatus"],
    }),

    // endpoint for post apply leaves,
    postLeaves: builder.mutation<any, any>({
      query: (leaveData) => {
        return {
          url: "/api/add/leave",
          method: "POST",
          body: leaveData,
        };
      },
      invalidatesTags: ["leaveStatus"],
    }),

    // endpoint for post apply leaves,
    updateLeavesStatus: builder.mutation<any, any>({
      query: (leaveData) => {
        return {
          url: "/api/change/leave/status",
          method: "POST",
          body: leaveData,
        };
      },
      invalidatesTags: ["leaveStatus"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllLeavesQuery,
  usePostLeavesMutation,
  useGetAppliedLeavesQuery,
  useGetAppliedLeavesStatusByIdQuery,
  useUpdateLeavesStatusMutation,
} = categoryApi;
