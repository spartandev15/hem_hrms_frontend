import React from "react";
import "../../assets/styles/dialogbox.css";
import "../../assets/styles/employee.css";
import EmployeeCard from "../../components/cards/EmployeeCard";
import { useGetEmployeesQuery } from "../../redux/api/employee";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useForm } from "react-hook-form";
import { useGetAllCategoryQuery } from "../../redux/api/category";
import { Link } from "react-router-dom";

const Employees = () => {
  const { data: allEmployeData, isLoading } = useGetEmployeesQuery();
  const { data: allCategory } = useGetAllCategoryQuery();

  const options = allCategory?.categories?.map((category) => ({
    label: category.name,
  }));

  const { register, handleSubmit } = useForm();

  const handleSearchSubmit = (values) => {
    console.log("Search", values);
  };

  console.log(allEmployeData);

  return (
    <div className="container py-4">
      <h2 className="text-blue-primary text-start text-large">All Employees</h2>

      <div>
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
      </div>

      <div className="row g-4 mt-2">
        {allEmployeData?.employee?.length > 0 ? (
          allEmployeData?.employee?.map((item, index) => (
            <div className="col-md-4 " key={index}>
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
