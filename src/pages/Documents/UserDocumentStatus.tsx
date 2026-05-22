// components/DocumentStatusList.tsx
import React, { ChangeEvent, useEffect, useRef } from "react";
import "../../assets/styles/userdocumentstatus.css";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useForm } from "react-hook-form";
import { usePostDocumentsMutation } from "../../redux/api/documents";
import { useAppDispatch } from "../../hooks/reduxHook";
import { setIsLoading } from "../../redux/slices/loadingSlice";

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
  if (!documents) {
    // If userDocument is null or undefined, return a message or fallback UI
    return <p className="ms-1 mt-2">No documents available.</p>;
  }

  const fileRef = useRef<{ [key: string]: HTMLInputElement } | null>({});
  const fileRefTwo = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

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

  // const { register, handleSubmit, getValues, setValue } = useForm({
  //   defaultValues: defaultValues,
  // });

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    dispatch(setIsLoading(true));
    const formData = new FormData();
    const { files } = e.target;

    // console.log(key, files?.length);

    if (files && files.length > 1) {
      for (const value of files) {
        formData.append(`${key}[]`, value);
      }
    } else {
      if (files) {
        formData.append(key, files[0]);
      }
    }

    // for (const key in allData) {
    //   formData.append(key, allData[key]);
    // }

    try {
      const response = await postDocuments(formData).unwrap();
      dispatch(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleChageForMultipleFile = async (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    console.log(key);
  };

  // useEffect(() => {
  //   // Ensure fileRefs.current is initialized before using it
  //   if (!fileRef.current) {
  //     fileRef.current = {};
  //   }
  // }, []);

  // console.log(fileRef);

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

      <div className="document-list">
        {documentEntries.map(([key, doc], index) => {
          if (Array.isArray(doc) && doc.length === 0) {
            return (
              <div key={index} className="document-item col-md-4">
                <div className="d-flex flex-column gap-3">
                  <span
                    className="font-weight-bold"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {key.replace("/_/", " ")}
                  </span>

                  <div>
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
                        <span
                          className="text-xsmall px-2"
                          style={{
                            color: "#DF6F23",
                          }}
                        >
                          Document not uploaded
                        </span>
                      </div>

                      <form className="mt-4">
                        <input
                          hidden
                          ref={fileRefTwo}
                          name={key}
                          type="file"
                          accept="application/pdf, images/*"
                          onChange={(e) => handleChageForMultipleFile(e, key)}
                          multiple={true}
                        />

                        <button
                          type="button"
                          style={{
                            width: "fit-content",
                          }}
                          // disabled={disabled}
                          className="file text-start py-0"
                          // style={{
                          //   cursor: disabled ? "auto" : "pointer",
                          // }}
                          onClick={() => {
                            fileRefTwo.current?.click();
                          }}
                        >
                          <span className="text-xsmall">
                            <FaCloudUploadAlt /> Upload File
                          </span>
                        </button>

                        {/* <InputWithLabel
                      type="file"
                      label="File Upload"
                      register={register}
                      value={"default"}
                      name={key}
                      onChange={handleChange}
                    /> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (Array.isArray(doc)) {
            return doc?.map((item: any, indx: number) => {
              return (
                <div key={index} className="document-item col-md-4">
                  <div className="d-flex flex-column gap-3">
                    <span
                      className="font-weight-bold"
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {key.replace("/_/g", " ") + " " + (indx + 1)}
                    </span>

                    <div>
                      {item?.status === "uploaded" ? (
                        <Link to={item?.url} target="_blank">
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
                            {item.status === "pending" ? (
                              <span
                                className="text-xsmall px-2"
                                style={{
                                  color: "#DF6F23",
                                }}
                              >
                                Document not uploaded
                              </span>
                            ) : (
                              <span className="bg-danger rounded text-white text-xsmall px-2">
                                Document rejected
                              </span>
                            )}
                          </div>

                          <form className="mt-4">
                            <input
                              hidden
                              ref={(el) => {
                                if (el && fileRef.current)
                                  fileRef.current[key] = el;
                              }}
                              name={key}
                              type="file"
                              accept="application/pdf, images/*"
                              onChange={(e) => handleChange(e, key)}
                              multiple={
                                key === "previous_salary_slip" ||
                                key === "previous_experience"
                                  ? true
                                  : false
                              }
                            />

                            <button
                              type="button"
                              style={{
                                width: "fit-content",
                              }}
                              // disabled={disabled}
                              className="file text-start py-0"
                              // style={{
                              //   cursor: disabled ? "auto" : "pointer",
                              // }}
                              onClick={() => {
                                if (fileRef.current[key]) {
                                  fileRef.current[key]?.click(); // Trigger the file input click
                                }
                              }}
                            >
                              <span className="text-xsmall">
                                <FaCloudUploadAlt /> Upload File
                              </span>
                            </button>

                            {/* <InputWithLabel
                            type="file"
                            label="File Upload"
                            register={register}
                            value={"default"}
                            name={key}
                            onChange={handleChange}
                          /> */}
                          </form>
                        </div>
                        // Fallback message if no URL
                      )}
                    </div>

                    {item && (
                      <div className="status-badge">
                        <span
                          className={`badge ${
                            item?.status === "uploaded"
                              ? "bg-success"
                              : item?.status === "rejected"
                              ? "bg-danger"
                              : "bg-warning"
                          }`}
                        >
                          {item?.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            });
          }

          // For other documents that are not arrays
          return (
            <div key={index} className="document-item col-md-4">
              <div className="d-flex flex-column gap-3">
                <span
                  className="font-weight-bold"
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {key.replace(/_/g, " ")}
                </span>

                <div>
                  {doc?.status === "uploaded" ? (
                    <Link to={doc?.url} target="_blank">
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
                        {!doc || doc?.status === "pending" ? (
                          <span
                            className="text-xsmall px-2"
                            style={{
                              color: "#DF6F23",
                            }}
                          >
                            Document not uploaded
                          </span>
                        ) : (
                          <span className="bg-danger rounded text-white text-xsmall px-2">
                            Document rejected
                          </span>
                        )}
                      </div>

                      <form className="mt-4">
                        <input
                          hidden
                          ref={(el) => {
                            if (el && fileRef.current)
                              fileRef.current[key] = el;
                          }}
                          name={key}
                          type="file"
                          accept="application/pdf, images/*"
                          onChange={(e) => handleChange(e, key)}
                          multiple={
                            key === "previous_salary_slip" ||
                            key === "previouse_experience"
                              ? true
                              : false
                          }
                        />

                        <button
                          type="button"
                          style={{
                            width: "fit-content",
                          }}
                          // disabled={disabled}
                          className="file text-start py-0"
                          // style={{
                          //   cursor: disabled ? "auto" : "pointer",
                          // }}
                          onClick={() => {
                            if (fileRef.current[key]) {
                              fileRef.current[key]?.click(); // Trigger the file input click
                            }
                          }}
                        >
                          <span className="text-xsmall">
                            <FaCloudUploadAlt /> Upload File
                          </span>
                        </button>

                        {/* <InputWithLabel
                          type="file"
                          label="File Upload"
                          register={register}
                          value={"default"}
                          name={key}
                          onChange={handleChange}
                        /> */}
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
                          : "bg-warning"
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

{
  /* <div key={index} className="document-item col-md-4">
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

        <div>
          {experience?.status === "rejected" && (
            <input type="file" />
          )}
        </div>
      </div>
    ))}
  </div>
</div>
</div> */
}
