import React from "react";
import OverTimeForm from "../../components/OverTimeForm";
import OvetimeTable from "../../components/OvetimeTable";
import { useGetOverTimeQuery } from "../../redux/api/overTime";

const OverTime = () => {
  const { data: overTimeDataDetials, isLoading: isOverTimeLoading } =
    useGetOverTimeQuery();

  return (
    <div className="container py-3">
      {/* <h2 className="text-start">Over Time</h2> */}
      <div>
        <OvetimeTable
          data={overTimeDataDetials?.data}
          isLoading={isOverTimeLoading}
        />
      </div>

      <div className="mt-4">
        <OverTimeForm />
      </div>
    </div>
  );
};

export default OverTime;
