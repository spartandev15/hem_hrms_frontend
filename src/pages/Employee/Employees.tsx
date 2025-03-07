import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHook";
import { useGetEmployeesQuery } from "../../redux/api/employee";
import EmployeeList from "./EmployeeList";

const Employees = () => {
  const [query, setQuery] = useState("");
  const { items } = useAppSelector((state) => state.dropdown);
  const { data: allEmployeData, isLoading } = useGetEmployeesQuery(query);

  const options = items?.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  const handleSearchSubmit = (query: any) => {
    setQuery(query);
  };

  return (
    <div className="container py-4">
      <h2 className="text-blue-primary text-start text-large">Employees</h2>

      {/* <div>
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          <div className="row p-2">
            <div className="col-sm-3">
              <InputWithLabel
                type="text"
                register={register}
                name="employee_id"
                placeholder="Search by id"
                labelAnimated={false}
              />
            </div>

            <div className="col-sm-3">
              <InputWithLabel
                placeholder="Search by name"
                type="text"
                register={register}
                name="employee_name"
                labelAnimated={false}
              />
            </div>

            <div className="col-sm-3">
              <InputWithLabel
                label="Search by Desgination"
                type="select"
                options={options}
                register={register}
                name="designation"
                labelAnimated={false}
              />
            </div>

            <div className="col-sm-3">
              <button className="btn py-2">Search</button>
            </div>
          </div>
        </form>
      </div> */}

      <div className="mt-2">
        <EmployeeList
          data={allEmployeData?.employee}
          isLoading={isLoading}
          handleQuery={handleSearchSubmit}
        />
        {/* {allEmployeData?.employee?.length > 0 ? (
          allEmployeData?.employee?.map((item: any, index: number) => (
            <div className="col-md-4 col-lg-3 " key={index}>
              <EmployeeCard {...item} />
            </div>
          ))
        ) : isLoading ? (
          <SpinnerLoader />
        ) : (
          <h2 className="text-start">data not found!</h2>
        )} */}
      </div>
    </div>
  );
};

export default Employees;
