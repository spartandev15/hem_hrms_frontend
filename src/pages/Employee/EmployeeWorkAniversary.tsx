import React from "react";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useGetEmployeesAnniversaryQuery } from "../../redux/api/employee";

const EmployeeWorkAniversary = () => {
  const {
    data: employeesAnniversaryData,
    isLoading: isEmployeesAnniversaryLoading,
  } = useGetEmployeesAnniversaryQuery();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setQuery((prev) => ({
      ...prev,
      page: selected + 1,
    }));
    // dispatch(setIsLoading(true));
    // getAllCategoryWithPagination(selected + 1);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-start text-blue-primary">
        Employee's Work Anniversary
      </h2>

      <div className="overflow-auto">
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Name</th>
              <th>Position</th>
              <th>Date of Joining</th>
              <th>Employee ID</th>
              <th>Anniversary Date</th>
            </tr>
          </thead>
          <tbody>
            {employeesAnniversaryData?.EmployeeDetails?.length > 0 ? (
              employeesAnniversaryData?.EmployeeDetails?.map(
                (employee: any, index: number) => (
                  <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.employee_name}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.joining_date}</td>
                    <td>{employee.employee_id}</td>
                    <td>{employee.anniversary}</td>
                  </tr>
                )
              )
            ) : (
              <tr className="text-center">
                <td colSpan={6}>
                  {isEmployeesAnniversaryLoading ? "Loading..." : "No Data.."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* {employeesBirthdaysData?.EmployeeDetails?.last_page > 1 && (
        <div className="bg-gray">
          <ReactPaginate
            className="react-paginate"
            nextLabel={<MdOutlineSkipNext />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={employeesBirthdaysData?.EmployeeDetails?.last_page}
            pageCount={allCategory?.pagination?.last_page}
            previousLabel={<MdOutlineSkipPrevious />}
            renderOnZeroPageCount={null}
            disabledClassName="disabled"
          />
        </div>
      )} */}

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

export default EmployeeWorkAniversary;
