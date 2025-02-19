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
      // providesTags: ["overtime"],
    }),

    // // endpoint for getting all overtime data
    getAllDocuments: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/documents",
          method: "GET",
        };
      },
      // providesTags: ["allOvertime"],
    }),

    getDocumentsById: builder.query<any, string>({
      query: (id) => {
        return {
          url: `api/get/getDocumentDetailsById/${id}`,
          method: "GET",
        };
      },
      // providesTags: ["allOvertime"],
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
      // invalidatesTags: ["overtime"],
    }),

    // endpoint for update a overtime
    // updateOverTime: builder.mutation<any, any>({
    //   query: (overTimeData: any) => {
    //     return {
    //       url: "/api/update/overtime",
    //       method: "POST",
    //       body: overTimeData,
    //     };
    //   },
    //   invalidatesTags: ["overtime"],
    // }),

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
  //   useGetAllOverTimeQuery,
  //   usePostOverTimeMutation,
  //   useUpdateOverTimeMutation,
  //   useUpdateOverTimeStatusMutation,
} = overTimeApi;
