import React, { useState } from "react";
import { ProfileCommonSection } from "./ProfileCommonSection";
import { EditableForm } from "./EditableForm";

const GeneralTabContent = ({ data }: any) => {
  const GeneralFields = [
    {
      title: "Information",
      items: [
        {
          label: "Full Name",
          value: data?.user_details.name as string,
          type: "text",
          name: "name",
        },
        {
          label: "E-Mail",
          value: data?.user_details.email as string,
          type: "email",
          name: "email",
        },
        {
          label: "Employee Id",
          value: data?.user_details.employee_id as string,
          name: "employee_id",
          type: "text",
        },
        {
          label: "Date of Joining",
          value: data?.user_details?.joining_date as string,
          type: "date",
          name: "joining_date",
        },
        // {
        //   label: "Tax Number",
        //   value: data?.user_details.tax_number as string,
        //   type: "number",
        //   name: "tax_number",
        // },
        {
          label: "Date of Birth",
          value: data?.user_details?.date_of_birth as string,
          type: "date",
          name: "dob",
        },
        {
          label: "Phone Number",
          value: data?.user_details.phone as string,
          type: "number",
          name: "phone",
        },
        {
          label: "Position",
          value: data?.user_details.designation as string,
          type: "text",
          name: "positon",
        },
        // {
        //   label: "Previous Salary",
        //   // value: data?.user_details.city as string,
        //   value: "25000",
        //   type: "text",
        //   name: "city",
        // },
        // {
        //   label: "Current Salary",
        //   // value: data?.zipcode as string,
        //   value: "35000",

        //   type: "text",
        //   name: "zip code",
        // },
      ],
    },
    {
      title: "Address",
      items: [
        {
          label: "Address",
          // value: data?.address as string,
          value: "Mohali",
          type: "text",
          name: "address",
        },
        {
          label: "Country",
          // value: data?.country as string,
          value: "India",
          type: "text",
          name: "country",
        },
        {
          label: "State",
          // value: data?.state as string,
          value: "PUN",

          type: "text",
          name: "state",
        },
        {
          label: "City",
          // value: data?.city as string,
          value: "City",
          type: "text",
          name: "city",
        },
        {
          label: "Zip Code",
          // value: data?.zipcode as string,
          value: "14000",
          type: "text",
          name: "zip code",
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
        },
        {
          label: "Paid Leaves",
          value: data?.leaves_data?.leave_data?.paid_leaves?.Total as string,
          type: "text",
          name: "paid_leaves",
        },
        {
          label: "Unpaid Leaves",
          value: data?.leaves_data?.leave_data?.unpaid_leaves?.Total as string,
          disabled: true,
          type: "text",
          name: "unpaid_leaves",
        },
        {
          label: "Sick Leaves",
          value: data?.leaves_data?.leave_data?.sick_leaves?.Total as string,

          type: "text",
          name: "sick_leaves",
        },
        {
          label: "Taken",
          value: data?.leaves_data?.taken as string,

          type: "text",
          name: "total_leaves",
        },
        {
          label: "Remaining",
          value: data?.leaves_data?.pending as string,

          type: "text",
          name: "taken_leaves",
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
          // disabled: ,
          type: "text",
          name: "basic_salary",
        },
        {
          label: "House Rent",
          value: data?.salary_data?.house_rent as string,

          type: "text",
          name: "sick_leaves",
        },
        {
          label: "Medical Allowance",
          value: data?.salary_data?.medical_allowance as string,
          type: "text",
          name: "total_leaves",
        },
        {
          label: "Tax",
          value: data?.salary_data?.tax as string,
          type: "text",
          name: "taken_leaves",
        },
        {
          label: "Leave Deduction",
          value: data?.salary_data?.leave_deduction as string,
          type: "text",
          name: "taken_leaves",
        },
        {
          label: "PF",
          value: data?.salary_data?.pf as string,

          type: "text",
          name: "taken_leaves",
        },
        {
          label: "Employee State",
          value: data?.salary_data?.employee_state as string,
          type: "text",
          name: "taken_leaves",
        },
        {
          label: "Insaurance ",
          value: data?.salary_data?.insurance as string,
          type: "text",
          name: "taken_leaves",
        },
        {
          label: "Extra Working",
          value: data?.salary_data?.extra_working as string,
          type: "text",
          name: "taken_leaves",
        },
        {
          label: "Gross Total",
          value: data?.salary_data?.gross_total as string,
          type: "Final Total",
          name: "taken_leaves",
        },
        {
          label: "Gross Salary",
          value: data?.salary_data?.gross_salary as string,
          type: "text",
          name: "taken_leaves",
        },
      ],
    },
  ];

  const Fields = GeneralFields.flatMap((fields) => fields.items);

  const [showEditableForm, setShowEditableForm] = useState(false);

  const toggleEditableForm = () => {
    setShowEditableForm(!showEditableForm);
  };

  // const AddressFields = [
  //   {
  //     label: "Address",
  //     value: data?.address as string,
  //     type: "text",
  //     name: "address",
  //   },
  //   {
  //     label: "Country",
  //     value: data?.country as string,
  //     type: "text",
  //     name: "country",
  //   },
  //   {
  //     label: "State",
  //     value: data?.state as string,
  //     type: "text",
  //     name: "state",
  //   },
  //   {
  //     label: "City",
  //     value: data?.city as string,
  //     type: "text",
  //     name: "city",
  //   },
  //   {
  //     label: "Zip Code",
  //     value: data?.zipcode as string,
  //     type: "text",
  //     name: "zip code",
  //   },
  // ];

  // const LeavesFields = [
  //   {
  //     label: "Total Leaves",
  //     value: data?.leaves?.overall_total_leaves as string,
  //     type: "text",
  //     name: "total_leaves",
  //   },
  //   {
  //     label: "Paid Leaves",
  //     value: data?.leaves?.leave_data?.paid_leaves?.Total as string,
  //     type: "text",
  //     name: "paid_leaves",
  //   },
  //   {
  //     label: "Unpaid Leaves",
  //     value: data?.leaves?.leave_data?.unpaid_leaves?.Total as string,
  //     type: "text",
  //     name: "unpaid_leaves",
  //   },
  //   {
  //     label: "Sick Leaves",
  //     value: data?.leaves?.leave_data?.sick_leaves?.Total as string,
  //     type: "text",
  //     name: "sick_leaves",
  //   },
  //   {
  //     label: "Taken",
  //     value: data?.leaves?.taken as string,
  //     type: "text",
  //     name: "total_leaves",
  //   },
  //   {
  //     label: "Remaining",
  //     value: data?.leaves?.pending as string,
  //     type: "text",
  //     name: "taken_leaves",
  //   },
  // ];

  return (
    <div>
      <div>
        {showEditableForm ? (
          <EditableForm
            fields={Fields}
            defaultValues={{
              name: data?.name,
              email: data?.email,
              address: data?.address,
              phone: data?.phone,
              department: data?.department,
              job_title: data?.job_title,
              joining_date: data?.joining_date,
              employee_id: data?.employee_id,
              designation: data?.designation,
              reporting_manager: data?.reporting_manager,
              salary: data?.salary,
              basic_salary: data?.basic_salary,
              house_rent: data?.house_rent,
              medical_allowance: data?.medical_allowance,
              tax: data?.tax,
              leave_deduction: data?.leave_deduction,
              pf: data?.pf,
              employee_state: data?.employee_state,
              insurance: data?.insurance,
              extra_working: data?.extra_working,
            }}
            onSubmit={(data) => {
              console.log(data);
            }}
          />
        ) : (
          <ProfileCommonSection fields={GeneralFields} data={data} />
        )}

        <div className="d-flex justify-content-end py-2">
          <button
            className="bg-blue-primary text-xsmall edit-btn"
            onClick={toggleEditableForm}
          >
            {showEditableForm ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {/* <ProfileCommonSection
        title="Address"
        fields={AddressFields}
        data={data}
      />

      <ProfileCommonSection title="Leaves" fields={LeavesFields} data={data} /> */}
    </div>
  );
};

export default GeneralTabContent;
