import React from "react";
import { ProfileCommonSection } from "./ProfileCommonSection";
import { useGetProfileQuery } from "../redux/api/profile";

const GeneralTabContent = ({ data }: any) => {
  console.log(data);
  const GeneralFields = [
    {
      label: "Full Name",
      value: data?.name as string,
      type: "text",
    },
    {
      label: "E-Mail",
      value: data?.email as string,
      type: "email",
    },
    {
      label: "Employee Id",
      value: data?.employee_id as string,
      type: "text",
    },
    {
      label: "Date of Joining",
      value: data?.joining_date as string,
      type: "date",
    },
    {
      label: "Tax Number",
      value: data?.tax_number as string,
      type: "number",
    },
    {
      label: "Date of Birth",
      value: data?.tax_number as string,
      type: "date",
    },
    {
      label: "Phone Number",
      value: data?.tax_number as string,
      type: "number",
    },
    {
      label: "Position",
      value: data?.tax_number as string,
      type: "text",
    },
  ];

  const AddressFields = [
    {
      label: "Address",
      value: data?.name as string,
      type: "textarea",
    },
    {
      label: "Country",
      value: data?.email as string,
    },
    {
      label: "State",
      value: data?.employee_id as string,
    },
    {
      label: "City",
      value: data?.joining_date as string,
    },
    {
      label: "Zip Code",
      value: data?.tax_number as string,
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
