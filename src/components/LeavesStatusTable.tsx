import React, { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useUpdateLeavesStatusMutation } from "../redux/api/leave";
import { useAppDispatch } from "../hooks/ReduxHook";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";

const LeavesStatusTable: React.FC<{ allAppliedLeavesData: any }> = ({
  allAppliedLeavesData,
}) => {
  return (
    <div className="container">
      {allAppliedLeavesData && (
        <div className="">
          <table className="leave-status-table shadow-sm rounded-2 w-100">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Reason</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              {allAppliedLeavesData.map((item: any, itemIndex: number) => (
                <TableRow {...item} itemIndex={itemIndex} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeavesStatusTable;

const TableRow = (item: any) => {
  const dispatch = useAppDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State to toggle visibility
  const dropDownRef = useOutsideClick<HTMLDivElement>(() => {
    setDropdownVisible(false); // Close the dropdown when clicked outside
  }); // Reference to the select dropdown

  // Toggle the dropdown visibility when the "Status" cell is clicked
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const [updateLeavesStatus, { data: updateLeaveStatusDetailsData }] =
    useUpdateLeavesStatusMutation();

  const handleStatusSubmit = (status) => {
    dispatch(setIsLoading(true));
    updateLeavesStatus({
      id: item.id,
      status: status,
    });
  };

  if (updateLeaveStatusDetailsData) {
    dispatch(setIsLoading(false));
    dispatch(setToast(updateLeaveStatusDetailsData.message));
  }

  return (
    <tr key={item.id || item.itemIndex}>
      <th>{item.itemIndex + 1}</th>
      <td>{item?.employee_detail?.name}</td>
      <td>{item?.start_date}</td>
      <td>{item?.end_date}</td>
      <td>{item?.reason}</td>

      <td
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
        className="position-relative"
      >
        <div
          className="text-capitalize"
          style={{
            width: "fit-content",
            backgroundColor:
              item.status === "approved"
                ? "#73A617" // green for approved
                : item.status === "pending"
                ? "#DD982F" // amber for pending
                : "#DF3523",
            padding: "2px 1rem",
            borderRadius: "4px",
            color:
              item.status === "approved"
                ? "#fff" // green for approved
                : item.status === "pending"
                ? "#fff" // amber for pending
                : "#fff",
          }}
        >
          {item.status}
        </div>

        {isDropdownVisible && (
          <div
            ref={dropDownRef}
            className="position-absolute bg-white px-4 py-2 border rounded-2"
            style={{
              top: "85%",
              zIndex: 999,
            }}
          >
            <p
              className="m-0 py-1"
              onClick={() => handleStatusSubmit("approved")}
            >
              Approved
            </p>
            <p
              className="m-0 py-1"
              onClick={() => handleStatusSubmit("rejected")}
            >
              Rejected
            </p>
          </div>
        )}
      </td>
    </tr>
  );
};
