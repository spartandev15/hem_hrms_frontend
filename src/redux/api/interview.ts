import { baseApi } from "../../baseApi/baseApi";
// Define a service using a base URL and expected endpoints

export const interviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint for getting all interviews
    getALlInterviews: builder.query<any, void>({
      query: () => {
        return {
          url: "/api/get/interviews",
          method: "GET",
        };
      },
      providesTags: ["interview"],
    }),

    // endpoint for create notices
    postInterview: builder.mutation<any, any>({
      query: (interviewData: any) => {
        return {
          url: "/api/create/interview",
          method: "POST",
          body: interviewData,
        };
      },
      invalidatesTags: ["interview"],
    }),

    // endpoint for getting all notice of users
    // getAllNoticesOfUsers: builder.query<any, void>({
    //   query: () => {
    //     return {
    //       url: "/api/get/notices",
    //       method: "GET",
    //     };
    //   },
    //   // providesTags: ["allOvertime"],
    // }),

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
  usePostInterviewMutation,
  useGetALlInterviewsQuery,
  //   useGetALlEmailsQuery,
  //   usePostNoticeMutation,
  //   useGetAllNoticesOfUsersQuery,
  //   useGetAllOverTimeQuery,
  //   usePostOverTimeMutation,
  //   useUpdateOverTimeMutation,
  //   useUpdateOverTimeStatusMutation,
} = interviewApi;
