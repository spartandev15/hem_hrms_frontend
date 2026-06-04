import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import useDebouncedSearch from "../../hooks/useDebounce";
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../redux/api/employee";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { EmployeeCardProps } from "../../types";
import { employeeFormSchema } from "../../validations/formValidation";
import { IoMdSearch } from "react-icons/io";

const EmployeeList = ({
  data,
  isLoading,
  handleQuery,
}: {
  data: EmployeeCardProps[];
  isLoading: boolean;
  handleQuery?: (query: string) => void;
}) => {
  // const [searchEmployee] = useLazySerachEmployeesQuery();
  const { debouncedQuery, setQuery } = useDebouncedSearch("", 300);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleSearch = async () => {
    try {
      if (handleQuery) {
        handleQuery(debouncedQuery);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedQuery]);

  return (
    <div>
      {/* {data?.length > 0 ? (
        data?.map((item: any, index: number) => (
          <div className="col-md-4 col-lg-3 " key={index}>
            <EmployeeCard {...item} />
          </div>
        ))
      ) : isLoading ? (
        <SpinnerLoader />
      ) : (
        <h2 className="text-start">data not found!</h2>
      )} */}

      <div>
        <form>
          <div className="row">
            <div className="col-sm-3 input-wrapper position-relative">
              <input
                type="text"
                name="search"
                onChange={handleSearchChange}
                placeholder="Employee Id"
              />

              <div
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "7%",
                  transform: "translate(0%, -50%)",
                  zIndex: 99,
                  background: "#fff",
                }}
              >
                <IoMdSearch size={20} />
              </div>
            </div>

            {/* <div className="col-sm-3">
              <InputWithLabel
                placeholder="Search by name"
                type="text"
                register={register}
                name="employee_name"
                labelAnimated={false}
              />
            </div> */}

            {/* <div className="col-sm-3">
              <InputWithLabel
                label="Search by Desgination"
                type="select"
                options={options}
                register={register}
                name="designation"
                labelAnimated={false}
              />
            </div> */}

            {/* <div className="col-sm-3">
              <button className="btn py-2">Search</button>
            </div> */}
          </div>
        </form>
      </div>

      <table className="overtime-table mt-2 w-100">
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Employee Id</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={9} className="text-center">
                Loading...
              </td>
            </tr>
          ) : data?.length > 0 ? (
            data?.map((record: any, index: number) => (
              <TableRow
                key={index}
                record={record}
                // handleViewScreenshot={handleViewScreenshot}
                // handleEdit={handleEdit}
                // isStatusExist={isStatusExist}
                index={index}
              />
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

const TableRow = ({
  record,
  handleViewScreenshot,
  handleEdit,
  isStatusExist,
  index,
}: any) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { status } = useAppSelector((state) => state.authUser);
  const { items } = useAppSelector((state) => state.dropdown);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: record.id,
      first_name: record.first_name,
      last_name: record.last_name,
      phone: record.phone,
      line_manager: record.line_manager,
      email: record.email,
      designation: record.designation,
      employee_id: record.employee_id,
      profile_photo: record.profile_photo,
      joining_date: record.joining_date,
      address: "",
      password: "",
      date_of_birth: record.date_of_birth,
      total_leaves: String(record.leaves?.overall_total_leaves),
      paid_leaves: record.leaves?.leave_data?.paid_leaves.Total,
      unpaid_leaves: record.leaves?.leave_data?.unpaid_leaves.Total,
      sick_leaves: record.leaves?.leave_data?.sick_leaves.Total,
      basic_salary: record.salary_data?.basic_salary,
      house_rent: record.salary_data?.house_rent,
      medical_allowance: record.salary_data?.medical_allowance,
      tax: record.salary_data?.tax,
      leave_deduction: record.salary_data?.leave_deduction,
      pf: record.salary_data?.pf,
      employee_state: record.salary_data?.employee_state,
      insurance: record.salary_data?.insurance,
      extra_working: record.salary_data?.extra_working,
      gross_total: record.salary_data?.gross_total,
      final_total: record.salary_data?.final_total,
      gross_salary: record.salary_data?.gross_salary,
      bank_name: record.salary_data?.bank_name,
      bank_ifsc: record.salary_data?.bank_ifsc,
      account_number: record.salary_data?.account_number,
      account_holder_name: record.salary_data?.account_holder_name,
    },
    // resolver: zodResolver(employeeFormSchema),
  });

  const editEmployeeFormFields = [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      required: true,
      value: record.first_name,
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      required: true,
      value: record.last_name,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      value: record.email,
    },
    {
      label: "Employee Id",
      name: "employee_id",
      type: "string",
      required: true,
      value: record.employee_id,
    },
    {
      label: "Joining Date",
      name: "joining_date",
      type: "date",
      required: true,
      value: record.joining_date,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      required: true,
      value: record.phone,
    },
    {
      label: "Designation",
      name: "designation",
      type: "select",
      options: items?.map((category) => ({
        label: category.name,
        value: category.name,
      })),
      required: true,
      value: record.designation,
    },
    {
      label: "DOB",
      name: "date_of_birth",
      type: "date",
      required: true,
      value: record.date_of_birth,
    },
    {
      label: "Total Leaves",
      name: "total_leaves",
      disabled: true,
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
      value: record.salary_data?.basic_salary,
    },
    {
      label: "House Rent",
      name: "house_rent",
      type: "number",
      required: true,
      value: record.salary_data?.house_rent,
    },
    {
      label: "Medical Allowance",
      name: "medical_allowance",
      type: "number",
      required: true,
      value: record.salary_data?.medical_allowance,
    },
    {
      label: "Tax",
      name: "tax",
      type: "number",
      required: true,
      value: record.salary_data?.tax,
    },
    {
      label: "Leave Deduction",
      name: "leave_deduction",
      type: "number",
      required: true,
      value: record.salary_data?.leave_deduction,
    },
    {
      label: "PF",
      name: "pf",
      type: "number",
      required: true,
      value: record.salary_data?.pf,
    },
    {
      label: "Employee State",
      name: "employee_state",
      type: "text",
      required: true,
      value: record.salary_data?.employee_state,
    },
    {
      label: "Insurance",
      name: "insurance",
      type: "number",
      required: true,
      value: record.salary_data?.insurance,
    },
    {
      label: "Extra Working",
      name: "extra_working",
      type: "number",
      required: true,
      value: record.salary_data?.extra_working,
    },
    {
      label: "Gross Total",
      name: "gross_total",
      type: "number",
      required: true,
      value: record.salary_data?.gross_total,
    },
    {
      label: "Gross Salary",
      name: "gross_salary",
      type: "number",
      required: true,
      value: record.salary_data?.gross_salary,
    },
    {
      label: "Final",
      name: "final_total",
      type: "number",
      required: true,
      value: record.salary_data?.final_total,
    },
    {
      label: "Bank Name",
      name: "bank_name",
      type: "text",
      required: true,
      value: record.salary_data?.bank_name,
    },
    {
      label: "Bank IFSC",
      name: "bank_ifsc",
      type: "text",
      required: true,
      value: record.salary_data?.bank_ifsc,
    },
    {
      label: "Account Number",
      name: "account_number",
      type: "number",
      required: true,
      value: record.salary_data?.account_number,
    },
    {
      label: "Account Holder Name",
      name: "account_holder_name",
      type: "text",
      required: true,
      value: record.salary_data?.account_holder_name,
    },
    {
      label: "Upload Image",
      name: "profile_photo",
      type: "file",
      value: "image",
      accept: "image/jpeg image/png",
    },
  ];

  const handleFormSubmitEdit = async (data: any) => {
    const formData = new FormData();
    if (
      typeof data?.profile_photo !== "string" &&
      data.profile_photo.length > 0
    ) {
      formData.append("profile_photo", data.profile_photo[0]);
    } else {
      formData.append("profile_photo", record.profile_photo);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "profile_photo") formData.append(key, String(value));
    });

    try {
      dispatch(setIsLoading(true));
      const response = await updateEmployee(formData);
      dispatch(setToast(response?.data?.message));
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleClose = async (isConfirm: boolean) => {
    if (isConfirm) {
      try {
        setIsOpenDialog(false);
        dispatch(setIsLoading(true));
        // call the delete api using deleteEmployee
        const response = await deleteEmployee({
          id: record.user_id,
        });
        dispatch(setToast(response?.data?.message));
      } catch (error) {
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      setIsOpenDialog(false);
    }
  };

  const formField = useWatch({ control });

  return (
    <>
      <tr>
        {/* <td>{index + 1}</td> */}
        <td>{record.employee_id}</td>
        <td>{`${record?.first_name}  ${record?.last_name ? record?.last_name : ""}`}</td>
        <td>{record.designation}</td>
        <td>{record.email}</td>
        {/* <td>{record.project_name}</td> */}
        {/* <td>
          <Link to={record.project_url} className="text-black" target="_blank">
            {record.project_url}
          </Link>
        </td>
        <td>
          {record.screenshot ? (
            <img
              src={`${record.screenshot}`}
              alt="Screenshot"
              className="screenshot-thumbnail"
              onClick={() => handleViewScreenshot(record.screenshot)}
            />
          ) : (
            "No Screenshot"
          )}
        </td>

        {isStatusExist && (
          <td>
            {record.status ? (
              <span
                className="px-2 py-1 rounded-1"
                style={{
                  backgroundColor:
                    record.status === "approved"
                      ? "#73A617" // green for approved
                      : record.status === "pending"
                      ? "#DD982F" // amber for pending
                      : "#DF3523",

                  color:
                    record.status === "approved"
                      ? "#fff" // green for approved
                      : record.status === "pending"
                      ? "#fff" // amber for pending
                      : "#fff",
                }}
              >
                {record.status}
              </span>
            ) : (
              "No Status"
            )}
          </td>
        )} */}

        {/* {record.status && <td>{record.status}</td>} */}
        <td>
          <div
            className="d-flex gap-2 justify-content-center align-items-center"
            style={{
              cursor: "pointer",
            }}
          >
            <Link
              className="action-btn-container"
              to={`/employee-details/${record.first_name}/${record.user_id}`}
            >
              <IoEyeOutline
                title="view"
                size={22}
                // color="#007BFF"
              />
            </Link>

            {status === "HR" && (
              <div className="action-btn-container">
                <TiEdit
                  size={22}
                  // color="#6C757D"
                  title="edit"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </div>
            )}

            {status === "HR" && (
              <div className="action-btn-container action-btn-delete">
                <RiDeleteBin6Line
                  size={22}
                  title="delete"
                  onClick={() => {
                    setIsOpenDialog(true);
                  }}
                />
              </div>
            )}
          </div>
        </td>
      </tr>

      {isEdit && (
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
                onClick={() => setIsEdit(!isEdit)}
              />
            </div>

            <form onSubmit={handleSubmit(handleFormSubmitEdit)}>
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
                      // labelAnimated={item.labelAnimated}
                      accept={item.accept}
                      disabled={item.disabled}
                    />

                    {errors[item.name as keyof typeof errors] && (
                      <p className="text-danger">
                        {/* {errors[item?.name as keyof typeof errors]?.message} */}

                        {/* {errors[item.name as keyof typeof errors]?.message} */}
                      </p>
                    )}

                    {item.name === "profile_photo" && (
                      <div
                        style={{
                          wordWrap: "break-word",
                        }}
                      >
                        {formField.profile_photo &&
                        typeof formField.profile_photo === "string" ? (
                          <span>
                            {formField.profile_photo.split("/").pop()}
                          </span>
                        ) : (
                          <span>{formField?.profile_photo[0]?.name}</span>
                        )}
                      </div>
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

      <ConfirmDialog
        message="Are you sure you want to delete this item?"
        header="Confirm Deletion"
        isOpen={isOpenDialog}
        onClose={handleClose}
      />
    </>
  );
};
