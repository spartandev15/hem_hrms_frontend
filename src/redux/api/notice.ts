import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting all emails of users
    getALlEmails: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/employees/emails",
          method: "GET",
        };
      },
      //   providesTags: ["overtime"],
    }),

    // endpoint for create notices
    postNotice: builder.mutation<any, any>({
      query: (noticeData: any) => {
        return {
          url: "/api/create/Notice",
          method: "POST",
          body: noticeData,
        };
      },
      // invalidatesTags: ["overtime"],
    }),

    // endpoint for getting all notice of users
    getAllNoticesOfUsers: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/notices",
          method: "GET",
        };
      },
      // providesTags: ["allOvertime"],
    }),

    // // endpoint for create a overtime
    // postOverTime: builder.mutation<any, any>({
    //   query: (overTimeData: any) => {
    //     return {
    //       url: "/api/add/overtime",
    //       method: "POST",
    //       body: overTimeData,
    //     };
    //   },
    //   invalidatesTags: ["overtime"],
    // }),

    // // endpoint for update a overtime
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
  useGetALlEmailsQuery,
  usePostNoticeMutation,
  useGetAllNoticesOfUsersQuery,
  //   useGetAllOverTimeQuery,
  //   usePostOverTimeMutation,
  //   useUpdateOverTimeMutation,
  //   useUpdateOverTimeStatusMutation,
} = noticeApi;
