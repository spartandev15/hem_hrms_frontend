import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiShowAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPencilAlt, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHook";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useGetAllCategoryQuery } from "../../redux/api/category";
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../redux/api/employee";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { EmployeeCardProps } from "../../types";
import { employeeFormSchema } from "../../validations/formValidation";
import ConfirmDialog from "../ConfirmDialog";
import InputWithLabel from "../ui/InputWithLabel";
const ProfileImage = "/images/profile.png";

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  first_name,
  last_name,
  phone,
  line_manager,
  email,
  designation,
  employee_id,
  profile_photo,
  joining_date,
  leaves,
  user_id,
  date_of_birth,
  salary_data,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      id,
      first_name,
      last_name,
      phone,
      line_manager,
      email,
      designation,
      employee_id,
      profile_photo,
      joining_date,
      address: "",
      password: "",
      date_of_birth,
      total_leaves: String(leaves?.overall_total_leaves),
      paid_leaves: leaves?.leave_data?.paid_leaves.Total,
      unpaid_leaves: leaves?.leave_data?.unpaid_leaves.Total,
      sick_leaves: leaves?.leave_data?.sick_leaves.Total,
      basic_salary: salary_data?.basic_salary,
      house_rent: salary_data?.house_rent,
      medical_allowance: salary_data?.medical_allowance,
      tax: salary_data?.tax,
      leave_deduction: salary_data?.leave_deduction,
      pf: salary_data?.pf,
      employee_state: salary_data?.employee_state,
      insurance: salary_data?.insurance,
      extra_working: salary_data?.extra_working,
      gross_total: salary_data?.gross_total,
      final_total: salary_data?.final_total,
      gross_salary: salary_data?.gross_salary,
      bank_name: salary_data?.bank_name,
      bank_ifsc: salary_data?.bank_ifsc,
      account_number: salary_data?.account_number,
      account_holder_name: salary_data?.account_holder_name,
    },
  });
  const dispatch = useAppDispatch();

  const { data: allCategory } = useGetAllCategoryQuery();

  const [updateEmployee, { data: editEmployeeData, isSuccess: editIsSuccess }] =
    useUpdateEmployeeMutation();

  const [
    deleteEmployee,
    {
      data: deleteEmployeeDetails,
      isLoading,
      isSuccess: deleteEmployeeIsSuccess,
    },
  ] = useDeleteEmployeeMutation();

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [actionsPopupOpen, setActionsPopupOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const closeOnOutsideClick = () => {
    setActionsPopupOpen(false); // Close the div or take other actions
  };

  const actionPopupRef = useOutsideClick<HTMLDivElement>(closeOnOutsideClick);

  // edit employee fields
  const editEmployeeFormFields = [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      required: true,
      value: first_name,
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      required: true,
      value: last_name,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      required: true,
      value: "",
    },
    // {
    //   label: "Line Manager",
    //   type: "text",
    //   name: "line_manager",
    //   required: true,
    //   value: line_manager,
    // },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      value: email,
    },
    {
      label: "Employee Id",
      name: "employee_id",
      type: "string",
      required: true,
      value: employee_id,
    },
    // {
    //   label: "Password",
    //   type: "password",
    //   name: "password",
    //   required: true,
    //   value: "",
    // },
    // {
    //   label: "Confirm Password",
    //   name: "confirm_Password",
    //   type: "password",
    //   required: true,
    //   value: "",
    // },
    {
      label: "Joining Date",
      name: "joining_date",
      type: "date",
      required: true,
      value: joining_date,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      required: true,
      value: phone,
    },
    {
      // label: "Designation",
      name: "designation",
      type: "select",
      options: allCategory?.categories?.map((category: any) => ({
        label: category.name,
        value: category.name,
      })),
      required: true,
      value: designation,
      labelAnimated: false,
    },
    {
      label: "DOB",
      name: "date_of_birth",
      type: "date",
      required: true,
      value: date_of_birth,
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
    {
      label: "Basic Salary",
      name: "basic_salary",
      type: "number",
      required: true,
      value: salary_data?.basic_salary,
    },
    {
      label: "House Rent",
      name: "house_rent",
      type: "number",
      required: true,
      value: salary_data?.house_rent,
    },
    {
      label: "Medical Allowance",
      name: "medical_allowance",
      type: "number",
      required: true,
      value: salary_data?.medical_allowance,
    },
    {
      label: "Tax",
      name: "tax",
      type: "number",
      required: true,
      value: salary_data?.tax,
    },
    {
      label: "Leave Deduction",
      name: "leave_deduction",
      type: "number",
      required: true,
      value: salary_data?.leave_deduction,
    },
    {
      label: "PF",
      name: "pf",
      type: "number",
      required: true,
      value: salary_data?.pf,
    },
    {
      label: "Employee State",
      name: "employee_state",
      type: "text",
      required: true,
      value: salary_data?.employee_state,
    },
    {
      label: "Insaurance",
      name: "insurance",
      type: "number",
      required: true,
      value: salary_data?.insurance,
    },
    {
      label: "Extra Working",
      name: "extra_working",
      type: "number",
      required: true,
      value: salary_data?.extra_working,
    },
    {
      label: "Gross Total",
      name: "gross_total",
      type: "number",
      required: true,
      value: salary_data?.gross_total,
    },
    {
      label: "Gross Salary",
      name: "gross_salary",
      type: "number",
      required: true,
      value: salary_data?.gross_salary,
    },
    {
      label: "Final",
      name: "final_total",
      type: "number",
      required: true,
      value: salary_data?.final_total,
    },
    {
      label: "Bank Name",
      name: "bank_name",
      type: "text",
      required: true,
      value: salary_data?.bank_name,
    },
    {
      label: "Bank IFSC",
      name: "bank_ifsc",
      type: "text",
      required: true,
      value: salary_data?.bank_ifsc,
    },
    {
      label: "Account Number",
      name: "account_number",
      type: "number",
      required: true,
      value: salary_data?.account_number,
    },
    {
      label: "Account Holder Name",
      name: "account_holder_name",
      type: "text",
      required: true,
      value: salary_data?.account_holder_name,
    },
  ];

  // console.log(editEmployeeFormFields);

  // submit the form for update editEmployee
  const handleFormSubmitEdit = (data: any) => {
    const editFormData = {
      id,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      line_manager: data.line_manager,
      email: data.email,
      designation: data.designation,
      employee_id: data.employee_id,
      joining_date: data.joining_date,
      date_of_birth: data.date_of_birth,
      password: data.password,
      address: data.address,
      total_leaves: data.total_leaves,
      paid_leaves: data.paid_leaves,
      unpaid_leaves: data.unpaid_leaves,
      sick_leaves: data.sick_leaves,
      basic_salary: data.basic_salary,
      house_rent: data.house_rent,
      medical_allowance: data.medical_allowance,
      tax: data.tax,
      leave_deduction: data.leave_deduction,
      pf: data.pf,
      employee_state: data.employee_state,
      insurance: data.insurance,
      extra_working: data.extra_working,
      gross_total: data.gross_total,
      gross_salary: data.gross_salary,
      final_total: data.final_total,
      bank_name: data.bank_name,
      bank_ifsc: data.bank_ifsc,
      account_number: data.account_number,
      account_holder_name: data.account_holder_name,
    };

    // console.log(editFormData);
    // try {
    //   dispatch(setIsLoading(true));
    //   updateEmployee(editFormData);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // open the dialog for confirmation
  const handleDeleteConfirmDialog = () => {
    setActionsPopupOpen(false);
    setIsOpenDialog(true);
  };

  // perform delete after confirmation dialog
  const handleClose = (isConfirm: boolean) => {
    if (isConfirm) {
      setIsOpenDialog(false);
      dispatch(setIsLoading(true));

      // call the delete api using deleteEmployee
      deleteEmployee({
        id: user_id,
      });
    } else {
      setIsOpenDialog(false);
    }
  };

  // if delete employee successfully data get then perfom action
  // if (deleteEmployeeDetails) {
  //   dispatch(setIsLoading(false));
  //   dispatch(setToast(deleteEmployeeDetails?.message));
  // }

  useEffect(() => {
    if (editEmployeeData?.result && editIsSuccess) {
      dispatch(setIsLoading(false));
      dispatch(setToast(editEmployeeData?.message));
      setIsEditPopupOpen(false);
    }

    if (deleteEmployeeDetails?.result && deleteEmployeeIsSuccess) {
      dispatch(setIsLoading(false));
      dispatch(setToast(deleteEmployeeDetails?.message));
    }
  }, [editIsSuccess, deleteEmployeeIsSuccess]);

  return (
    <div className=" employee-card-container">
      <div className="three-dot-action-btn">
        <div onClick={() => setActionsPopupOpen(!actionsPopupOpen)}>
          <BsThreeDotsVertical size={20} />
        </div>

        {actionsPopupOpen && (
          <div ref={actionPopupRef} className="action-popup">
            <div
              onClick={() => {
                setActionsPopupOpen(false);
                setIsEditPopupOpen(true);
              }}
              className="d-flex align-items-center px-2 py-1 action-btn text-small font-normal"
            >
              <FaPencilAlt /> Edit
            </div>

            <div
              className="d-flex align-items-center px-2 py-1 action-btn text-small font-normal"
              onClick={handleDeleteConfirmDialog}
            >
              <RiDeleteBin6Line /> Delete
            </div>

            <div className="d-flex align-items-center px-2 py-1 text-small font-normal action-btn">
              <BiShowAlt size={18} />
              <Link
                to={`/employee-details/${first_name}/${user_id}`}
                className="text-none"
              >
                View
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="image-container d-flex justify-content-center">
        <img src={ProfileImage} alt="Profile-Image" />
      </div>

      <div className="employee-details mt-2">
        <h2 className="heading-name text-lg font-bold m-0">
          {first_name} {last_name}
        </h2>
        <p className="username text-small font-bold m-0">{employee_id}</p>
        <p className="common-para m-0 text-xsmall">{designation}</p>
        <p className="common-para m-0 text-xsmall">
          <FaPhoneAlt size={13} /> {phone && phone}
        </p>
        <p className="common-para m-0 text-xsmall">
          <IoIosMail size={13} /> {email}
        </p>
        <hr />
        {/* <p className="common-para m-0">{line_manager}</p> */}
      </div>

      {/* reder edit employee form */}
      {isEditPopupOpen && (
        <div className="employee-detail-edit-form py-4">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-large font-bold mt-3 text-blue-primary">
                Employee Update Form
              </h2>
              <MdOutlineClose
                size={24}
                className="close-icon"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setIsEditPopupOpen(false)}
              />
            </div>

            <form action="" onSubmit={handleSubmit(handleFormSubmitEdit)}>
              <div className="row">
                {editEmployeeFormFields.map((item, index) => (
                  <div className="col-md-6 my-2" key={`${item.label}-${index}`}>
                    <InputWithLabel
                      id={`${index}`}
                      label={item.label}
                      name={item.name}
                      register={register}
                      type={item.type}
                      value={item.value}
                      options={item.options}
                      labelAnimated={item.labelAnimated}
                    />

                    {errors[item.name as keyof typeof errors] && (
                      <p className="text-danger">
                        {errors[item.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button className="btn py-2">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* render dialoag box for confirmation  */}
      <ConfirmDialog
        message="Are you sure you want to delete this item?"
        header="Confirm Deletion"
        isOpen={isOpenDialog}
        onClose={handleClose}
      />
    </div>
  );
};

export default EmployeeCard;
