import React, { useState } from "react";
// import "../assets/styles/profile.css";
import { IProfileCommonSection } from "../types";
import { EditableForm } from "./EditableForm";

export const ProfileCommonSection = ({
  fields,
  data,
}: IProfileCommonSection) => {
  const handleSubmit = (formData: any) => {};

  return (
    <div className="profile-common-section py-4 d-flex flex-column gap-5">
      {fields?.map((item) => (
        <div>
          <div className="text-blue-primary font-bold d-flex justify-content-between align-items-center ">
            <h2
              className="text-large text-blue-primary"
              style={{
                fontSize: "1.6rem",
              }}
            >
              {item?.title}
            </h2>
          </div>

          <div className="">
            {
              <div className="row g-3">
                {item?.items?.map((item, index) => (
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

              // <div>
              //   {fields && (
              //     <EditableForm
              //       defaultValues={data}
              //       fields={item.items}
              //       onSubmit={handleSubmit}
              //     />
              //   )}
              // </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
};
