import { useState } from "react";
import { EditableForm } from "./EditableForm";
import { ProfileCommonSection } from "./ProfileCommonSection";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { useUpdateEmployeeMutation } from "../redux/api/employee";
import { setToast } from "../redux/slices/toastSlice";
import { useUpdateProfileMutation } from "../redux/api/profile";
import { getFirstAndLastName } from "../utils/getFirstAndLastName";

const GeneralTabContent = ({ data, isEdit, role }: any) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.dropdown);
  const [showEditableForm, setShowEditableForm] = useState(false);
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [updateProfile] = useUpdateProfileMutation();

  console.log(items);

  const GeneralFields = [
    {
      title: "Information",
      items: [
        {
          label: "Full Name",
          value:
            (data?.user_details.first_name as string) +
            " " +
            data?.user_details.last_name,
          type: "text",
          name: "full_name",
          disabled: false,
        },
        {
          label: "E-Mail",
          value: data?.user_details.email as string,
          type: "email",
          name: "email",
          disabled: false,
        },
        {
          label: "Employee Id",
          value: data?.user_details.employee_id as string,
          name: "employee_id",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
          type: "text",
        },
        {
          label: "Date of Joining",
          value: data?.user_details?.joining_date as string,
          type: "date",
          name: "joining_date",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Date of Birth",
          value: data?.user_details?.date_of_birth as string,
          type: "date",
          name: "date_of_birth",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Phone Number",
          value: data?.user_details.phone as string,
          type: "number",
          name: "phone",
        },
        {
          label: "Position",
          name: "designation",
          type: "select",
          options: items?.map((category) => ({
            label: category.name,
            value: category.name,
          })),
          required: true,
          value: data?.user_details.designation as string,
          labelAnimated: false,
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        // {
        //   label: "Position",
        //   value: data?.user_details.designation as string,
        //   type: "text",
        //   name: "designation",
        //   disabled:
        //     role === "owner" ? false : pathname === "/profile" ? true : false,
        // },
      ],
    },
    {
      title: "Address",
      items: [
        {
          label: "Address",
          value: "Mohali",
          type: "text",
          name: "address",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Country",
          value: "India",
          type: "text",
          name: "country",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "State",
          value: "PUN",
          type: "text",
          name: "state",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "City",
          value: "City",
          type: "text",
          name: "city",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Zip Code",
          value: "14000",
          type: "text",
          name: "zip code",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
      ],
    },
    {
      title: "Leaves",
      items: [
        {
          label: "Total Leaves",
          value: data?.leaves_data?.overall_total_leaves as string,
          type: "text",
          name: "total_leaves",
          disabled: true,
        },
        {
          label: "Paid Leaves",
          value: data?.leaves_data?.leave_data?.paid_leaves?.Total as string,
          type: "text",
          name: "paid_leaves",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Unpaid Leaves",
          value: data?.leaves_data?.leave_data?.unpaid_leaves?.Total as string,
          type: "text",
          name: "unpaid_leaves",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Sick Leaves",
          value: data?.leaves_data?.leave_data?.sick_leaves?.Total as string,
          type: "text",
          name: "sick_leaves",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Taken",
          value: String(data?.leaves_data?.taken),
          type: "text",
          name: "taken",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Remaining",
          value: data?.leaves_data?.pending as string,

          type: "text",
          name: "pending",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
      ],
    },
    {
      title: "Salary",
      items: [
        {
          label: "Basic Salary",
          value: data?.salary_data?.basic_salary as string,
          // value: "0",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
          type: "text",
          name: "basic_salary",
        },
        {
          label: "House Rent",
          value: data?.salary_data?.house_rent as string,
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
          type: "text",
          name: "house_rent",
        },
        {
          label: "Medical Allowance",
          value: data?.salary_data?.medical_allowance as string,
          type: "text",
          name: "medical_allowance",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Tax",
          value: data?.salary_data?.tax as string,
          type: "text",
          name: "tax",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Leave Deduction",
          value: data?.salary_data?.leave_deduction as string,
          type: "text",
          name: "leave_deduction",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "PF",
          value: data?.salary_data?.pf as string,
          type: "text",
          name: "pf",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Employee State",
          value: data?.salary_data?.employee_state as string,
          type: "text",
          name: "employee_state",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Insaurance",
          value: data?.salary_data?.insurance as string,
          type: "text",
          name: "insurance",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Extra Working",
          value: data?.salary_data?.extra_working as string,
          type: "text",
          name: "extra_working",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Gross Total",
          value: data?.salary_data?.gross_total as string,
          type: "text",
          name: "gross_total",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Gross Salary",
          value: data?.salary_data?.gross_salary as string,
          type: "text",
          name: "gross_salary",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
      ],
    },
    {
      title: "Bank Details",
      items: [
        {
          label: "Account Holder Name",
          value: data?.salary_data?.account_holder_name as string,
          type: "text",
          name: "account_holder_name",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "Bank Name",
          value: data?.salary_data?.bank_name as string,
          type: "text",
          name: "bank_name",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },

        {
          label: "Account Number",
          value: data?.salary_data?.account_number as string,
          type: "text",
          name: "account_number",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
        {
          label: "IFSC Code",
          value: data?.salary_data?.bank_ifsc as string,
          type: "text",
          name: "bank_ifsc",
          disabled:
            role === "owner" ? false : pathname === "/profile" ? true : false,
        },
      ],
    },
  ];

  const updatedFields = GeneralFields.map((field) => {
    if (role === "owner" && pathname === "/profile") {
      if (
        field.title === "Salary" ||
        field.title === "Bank Details" ||
        field.title === "Leaves"
      )
        return null;
    }
    return { ...field };
  }).filter(
    (field): field is { title: string; items: any[] } => field !== null
  );

  const Fields = updatedFields.flatMap((fields) => fields?.items);
  const toggleEditableForm = () => {
    setShowEditableForm(!showEditableForm);
  };

  const handleSubmitFormEdit = async (formDataFields: any) => {
    try {
      dispatch(setIsLoading(true));
      const { first_name, last_name } = getFirstAndLastName(
        formDataFields.full_name
      );

      const formData = new FormData();
      formData.append("id", data?.user_details?.id);
      Object.entries(formDataFields).map(([key, value]) => {
        if (key === "full_name") {
          return;
        }
        formData.append(key, String(value));
      });

      formData.append("first_name", first_name);
      formData.append("last_name", last_name);

      // for (let [key, value] of formData.entries()) {
      //   console.log([key, value]);
      // }

      let response;
      if (pathname === "/profile") {
        response = await updateProfile(formData);
      } else {
        response = await updateEmployee(formData);
      }
      dispatch(setToast(response?.data?.message));
      setShowEditableForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div>
      <div>
        {showEditableForm ? (
          <div className="py-4 profile-common-section ">
            <EditableForm
              fields={Fields}
              defaultValues={{
                full_name: `${data?.user_details?.first_name} ${data?.user_details?.last_name}`,
                email: data?.user_details?.email,
                address: data?.user_details?.address,
                phone: data?.user_details?.phone,
                joining_date: data?.user_details?.joining_date,
                date_of_birth: data?.user_details?.date_of_birth,
                employee_id: data?.user_details?.employee_id,
                designation: data?.user_details?.designation,
                total_leaves: data?.leaves_data?.overall_total_leaves,
                paid_leaves: data?.leaves_data?.leave_data?.paid_leaves?.Total,
                unpaid_leaves:
                  data?.leaves_data?.leave_data?.unpaid_leaves?.Total,
                sick_leaves: data?.leaves_data?.leave_data?.sick_leaves?.Total,
                taken: data?.leaves_data?.taken,
                pending: data?.leaves_data?.pending,
                basic_salary: data?.salary_data?.basic_salary, // Assuming basic_salary is inside salary_data
                house_rent: data?.salary_data?.house_rent,
                medical_allowance: data?.salary_data?.medical_allowance,
                tax: data?.salary_data?.tax,
                leave_deduction: data?.salary_data?.leave_deduction,
                pf: data?.salary_data?.pf,
                employee_state: data?.salary_data?.employee_state,
                insurance: data?.salary_data?.insurance,
                extra_working: data?.salary_data?.extra_working,
                gross_total: data?.salary_data?.gross_total,
                gross_salary: data?.salary_data?.gross_salary,
                bank_name: data?.salary_data?.bank_name,
                account_holder_name: data?.salary_data?.account_holder_name,
                account_number: data?.salary_data?.account_number,
                bank_ifsc: data?.salary_data?.bank_ifsc,
              }}
              onSubmit={handleSubmitFormEdit}
            />
          </div>
        ) : (
          <ProfileCommonSection fields={updatedFields} data={data} />
        )}

        {isEdit &&
          (role === "owner" ? (
            data.user_details?.status === "HR" ? (
              <div className="d-flex justify-content-end py-2">
                <button
                  className="bg-blue-primary text-xsmall edit-btn"
                  onClick={toggleEditableForm}
                >
                  {showEditableForm ? "Cancel" : "Edit"}
                </button>
              </div>
            ) : pathname === "/profile" ? (
              <div className="d-flex justify-content-end py-2">
                <button
                  className="bg-blue-primary text-xsmall edit-btn"
                  onClick={toggleEditableForm}
                >
                  {showEditableForm ? "Cancel" : "Edit"}
                </button>
              </div>
            ) : (
              ""
            )
          ) : (
            <div className="d-flex justify-content-end py-2">
              <button
                className="bg-blue-primary text-xsmall edit-btn"
                onClick={toggleEditableForm}
              >
                {showEditableForm ? "Cancel" : "Edit"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GeneralTabContent;
