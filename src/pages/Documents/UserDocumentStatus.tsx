// components/DocumentStatusList.tsx
import React, { ChangeEvent } from "react";
import "../../assets/styles/userdocumentstatus.css";
import { FaFilePdf } from "react-icons/fa";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useForm } from "react-hook-form";
import { usePostDocumentsMutation } from "../../redux/api/documents";

interface Document {
  label: string;
  status: string;
  name: string;
}

interface DocumentStatusListProps {
  documents: Document[];
}

const UserDocumentStatus: React.FC<DocumentStatusListProps> = ({
  documents,
}) => {
  console.log(documents);
  if (!documents) {
    // If userDocument is null or undefined, return a message or fallback UI
    return <p className="ms-1 mt-2">No documents available.</p>;
  }

  const documentEntries = Object.entries(documents).filter(
    ([key, value]) =>
      key !== "id" &&
      key !== "user_id" &&
      key !== "status" &&
      key !== "created_at" &&
      key !== "updated_at"
  );

  const defaultValues: Record<string, any> = {};

  documentEntries.map(([key, value]) => {
    if (Array.isArray(value)) {
      defaultValues[key] = value.map((d) => d.url);
    } else {
      defaultValues[key] = value?.url;
    }
  });

  const [postDocuments] = usePostDocumentsMutation();

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      // Update the value of the file in the form state
      setValue(name, file);
    }

    const formData = new FormData();
    const allData = getValues();

    for (const key in allData) {
      formData.append(key, allData[key]);
    }

    try {
      const response = await postDocuments(formData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="document-list row g-2 mt-4">
        {/* {documentEntries.map((doc, index) => (
          <div
            className="document-item d-flex justify-content-between align-items-center col-md-4"
            key={index}
          >
            <div className="d-flex flex-column gap-3">
              <span className="font-weight-bold">{doc.label}</span>

              <div>
                <Link to={"/"} target="_blank">
                  <BsFileEarmarkPdf size={40} />
                </Link>
                <img
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                  src="https://digitalreach.asia/wp-content/uploads/2021/11/placeholder-image.png"
                  alt=""
                />
              </div>

              <div className="status-badge">
                <span
                  className={`badge ${
                    doc.status === "Confirmed"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            </div>
          </div>
        ))} */}
      </div>

      <div className="document-list ">
        {documentEntries.map(([key, doc], index) => {
          if (Array.isArray(doc)) {
            // If the value is an array (e.g., previous_experience)
            return (
              <div key={index} className="document-item col-md-4">
                <div className="d-flex flex-column gap-2">
                  <span className="font-weight-bold">
                    {key.replace("_", " ").toUpperCase()}
                  </span>

                  <div className="d-flex gap-2">
                    {doc.map((experience, idx) => (
                      <div key={idx} className="d-flex flex-column gap-3">
                        <Link to={experience?.url || "#"} target="_blank">
                          <BsFileEarmarkPdf size={40} />
                        </Link>

                        <span
                          className={`badge ${
                            experience?.status === "uploaded"
                              ? "bg-success"
                              : experience?.status === "rejected"
                              ? "bg-danger"
                              : "badge-warning"
                          }`}
                        >
                          {experience?.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          // For other documents that are not arrays
          return (
            <div key={index} className="document-item col-md-4">
              <div className="d-flex flex-column gap-3">
                <span className="font-weight-bold">
                  {key.replace("_", " ").toUpperCase()}
                </span>

                <div>
                  {doc?.status === "uploaded" ? (
                    <Link to={doc.url} target="_blank">
                      <BsFileEarmarkPdf size={40} />
                    </Link>
                  ) : (
                    <div
                      style={{
                        cursor: "no-drop",
                      }}
                    >
                      <div>
                        <BsFileEarmarkPdf
                          size={40}
                          style={{
                            opacity: 0.3,
                          }}
                        />
                        {doc.status === "pending" ? (
                          <span className="bg-warning text-white text-xsmall px-2">
                            Document not uploaded
                          </span>
                        ) : (
                          <span className="bg-danger text-white text-xsmall px-2">
                            Document rejected
                          </span>
                        )}
                      </div>

                      <form className="mt-4">
                        <InputWithLabel
                          type="file"
                          label="File Upload"
                          register={register}
                          value={"default"}
                          name={key}
                          onChange={handleChange}
                        />
                      </form>
                    </div>
                    // Fallback message if no URL
                  )}
                </div>

                {doc ? (
                  <div className="status-badge">
                    <span
                      className={`badge ${
                        doc?.status === "uploaded"
                          ? "bg-success"
                          : doc?.status === "rejected"
                          ? "bg-danger"
                          : "badge-warning"
                      }`}
                    >
                      {doc?.status}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDocumentStatus;
