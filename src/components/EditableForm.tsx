import React, { useState } from "react";
import { EditableFormProps } from "../types";
import { useForm } from "react-hook-form";
import InputWithLabel from "./ui/InputWithLabel";

export const EditableForm = ({
  fields,
  onSubmit,
  defaultValues,
}: EditableFormProps) => {
  const { handleSubmit, register } = useForm({
    defaultValues,
  });

  const formSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="row g-2">
          {fields.map((item, index) => (
            <div className={`form-outline ${"col-6 w-50"}  `} key={index}>
              {item.type === "textarea" ? (
                <InputWithLabel
                  // id="password"
                  label={item.label}
                  type="textarea"
                  name={item.name}
                  value={item.value}
                  register={register}
                />
              ) : (
                <InputWithLabel
                  type={item.type!}
                  name={item.name}
                  label={item.label}
                  register={register}
                  value={item.value}
                  disabled={item?.disabled}
                />
              )}
            </div>
          ))}
        </div>

        <div className="d-flex gap-2">
          <button className="edit-btn" type="submit">
            Save
          </button>
          {/* <button className="opacity-75 edit-btn">cancel</button> */}
        </div>
      </form>
    </div>
  );
};
