import { baseApi } from "../../baseApi/baseApi";
import { EmployeeDeleteData } from "../../types";
// Define a service using a base URL and expected endpoints

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any, any>({
      query: (query) => {
        let url = `/api/get/all/employee`;

        // Append pagination params if present
        if (query.per_page && query.page) {
          url = `${url}?per_page=${query.per_page}&page=${query.page}`;
        }

        // Append search_query if it's provided
        if (query.search_query) {
          url = `${url}&search_query=${query.search_query}`;
        }

        // const url = query ? `${baseUrl}&search_query=${query}` : baseUrl;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["allEmployess"],
    }),

    // endpoint for getting all employess
    getEmployeeDetailsById: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/api/get/employee/${id}`,
          method: "GET",
        };
      },
      providesTags: ["employessById"],
    }),

    // endpoint for get employee Birthdays
    getEmployeesBirthday: builder.query<any, any>({
      query: (query) => {
        let url = `/api/get/birthdays`;

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
    }),

    // endpoint for get employee anniversary
    getEmployeesAnniversary: builder.query<any, void>({
      query: () => {
        return {
          url: `/api/get/anniversaries`,
          method: "GET",
        };
      },
    }),

    // endpoint for create a new employee
    postEmployee: builder.mutation<any, any>({
      query: (employeeData: any) => {
        return {
          url: "/api/create/employee",
          method: "POST",
          body: employeeData,
        };
      },
      invalidatesTags: ["allEmployess"],
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
      invalidatesTags: ["allEmployess", "employessById","leaves"],
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
      invalidatesTags: ["allEmployess"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEmployeesQuery,
  usePostEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeesBirthdayQuery,
  useGetEmployeesAnniversaryQuery,
  useGetEmployeeDetailsByIdQuery,
} = employeeApi;
