import React, { useState } from "react";
import { EditableFormProps } from "../types";
import { useForm } from "react-hook-form";

export const EditableForm = ({
  fields,
  onSubmit,
  defaultValues,
}: EditableFormProps) => {
  const [formFields, setFormFields] = useState(fields);

  const { handleSubmit, register } = useForm({
    defaultValues: {},
  });

  const handleChange = (index: number, value: string) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = value;
    setFormFields(updatedFields);
  };

  const updateFields = fields.map((item) =>
    item.label === "Address"
      ? { ...item, isFullWidth: true }
      : { ...item, isFullWidth: false }
  );

  return (
    <div className="mt-3">
      <form action="" onSubmit={onSubmit}>
        <div className="row g-2">
          {updateFields.map((item, index) => (
            <div
              className={`form-outline ${
                item.isFullWidth ? "col-12 w-full" : "col-6 w-50"
              }  `}
              key={index}
            >
              {item.type === "textarea" ? (
                <textarea
                  // id="password"
                  value={item.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  // required
                />
              ) : (
                <input
                  type={item.type}
                  // id="password"
                  value={item.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  // required
                />
              )}

              <label
                className="form-label"
                htmlFor="typeText"
                style={{ background: "#fff" }}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>

        <div className="d-flex gap-2">
          <button className="edit-btn" type="submit">
            Save
          </button>
          <button className="opacity-75 edit-btn">cancel</button>
        </div>
      </form>
    </div>
  );
};
