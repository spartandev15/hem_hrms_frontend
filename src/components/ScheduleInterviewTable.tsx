import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import "../assets/styles/ovetimeTable.css";
import { useAppDispatch } from "../hooks/reduxHook";
import {
  usePostOverTimeMutation,
  useUpdateOverTimeMutation,
} from "../redux/api/overTime";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";
import {
  overTimeFormSchema,
  scheduleFormSchema,
} from "../validations/formValidation";
import InputWithLabel from "./ui/InputWithLabel";
import { formatDate, formatDateType } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa";
import { useGetAllCategoryQuery } from "../redux/api/category";

const ScheduleInterviewTable = ({ data, isLoading }: any) => {
  const isStatusExist = data?.some((item: any) => item.status !== null);
  const [screenShotPreviewImage, setScreenShotPreviewImage] = useState("");
  const { data: allCategory, isLoading: isAllCategoryLoading } =
    useGetAllCategoryQuery();

  const [
    updateOverTime,
    {
      data: updateOverTimeData,
      isLoading: isUpdateOverTimeLoading,
      isSuccess: isUpdateOverTimeSuccess,
    },
  ] = useUpdateOverTimeMutation();

  const dispatch = useAppDispatch();

  const handleViewScreenshot = (screenshotImtUrl: string) => {
    setScreenShotPreviewImage(screenshotImtUrl);
  };

  const handleEdit = async (data: any) => {
    dispatch(setIsLoading(true));
    const formData = new FormData();
    const dateFormat = formatDate(data.overtime_date, "d-m-y").replace(
      /\//g,
      "-"
    );
    console.log(dateFormat);
    formData.append("overtime_date", dateFormat);
    formData.append("working_hours", data.working_hours);
    formData.append("salary_per_hour", data.salary_per_hour);
    formData.append("final_balance", data.final_balance);
    formData.append("project_name", data.project_name);
    formData.append("project_url", data.project_url);

    if (typeof data.screenshot === "string") {
      formData.append("screenshot", data.screenshot);
    } else {
      if (data.screenshot) {
        const file = data.screenshot[0];
        formData.append("screenshot", file);
      }
    }

    try {
      await updateOverTime(formData).unwrap();
    } catch (err) {
      const error = err as { data: { message: string } };
      if (error) {
        dispatch(setIsLoading(false));
        dispatch(setToast(error?.data?.message));
      }
    }
  };

  useEffect(() => {
    if (updateOverTimeData) {
      dispatch(setIsLoading(false));
      dispatch(setToast(updateOverTimeData.message));
    }
  }, [isUpdateOverTimeSuccess]);

  return (
    <div>
      <h2 className="text-start text-small text-blue-primary m-0">
        Schedules Interviews
      </h2>

      <div className="overflow-x-auto">
        <table className="overtime-table mt-2 w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Interviewer Name</th>
              <th>Interview Type</th>
              <th>Resume</th>
              <th>Actions</th>

              {/* <th>Project Name</th>
              <th>Project URL</th>
              <th>Screenshot</th>
              {isStatusExist && <th>Status</th>}
              <th>Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={10} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((record: any, index: number) => (
                <TableRow
                  key={index}
                  record={record}
                  categories={allCategory}
                  handleViewScreenshot={handleViewScreenshot}
                  handleEdit={handleEdit}
                  isStatusExist={isStatusExist}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {screenShotPreviewImage && (
        <div
          className="position-fixed top-0 end-0 z-3 d-flex flex-column justify-content-center align-items-center"
          style={{
            width: "100%",
            minHeight: "100%",
            background: "rgba(255, 255, 255, 0.589)",
          }}
        >
          <p
            className="position-absolute text-bold text-large"
            style={{
              cursor: "pointer",
              top: "4%",
              right: "2%",
            }}
            onClick={() => {
              setScreenShotPreviewImage("");
            }}
          >
            X
          </p>
          <div
            style={{
              width: "95%",
              height: "580px",
            }}
          >
            <img
              src={`${screenShotPreviewImage}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const TableRow = ({ record, handleEdit, categories, index }: any) => {
  const [isEdit, setIsEdit] = useState(false);

  const scheduleInterviewFormFields = [
    {
      label: "Candidate Name",
      name: "candidate_name",
      type: "text",
      value: record.candidate_name,
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
      options: categories?.categories?.map((category: any) => ({
        label: category.name,
        value: category.name,
      })),
      required: true,
      value: categories?.categories[0]?.name,
    },
    {
      label: "email",
      name: "email",
      type: "email",
      value: record?.email,
    },
    {
      label: "Mobile",
      name: "phone_number",
      type: "text",
      required: true,
      value: record?.phone_number,
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
      value: record.interviewer_name,
    },
    {
      label: "Resume",
      name: "resume_file",
      type: "file",
      accept: "application/pdf",
      value: "resume",
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      candidate_name: record.candidate_name,
      interview_date: record.interview_date,
      position: record.position,
      email: record.email,
      phone_number: record.phone_number,
      interview_type: record.interview_type,
      interviewer_name: record.interviewer_name,
      resume_file: record.resume_file,
    },
    resolver: zodResolver(scheduleFormSchema),
  });

  const handleEditForm = async (data: any) => {
    await handleEdit(data);
    setIsEdit(false);
  };

  const resume_file = useWatch({ control, name: "resume_file" });

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{record.interview_date}</td>
        <td>{record.interview_time}</td>
        <td>{record.candidate_name}</td>
        <td>{record.email}</td>
        <td>{record.phone_number}</td>
        <td>{record.position}</td>
        <td>{record.interviewer_name}</td>
        <td>{record.interview_type}</td>
        <td>
          <a href={record.resume_file} download={"resume.pdf"}>
            <FaRegFilePdf />
          </a>
        </td>

        {/* {record.status && <td>{record.status}</td>} */}
        <td>
          <div
            className="d-flex gap-2 justify-content-center align-items-center"
            style={{
              cursor: "pointer",
            }}
          >
            <div>
              <Link
                to={record.resume_file}
                className="text-black"
                target="_blank"
              >
                <IoEyeOutline size="18" />
              </Link>
            </div>
            <div>
              <TiEdit
                size="18"
                onClick={() => {
                  setIsEdit(true);
                }}
              />
            </div>
          </div>
        </td>
      </tr>

      {isEdit && (
        <div
          className="position-fixed flex justify-content-center align-items-center"
          style={{
            background: "rgba(247, 243, 243, 0.25)",
            top: "0",
            left: "0",
            width: "100%",
            height: "100vh",
            zIndex: "1000",
            overflow: "auto",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="container position-relative d-flex justify-content-center align-items-center h-100 ">
            <form
              onSubmit={handleSubmit(handleEditForm)}
              className="border p-3 rounded shadow-sm mt-2"
              style={{
                backgroundColor: "#FFFFFF",
                maxWidth: "800px",
              }}
            >
              <div className="row mt-4">
                {scheduleInterviewFormFields.map((item, index) => (
                  <div className="col-sm-6 my-2" key={`${item.label}-${index}`}>
                    <InputWithLabel
                      id={`${index}`}
                      label={item.label}
                      name={item.name}
                      register={register}
                      type={item.type}
                      value={item.value}
                      options={item.options}
                    />

                    {item.name === "resume_file" && resume_file && (
                      <>
                        <p>
                          {typeof resume_file === "string"
                            ? resume_file?.split("/").pop()
                            : resume_file[0]?.name}
                        </p>
                      </>
                    )}

                    {errors[item.name as keyof typeof errors] && (
                      <p className="text-danger">
                        {
                          errors[item.name as keyof typeof errors]
                            ?.message as string
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-2">
                <button className="btn py-2">Submit</button>
              </div>
            </form>

            <div
              className="position-absolute"
              style={{
                top: "4%",
                right: "3%",
                cursor: "pointer",
                fontSize: "15px",
                color: "#FFFFFF",
                width: "30px",
                height: "30px",
                background: "rgb(83, 81, 81)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setIsEdit(false);
              }}
            >
              <span>X</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleInterviewTable;
