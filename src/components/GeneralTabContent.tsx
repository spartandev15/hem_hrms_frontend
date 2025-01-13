import React from "react";
import { ProfileCommonSection } from "./ProfileCommonSection";

const GeneralTabContent = ({ data }: any) => {
  console.log(data);
  const GeneralFields = [
    {
      label: "Full Name",
      value: data?.name as string,
      type: "text",
      name: "first_name",
    },
    {
      label: "E-Mail",
      value: data?.email as string,
      type: "email",
      name: "email",
    },
    {
      label: "Employee Id",
      value: data?.employee_id as string,
      type: "employee_id",
    },
    {
      label: "Date of Joining",
      value: data?.joining_date as string,
      type: "date",
      name: "joining_date",
    },
    {
      label: "Tax Number",
      value: data?.tax_number as string,
      type: "number",
      name: "tax_number",
    },
    {
      label: "Date of Birth",
      value: data?.tax_number as string,
      type: "date",
      name: "dob",
    },
    {
      label: "Phone Number",
      value: data?.tax_number as string,
      type: "number",
      name: "phone",
    },
    {
      label: "Position",
      value: data?.tax_number as string,
      type: "text",
      name: "positon",
    },
  ];

  const AddressFields = [
    {
      label: "Address",
      value: data?.address as string,
      type: "textarea",
    },
    {
      label: "Country",
      value: data?.country as string,
    },
    {
      label: "State",
      value: data?.state as string,
    },
    {
      label: "City",
      value: data?.city as string,
    },
    {
      label: "Zip Code",
      value: data?.zipcode as string,
    },
  ];

  const LeavesFields = [
    {
      label: "Total Leaves",
      value: data?.leaves?.overall_total_leaves as string,
      type: "textarea",
    },
    {
      label: "Paid Leaves",
      value: data?.leaves?.leave_data?.paid_leaves?.Total as string,
    },
    {
      label: "Unpaid Leaves",
      value: data?.leaves?.leave_data?.unpaid_leaves?.Total as string,
    },
    {
      label: "Sick Leaves",
      value: data?.leaves?.leave_data?.sick_leaves?.Total as string,
    },
    {
      label: "Taken",
      value: data?.leaves?.taken as string,
    },
    {
      label: "Remaining",
      value: data?.leaves?.pending as string,
    },
  ];
  return (
    <div>
      <ProfileCommonSection
        title="Information"
        onSubmit={() => {}}
        fields={GeneralFields}
        data={data}
      />

      <ProfileCommonSection
        title="Address"
        onSubmit={() => {
          console.log("first");
        }}
        fields={AddressFields}
      />

      <ProfileCommonSection
        title="Leaves"
        onSubmit={() => {
          console.log("first");
        }}
        fields={LeavesFields}
      />
    </div>
  );
};

export default GeneralTabContent;
