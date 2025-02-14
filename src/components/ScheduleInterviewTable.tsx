import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { TiDelete, TiEdit } from "react-icons/ti";
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
import {
  useDeleteInterviewMutation,
  useUpdateInterviewMutation,
} from "../redux/api/interview";
import ConfirmDialog from "./ConfirmDialog";
import { request } from "http";

const ScheduleInterviewTable = ({ data, isLoading }: any) => {
  const dispatch = useAppDispatch();
  const { data: allCategory, isLoading: isAllCategoryLoading } =
    useGetAllCategoryQuery();

  const [
    updateInterview,
    {
      data: updateInterviewData,
      isLoading: isUpdateInterviewLoading,
      isSuccess: isUpdateInterviewSuccess,
    },
  ] = useUpdateInterviewMutation();

  const [deleteInterview, { data: deleteInterviewData }] =
    useDeleteInterviewMutation();

  const handleEdit = async (data: any, id: string) => {
    dispatch(setIsLoading(true));
    console.log(id);
    const formData = new FormData();
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

    formData.append("candidate_name", data.candidate_name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    formData.append("position", data.position);
    formData.append("interview_type", data.interview_type);
    formData.append("interviewer_name", data.interviewer_name);
    formData.append("interview_date", date);
    formData.append("interview_time", time);
    formData.append("id", id);

    if (typeof data.resume_file === "string") {
      formData.append("resume_file", data.resume_file);
    } else {
      if (data.resume_file) {
        const file = data.resume_file[0];
        formData.append("resume_file", file);
      }
    }

    try {
      const response = await updateInterview(formData).unwrap();
      dispatch(setIsLoading(false));
      dispatch(setToast(response?.message));
    } catch (err) {
      const error = err as { data: { message: string } };
      if (error) {
        dispatch(setIsLoading(false));
        dispatch(setToast(error?.data?.message));
      }
    }
  };

  const handleDelete = async (id: string) => {
    dispatch(setIsLoading(true));
    try {
      const resposne = await deleteInterview({
        id,
      }).unwrap();
      dispatch(setIsLoading(false));
      dispatch(setToast(resposne?.message));
    } catch (error) {
      const err = error as { data: { message: string } };
      dispatch(setIsLoading(false));
      dispatch(setToast(err?.data?.message));
      console.error("Error during delete over time:", error);
    }
  };

  // useEffect(() => {
  //   if (updateOverTimeData) {
  //     dispatch(setIsLoading(false));
  //     dispatch(setToast(updateOverTimeData.message));
  //   }
  // }, [isUpdateOverTimeSuccess]);

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
                <td colSpan={11} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((record: any, index: number) => (
                <TableRow
                  key={index}
                  record={record}
                  categories={allCategory}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = ({
  record,
  handleEdit,
  handleDelete,
  categories,
  index,
}: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [confirm, setIsConfirm] = useState(false);
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
      value: record.position,
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

  const combinedDateTime = `${
    record.interview_date
  }T${record.interview_time.slice(0, 5)}`;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      candidate_name: record.candidate_name,
      interview_date: combinedDateTime,
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
    await handleEdit(data, record.id);
    setIsEdit(false);
  };

  const handleClose = (status: boolean) => {
    if (status) {
      handleDelete(record.id);
      setIsConfirm(false);
    }
    setIsConfirm(false);
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

            <div>
              <TiDelete size={"18"} onClick={() => setIsConfirm(true)} />
            </div>

            <ConfirmDialog isOpen={confirm} onClose={handleClose} />
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
