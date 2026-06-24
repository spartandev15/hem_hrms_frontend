import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import {
  MdCancel,
  MdOutlineCancel,
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/inputWithLabel.css";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  useGetEmployeesQuery,
  usePostEmployeeMutation,
} from "../../redux/api/employee";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import { employeeFormSchema } from "../../validations/formValidation";
import EmployeeList from "./EmployeeList";
import { PER_PAGE_EMPLOYEE } from "../../utils/constant";
import ReactPaginate from "react-paginate";

const AddEmployee = () => {
  const [query, setQuery] = useState({
    search_query: "",
    per_page: PER_PAGE_EMPLOYEE,
    page: 1,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { status } = useAppSelector((state) => state.authUser);
  const [isOpen, setIsOpen] = useState(status === "owner" ? false : true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: allEmployeData, isLoading } = useGetEmployeesQuery(query);

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: status === "owner" ? "HR" : "",
      // designation: status === "owner" ? "HR" : "",
      profile_photo: "",
          country: "",
    state: "",
    city: "",

    },
    resolver: zodResolver(employeeFormSchema),
  });
  const [postEmployee,{ data: EmployeeDetailsData, isSuccess: postEmployeeIsSuccess }, ] = usePostEmployeeMutation();

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
      // required: true,
      value: status === "owner" ? "HR" : items[0]?.name,
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
    {
      label: "Role",
      name: "role",
      options: [
        {
          label: "HR",
          value: "HR",
        },
        {
          label: "Employee",
          value: "employee",
        },
      ],
      type: "select",
      value: "role",
    },
    {
      label: "Upload Profile Image",
      name: "profile_photo",
      type: "file",
      value: "image",
      accept: "image/*",
    },
      {
      label: "Address",
      name: "address",
      type: "text",
      value: ""
    },
      {
      label: "Country",
      name: "country",
      type: "country",
      value:  ""
    },
      {
      label: "State",
      name: "state",
      type: "state",
      value:  ""   },

      {
      label: "City",
      name: "city",
      type: "city",
      value:  ""  },
      {
      label: "Zip Code",
      name: "zip_code",
      type: "text",
      value:  ""
    },
  ];

  const updateAddEmployeeFormField = addEmployeeFormFields
    .map((item) => {
      if (status === "owner" && item.label === "Designation") return null;
      return { ...item };
    })
    .filter(Boolean);

  // const handleFormSubmit = (data: any) => {
  //   const formData = new FormData();
  //   if (data.profile_photo.length > 0) {
  //     formData.append("profile_photo", data.profile_photo[0]);
  //   }

  //   Object.entries(data).forEach(([key, value]) => {
  //     if (key !== "profile_photo") formData.append(key, String(value));
  //   });

  //   dispatch(setIsLoading(true));
  //   postEmployee(formData);
  //   reset();
  // };
const handleFormSubmit = (data: any) => {
  const formData = new FormData();

  // profile image
  if (data.profile_photo && data.profile_photo.length > 0) {
    formData.append("profile_photo", data.profile_photo[0]);
  }

  Object.entries(data).forEach(([key, value]) => {
    if (key === "profile_photo") return;

    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value as any);
    }
  });
for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
  console.log("FINAL PAYLOAD 👉", Object.fromEntries(formData.entries()));

  dispatch(setIsLoading(true));
  postEmployee(formData);
  reset();
};
  const handleSearchSubmit = (query: any) => {
    setQuery((prev) => ({
      ...prev,
      search_query: query,
    }));
  };

  const formFields = useWatch({ control });

  const handlePageClick = ({ selected }: { selected: number }) => {
    setQuery((prev) => ({
      ...prev,
      page: selected + 1,
    }));
    // dispatch(setIsLoading(true));
    // getAllCategoryWithPagination(selected + 1);
  };

  useEffect(() => {
    if (EmployeeDetailsData?.result && postEmployeeIsSuccess) {
      dispatch(setIsLoading(false));
      dispatch(setToast(EmployeeDetailsData?.message));
      if (status !== "owner") navigate("/dashboard/all/employees");
      else setIsOpen(false);
      setIsLoading(false);
    } else {
      if (EmployeeDetailsData?.message) {
        dispatch(setIsLoading(false));
        dispatch(setToast(EmployeeDetailsData?.message));
      }
    }
  }, [postEmployeeIsSuccess]);

  useEffect(() => {
    if (formFields?.profile_photo && formFields.profile_photo[0]) {
      const file = formFields?.profile_photo[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (typeof reader.result === "string") {
            setPreviewImage(e.target.result);
          }
        };
        if (typeof file === "object" && (file as File) instanceof Blob)
          reader.readAsDataURL(file);
      }
    }
  }, [formFields?.profile_photo]);

  return (
    <div>
      <div className="mt-4 container pb-4"> 
        <div className="m-auto">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-blue-primary text-start text-large m-0">
              Employee Records
            </h2>

            {status === "owner" && (
              <button
                className="btn d-flex align-items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  width: "fit-content",
                }}
              >
                {isOpen ? (
                  <div className="d-flex align-items-center gap-1">
                    <MdCancel size={22} /> Cancel
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-1">
                    <FaPlus />
                    Enroll New Employee
                  </div>
                )}
              </button>
            )}
          </div>

          {isOpen && (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="border p-3 rounded shadow-sm mt-3"
            >
              <div className="row mt-4">
                {updateAddEmployeeFormField.map((item, index) => {
                  if (item && item.label === "Role" && status === "HR")
                    return null;
                  return (
                    <div
                      className="col-sm-6 my-2"
                      key={`${item?.label}-${index}`}
                    >
                      <InputWithLabel
                        id={`${index}`}
                        label={item?.label}
                        name={item?.name}
                        register={register}
                        type={item?.type}
                        value={item?.value}
                         watch={watch} 
                        options={item?.options}
                        accept={item?.accept}
                      />
                      {errors[item?.name as keyof typeof errors] && (
                        <p className="text-danger">
                          {errors[item?.name as keyof typeof errors]?.message}
                        </p>
                      )}

                      {item?.name === "profile_photo" && previewImage && (
                        <div>
                          {previewImage && (
                            <img
                              src={previewImage}
                              className="object-fit-contain"
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                            />

                            // <span>helo</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="d-flex justify-content-center mt-2">
                <button className="btn py-2">Submit</button>
              </div>
            </form>
          )}

          {status === "owner" && (
            <div className="mt-4 overflow-auto">
              <EmployeeList
                data={allEmployeData?.employee?.data}
                isLoading={isLoading}
                handleQuery={handleSearchSubmit}
              />

              <div className="bg-gray">
                <ReactPaginate
                  className="react-paginate"
                  // breakLabel="..."
                  nextLabel={<MdOutlineSkipNext />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={allEmployeData?.pagination?.last_page}
                  // pageCount={allCategory?.pagination?.last_page}
                  previousLabel={<MdOutlineSkipPrevious />}
                  renderOnZeroPageCount={null}
                  disabledClassName="disabled"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
