import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/reduxHook";
import { useGetAllCategoryQuery } from "../redux/api/category";
import {
  useGetALlEmailsQuery,
  usePostNoticeMutation,
} from "../redux/api/notice";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";
import {
  noticeFormSchema,
  scheduleFormSchema,
} from "../validations/formValidation";
import InputWithLabel from "./ui/InputWithLabel";
import { usePostInterviewMutation } from "../redux/api/interview";

const ScheduleForm = () => {
  const dispatch = useAppDispatch();
  const { data: allCategory, isLoading: isAllCategoryLoading } =
    useGetAllCategoryQuery();
  const { data: allEmail, isLoading: isAllEmailsLoading } =
    useGetALlEmailsQuery();
  const [
    postInverview,
    { data: postInterViewData, isLoading: isPostInteviewLoading },
  ] = usePostInterviewMutation();

  // all forms fields
  const scheduleInterviewFormFields = [
    {
      label: "Candidate Name",
      name: "candidate_name",
      type: "text",
      value: "",
    },
    {
      label: "Date-Time",
      name: "interview_date",
      type: "datetime-local",
      required: true,
      value: "time",
    },
    {
      label: "Position",
      name: "position",
      type: "select",
      options: allCategory?.categories?.map((category: any) => ({
        label: category.name,
        value: category.name,
      })),
      required: true,
      value: allCategory?.categories[0]?.name,
    },
    {
      label: "email",
      name: "email",
      type: "email",
      value: "",
    },
    {
      label: "Mobile",
      name: "phone_number",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Interview Type",
      name: "interview_type",
      type: "select",
      options: [
        {
          label: "Phone",
          value: "Phone",
        },
        {
          label: "In-person",
          value: "In-person",
        },
        {
          label: "Virtual",
          value: "Virtual",
        },
      ],
      value: "default",
    },
    {
      label: "Interviewr Name",
      name: "interviewer_name",
      type: "text",
      required: true,
      value: "",
    },
    {
      label: "Resume",
      name: "resume_file",
      type: "file",
      accept: "application/pdf",
      value: "resume",
    },
  ];

  //   use use-form for hanlding form
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheduleFormSchema),
  });

  // handler for submit the form
  const handleFormSubmit = async (data: any) => {
    dispatch(setIsLoading(true));
    const date = new Date(data.interview_date)
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    const time = new Date(data.interview_date).toLocaleTimeString("en-Gb", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formData = new FormData();
    formData.append("candidate_name", data.candidate_name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    formData.append("position", data.position);
    formData.append("interview_type", data.interview_type);
    formData.append("interviewer_name", data.interviewer_name);
    formData.append("interview_date", date);
    formData.append("interview_time", time);

    if (data.resume_file.length !== 0) {
      const file = data.resume_file[0];
      formData.append("resume_file", file);
    }

    try {
      const response = await postInverview(formData).unwrap();
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
    // reset();
  };

  return (
    <div>
      <h2 className="text-start text-small text-blue-primary m-0">
        Schedule Interview Form
      </h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="border p-3 rounded shadow-sm mt-2"
      >
        <div className="row mt-4">
          {scheduleInterviewFormFields.map((item, index) => (
            <div
              className={`${
                item.type === "textarea" ? "col-12" : "col-md-6"
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
                options={item.options}
                // placeholder={item.placeholder}
                accept={item.accept}
              />

              {errors[item.name] && (
                <p className="text-danger">
                  {errors[item.name]?.message as string}
                </p>
              )}

              {/* {item.type === "file" && screenShotPreview && (
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
              )} */}
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

export default ScheduleForm;
