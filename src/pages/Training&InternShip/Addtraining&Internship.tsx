import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { usePostTrainingMutation } from "../../redux/api/training";

const basicInfoFields = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    required: true,
  },
  {
    label: "Date Of Birth",
    name: "date_of_birth",
    type: "date",
    required: true,
  },
  {
    label: "User ID",
    name: "user_id",
    type: "text",
    required: true,
  },
  {
    label: "Joining Date",
    name: "joining_date",
    type: "date",
    required: true,
  },
  {
    label: "Expected End Date",
    name: "expected_end_date",
    type: "date",
    required: true,
  },
  {
    label: "Department",
    name: "department",
    type: "text",
    required: true,
  },
  {
    label: "Mentor",
    name: "mentor",
    type: "text",
    required: true,
  },
];

const trainingFields = [
  {
    label: "Work Location",
    name: "work_location",
    type: "text",
  },
  {
    label: "Training Program Name",
    name: "training_program_name",
    type: "text",
  },
  {
    label: "Training Type",
    name: "training_type",
    type: "select",
    options: [
      {
        label: "On Job",
        value: "On-Job",
      },
      {
        label: "Classroom",
        value: "Classroom",
      },
      {
        label: "Online",
        value: "Online",
      },
    ],
  },
  {
    label: "Duration In Months",
    name: "duration_in_months",
    type: "number",
  },
  {
    label: "Skills To Learn",
    name: "skills_to_learn",
    type: "textarea",
  },
  {
    label: "Has Prior Experience",
    name: "has_prior_experience",
    type: "select",
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Pending",
        value: "pending",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ],
  },
];

const internshipFields = [
  {
    label: "Work Mode",
    name: "work_mode",
    type: "select",
    options: [
      {
        label: "Remote",
        value: "Remote",
      },
      {
        label: "On Site",
        value: "On-Site",
      },
      {
        label: "Hybrid",
        value: "Hybrid",
      },
    ],
  },
  {
    label: "University Name",
    name: "university_name",
    type: "text",
  },
  {
    label: "College Name",
    name: "college_name",
    type: "text",
  },
  {
    label: "Course Name",
    name: "course_name",
    type: "text",
  },
  {
    label: "Branch",
    name: "branch",
    type: "text",
  },
  {
    label: "Current Year",
    name: "current_year",
    type: "number",
  },
  {
    label: "Internship Type",
    name: "internship_type",
    type: "text",
  },
  {
    label: "Stipend Amount",
    name: "stipend_amount",
    type: "number",
  },
];

const tabs = [
  {
    name: "Type Select",
    value: 1,
  },
  {
    name: "Basic Info",
    value: 2,
  },
  {
    name: "Program Details",
    value: 3,
  },
  {
    name: "Submit",
    value: 4,
  },
];

const AddTrainingInternship = () => {
  const [selectedType, setSelectedType] =
    useState("Training");

  const [activeTab, setActiveTab] = useState(1);

  const [postTraining, { isLoading }] =
    usePostTrainingMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "active",
      has_prior_experience: "no",
    },
  });

  // =========================
  // NEXT TAB
  // =========================

  const nextTab = () => {
    if (activeTab < 4) {
      setActiveTab(activeTab + 1);
    }
  };

  // =========================
  // PREVIOUS TAB
  // =========================

  const prevTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  // =========================
  // SUBMIT
  // =========================

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        program_category: selectedType,
      };

      console.log(payload);

      const response = await postTraining(
        payload
      ).unwrap();

      console.log(response);

      // alert("Program Added Successfully");

      reset();

      setSelectedType("Training");

      setActiveTab(1);
    } catch (error: any) {
      console.log(error);

      alert(
        error?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm rounded-4 p-4">
        {/* HEADER */}

        <div className="mb-4">
          <h2
            className="fw-bold mb-1"
            style={{
              color: "#134d75",
            }}
          >
            Add Training / Internship
          </h2>

          <p className="text-muted mb-0">
            Create a new training or internship
            program
          </p>
        </div>

        {/* TABS */}

        <div className="row g-0 border rounded-3 overflow-hidden mb-4">
          {tabs?.map((value, index) => {
            const isActive =
              activeTab === value?.value;

            return (
              <div
                key={index}
                className={`col-md-3 text-center py-3 fw-semibold ${
                  isActive
                    ? "text-white"
                    : "bg-light text-dark border-start"
                }`}
                style={{
                  backgroundColor: isActive
                    ? "#134d75"
                    : "",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setActiveTab(value?.value)
                }
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span
                    className={`rounded-circle d-flex align-items-center justify-content-center ${
                      isActive
                        ? "bg-white text-primary"
                        : "bg-secondary text-white"
                    }`}
                    style={{
                      width: "28px",
                      height: "28px",
                      fontSize: "14px",
                    }}
                  >
                    {value?.value}
                  </span>

                  {value?.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TAB 1 */}

          {activeTab === 1 && (
            <div className="row g-4">
              <div className="col-md-6">
                <div
                  onClick={() =>
                    setSelectedType("Training")
                  }
                  className={`p-5 rounded-4 border text-center ${
                    selectedType === "Training"
                      ? "border-primary bg-primary-subtle shadow"
                      : "bg-white"
                  }`}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="mb-3">
                    <i
                      className="bi bi-mortarboard-fill text-primary"
                      style={{
                        fontSize: "45px",
                      }}
                    ></i>
                  </div>

                  <h4 className="fw-bold">
                    Training
                  </h4>

                  <p className="text-muted mb-0">
                    Create employee training
                    programs.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  onClick={() =>
                    setSelectedType("Internship")
                  }
                  className={`p-5 rounded-4 border text-center ${
                    selectedType === "Internship"
                      ? "border-primary bg-primary-subtle shadow"
                      : "bg-white"
                  }`}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="mb-3">
                    <i
                      className="bi bi-briefcase-fill text-primary"
                      style={{
                        fontSize: "45px",
                      }}
                    ></i>
                  </div>

                  <h4 className="fw-bold">
                    Internship
                  </h4>

                  <p className="text-muted mb-0">
                    Create internship
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 */}

          {activeTab === 2 && (
            <div className="border p-4 rounded-4 shadow-sm">
              <div className="row">
                {basicInfoFields?.map(
                  (item, index) => (
                    <div
                      className="col-md-6 mb-3"
                      key={index}
                    >
                      <InputWithLabel
                        id={`${index}`}
                        label={item?.label}
                        name={item?.name}
                        register={register}
                        type={item?.type}
                        required={
                          item?.required
                        }
                        // errors={errors}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* TAB 3 */}

          {activeTab === 3 && (
            <div className="border p-4 rounded-4 shadow-sm">
              <div className="row">
                {(selectedType === "Training"
                  ? trainingFields
                  : internshipFields
                )?.map((item, index) => (
                  <div
                    className="col-md-6 mb-3"
                    key={index}
                  >
                    <InputWithLabel
                      id={`${index}`}
                      label={item?.label}
                      name={item?.name}
                      register={register}
                      type={item?.type}
                      // required={
                      //   item?.required
                      // }
                      // value={item?.value}
                      options={item?.options}
                      // errors={errors}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4 */}

        {/* TAB 4 */}

{activeTab === 4 && (
  <div className="border rounded-4 p-4 shadow-sm">
    <h4 className="fw-bold mb-4">Review & Submit</h4>

    <div className="row">
      {/* Program Type */}
      <div className="col-md-6 mb-3">
        <div className="border rounded-3 p-3 bg-light">
          <h6 className="fw-bold">Program Type</h6>
          <p className="mb-0">{selectedType}</p>
        </div>
      </div>

      {/* Basic Information */}
      {basicInfoFields.map((field:any, index) => (
        <div className="col-md-6 mb-3" key={index}>
          <div className="border rounded-3 p-3 bg-light h-100">
            <h6 className="fw-bold">{field.label}</h6>
            <p className="mb-0 text-break">
              {watch(field.name) || "-"}
            </p>
          </div>
        </div>
      ))}

      {/* Program Details */}
      {(selectedType === "Training"
        ? trainingFields
        : internshipFields
      ).map((field:any, index) => (
        <div className="col-md-6 mb-3" key={`detail-${index}`}>
          <div className="border rounded-3 p-3 bg-light h-100">
            <h6 className="fw-bold">{field.label}</h6>
            <p className="mb-0 text-break">
              {watch(field.name) || "-"}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-end mt-3 row">
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-sm text-white col-md-3"
        style={{
          backgroundColor: "#134d75",
          minWidth: "140px",
        }}
      >
        {isLoading ? "Submitting..." : "Submit Program"}
      </button>
    </div>
  </div>
)}

          {/* BUTTONS */}

        <div className="d-flex justify-content-center gap-2 mt-4">
  <button
    type="button"
    className="btn btn-outline-secondary btn-sm"
    style={{ width: "120px" }}
    onClick={prevTab}
    disabled={activeTab === 1}
  >
    Previous
  </button>

  <button
    type="button"
    className="btn btn-sm text-white"
    style={{
      backgroundColor: "#134d75",
      width: "120px",
    }}
    onClick={nextTab}
    disabled={activeTab === 4}
  >
    Next
  </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default AddTrainingInternship;