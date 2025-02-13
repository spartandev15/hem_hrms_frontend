import { baseApi } from "../../baseApi/baseApi";
import { CategoryDeleteData, EmployeeDeleteData } from "../../types";
// Define a service using a base URL and expected endpoints

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting all categories
    getAllCategory: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/all/category",
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),

    getAllCategoryWithPagination: builder.query<any, number>({
      query: (page) => {
        return {
          url: `/api/get/all/category?page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),

    // endpoint for create a new category
    postCategory: builder.mutation<any, any>({
      query: (categoryData: any) => {
        debugger;
        return {
          url: "/api/create/category",
          method: "POST",
          body: categoryData,
        };
      },
      invalidatesTags: ["category"],
    }),

    // endpoint for update category
    updateCategory: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "/api/update/category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),

    // endpoint for delete category
    deleteCategory: builder.mutation<any, CategoryDeleteData>({
      query: (data) => {
        return {
          url: `/api/delete/category`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostCategoryMutation,
  useGetAllCategoryQuery,
  useLazyGetAllCategoryWithPaginationQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
