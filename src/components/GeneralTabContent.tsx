import React from "react";
import { ProfileCommonSection } from "./ProfileCommonSection";

const GeneralTabContent = ({ data }: any) => {
  const GeneralFields = [
    {
      label: "Full Name",
      value: data?.name as string,
      type: "text",
      name: "name",
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
      name: "employee_id",
      type: "text",
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
      name: "address",
    },
    {
      label: "Country",
      value: data?.country as string,
      type: "text",
      name: "country",
    },
    {
      label: "State",
      value: data?.state as string,
      type: "text",
      name: "state",
    },
    {
      label: "City",
      value: data?.city as string,
      type: "text",
      name: "city",
    },
    {
      label: "Zip Code",
      value: data?.zipcode as string,
      type: "text",
      name: "zip code",
    },
  ];

  const LeavesFields = [
    {
      label: "Total Leaves",
      value: data?.leaves?.overall_total_leaves as string,
      type: "text",
      name: "total_leaves",
    },
    {
      label: "Paid Leaves",
      value: data?.leaves?.leave_data?.paid_leaves?.Total as string,
      type: "text",
      name: "paid_leaves",
    },
    {
      label: "Unpaid Leaves",
      value: data?.leaves?.leave_data?.unpaid_leaves?.Total as string,
      type: "text",
      name: "unpaid_leaves",
    },
    {
      label: "Sick Leaves",
      value: data?.leaves?.leave_data?.sick_leaves?.Total as string,
      type: "text",
      name: "sick_leaves",
    },
    {
      label: "Taken",
      value: data?.leaves?.taken as string,
      type: "text",
      name: "total_leaves",
    },
    {
      label: "Remaining",
      value: data?.leaves?.pending as string,
      type: "text",
      name: "taken_leaves",
    },
  ];

  console.log(data);

  return (
    <div>
      <ProfileCommonSection
        title="Information"
        fields={GeneralFields}
        data={data}
      />

      <ProfileCommonSection
        title="Address"
        fields={AddressFields}
        data={data}
      />

      <ProfileCommonSection title="Leaves" fields={LeavesFields} data={data} />
    </div>
  );
};

export default GeneralTabContent;
