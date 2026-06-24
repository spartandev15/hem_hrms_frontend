import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useForm, useWatch } from "react-hook-form";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { useUpdateEmployeeMutation } from "../../redux/api/employee";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  record: any;
}

const EmployeeEditModal = ({ isOpen, onClose, record }: Props) => {
  console.log(record,"record")
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.dropdown);

  const [updateEmployee] = useUpdateEmployeeMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: record?.id,
      first_name: record?.first_name,
      last_name: record?.last_name,
      phone: record?.phone,
      line_manager: record?.line_manager,
      email: record?.email,
      designation: record?.designation,
      employee_id: record?.employee_id,
      profile_photo: record?.profile_photo,
      joining_date: record?.joining_date,
    
      password: "",
      date_of_birth: record?.date_of_birth,
      total_leaves: String(record?.leaves?.overall_total_leaves || ""),
      paid_leaves: record?.leaves?.leave_data?.paid_leaves?.Total,
      unpaid_leaves: record?.leaves?.leave_data?.unpaid_leaves?.Total,
      sick_leaves: record?.leaves?.leave_data?.sick_leaves?.Total,
      basic_salary: record?.salary_data?.basic_salary,
      house_rent: record?.salary_data?.house_rent,
      medical_allowance: record?.salary_data?.medical_allowance,
      tax: record?.salary_data?.tax,
      leave_deduction: record?.salary_data?.leave_deduction,
      pf: record?.salary_data?.pf,
      employee_state: record?.salary_data?.employee_state,
      insurance: record?.salary_data?.insurance,
      extra_working: record?.salary_data?.extra_working,
      gross_total: record?.salary_data?.gross_total,
      final_total: record?.salary_data?.final_total,
      gross_salary: record?.salary_data?.gross_salary,
      bank_name: record?.salary_data?.bank_name,
      bank_ifsc: record?.salary_data?.bank_ifsc,
      account_number: record?.salary_data?.account_number,
      account_holder_name: record?.salary_data?.account_holder_name,

      address: record?.address,
      state: record?.user_detail?.state,
      city: record?.user_detail?.salary_data?.city,
      zipcode: record?.user_detail?.salary_data?.zipcode,
      country: record?.user_detail?.country,

    },
  });

  const formField = useWatch({ control });

    const editEmployeeFormFields = [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      required: true,
      value: record?.first_name,
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      required: true,
      value: record?.last_name,
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
      value: record?.email,
    },
    {
      label: "Employee Id",
      name: "employee_id",
      type: "string",
      required: true,
      value: record?.employee_id,
    },
    {
      label: "Joining Date",
      name: "joining_date",
      type: "date",
      required: true,
      value: record?.joining_date,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      required: true,
      value: record?.phone,
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
      value: record?.designation,
    },
    {
      label: "DOB",
      name: "date_of_birth",
      type: "date",
      required: true,
      value: record?.date_of_birth,
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
      value: record?.salary_data?.basic_salary,
    },
    {
      label: "House Rent",
      name: "house_rent",
      type: "number",
      required: true,
      value: record?.salary_data?.house_rent,
    },
    {
      label: "Medical Allowance",
      name: "medical_allowance",
      type: "number",
      required: true,
      value: record?.salary_data?.medical_allowance,
    },
    {
      label: "Tax",
      name: "tax",
      type: "number",
      required: true,
      value: record?.salary_data?.tax,
    },
    {
      label: "Leave Deduction",
      name: "leave_deduction",
      type: "number",
      required: true,
      value: record?.salary_data?.leave_deduction,
    },
    {
      label: "PF",
      name: "pf",
      type: "number",
      required: true,
      value: record?.salary_data?.pf,
    },
    {
      label: "Employee State",
      name: "employee_state",
      type: "text",
      required: true,
      value: record?.salary_data?.employee_state,
    },
    {
      label: "Insurance",
      name: "insurance",
      type: "number",
      required: true,
      value: record?.salary_data?.insurance,
    },
    {
      label: "Extra Working",
      name: "extra_working",
      type: "number",
      required: true,
      value: record?.salary_data?.extra_working,
    },
    {
      label: "Gross Total",
      name: "gross_total",
      type: "number",
      required: true,
      value: record?.salary_data?.gross_total,
    },
    {
      label: "Gross Salary",
      name: "gross_salary",
      type: "number",
      required: true,
      value: record?.salary_data?.gross_salary,
    },
    {
      label: "Final",
      name: "final_totalmm",
      type: "number",
      required: true,
      value: record?.salary_data?.final_total,
    },
    {
      label: "Bank Name",
      name: "bank_name",
      type: "text",
      required: true,
      value: record?.salary_data?.bank_name,
    },
    {
      label: "Bank IFSC",
      name: "bank_ifsc",
      type: "text",
      required: true,
      value: record?.salary_data?.bank_ifsc,
    },
    {
      label: "Account Number",
      name: "account_number",
      type: "number",
      required: true,
      value: record?.salary_data?.account_number,
    },
    {
      label: "Account Holder Name",
      name: "account_holder_name",
      type: "text",
      required: true,
      value: record?.salary_data?.account_holder_name,
    },
    {
      label: "Upload Image",
      name: "profile_photo",
      type: "file",
      value: "image",
      accept: "image/jpeg image/png",
    },
     {
      label: "Address",
      name: "address",
      type: "text",
      value: record?.address,
    },
    //   {
    //   label: "Country",
    //   name: "country",
    //   type: "text",
    //   value:  record?.user_detail?.country,
    // },
    //   {
    //   label: "State",
    //   name: "state",
    //   type: "text",
    //   value:  record?.user_detail?.state,
    // },

    //   {
    //   label: "City",
    //   name: "city",
    //   type: "text",
    //   value:  record?.user_detail?.city,
    // },
      {
      label: "Zip Code",
      name: "zipcode",
      type: "text",
      value:  record?.user_detail?.zipcode,
    },
      {
      label: "Country",
      name: "country",
      type: "country",
      value:  record?.user_detail?.country,
    },
      {
      label: "State",
      name: "state",
      type: "state",
      value:  record?.user_detail?.state,  },

      {
      label: "City",
      name: "city",
      type: "city",
      value:  record?.user_detail?.city,  },
   
  ];
useEffect(() => {
  if (!record) return;

  reset({
    id: record?.id || "",
    first_name: record?.first_name || "",
    last_name: record?.last_name || "",
    phone: record?.phone || "",
    line_manager: record?.line_manager || "",
    email: record?.email || "",
    designation: record?.designation || "",
    employee_id: record?.employee_id || "",
    joining_date: record?.joining_date || "",
    date_of_birth: record?.date_of_birth || "",

    total_leaves: String(
      record?.leaves?.overall_total_leaves || ""
    ),

    paid_leaves:
      record?.leaves?.leave_data?.paid_leaves?.Total || "",

    unpaid_leaves:
      record?.leaves?.leave_data?.unpaid_leaves?.Total || "",

    sick_leaves:
      record?.leaves?.leave_data?.sick_leaves?.Total || "",

    basic_salary:
      record?.salary_data?.basic_salary || "",

    house_rent:
      record?.salary_data?.house_rent || "",

    medical_allowance:
      record?.salary_data?.medical_allowance || "",

    tax: record?.salary_data?.tax || "",

    leave_deduction:
      record?.salary_data?.leave_deduction || "",

    pf: record?.salary_data?.pf || "",

    employee_state:
      record?.salary_data?.employee_state || "",

    insurance:
      record?.salary_data?.insurance || "",

    extra_working:
      record?.salary_data?.extra_working || "",

    gross_total:
      record?.salary_data?.gross_total || "",

    gross_salary:
      record?.salary_data?.gross_salary || "",

    final_total:
      record?.salary_data?.final_total || "",

    bank_name:
      record?.salary_data?.bank_name || "",

    bank_ifsc:
      record?.salary_data?.bank_ifsc || "",

    account_number:
      record?.salary_data?.account_number || "",

    account_holder_name:
      record?.salary_data?.account_holder_name || "",

    profile_photo: record?.profile_photo || "",

      address: record?.address,
      state: record?.user_detail?.state,
      city: record?.user_detail?.city,
      zipcode: record?.user_detail?.zipcode,
      country: record?.user_detail?.country,
  });
}, [record, reset]);
  const onSubmit = async (data: any) => {
    const formData = new FormData();

    if (
      typeof data?.profile_photo !== "string" &&
      data?.profile_photo?.length > 0
    ) {
      formData.append("profile_photo", data.profile_photo[0]);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "profile_photo") {
        formData.append(key, String(value ?? ""));
      }
    });

    try {
      dispatch(setIsLoading(true));

      const response = await updateEmployee(formData).unwrap();

      dispatch(setToast(response?.message));
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="employee-detail-edit-form py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Employee Update Form</h2>

          <MdOutlineClose
            size={24}
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {editEmployeeFormFields.map((field, index) => (
              <div className="col-md-6 my-2" key={index}>
                <InputWithLabel
                  id={`${index}`}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={field.value}
                  register={register}
                  options={field.options}
                  accept={field.accept}
                  labelAnimated={true}
                />

                {field.name === "profile_photo" && (
                  <div>
                    {formField.profile_photo &&
                    typeof formField.profile_photo === "string" ? (
                      <span>
                        {formField.profile_photo.split("/").pop()}
                      </span>
                    ) : (
                      <span>
                        {formField?.profile_photo?.[0]?.name}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn py-2">
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditModal;