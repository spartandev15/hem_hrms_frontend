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
import { overTimeFormSchema } from "../validations/formValidation";
import InputWithLabel from "./ui/InputWithLabel";
import { formatDate, formatDateType } from "../utils/formatDate";

const OvetimeTable = ({ data, isLoading }: any) => {
  const [screenShotPreviewImage, setScreenShotPreviewImage] = useState("");
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
        OverTime Table
      </h2>

      <div className="overflow-x-auto">
        <table className="overtime-table mt-2">
          <thead>
            <tr>
              <th>Overtime Date</th>
              <th>Working Hours</th>
              <th>Per Hour Rate</th>
              <th>Final Balance</th>
              <th>Project Name</th>
              <th>Project URL</th>
              <th>Screenshot</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((record: any, index: number) => (
                <TableRow
                  key={index}
                  record={record}
                  handleViewScreenshot={handleViewScreenshot}
                  handleEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
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

const TableRow = ({ record, handleViewScreenshot, handleEdit }: any) => {
  const [isEdit, setIsEdit] = useState(false);

  const overTimeFormFields = [
    {
      label: "Overtime Date",
      name: "overtime_date",
      type: "date",
      required: true,
      value: record.overtime,
    },
    {
      label: "Working Hours",
      name: "working_hours",
      type: "number",
      required: true,
      value: record.working_hours,
    },
    {
      label: "Per Hour Rate",
      name: "salary_per_hour",
      type: "number",
      required: true,
      value: record.salary_per_hour,
    },
    {
      label: "Final Balance",
      name: "final_balance",
      type: "number",
      required: true,
      value: record.final_balance,
    },
    {
      label: "Project Name",
      name: "project_name",
      type: "text",
      required: true,
      value: record.project_name,
    },
    {
      label: "Project URL",
      name: "project_url",
      type: "url",
      required: true,
      value: record.project_url,
    },
    {
      label: "Screenshot",
      name: "screenshot",
      type: "file",
      required: true,
      value: record.screenshot, // Initial value can be null for file input
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      overtime_date: record.overtime_date,
      working_hours: record.working_hours,
      salary_per_hour: record.salary_per_hour,
      final_balance: record.final_balance,
      project_name: record.project_name,
      project_url: record.project_url,
      screenshot: record.screenshot,
    },
    resolver: zodResolver(overTimeFormSchema),
  });

  const screenShotImageName = useWatch({ control, name: "screenshot" });

  return (
    <>
      <tr>
        <td>{record.overtime_date}</td>
        <td>{record.working_hours}</td>
        <td>{record.salary_per_hour}</td>
        <td>{record.final_balance}</td>
        <td>{record.project_name}</td>
        <td>{record.project_url}</td>
        <td>
          {record.screenshot ? (
            <img
              src={`${record.screenshot}`}
              alt="Screenshot"
              className="screenshot-thumbnail"
              onClick={() => handleViewScreenshot(record.screenshot)}
            />
          ) : (
            "No Screenshot"
          )}
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
              <IoEyeOutline
                size="20"
                onClick={() => handleViewScreenshot(record.screenshot)}
              />
            </div>
            <div>
              <TiEdit
                size="20"
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
              onSubmit={handleSubmit(handleEdit)}
              className="border p-3 rounded shadow-sm mt-2"
              style={{
                backgroundColor: "#FFFFFF",
                maxWidth: "800px",
              }}
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
                    />
                    {item.name === "screenshot" && screenShotImageName && (
                      <p>
                        {typeof screenShotImageName === "string"
                          ? screenShotImageName?.split("/").pop()
                          : screenShotImageName[0]?.name}
                      </p>
                    )}{" "}
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

export default OvetimeTable;
