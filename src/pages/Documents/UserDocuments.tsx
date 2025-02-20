import React, { useState } from "react";
import UserDocumentsForm from "../../components/UserDocumentsForm";
import UserDocumentStatus from "./UserDocumentStatus";
import { useGetDocumetsQuery } from "../../redux/api/documents";
import SpinnerLoader from "../../components/SpinnerLoader";

const UserDocuments = () => {
  const { data, isLoading: isDocumentsLoading } = useGetDocumetsQuery();
  // const [documents, setDocuments] = useState<any[]>([
  //   {
  //     label: "10th Qualification Details",
  //     status: "Pending",
  //     name: "10th_dmc",
  //   },
  //   {
  //     label: "12th Qualification Details",
  //     status: "Confirmed",
  //     name: "12th_dmc",
  //   },
  //   {
  //     label: "Degree Qualification Details",
  //     status: "Pending",
  //     name: "college_degree",
  //   },
  //   { label: "Aadhaar Card", status: "Confirmed", name: "aadhaar_card" },
  //   { label: "PAN Card", status: "Pending", name: "pan_card" },
  //   {
  //     label: "Bank Details (Passbook)",
  //     status: "Confirmed",
  //     name: "bank_details",
  //   },
  //   { label: "User Photo", status: "Confirmed", name: "user_photo" },
  //   {
  //     label: "Previous Experience",
  //     status: "Pending",
  //     name: "previous_experience",
  //   },
  //   { label: "Salary Slips", status: "Pending", name: "previous_salary_slip" },
  // ]);
  return (
    <div className="container py-4">
      <div>
        <h2 className="text-start text-blue-primary m-0 text-large">
          Your Uploaded Documents
        </h2>

        {isDocumentsLoading ? (
          <div className="mt-3 ms-1 d-flex justify-content-center align-items-center">
            <SpinnerLoader size={20} />
          </div>
        ) : (
          <UserDocumentStatus documents={data?.data} />
        )}
      </div>
      <div className="mt-4">
        <UserDocumentsForm />
      </div>
    </div>
  );
};

export default UserDocuments;
