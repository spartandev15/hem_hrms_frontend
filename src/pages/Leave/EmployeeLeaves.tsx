import React from "react";
import LeaveApplicationForm from "../../components/LeaveForm";
import { useGetEmployeeDetailsByIdQuery } from "../../redux/api/employee";
import { getLocalStorageItem } from "../../utils/getLocalStorageItem";
import { AUTH_UID } from "../../constantsPaths/Constant";
import {
  useGetAppliedLeavesQuery,
  useGetAppliedLeavesStatusByIdQuery,
} from "../../redux/api/leave";

const EmployeeLeaves = () => {
  const { data: employeeLeavesDetails } = useGetEmployeeDetailsByIdQuery(
    getLocalStorageItem(AUTH_UID)
  );

  const { data: userLeavesStatus, isLoading: userLeaveStatusIsLoading } =
    useGetAppliedLeavesStatusByIdQuery(getLocalStorageItem(AUTH_UID));

  const leaveDataArray = userLeavesStatus?.user?.leaves;
  const leaves = employeeLeavesDetails?.EmployeeDetails?.leaves;
  const leaveData = leaves?.leave_data;

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-blue-primary text-white">
              <h5 className="m-0">Leaves Details</h5>
            </div>

            <div className="card-body">
              <div className="d-flex flex-column align-items-start">
                <h6 className="text-center mb-3">
                  <strong>User Name: </strong>
                  {employeeLeavesDetails?.EmployeeDetails?.name}{" "}
                  {employeeLeavesDetails?.EmployeeDetails?.last_name}
                </h6>

                {/* <p className="text-center">
                  <strong>Employee ID:</strong>{" "}
                  {employeeLeavesDetails?.user?.employee_id}
                </p> */}

                <p className="text-center">
                  <strong>Email:</strong>{" "}
                  {employeeLeavesDetails?.EmployeeDetails?.email}
                </p>

                <p className="text-center">
                  <strong>Designation:</strong>{" "}
                  {employeeLeavesDetails?.EmployeeDetails?.designation}
                </p>

                {/* <p className="text-center">
                  <strong>Line Manager:</strong>{" "}
                  {employeeLeavesDetails?.EmployeeDetails?.line_manager}
                </p> */}
              </div>

              <ul className="list-group">
                {/* Paid Leaves */}
                <li className="list-group-item">
                  <strong>Paid Leaves:</strong>
                  <div className="d-flex gap-3">
                    <span className="mr-3">
                      Total: <strong>{leaveData?.paid_leaves.Total}</strong>
                    </span>
                    <span className="mr-3">
                      Taken: <strong>{leaveData?.paid_leaves.Taken}</strong>
                    </span>
                    <span>
                      Pending: <strong>{leaveData?.paid_leaves.Pending}</strong>
                    </span>
                  </div>
                </li>

                {/* Sick Leaves */}
                <li className="list-group-item">
                  <strong>Sick Leaves:</strong>
                  <div className="d-flex gap-3">
                    <span className="mr-3">
                      Total: <strong>{leaveData?.sick_leaves.Total}</strong>
                    </span>
                    <span className="mr-3">
                      Taken: <strong>{leaveData?.sick_leaves.Taken}</strong>
                    </span>
                    <span>
                      Pending: <strong>{leaveData?.sick_leaves.Pending}</strong>
                    </span>
                  </div>
                </li>

                {/* Unpaid Leaves */}
                <li className="list-group-item">
                  <strong>Unpaid Leaves:</strong>
                  <div className="d-flex gap-3">
                    <span className="mr-3">
                      Total: <strong>{leaveData?.unpaid_leaves.Total}</strong>
                    </span>
                    <span className="mr-3">
                      Taken: <strong>{leaveData?.unpaid_leaves.Taken}</strong>
                    </span>
                    <span>
                      Pending:{" "}
                      <strong>{leaveData?.unpaid_leaves.Pending}</strong>
                    </span>
                  </div>
                </li>

                {/* Overall Total Leaves */}
                <li className="list-group-item">
                  <strong>Overall Total Leaves: </strong>
                  <span>
                    <strong>{leaves?.overall_total_leaves}</strong>
                  </span>
                </li>

                {/* Total Taken Leaves */}
                <li className="list-group-item">
                  <strong>Total Taken Leaves: </strong>
                  <span>
                    <strong>{leaves?.taken}</strong>
                  </span>
                </li>

                {/* Total Pending Leaves */}
                <li className="list-group-item">
                  <strong>Total Pending Leaves: </strong>
                  <span>
                    <strong>{leaves?.pending}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <LeaveApplicationForm />
        </div>
      </div>

      <div className="container-fluid mt-4">
        <h3 className="mb-4">Leave Applications</h3>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                {/* <th>Created At</th> */}
              </tr>
            </thead>

            <tbody>
              {leaveDataArray && leaveDataArray.length > 0 ? (
                leaveDataArray.map((leaveData: any) => (
                  <tr key={leaveData.id}>
                    <td>{leaveData.leave_type}</td>
                    <td>
                      {new Date(leaveData.start_date).toLocaleDateString()}
                    </td>
                    <td>{new Date(leaveData.end_date).toLocaleDateString()}</td>
                    <td>{leaveData.reason}</td>
                    <td>
                      <span
                        className={`badge ${
                          leaveData.status === "pending"
                            ? "bg-warning"
                            : leaveData.status === "approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {leaveData.status}
                      </span>
                    </td>
                    {/* <td>{new Date(leaveData.created_at).toLocaleString()}</td> */}
                  </tr>
                ))
              ) : userLeaveStatusIsLoading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    Loading
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No leave applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaves;
