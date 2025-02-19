import React, { useEffect, useState } from "react";
import { useGetDocumentsByIdQuery } from "../../redux/api/documents";
import { useParams } from "react-router-dom";
import "../../assets/styles/documentOverview.css";

const DocumentOverview = () => {
  const params = useParams();

  const [filterDocument, setFilteredDocuments] = useState({});
  const { data: docDetails } = useGetDocumentsByIdQuery(params.id as string);

  // const documents = [
  //   {
  //     name: "aadhaar_card",
  //     url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965924_Resume.pdf",
  //     status: "uploaded",
  //   },
  //   {
  //     name: "pan_card",
  //     url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume.pdf",
  //     status: "uploaded",
  //   },
  //   {
  //     name: "tenth_dmc",
  //     url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume (1).pdf",
  //     status: "uploaded",
  //   },
  //   {
  //     name: "twelfth_dmc",
  //     url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume (1).pdf",
  //     status: "uploaded",
  //   },
  //   {
  //     name: "college_degree",
  //     url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume (1).pdf",
  //     status: "uploaded",
  //   },
  //   {
  //     name: "user_photo",
  //     url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Media.jpg",
  //     status: "uploaded",
  //   },
  //   {
  //     name: "bank_details",
  //     url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume.pdf",
  //     status: "uploaded",
  //   },
  //   {
  //     name: "previous_experience",
  //     documents: [
  //       {
  //         url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume (1).pdf",
  //         status: "uploaded",
  //       },
  //       {
  //         url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume.pdf",
  //         status: "uploaded",
  //       },
  //       {
  //         url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Media.jpg",
  //         status: "uploaded",
  //       },
  //     ],
  //   },
  //   {
  //     name: "previous_salary_slip",
  //     documents: [
  //       {
  //         url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume (1).pdf",
  //         status: "uploaded",
  //       },
  //       {
  //         url: "https://hrmsdb.spartanstaging.site/public/user-documents/6/1739965925_Resume.pdf",
  //         status: "uploaded",
  //       },
  //     ],
  //   },
  // ];

  const handleStatusChange = (docName, newStatus) => {
    // setDocuments((prevDocs) => ({
    //   ...prevDocs,
    //   [docName]: {
    //     ...prevDocs[docName],
    //     status: newStatus,
    //   },
    // }));
  };

  const handleSaveChanges = () => {};

  function removeFields(data) {
    const filteredData: any = {};

    if (data) {
      // Destructure to remove the unwanted fields
      const { user_id, created_at, updated_at, status, user, ...rest } = data;

      // Return the rest of the object which does not include the excluded fields

      // Filter individual documents like aadhaar_card, pan_card, etc.

      if (rest)
        Object.entries(rest).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // If the field is an array (e.g., previous_experience, previous_salary_slip)
            filteredData[key] = value.map((item) => {
              const { name, url, status } = item;
              return { name, url, status };
            });
          } else if (typeof value === "object") {
            // If it's a nested object (e.g., aadhaar_card, pan_card)
            filteredData[key] = {
              name: value.name,
              url: value.url,
              status: value.status,
            };
          }
        });
    }

    return filteredData;
  }

  useEffect(() => {
    if (docDetails && docDetails.data && docDetails.data.document) {
      const filtered = removeFields(docDetails.data.document);
      setFilteredDocuments(filtered);
    }
  }, [docDetails]);

  return (
    <div className="container py-4">
      {/* User Information */}
      <div className="user-info">
        <h1 className="text-large">{docDetails?.data?.user.name}</h1>
        <p>
          {" "}
          <strong>Email:</strong> {docDetails?.data?.user?.email}
        </p>
        <p>
          {" "}
          <strong>Employee ID:</strong> {docDetails?.data?.user.employee_id}
        </p>
        <p>
          {" "}
          <strong>Designation: </strong> {docDetails?.data?.user.designation}
        </p>
      </div>

      {/* Documents Cards Section */}
      <div className="documents-section">
        <h2 className="text-start text-large text-blue-primary">
          User Documents
        </h2>

        <div className="documents-cards row g-4">
          {Object.keys(filterDocument).length > 0 ? (
            Object.keys(filterDocument).map((docKey) => {
              const document = filterDocument[docKey];

              // Check if document is an array (like previous_experience, previous_salary_slip)
              if (Array.isArray(document)) {
                return document.map((item, index) => (
                  <div className=" col-md-4" key={`${docKey}-${index}`}>
                    <div className="px-2 document-card">
                      <h3>
                        {docKey.replace(/_/g, " ").toUpperCase()} {index + 1}
                      </h3>
                      <p>
                        <strong>Status:</strong> {item.status}
                      </p>

                      {/* Status Change Dropdown */}
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(docKey, e.target.value)
                        }
                      >
                        <option value="uploaded">Uploaded</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending">Pending</option>
                      </select>

                      {/* Document Preview Link */}
                      <div className="document-preview">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Document
                        </a>
                      </div>
                    </div>
                  </div>
                ));
              }

              // If it's a single document (like aadhaar_card, pan_card, etc.)
              return (
                <div className="col-md-4" key={docKey}>
                  <div className="document-card px-2">
                    <h3>{document.name}</h3>
                    <p>
                      <strong>Status:</strong> {document.status}
                    </p>

                    {/* Status Change Dropdown */}
                    <select
                      value={document.status}
                      onChange={(e) =>
                        handleStatusChange(docKey, e.target.value)
                      }
                    >
                      <option value="uploaded">Uploaded</option>
                      <option value="rejected">Rejected</option>
                      <option value="pending">Pending</option>
                    </select>

                    {/* Document Preview Link */}
                    <div className="document-preview">
                      <a
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No documents available</p>
          )}
        </div>

        {/* Save Changes Button */}
        {/* <button className="save-btn" onClick={handleSaveChanges}>
          Save Changes
        </button> */}
      </div>
    </div>
  );
};

export default DocumentOverview;
