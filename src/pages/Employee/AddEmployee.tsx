import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/inputWithLabel.css";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { usePostEmployeeMutation } from "../../redux/api/employee";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { employeeFormSchema } from "../../validations/formValidation";

const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeFormSchema),
  });
  const [
    postEmployee,
    { data: EmployeeDetailsData, isSuccess: postEmployeeIsSuccess },
  ] = usePostEmployeeMutation();

  const { items } = useAppSelector((state) => state.dropdown);

  const addEmployeeFormFields = [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      required: true,
      value: "",
    },
    // {
    //   label: "Line Manager",
    //   type: "text",
    //   name: "line_manager",
    //   required: true,
    //   value: "",
    // },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      value: "",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
      value: "",
    },
    {
      label: "Confirm Password",
      name: "confirm_Password",
      type: "password",
      required: true,
      value: "",
    },
    {
      label: "Employee Id",
      name: "employee_id",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Joining Date",
      name: "joining_date",
      type: "date",
      required: true,
      value: "",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Date of Birth",
      name: "date_of_birth",
      type: "date",
      required: true,
      value: "",
    },
    {
      label: "Designation",
      name: "designation",
      type: "select",
      options: items?.map((category: any) => ({
        label: category.name,
        value: category.name,
      })),
      required: true,
      value: items[0]?.name,
    },
    {
      label: "Total Leaves",
      name: "total_leaves",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Paid Leaves",
      name: "paid_leaves",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Unpaid Leaves",
      name: "unpaid_leaves",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Sick Leaves",
      name: "sick_leaves",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Basic Salary",
      name: "basic_salary",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "House Rent",
      name: "house_rent",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Medical Allowance",
      name: "medical_allowance",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Tax",
      name: "tax",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Leave Deduction",
      name: "leave_deduction",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "PF",
      name: "pf",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Employee State",
      name: "employee_state",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Insaurance",
      name: "insurance",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Extra Working",
      name: "extra_working",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Gross Total",
      name: "gross_total",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Gross Salary",
      name: "gross_salary",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Final",
      name: "final_total",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Bank Name",
      name: "bank_name",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Bank IFSC",
      name: "bank_ifsc",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Account Number",
      name: "account_number",
      type: "number",
      required: true,
      value: "",
    },
    {
      label: "Account Holder Name",
      name: "account_holder_name",
      type: "text",
      required: true,
      value: "",
    },
  ];

  const handleFormSubmit = (data: any) => {
    console.log(data);
    const leavesFormData = {};
    dispatch(setIsLoading(true));
    postEmployee(data);
    // reset();
  };

  useEffect(() => {
    if (EmployeeDetailsData?.result && postEmployeeIsSuccess) {
      dispatch(setIsLoading(false));
      dispatch(setToast(EmployeeDetailsData?.message));
      // navigate("/dashboard/employees");
    } else {
      if (EmployeeDetailsData?.message) {
        dispatch(setIsLoading(false));
        dispatch(setToast(EmployeeDetailsData?.message));
      }
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
