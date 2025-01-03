import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
const ProfileImage = "/images/profile.png";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";
import { EmployeeCardProps } from "../../types";
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../redux/api/employee";
import { useAppDispatch } from "../../hooks/ReduxHook";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { EditableForm } from "../EditableForm";
import InputWithLabel from "../ui/InputWithLabel";
import { useForm } from "react-hook-form";
import ConfirmDialog from "../ConfirmDialog";

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
  address,
}) => {
  const { handleSubmit, register } = useForm({
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
    },
  });

  const [deleteEmployee, { data: deleteEmployeeDetails, isLoading }] =
    useDeleteEmployeeMutation();
  const [actionsPopupOpen, setActionsPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [updateEmployee, { data: editEmployeeData }] =
    useUpdateEmployeeMutation();

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const closeOnOutsideClick = () => {
    setActionsPopupOpen(false); // Close the div or take other actions
  };

  const actionPopupRef = useOutsideClick(closeOnOutsideClick);

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
    {
      label: "Line Manager",
      type: "text",
      name: "line_manager",
      required: true,
      value: line_manager,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      value: email,
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
      type: "string",
      required: true,
      value: employee_id,
    },
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
      label: "Designation",
      name: "designation",
      type: "text",
      required: true,
      value: designation,
    },
  ];

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
      password: data.password,
      address: data.address,
    };
    try {
      dispatch(setIsLoading(true));
      updateEmployee(editFormData);
    } catch (error) {
      console.log(error);
    }
  };

  // open the dialog for confirmation
  const handleDeleteConfirmDialog = () => {
    setActionsPopupOpen(false);
    setIsOpenDialog(true);
  };

  // perform delete after confirmation dialog
  const handleClose = (isConfirm) => {
    if (isConfirm) {
      setIsOpenDialog(false);
      dispatch(setIsLoading(true));

      // call the delete api using deleteEmployee
      deleteEmployee({
        id,
      });
    } else {
      setIsOpenDialog(false);
    }
  };

  // if edit employee successfully then perfom action
  if (editEmployeeData) {
    dispatch(setIsLoading(false));
    dispatch(setToast(editEmployeeData?.message));
  }

  // if delete employee successfully data get then perfom action
  if (deleteEmployeeDetails) {
    dispatch(setIsLoading(false));
    dispatch(setToast(deleteEmployeeDetails?.message));
  }

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
        <p className="common-para m-0">{line_manager}</p>
      </div>

      {/* reder edit employee form */}
      {isEditPopupOpen && (
        <div className="employee-detail-edit-form py-4">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-large font-bold mt-3">
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
              <div className="row mt-4">
                {editEmployeeFormFields.map((item, index) => (
                  <div className="col-md-6 my-2" key={`${item.label}-${index}`}>
                    <InputWithLabel
                      id={`${index}`}
                      label={item.label}
                      name={item.name}
                      register={register}
                      type={item.type}
                      value={item.value}
                    />
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
      <ConfirmDialog isOpen={isOpenDialog} onClose={handleClose} />
    </div>
  );
};

export default EmployeeCard;
