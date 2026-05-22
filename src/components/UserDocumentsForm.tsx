import React, { useEffect, useState } from "react";
import InputWithLabel from "./ui/InputWithLabel";
import { useForm, useWatch } from "react-hook-form";
import { useAppDispatch } from "../hooks/reduxHook";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { usePostDocumentsMutation } from "../redux/api/documents";
import { setToast } from "../redux/slices/toastSlice";

const UserDocumentsForm = ({
  uploadedDocuments,
}: {
  uploadedDocuments: Record<string, any>;
}) => {
  const dispatch = useAppDispatch();
  const [previousExperienceFields, setPreviousExperienceFields] = useState<any>(
    [
      {
        id: Date.now(),
        value: "",
      },
    ]
  );
  const [previousSalarySlipFields, setPreviousSalarySlipFields] = useState<any>(
    [
      {
        id: Date.now(),
        value: "",
      },
    ]
  );
  const [postDocuments] = usePostDocumentsMutation();
  const [filePreviews, setFilePreviews] = useState<any>({});
  const documentsFormFields = [
    {
      label: "10th Qualification Details",
      name: "tenth_dmc",
      type: "file", // For uploading 10th qualification document
      accept: "image/*,application/pdf",
      value: "default",
    },
    {
      label: "12th Qualification Details",
      name: "twelfth_dmc",
      type: "file", // For uploading 12th qualification document
      accept: "image/*,application/pdf",

      value: "default",
    },
    {
      label: "Highest Qualification Details",
      name: "college_degree",
      type: "file", // For uploading degree qualification document
      accept: "image/*,application/pdf",

      value: "default",
    },
    {
      label: "ID Details (Aadhaar)",
      name: "aadhaar_card",
      type: "file", // For uploading Aadhaar and PAN
      accept: "image/*,application/pdf",

      value: "default",
    },

    {
      label: "ID Details (PAN)",
      name: "pan_card",
      type: "file", // For uploading Aadhaar and PAN
      accept: "image/*,application/pdf",

      value: "default",
    },

    {
      label: "Bank Details (Passbook)",
      name: "bank_details",
      type: "file", // For uploading Aadhaar and PAN
      accept: "image/*,application/pdf",

      value: "default",
    },
    {
      label: "Photos",
      name: "user_photo",
      type: "file", // For uploading user photos
      multiple: true, // Allow multiple photo uploads if needed
      accept: "image/*,application/pdf",

      value: "default",
    },
    // {
    //   label: "Previous Experience",
    //   name: "previous_experience",
    //   type: "file", // For uploading previous experience or salary slip files
    //   accept: "image/*,application/pdf",

    //   multiple: true, // Allow multiple uploads if needed
    //   value: "default",
    // },
    // {
    //   label: "Salary Slips",
    //   name: "previous_salary_slip",
    //   type: "file", // For uploading previous experience or salary slip files
    //   accept: "image/*,application/pdf",

    //   multiple: true, // Allow multiple uploads if needed
    //   value: "default",
    // },
  ];

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(vacancyFormSchema),
  });

  // handler for submit the form
  const handleFormSubmit = async (data: any) => {
    dispatch(setIsLoading(true));
    const previousExperience = Object.keys(data).filter((key) =>
      key.startsWith("previous_experience")
    );

    const previousSalarySlip = Object.keys(data).filter((key) =>
      key.startsWith("previous_salary")
    );

    const formData = new FormData();
    formData.append("tenth_dmc", data["tenth_dmc"][0]);
    formData.append("twelfth_dmc", data["twelfth_dmc"][0]);
    formData.append("college_degree", data["college_degree"][0]);
    formData.append("aadhaar_card", data?.aadhaar_card[0]);
    formData.append("pan_card", data?.pan_card[0]);
    formData.append("bank_details", data?.bank_details[0]);
    formData.append("user_photo", data?.user_photo[0]);

    if (previousExperience) {
      previousExperience.forEach((item) => {
        formData.append("previous_experience[]", data[item][0]);
      });
      // for (const value of data?.previous_experience) {
      //   // previous_experience.push(value);
      //   formData.append("previous_experience[]", value);
      //   // previous_experience.push(value);
      // }
    }

    if (previousSalarySlip) {
      previousSalarySlip.forEach((item) => {
        formData.append("previous_salary_slip[]", data[item][0]);
      });
      // for (const value of data?.previous_salary_slip) {
      //   formData.append("previous_salary_slip[]", value);
      //   // previous_salary_slip.push(value);
      // }
    }

    for (const value of formData.values()) {
      console.log(value);
    }

    // formData.append("previous_experience", previous_experience);
    // formData.append("previous_salary_slip", previous_salary_slip);

    try {
      const response = await postDocuments(formData).unwrap();
      dispatch(setIsLoading(false));
      dispatch(setToast(response?.message));
    } catch (err) {
      dispatch(setIsLoading(false));
      const error = err as { data: { error: string } };
      if (error) {
        dispatch(setIsLoading(false));
        dispatch(setToast(error?.data?.error));
      }
      console.error("Error during post over time:", err);
    }
  };

  const isEmptyObject = (value: object) => {
    if (Object.entries(value).length === 0) {
      return true;
    }

    return false;
  };

  const fileValues = useWatch({ control });

  const addPreviousExperienceField = () => {
    setPreviousExperienceFields([
      ...previousExperienceFields,
      { id: Date.now() }, // Unique id for each field
    ]);
  };

  const removePreviousExperienceField = (id: number) => {
    setPreviousExperienceFields(
      previousExperienceFields.filter((field) => field.id !== id)
    );
  };

  const addPreviousSalarySlipField = () => {
    setPreviousSalarySlipFields([
      ...previousSalarySlipFields,
      { id: Date.now() }, // Unique id for each field
    ]);
  };

  const removePreviousSalarySlipField = (id: number) => {
    setPreviousSalarySlipFields(
      previousSalarySlipFields.filter((field) => field.id !== id)
    );
  };

  useEffect(() => {
    const newFilePreviews: any = {};
    // Create previews for the files
    documentsFormFields.forEach((field) => {
      const files = fileValues[field.name];
      if (files) {
        if (files.length > 1) {
          newFilePreviews[field.name] = Array.from(files).map((file) => {
            // const fileUrl = URL.createObjectURL(files); // Create URL for the file
            return { file }; // Store the URL and the file for cleanup later
          });
        } else {
          console.log("else");
          //   const fileUrl = URL.createObjectURL(files); // For single file (not FileList)
          newFilePreviews[field.name] = { file: files };
        }
      }
    });

    setFilePreviews(newFilePreviews);
  }, [fileValues]);

  return (
    <div>
      <h2 className="text-start text-blue-primary text-large">
        Upload Documents
      </h2>

      <div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="border p-3 rounded shadow-sm mt-2"
        >
          <div className="row mt-4">
            {documentsFormFields.map((item, index) => {
              // const isDocumentUploaded = uploadedDocumets[item?.name] || null;
              return (
                <div
                  className={`${
                    item.type === "textarea" ? "col-md-6" : "col-md-6"
                  } my-2`}
                  key={`${item.label}-${index}`}
                >
                  <InputWithLabel
                    id={`${index}`}
                    label={item.label}
                    name={item.name}
                    register={register}
                    type={item.type}
                    value={item.value}
                    //   options={item.options}
                    disabledPast={true}
                    multiple={item.multiple}
                    accept={item.accept}
                    // disabled={isDocumentUploaded}
                    //   rows={item.rows}
                    //   isLoading={item.isLoading}
                  />

                  {errors[item.name] && (
                    <p className="text-danger">
                      {errors[item.name]?.message as string}
                    </p>
                  )}

                  {filePreviews[item.name] && (
                    <div className="mb-2 ms-1">
                      {Array.isArray(filePreviews[item.name]) ? (
                        // If it's an array (multiple files), map through each file
                        filePreviews[item.name].map(
                          (filePreview: any, idx: number) => (
                            <div key={idx}>
                              <span
                                style={{
                                  color: "#199D4D",
                                }}
                              >
                                {filePreview.file.name}
                              </span>{" "}
                              {/* Display file name */}
                            </div>
                          )
                        )
                      ) : (
                        // If it's a single file (not an array), directly display the file name
                        <div>
                          <span
                            style={{
                              color: "#199D4D",
                            }}
                          >
                            {filePreviews[item.name]?.file[0]?.name}
                          </span>{" "}
                          {/* Display file name */}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Dynamic Previous Experience fields */}
            <div className="col-md-6 my-2">
              {/* <label>Previous Experience</label> */}
              <div className="d-flex flex-column gap-3">
                {previousExperienceFields.map((field, index) => (
                  <div key={field.id}>
                    <div className="position-relative">
                      <InputWithLabel
                        label={`Previous Experience`}
                        name={`previous_experience_${field.id}`}
                        register={register}
                        type="file"
                        accept="image/*,application/pdf"
                        value={"default"}
                      />

                      <div
                        className="d-flex gap-1 justify-content-center position-absolute"
                        style={{
                          top: "-12%",
                          right: "0",
                        }}
                      >
                        {index !== 0 && (
                          <button
                            className="d-flex justify-content-center align-items-center mb-1"
                            style={{
                              width: "22px",
                              height: "22px",
                              background: "#F4F4F4",
                              borderRadius: "100%",
                              display: "inline-block",
                              cursor: "pointer",
                              fontWeight: "500",
                            }}
                            disabled={
                              previousExperienceFields.length > index + 1
                            }
                            onClick={() =>
                              removePreviousExperienceField(field?.id)
                            }
                          >
                            -
                          </button>
                        )}

                        <button
                          className="d-flex justify-content-center align-items-center mb-1"
                          style={{
                            width: "22px",
                            height: "22px",
                            background: "#F4F4F4",
                            borderRadius: "100%",
                            display: "inline-block",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                          disabled={previousExperienceFields.length > index + 1}
                          onClick={addPreviousExperienceField}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Previous Salary Slip fields */}
            <div className="col-md-6">
              <div className="d-flex flex-column gap-3">
                {previousSalarySlipFields.map((field, index) => (
                  <div key={field.id}>
                    <div className="position-relative">
                      <InputWithLabel
                        label={`Previous Salary`}
                        name={`previous_salary_${field.id}`}
                        register={register}
                        type="file"
                        accept="image/*,application/pdf"
                        value={"default"}
                      />

                      <div
                        className="d-flex gap-1 justify-content-center position-absolute"
                        style={{
                          top: "-12%",
                          right: "0",
                        }}
                      >
                        {index !== 0 && (
                          <button
                            type="button"
                            className="d-flex justify-content-center align-items-center mb-1"
                            style={{
                              width: "22px",
                              height: "22px",
                              background: "#F4F4F4",
                              borderRadius: "100%",
                              display: "inline-block",
                              cursor: "pointer",
                              fontWeight: "500",
                            }}
                            disabled={
                              previousSalarySlipFields.length > index + 1
                            }
                            onClick={() =>
                              removePreviousSalarySlipField(field?.id)
                            }
                          >
                            -
                          </button>
                        )}

                        <button
                          type="button"
                          className="d-flex justify-content-center align-items-center mb-1"
                          style={{
                            width: "22px",
                            height: "22px",
                            background: "#F4F4F4",
                            borderRadius: "100%",
                            display: "inline-block",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                          disabled={previousSalarySlipFields.length > index + 1}
                          onClick={addPreviousSalarySlipField}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-2">
            <button
              className="btn py-2"
              disabled={isEmptyObject(fileValues)}
              style={{
                backgroundColor: "#134D75",
                color: "#fff",
                opacity: isEmptyObject(fileValues) ? "0.4" : "1",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDocumentsForm;
