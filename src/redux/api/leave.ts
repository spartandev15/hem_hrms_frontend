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

    // endpoint for post apply leaves,
    postLeaves: builder.mutation<any, any>({
      query: (leaveData) => {
        return {
          url: "/api/add/leave",
          method: "POST",
          body: leaveData,
        };
      },
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

    // endpoint for create a new category
    // postLeaves: builder.mutation<void, any>({
    //   query: (leavesUserData: any) => {
    //     return {
    //       url: "/api/create/leaves",
    //       method: "POST",
    //       body: leavesUserData,
    //     };
    //   },
    //   invalidatesTags: ["category"],
    // }),

    // // endpoint for update category
    // updateCategory: builder.mutation<void, void>({
    //   query: (data) => {
    //     return {
    //       url: "/api/update/category",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["category"],
    // }),

    // // endpoint for delete category
    // deleteCategory: builder.mutation<void, CategoryDeleteData>({
    //   query: (data) => {
    //     return {
    //       url: `/api/delete/category`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["category"],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllLeavesQuery,
  usePostLeavesMutation,
  useUpdateLeavesStatusMutation,
  useGetAppliedLeavesQuery,
} = categoryApi;
