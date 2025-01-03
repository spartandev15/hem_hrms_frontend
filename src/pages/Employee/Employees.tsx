import React from "react";
import "../../assets/styles/dialogbox.css";
import "../../assets/styles/employee.css";
import EmployeeCard from "../../components/cards/EmployeeCard";
import { useGetEmployeesQuery } from "../../redux/api/employee";

const Employees = () => {
  const { data: allEmployeData, isLoading } = useGetEmployeesQuery();

  return (
    <div className="container py-4">
      <div className="row g-4 mt-3">
        {allEmployeData?.employee?.length > 0 ? (
          allEmployeData?.employee?.map((item, index) => (
            <div className="col-md-4" key={index}>
              <EmployeeCard {...item} />
            </div>
          ))
        ) : isLoading ? (
          "Loading......"
        ) : (
          <h2>No data</h2>
        )}
      </div>
    </div>
  );
};

export default Employees;
