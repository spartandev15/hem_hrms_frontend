import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting all categories
    getAllLeaves: builder.query<void, void>({
      query: () => {
        return {
          url: "/api/get/all/",
          method: "GET",
        };
      },
      providesTags: ["leaves"],
    }),

    // endpoint for create a new category
    postLeaves: builder.mutation<void, any>({
      query: (leavesUserData: any) => {
        return {
          url: "/api/create/leaves",
          method: "POST",
          body: leavesUserData,
        };
      },
      invalidatesTags: ["category"],
    }),

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
  //   useGetAllCategoryQuery,
  //   useDeleteCategoryMutation,
  //   useUpdateCategoryMutation,
} = categoryApi;
