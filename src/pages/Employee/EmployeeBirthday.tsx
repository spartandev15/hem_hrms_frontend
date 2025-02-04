import React from "react";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useGetEmployeesBirthdayQuery } from "../../redux/api/employee";

const EmployeeBirthday = () => {
  const {
    data: employeesBirthdaysData,
    isLoading: isEmployeesBirthdaysLoading,
  } = useGetEmployeesBirthdayQuery();

  return (
    <div className="container mt-5">
      <h2 className="text-start text-blue-primary">Employees Birthdays</h2>
      <div className="overflow-auto">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Position</th>
              <th>Date of Joining</th>
              <th>Employee ID</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {employeesBirthdaysData?.EmployeeDetails?.length > 0 ? (
              employeesBirthdaysData?.EmployeeDetails?.map(
                (employee: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.employee_name}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.joining_date}</td>
                    <td>{employee.employee_id}</td>
                    <td>{employee.birthday}</td>
                  </tr>
                )
              )
            ) : (
              <tr className="text-center">
                <td colSpan={6}>
                  {isEmployeesBirthdaysLoading ? "Loading..." : "No Data.."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* <ReactPaginate
        className="react-paginate"
        // breakLabel="..."
        nextLabel={<MdOutlineSkipNext />}
        // onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        // pageCount={allCategory?.pagination?.last_page}
        previousLabel={<MdOutlineSkipPrevious />}
        pageCount={5}
        renderOnZeroPageCount={null}
        disabledClassName="disabled"
      /> */}
    </div>
  );
};

export default EmployeeBirthday;
