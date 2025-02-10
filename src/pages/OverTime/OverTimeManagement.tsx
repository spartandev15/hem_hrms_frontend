import React from "react";
import { useGetAllOverTimeQuery } from "../../redux/api/overTime";
import OverTimeManagementTable from "../../components/OvertimeManagementTable";

const OverTimeManagement = () => {
  const { data: allOverTimeDetails, isLoading: isAllOverTimeDetailsLoading } =
    useGetAllOverTimeQuery();
  return (
    <div className="container py-4">
      <OverTimeManagementTable
        allOverTimeData={allOverTimeDetails?.records}
        isLoading={isAllOverTimeDetailsLoading}
      />
    </div>
  );
};

export default OverTimeManagement;
