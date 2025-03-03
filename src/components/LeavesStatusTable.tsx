import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useUpdateLeavesStatusMutation } from "../redux/api/leave";
import { useAppDispatch } from "../hooks/reduxHook";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";
import { capitalizeFirstLetter } from "../utils/capitalizedFirstLetter";

const LeavesStatusTable: React.FC<{ allAppliedLeavesData: any }> = ({
  allAppliedLeavesData,
}) => {
  const [allSelected, setAllSelected] = useState<number[]>([]);

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const ids = allAppliedLeavesData.map((item: any) => item.id);

      setAllSelected([...ids]);
    } else {
      setAllSelected([]);
    }
  };

  console.log(allSelected);

  return (
    <div className="container">
      {allAppliedLeavesData && (
        <div className="overflow-x-auto">
          <table className="leave-status-table shadow-sm rounded-2 w-100">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={allSelected.length === allAppliedLeavesData.length}
                  />
                </th>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Reason</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              {allAppliedLeavesData.map((item: any, itemIndex: number) => (
                <TableRow
                  {...item}
                  itemIndex={itemIndex}
                  allSelected={allSelected}
                  setAllSelected={setAllSelected}
                />
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
  const { allSelected, setAllSelected } = item;
  const dispatch = useAppDispatch();

  const [isDropdownVisible, setDropdownVisible] = useState(false); // State to toggle visibility
  const dropDownRef = useOutsideClick<HTMLDivElement>(() => {
    setDropdownVisible(false); // Close the dropdown when clicked outside
  }); // Reference to the select dropdown

  // Toggle the dropdown visibility when the "Status" cell is clicked
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const [
    updateLeavesStatus,
    { data: updateLeaveStatusDetailsData, isSuccess: updateLeavesIsSuccess },
  ] = useUpdateLeavesStatusMutation();

  const handleStatusSubmit = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const status = event.target.value;
    dispatch(setIsLoading(true));
    try {
      const response = await updateLeavesStatus({
        id: item.id,
        status: status,
      });

      if (response?.error) {
        dispatch(setToast(response?.error?.data?.error?.status));
        return;
      }
      dispatch(setToast(response?.data?.message));
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSingleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const a = Number(value);
    if (allSelected.includes(a)) {
      setAllSelected(allSelected.filter((id) => id !== a));
    } else {
      setAllSelected([...allSelected, a]);
    }
  };

  useEffect(() => {
    if (updateLeaveStatusDetailsData) {
    }
  }, [updateLeavesIsSuccess]);

  return (
    <tr key={item.id || item.itemIndex}>
      <td>
        <input
          type="checkbox"
          checked={allSelected?.includes(item.id)}
          onChange={handleSingleSelect}
          value={item.id}
        />
      </td>
      <th>{item.itemIndex + 1}</th>
      <td>{item?.employee_detail?.name}</td>
      <td>{capitalizeFirstLetter(item?.leave_type, "_")}</td>
      <td>{item?.start_date}</td>
      <td>{item?.end_date}</td>
      <td
        style={{
          width: "320px",
          whiteSpace: "wrap",
        }}
      >
        {item?.reason}
      </td>

      <td onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <div
          className="m-auto"
          style={{
            width: "fit-content",
            backgroundColor:
              item.status === "approved"
                ? "#73A617" // green for approved
                : item.status === "pending"
                ? "#DD982F" // amber for pending
                : item.status === "disapproved"
                ? "#E84A07"
                : "#DF3523",

            borderRadius: "4px",
            color:
              item.status === "approved"
                ? "#fff" // green for approved
                : item.status === "pending"
                ? "#fff" // amber for pending
                : "#fff",
          }}
        >
          <select
            style={{
              width: "fit-content",
              background: "transparent",
              border: "none",
              padding: "2px",
            }}
            value={item.status}
            onChange={handleStatusSubmit}
            className="text-xsmall text-white"
          >
            <option value="approved" className="text-black text-xsmall">
              Approved
            </option>
            <option value="disapproved" className="text-black text-xsmall">
              Disapproved
            </option>
            <option value="rejected" className="text-black text-xsmall">
              Rejected
            </option>
            <option hidden value="pending">
              pending
            </option>
          </select>

          {/* {isDropdownVisible && (
            <div
              ref={dropDownRef}
              className="position-absolute bg-white px-4 py-2 border rounded-2"
              style={{
                top: "80%",
                transform: "translate(-50% 0)",
                left: "0%",
                zIndex: 99999,
                width: "auto",
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
          )} */}
        </div>
      </td>
    </tr>
  );
};
