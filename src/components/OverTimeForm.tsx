import React, { useEffect, useState } from "react";
import InputWithLabel from "./ui/InputWithLabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { overTimeFormSchema } from "../validations/formValidation";
import { usePostOverTimeMutation } from "../redux/api/overTime";
import { usePostEmployeeMutation } from "../redux/api/employee";
import { formatDate } from "../utils/formatDate";
import { useAppDispatch } from "../hooks/reduxHook";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";

const overTimeFormFields = [
  {
    label: "Overtime Date",
    name: "overtime_date",
    type: "date",
    required: true,
    value: "",
  },
  {
    label: "Working Hours",
    name: "working_hours",
    type: "number",
    required: true,
    value: "",
  },
  {
    label: "Per Hour Rate",
    name: "salary_per_hour",
    type: "number",
    required: true,
    value: "",
  },
  {
    label: "Final Balance",
    name: "final_balance",
    type: "number",
    required: true,
    value: "",
  },
  {
    label: "Project Name",
    name: "project_name",
    type: "text",
    required: true,
    value: "",
  },
  {
    label: "Project URL",
    name: "project_url",
    type: "url",
    required: true,
    value: "",
  },
  {
    label: "Screenshot",
    name: "screenshot",
    type: "file",
    required: true,
    value: "ss", // Initial value can be null for file input
  },
];

const OverTimeForm = () => {
  const [screenShotPreview, setScreenShotPreview] = useState<File | string>("");
  const dispatch = useAppDispatch();
  const [
    postOverTime,
    { data: postOverTimeDataDetails, isSuccess: isPostOverTimeSuccess },
  ] = usePostOverTimeMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(overTimeFormSchema),
  });

  const handleFormSubmit = async (data: any) => {
    const formData = new FormData();
    dispatch(setIsLoading(true));
    const dateFormat = formatDate(data.overtime_date).replace(/\//g, "-");
    formData.append("overtime_date", dateFormat);
    formData.append("working_hours", data.working_hours);
    formData.append("salary_per_hour", data.salary_per_hour);
    formData.append("final_balance", data.final_balance);
    formData.append("project_name", data.project_name);
    formData.append("project_url", data.project_url);

    if (data.screenshot.length !== 0) {
      const file = data.screenshot[0];
      formData.append("screenshot", file);
    }

    try {
      const response = await postOverTime(formData).unwrap();
      console.log("Post over time response:", response);
    } catch (err) {
      console.error("Error during post over time:", err);
    }

    // postOverTime(formData);
    // reset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setScreenShotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log(postOverTimeDataDetails);
  // console.log(isPostOverTimeSuccess);
  useEffect(() => {
    if (postOverTimeDataDetails) {
      dispatch(setIsLoading(false));
      dispatch(setToast(postOverTimeDataDetails.message));
    }
  }, [isPostOverTimeSuccess]);

  return (
    <div>
      <h2 className="text-start text-small text-blue-primary m-0">
        OverTime Form
      </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="border p-3 rounded shadow-sm mt-2"
      >
        <div className="row mt-4">
          {overTimeFormFields.map((item, index) => (
            <div className="col-sm-6 my-2" key={`${item.label}-${index}`}>
              <InputWithLabel
                id={`${index}`}
                label={item.label}
                name={item.name}
                register={register}
                type={item.type}
                value={item.value}
                // onChange={handleChange}
              />
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
                    src={`${screenShotPreview}`}
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

export default OverTimeForm;
