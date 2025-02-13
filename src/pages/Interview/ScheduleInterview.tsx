import React from "react";
import ScheduleForm from "../../components/ScheduleInterviewForm";
import ScheduleInterviewTable from "../../components/ScheduleInterviewTable";
import { useGetALlInterviewsQuery } from "../../redux/api/interview";

const ScheduleInterview = () => {
  const { data: allInterviewsData, isLoading: isAllInterviewLoading } =
    useGetALlInterviewsQuery();

  return (
    <div className="container py-4">
      <div>
        <ScheduleInterviewTable
          data={allInterviewsData?.data}
          isLoading={isAllInterviewLoading}
        />
      </div>
      <div className="mt-4">
        <ScheduleForm />
      </div>
    </div>
  );
};

export default ScheduleInterview;
