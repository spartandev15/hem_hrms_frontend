import React, { useState } from "react";
// import "../assets/styles/profile.css";
import { IProfileCommonSection } from "../types";
import { EditableForm } from "./EditableForm";

export const ProfileCommonSection = ({
  title,
  fields,
}: IProfileCommonSection) => {
  const [showEditableForm, setShowEditableForm] = useState(false);

  const toggleEditableForm = () => {
    setShowEditableForm(!showEditableForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile-common-section mt-3 py-4">
      <div className="text-blue-primary font-bold d-flex justify-content-between alig-align-items-center">
        <h2 className="text-small">{title}</h2>
        <button
          className="bg-blue-primary text-xsmall edit-btn"
          onClick={toggleEditableForm}
        >
          Edit
        </button>
      </div>

      <div className="mt-1">
        {!showEditableForm ? (
          <div className="row g-3">
            {fields?.map((item, index) => (
              <div className=" col-md-6" key={`${item.label}-${index}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="font-weight-light text-xsmall m-0 text-gray-primary">
                    {item?.label}
                  </p>
                  <p className="text-xsmall font-bold m-0">{item?.value}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {fields && <EditableForm fields={fields} onSubmit={handleSubmit} />}
          </div>
        )}
      </div>
    </div>
  );
};
