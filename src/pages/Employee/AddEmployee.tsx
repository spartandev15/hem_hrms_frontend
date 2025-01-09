import React, { useEffect } from "react";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useForm } from "react-hook-form";
import "../../assets/styles/inputWithLabel.css";
import { usePostEmployeeMutation } from "../../redux/api/employee";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { useAppDispatch } from "../../hooks/ReduxHook";
import { setToast } from "../../redux/slices/toastSlice";
import { useGetAllCategoryQuery } from "../../redux/api/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeFormSchema } from "../../validations/formValidation";

const AddEmployee = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeFormSchema),
  });
  const [
    postEmployee,
    { data: EmployeeDetailsData, isSuccess: postEmployeeIsSuccess },
  ] = usePostEmployeeMutation();

  const { data: allCategory } = useGetAllCategoryQuery();

  console.log(allCategory);

  const addEmployeeFormFields = [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      required: true,
      value: "hem",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      required: true,
      value: "hem",
    },
    {
      label: "Line Manager",
      type: "text",
      name: "line_manager",
      required: true,
      value: "hem",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      value: "hem",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
      value: "hem",
    },
    {
      label: "Confirm Password",
      name: "confirm_Password",
      type: "password",
      required: true,
      value: "hem",
    },
    {
      label: "Employee Id",
      name: "employee_id",
      type: "string",
      required: true,
      value: "hem",
    },
    {
      label: "Joining Date",
      name: "joining_date",
      type: "date",
      required: true,
      value: "hem",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      required: true,
      value: "hem",
    },
    {
      label: "Designation",
      name: "designation",
      type: "select",
      options: allCategory?.categories?.map((category: any) => ({
        label: category.name,
        value: category.name,
      })),
      required: true,
      value: "hem",
    },
    {
      label: "Total Leaves",
      name: "total_leaves",
      type: "text",
      required: true,
      value: "hem",
    },
    {
      label: "Paid Leaves",
      name: "paid_leaves",
      type: "text",
      required: true,
      value: "hem",
    },
    {
      label: "Unpaid Leaves",
      name: "unpaid_leaves",
      type: "text",
      required: true,
      value: "hem",
    },
    {
      label: "Sick Leaves",
      name: "sick_leaves",
      type: "text",
      required: true,
      value: "hem",
    },
  ];

  const handleFormSubmit = (data: any) => {
    // const leavesFormData = {};
    dispatch(setIsLoading(true));
    postEmployee(data);
  };

  // if (EmployeeDetailsData) {
  //   dispatch(setIsLoading(false));
  //   dispatch(setToast(EmployeeDetailsData?.message));
  // }

  useEffect(() => {
    if (EmployeeDetailsData?.result && postEmployeeIsSuccess) {
      dispatch(setIsLoading(false));
      dispatch(setToast(EmployeeDetailsData?.message));
    }
  }, [postEmployeeIsSuccess]);

  return (
    <div>
      <div className="mt-4 container pb-4">
        <div className="col-lg-10 m-auto">
          <div>
            <h2 className="text-blue-primary text-start text-large ">
              New Employee Enrollment
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="border p-3 rounded shadow-sm"
          >
            <div className="row mt-4">
              {addEmployeeFormFields.map((item, index) => (
                <div className="col-sm-6 my-2" key={`${item.label}-${index}`}>
                  <InputWithLabel
                    id={`${index}`}
                    label={item.label}
                    name={item.name}
                    register={register}
                    type={item.type}
                    value={item.value}
                    options={item.options}
                  />
                  {errors[item.name] && (
                    <p className="text-danger">
                      {errors[item.name]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-2">
              <button className="btn py-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
