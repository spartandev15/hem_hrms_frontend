import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { usePostInterviewMutation } from "../redux/api/interview";
import { useGetALlEmailsQuery } from "../redux/api/notice";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";
import { scheduleFormSchema } from "../validations/formValidation";
import InputWithLabel from "./ui/InputWithLabel";
import Select from "react-select";
import { useEffect, useState } from "react";

const ScheduleForm = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const [postInverview] = usePostInterviewMutation();
  const { items } = useAppSelector((state) => state.dropdown);
  const { emailItems } = useAppSelector((state) => state.allEmail);

  const options = (emailItems || []).map((email: any) => {
    return { label: email, value: email };
  });

  const customOptions = [
    {
      label: "Select All",
      value: "all",
    },
    ...options, // Add the actual options below the "Select All"
  ];

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
      options: items?.map((category) => ({
        label: category.name,
        value: category.name,
      })),
      required: true,
      value: items[0]?.name,
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
      label: "Interviewr Email",
      name: "interviewer_email",
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
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheduleFormSchema),
  });

  // handler for submit the form
  const handleFormSubmit = async (data: any) => {
    dispatch(setIsLoading(true));
    const interviewer_emails = data?.interviewer_email?.map(
      (email: any) => email.value
    );

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
    formData.append("interviewer_email", interviewer_emails.toString());

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
    reset();
  };

  const selectedOptionss =
    useWatch({ control, name: "interviewer_email" }) || [];

  useEffect(() => {
    if (selectedOptionss.some((option: any) => option.value === "all")) {
      // If "Select All" is selected, select all other options
      setValue(
        "interviewer_email",
        customOptions.filter((option) => option.value !== "all")
      );
    }
  }, [selectedOptionss]);

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
          {scheduleInterviewFormFields.map((item, index) =>
            item.name === "interviewer_email" ? (
              <div className="col-md-6 my-2">
                <Controller
                  name={item.name} // Field name
                  control={control} // Pass control to Controller
                  render={({ field }) => (
                    <Select
                      {...field} // Spread the field object to pass necessary props
                      options={customOptions}
                      placeholder="Interviewer Email"
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

                {/* {error && <p className="text-danger">{error}</p>} */}
                {errors[item.name] && (
                  <p className="text-danger">
                    {errors[item.name]?.message as string}
                  </p>
                )}
              </div>
            ) : (
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
                  accept={item.accept}
                  disabledPast={true}
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
            )
          )}
        </div>

        <div className="d-flex justify-content-center mt-2">
          <button className="btn py-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
