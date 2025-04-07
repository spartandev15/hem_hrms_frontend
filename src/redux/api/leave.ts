import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const leavesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting all leaves details of users ( hr's end )
    getAllLeaves: builder.query<any, any>({
      query: (query) => {
        let url = `/api/get/employeesLeaves`;

        // Append pagination params if present
        if (query.per_page && query.page) {
          url = `${url}?per_page=${query.per_page}&page=${query.page}`;
        }

        // Append search_query if it's provided
        if (query.search_query) {
          url = `${url}&search_query=${query.search_query}`;
        }

        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ["leaves"],
    }),

    // endpoint for getting all leaves status of user who applied (hr's end)
    getAppliedLeaves: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/leaves",
          method: "GET",
        };
      },
      providesTags: ["leaveStatus"],
    }),

    // endpoint for getting all leaves status who applied (users only)
    getAppliedLeavesStatusById: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/api/get/employeeLeaves/${id}`,
          method: "GET",
        };
      },
      providesTags: ["leaveStatus"],
    }),

    // endpoint for post apply leaves user's end (employee),
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

    // endpoint for update leaves hr's end,
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
} = leavesApi;
