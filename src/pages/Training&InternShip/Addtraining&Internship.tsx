import React, { useState } from "react";
import InputWithLabel from "../../components/ui/InputWithLabel";

const addEmployeeFormFields = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    required: true,
    value: "",
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "text",
    required: true,
    value: "",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
    value: "",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    required: true,
    value: "",
  },
  {
    label: "Confirm Password",
    name: "confirm_password",
    type: "password",
    required: true,
    value: "",
  },
  {
    label: "Employee Id",
    name: "employee_id",
    type: "text",
    required: true,
    value: "",
  },
];

const programDetailsFields = [
  {
    label: "Program Title",
    name: "program_title",
    type: "text",
    value: "",
  },
  {
    label: "Duration",
    name: "duration",
    type: "text",
    value: "",
  },
  {
    label: "Start Date",
    name: "start_date",
    type: "date",
    value: "",
  },
  {
    label: "End Date",
    name: "end_date",
    type: "date",
    value: "",
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
  const [selectedType, setSelectedType] = useState("Training");
  const [activeTab, setActiveTab] = useState(1);

  

  const register:any = () => {};

  const nextTab = () => {
    if (activeTab < 4) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm rounded-4 p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1" style={{ color: "#134d75" }}>
            Add Training / Internship
          </h2>

          <p className="text-muted mb-0">
            Create a new training or internship program
          </p>
        </div>

        {/* Tabs */}
        <div className="row g-0 border rounded-3 overflow-hidden mb-4">
          {tabs?.map((value, index) => {
            const isActive = activeTab === value?.value;

            return (
              <div
                key={index}
                className={`col-md-3 text-center py-3 fw-semibold transition-all ${
                  isActive
                    ? "text-white"
                    : "bg-light text-dark border-start"
                }`}
                style={{
                  backgroundColor: isActive ? "#134d75" : "",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onClick={() => setActiveTab(value?.value)}
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

        {/* TAB 1 */}
        {activeTab === 1 && (
          <div className="row g-4">
            <div className="col-md-6">
              <div
                onClick={() => setSelectedType("Training")}
                className={`p-5 rounded-4 border text-center ${
                  selectedType === "Training"
                    ? "border-primary bg-primary-subtle shadow"
                    : "bg-white"
                }`}
                style={{
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <div className="mb-3">
                  <i
                    className="bi bi-mortarboard-fill text-primary"
                    style={{ fontSize: "45px" }}
                  ></i>
                </div>

                <h4 className="fw-bold">Training</h4>

                <p className="text-muted mb-0">
                  Create employee training programs.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div
                onClick={() => setSelectedType("Internship")}
                className={`p-5 rounded-4 border text-center ${
                  selectedType === "Internship"
                    ? "border-primary bg-primary-subtle shadow"
                    : "bg-white"
                }`}
                style={{
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <div className="mb-3">
                  <i
                    className="bi bi-briefcase-fill text-primary"
                    style={{ fontSize: "45px" }}
                  ></i>
                </div>

                <h4 className="fw-bold">Internship</h4>

                <p className="text-muted mb-0">
                  Create internship opportunities.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 2 && (
          <form className="border p-4 rounded-4 shadow-sm">
            <div className="row">
              {addEmployeeFormFields?.map((item, index) => {
                return (
                  <div className="col-md-6 mb-3" key={index}>
                    <InputWithLabel
                      id={`${index}`}
                      label={item?.label}
                      name={item?.name}
                      register={register}
                      type={item?.type}
                      value={item?.value}
                    />
                  </div>
                );
              })}
            </div>
          </form>
        )}

        {/* TAB 3 */}
        {activeTab === 3 && (
          <form className="border p-4 rounded-4 shadow-sm">
            <div className="row">
              {programDetailsFields?.map((item, index) => {
                return (
                  <div className="col-md-6 mb-3" key={index}>
                    <InputWithLabel
                      id={`${index}`}
                      label={item?.label}
                      name={item?.name}
                      register={register}
                      type={item?.type}
                      value={item?.value}
                    />
                  </div>
                );
              })}
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">
                Description
              </label>

              <textarea
                className="form-control"
                rows={5}
                placeholder="Enter program description"
              ></textarea>
            </div>
          </form>
        )}

        {/* TAB 4 */}
        {activeTab === 4 && (
          <div className="border rounded-4 p-4 shadow-sm">
            <h4 className="fw-bold mb-4">Review & Submit</h4>

            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="border rounded-3 p-3 bg-light">
                  <h6 className="fw-bold">Selected Type</h6>
                  <p className="mb-0">{selectedType}</p>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="border rounded-3 p-3 bg-light">
                  <h6 className="fw-bold">Status</h6>
                  <p className="mb-0">Ready to Submit</p>
                </div>
              </div>
            </div>

            <button
              className="btn text-white px-4 py-2 mt-3"
              style={{
                backgroundColor: "#134d75",
              }}
            >
              Submit Program
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary px-4"
            onClick={prevTab}
            disabled={activeTab === 1}
          >
            Previous
          </button>

          <button
            className="btn text-white px-4"
            style={{
              backgroundColor: "#134d75",
            }}
            onClick={nextTab}
            disabled={activeTab === 4}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTrainingInternship;