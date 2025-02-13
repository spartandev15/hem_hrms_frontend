import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useAppDispatch } from "../hooks/reduxHook";
import { usePostOverTimeMutation } from "../redux/api/overTime";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";
import { formatDate } from "../utils/formatDate";
import {
  noticeFormSchema,
  overTimeFormSchema,
} from "../validations/formValidation";
import InputWithLabel from "./ui/InputWithLabel";
import Select from "react-select";
import {
  useGetALlEmailsQuery,
  usePostNoticeMutation,
} from "../redux/api/notice";

const NoticeFormFields = [
  {
    label: "title",
    name: "title",
    type: "text",
    required: true,
    value: "",
  },
  {
    label: "email",
    name: "email",
    type: "email",
    value: "",
  },
  {
    // label: "description",
    placeholder: "description",
    name: "description",
    type: "textarea",
    required: true,
  },

  {
    // label: "Screenshot",
    name: "screenshot",
    type: "file",
    required: true,
    value: "ss", // Initial value can be null for file input
  },
];

const NoticeForm = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const { data: allEmail, isLoading: isAllEmailsLoading } =
    useGetALlEmailsQuery();

  const [postNotice, { data: postNoticeData, isLoading: isPostNoticeLoading }] =
    usePostNoticeMutation();

  const options = (allEmail?.data || []).map((email: any) => {
    return { label: email, value: email };
  });

  const customOptions = [
    {
      label: "Select All",
      value: "all",
    },
    ...options, // Add the actual options below the "Select All"
  ];

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noticeFormSchema),
  });

  const handleFormSubmit = async (data: any) => {
    dispatch(setIsLoading(true));
    const formData = new FormData();
    const emails = data?.email?.map((email: any) => email.value);
    formData.append("title", data.title);
    formData.append("email", emails.toString());
    formData.append("description", data.description);

    if (data.screenshot.length !== 0) {
      const file = data.screenshot[0];
      formData.append("attachment", file);
    }

    try {
      const response = await postNotice(formData).unwrap();
      console.log(response);
      dispatch(setIsLoading(false));
      dispatch(setToast(response?.message));
    } catch (err) {
      const error = err as { data: { error: string } };
      if (error) {
        dispatch(setIsLoading(false));
        dispatch(setToast(error?.data?.error));
      }
      console.error("Error during post over time:", err);
    }
    reset();
    setValue("email", []);
  };

  const workingHours = useWatch({ control, name: "working_hours" }); // Default value of 0
  const salaryPerHour = useWatch({ control, name: "salary_per_hour" }); // Default value of 0

  // Automatically calculate the total balance
  const totalBalance = workingHours * salaryPerHour;
  setValue("final_balance", String(totalBalance));

  const screenShotPreview = useWatch({ control, name: "screenshot" });
  const selectedOptionss = useWatch({ control, name: "email" }) || [];

  useEffect(() => {
    if (selectedOptionss.some((option: any) => option.value === "all")) {
      // If "Select All" is selected, select all other options
      setValue(
        "email",
        customOptions.filter((option) => option.value !== "all")
      );
    }
  }, [selectedOptionss]);

  return (
    <div>
      <h2 className="text-start text-small text-blue-primary m-0">
        Notice Form
      </h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="border p-3 rounded shadow-sm mt-2"
      >
        <div className="row mt-4">
          {NoticeFormFields.map((item, index) => (
            <div
              className={`${
                item.type === "textarea" ? "col-12" : "col-sm-6"
              } my-2`}
              key={`${item.label}-${index}`}
            >
              {item.type === "email" ? (
                <div>
                  <div>
                    <Controller
                      name={item.name} // Field name
                      control={control} // Pass control to Controller
                      render={({ field }) => (
                        <Select
                          {...field} // Spread the field object to pass necessary props
                          options={customOptions}
                          placeholder="Emails"
                          isMulti
                          styles={{
                            control: (provided: any) => ({
                              ...provided,
                              border: "2px solid #DEE2E6", // Remove the border
                              boxShadow: "none", // Remove box shadow (if any)
                              // Optionally, set other styles, like padding or background
                            }),
                          }}
                        />
                      )}
                    />

                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>
              ) : (
                <InputWithLabel
                  id={`${index}`}
                  label={item.label}
                  name={item.name}
                  register={register}
                  type={item.type}
                  value={item.value}
                  placeholder={item.placeholder}
                />
              )}

              {errors[item.name] && (
                <p className="text-danger">
                  {errors[item.name]?.message as string}
                </p>
              )}

              {item.type === "file" && screenShotPreview && (
                <div
                  className="image-preview-container mt-2"
                  style={{
                    maxWidth: "340px",
                  }}
                >
                  <img
                    src={`${URL.createObjectURL(screenShotPreview[0])}`}
                    alt="Screenshot Preview"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center mt-2">
          <button className="btn py-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
