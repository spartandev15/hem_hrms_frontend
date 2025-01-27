import { baseApi } from "../../baseApi/baseApi";
import { EmployeeDeleteData } from "../../types";
// Define a service using a base URL and expected endpoints

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for create a new employee
    postEmployee: builder.mutation<any, any>({
      query: (employeeData: any) => {
        return {
          url: "/api/create/employee",
          method: "POST",
          body: employeeData,
        };
      },
      invalidatesTags: ["employess"],
    }),

    // endpoint for getting all employess
    getEmployeeDetailsById: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/api/get/employee/${id}`,
          method: "GET",
        };
      },
      providesTags: ["employess"],
    }),

    getEmployees: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/all/employee",
          method: "GET",
        };
      },
      providesTags: ["allEmployess"],
    }),

    // endpoint for update employess
    updateEmployee: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "/api/update/employee",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["allEmployess"],
    }),

    // endpoint for delete employee
    deleteEmployee: builder.mutation<any, EmployeeDeleteData>({
      query: (data) => {
        return {
          url: `/api/delete/employee`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["employess"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  usePostEmployeeMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeeDetailsByIdQuery,
} = employeeApi;
