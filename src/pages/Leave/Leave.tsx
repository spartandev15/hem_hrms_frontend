import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../assets/styles/leave.css";
import LeavesStatusTable from "../../components/LeavesStatusTable";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useAppSelector } from "../../hooks/reduxHook";
import {
  useGetAllLeavesQuery,
  useGetAppliedLeavesQuery,
} from "../../redux/api/leave";
import { formatDate } from "../../utils/formatDate";
import EmployeeLeaves from "./EmployeeLeaves";

const Leave = () => {
  const { handleSubmit, register } = useForm();

  const { status } = useAppSelector((state) => state.authUser);

  const { data: allLeavesDetailsData, isLoading: isLoadinLeavesDetails } =
    useGetAllLeavesQuery();
  const { data: allAppliedLeavesDetailsData } = useGetAppliedLeavesQuery();

  console.log(allAppliedLeavesDetailsData);

  //
  const handleSearchSubmit = (values: any) => {
    console.log("Search", values);
  };

  return (
    <div className="container py-4">
      {/* <h1 className="text-medium">Leave Manager</h1> */}

      {status === "HR" && (
        <div>
          {allAppliedLeavesDetailsData &&
            allAppliedLeavesDetailsData?.data?.length > 0 && (
              <div className="mt-4 d-flex flex-column gap-4 border rounded-2 p-3">
                <h2 className="text-start text-medium m-0 underline">
                  Who Applied Leaves
                </h2>

                {allAppliedLeavesDetailsData?.data ? (
                  Object.entries(allAppliedLeavesDetailsData?.data).map(
                    ([key, value]) => {
                      return (
                        <div>
                          <h3 className="text-large font-bold text-start">
                            {formatDate(key)}
                          </h3>
                          <LeavesStatusTable allAppliedLeavesData={value} />
                        </div>
                      );
                    }
                  )
                ) : (
                  <h2>No Data Avialable</h2>
                )}
              </div>
            )}

          {isLoadinLeavesDetails ? (
            <p>Loading...</p>
          ) : allLeavesDetailsData &&
            allLeavesDetailsData?.leaves?.length > 0 ? (
            <div className="mt-5 border p-3 rounded-2">
              <div>
                <h2 className="text-start text-medium underline">
                  Employees Leaves Details
                </h2>
              </div>

              {/* integrate serch input for serach data  */}
              <div>
                <form onSubmit={handleSubmit(handleSearchSubmit)}>
                  <div className="row">
                    <div className="col-sm-3">
                      <InputWithLabel
                        type="text"
                        register={register}
                        name="employee_id"
                        placeholder="Search by id"
                        labelAnimated={false}
                        serachIcon={true}
                      />
                    </div>

                    <div className="col-sm-3">
                      <InputWithLabel
                        placeholder="Search by name"
                        type="text"
                        register={register}
                        name="employee_name"
                        labelAnimated={false}
                        serachIcon={true}
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* integrate table for show employee leaves details  */}
              <div className="overflow-auto">
                <table className="employee-leave-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Leave Type</th>
                      <th>Total Granted</th>
                      <th>Leaves Taken</th>
                      <th>Remaining Leaves</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allLeavesDetailsData?.leaves?.map((employee: any) => (
                      <React.Fragment key={employee.id}>
                        {/* Loop through the leave data */}
                        {employee.leave_data &&
                          Object.keys(employee["leave_data"])?.map(
                            (leaveType, index) => {
                              const leaveDetails =
                                employee?.leave_data[leaveType]; // Get leave data for the current leave type
                              return (
                                <tr key={leaveType}>
                                  {/* Employee name, shown once per employee in the first row */}
                                  {index === 0 && (
                                    <td
                                      rowSpan={
                                        Object.keys(employee?.leave_data).length
                                      }
                                    >
                                      <Link
                                        to={`/employee-details/${employee.emp_name}/${employee.user_id}`}
                                        className="text-small text-gray-primary text-none"
                                      >
                                        {employee.emp_name}
                                      </Link>
                                    </td>
                                  )}
                                  <td>
                                    {leaveType
                                      .replace(/_/g, " ")
                                      .replace(/([A-Z])/g, " $1")}
                                    {/* {leaveType} */}
                                  </td>{" "}
                                  {/* Format the leave type */}
                                  <td>{leaveDetails.Total}</td>{" "}
                                  {/* Total leaves granted */}
                                  <td>{leaveDetails.Taken}</td>{" "}
                                  {/* Leaves taken */}
                                  <td>{leaveDetails.Pending}</td>{" "}
                                  {/* Remaining leaves */}
                                </tr>
                              );
                            }
                          )}
                        {/* Display total summary for the employee */}
                        <tr className="">
                          <td colSpan={2}>
                            <strong>Total</strong>
                          </td>
                          <td>{employee.overall_total_leaves}</td>{" "}
                          {/* Total leaves granted */}
                          <td>{employee.taken}</td> {/* Total leaves taken */}
                          <td>{employee.pending}</td> {/* Remaining leaves */}
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h2>No Data Available</h2>
          )}
        </div>
      )}

      {status === "employee" && <EmployeeLeaves />}
    </div>
  );
};

export default Leave;
