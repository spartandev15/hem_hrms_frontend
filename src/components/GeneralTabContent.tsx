import React from "react";
import { ProfileCommonSection } from "./ProfileCommonSection";
import { useGetProfileQuery } from "../redux/api/profile";

const GeneralTabContent = () => {
  const { data: userData } = useGetProfileQuery();
  const GeneralFields = [
    {
      label: "Full Name",
      value: userData?.user?.name as string,
      type: "text",
    },
    {
      label: "E-Mail",
      value: userData?.user?.email as string,
      type: "email",
    },
    {
      label: "Employee Id",
      value: userData?.user?.employee_id as string,
      type: "text",
    },
    {
      label: "Date of Joining",
      value: userData?.user?.joining_date as string,
      type: "date",
    },
    {
      label: "Tax Number",
      value: userData?.user?.tax_number as string,
      type: "number",
    },
    {
      label: "Date of Birth",
      value: userData?.user?.tax_number as string,
      type: "date",
    },
    {
      label: "Phone Number",
      value: userData?.user?.tax_number as string,
      type: "number",
    },
    {
      label: "Position",
      value: userData?.user?.tax_number as string,
      type: "text",
    },
  ];

  const AddressFields = [
    {
      label: "Address",
      value: userData?.user?.name as string,
      type: "textarea",
    },
    {
      label: "Country",
      value: userData?.user?.email as string,
    },
    {
      label: "State",
      value: userData?.user?.employee_id as string,
    },
    {
      label: "City",
      value: userData?.user?.joining_date as string,
    },
    {
      label: "Zip Code",
      value: userData?.user?.tax_number as string,
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

      {/* <ProfileCommonSection
        title="Emergency Contact"
        onSubmit={() => {
          console.log("first");
        }}
        fields={GeneralFields}
      /> */}
    </div>
  );
};

export default GeneralTabContent;
