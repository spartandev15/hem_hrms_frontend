import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const overTimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting ones's users overtime data
    getDocumets: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/getDocumentById",
          method: "GET",
        };
      },
      providesTags: ["userDocuments"],
    }),

    // // endpoint for getting all overtime data
    getAllDocuments: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/documents",
          method: "GET",
        };
      },
      providesTags: ["allDocuments"],
    }),

    getDocumentsById: builder.query<any, string>({
      query: (id) => {
        return {
          url: `api/get/getDocumentDetailsById/${id}`,
          method: "GET",
        };
      },
      providesTags: ["documentsById"],
    }),

    // endpoint for create a overtime
    postDocuments: builder.mutation<any, any>({
      query: (documentsData: any) => {
        return {
          url: "/api/upload/documents",
          method: "POST",
          body: documentsData,
        };
      },
      invalidatesTags: ["userDocuments"],
    }),

    // endpoint for update status document
    updateDocumentStatus: builder.mutation<any, any>({
      query: (documentsUpdateData: any) => {
        return {
          url: "api/update/documentRecordStatus",
          method: "POST",
          body: documentsUpdateData,
        };
      },
      invalidatesTags: ["documentsById"],
    }),

    // // endpoint for update status a overtime
    // updateOverTimeStatus: builder.mutation<any, any>({
    //   query: (overTimeStatusData: any) => {
    //     return {
    //       url: "/api/update/overtimeRecordStatus",
    //       method: "POST",
    //       body: overTimeStatusData,
    //     };
    //   },
    //   invalidatesTags: ["allOvertime"],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDocumetsQuery,
  useGetDocumentsByIdQuery,
  useGetAllDocumentsQuery,
  usePostDocumentsMutation,
  useUpdateDocumentStatusMutation,
  //   useGetAllOverTimeQuery,
  //   usePostOverTimeMutation,
  //   useUpdateOverTimeMutation,
  //   useUpdateOverTimeStatusMutation,
} = overTimeApi;
