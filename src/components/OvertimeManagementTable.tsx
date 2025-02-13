import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { TiEdit } from "react-icons/ti";
import { useAppDispatch } from "../hooks/reduxHook";
import { useUpdateLeavesStatusMutation } from "../redux/api/leave";
import { useUpdateOverTimeStatusMutation } from "../redux/api/overTime";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";
import { overTimeFormSchema } from "../validations/formValidation";
import InputWithLabel from "./ui/InputWithLabel";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

const OverTimeManagementTable: React.FC<{
  allOverTimeData: any;
  isLoading: boolean;
}> = ({ allOverTimeData, isLoading }) => {
  const [screenShotPreviewImage, setScreenShotPreviewImage] = useState("");
  const handleViewScreenshot = (screenshotImtUrl: string) => {
    setScreenShotPreviewImage(screenshotImtUrl);
  };

  return (
    <div className="container">
      <h2 className="text-start text-small text-blue-primary m-0">OverTimes</h2>
      <div className="overflow-x-auto mt-3">
        <table
          className="overtime-table shadow-sm rounded-2 w-100"
          style={{
            whiteSpace: "nowrap", // Prevent wrapping of table cells
          }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Overtime Date</th>
              <th>Working Hours</th>
              <th>Per Hour Rate</th>
              <th>Final Balance</th>
              <th>Project Name</th>
              <th>Project URL</th>
              <th>Screenshot</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9}>Loading...</td>
              </tr>
            ) : allOverTimeData.length > 0 ? (
              allOverTimeData.map((item: any, itemIndex: number) => (
                <TableRow
                  {...item}
                  itemIndex={itemIndex}
                  handleViewScreenshot={handleViewScreenshot}
                />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>

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
    </div>
  );
};

export default OverTimeManagementTable;

const TableRow = (record: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();

  const [updateOverTimeStatus, { data: updateOverTimeStatusData }] =
    useUpdateOverTimeStatusMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  const [
    updateLeavesStatus,
    { data: updateLeaveStatusDetailsData, isSuccess: updateLeavesIsSuccess },
  ] = useUpdateLeavesStatusMutation();

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setIsLoading(true));
    const status = e.target.value;
    const formData = new FormData();
    const dateFormat = formatDate(record.overtime_date, "d-m-y").replace(
      /\//g,
      "-"
    );

    formData.append("overtime_date", dateFormat);
    formData.append("working_hours", record.working_hours);
    formData.append("salary_per_hour", record.salary_per_hour);
    formData.append("final_balance", record.final_balance);
    formData.append("project_name", record.project_name);
    formData.append("project_url", record.project_url);
    formData.append("status", status);
    formData.append("user_id", record.user_id);

    // if (typeof data.screenshot === "string") {
    //   formData.append("screenshot", data.screenshot);
    // } else {
    //   if (data.screenshot) {
    //     const file = data.screenshot[0];
    //     formData.append("screenshot", file);
    //   }
    // }

    try {
      const response = await updateOverTimeStatus(formData);
      dispatch(setIsLoading(false));
      dispatch(setToast(response?.data?.message));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };

  const overTimeFormFields = [
    {
      label: "Overtime Date",
      name: "overtime_date",
      type: "date",
      required: true,
      isDisabled: true,
      value: record.overtime_date,
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
      isDisabled: true,
      value: record.screenshot || "default", // Initial value can be null for file input
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      required: true,
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
      ],
      value: record.status,
    },
  ];

  const handleEditForm = async (data: any) => {
    dispatch(setIsLoading(true));
    const formData = new FormData();
    const dateFormat = formatDate(data.overtime_date, "d-m-y").replace(
      /\//g,
      "-"
    );

    formData.append("overtime_date", dateFormat);
    formData.append("working_hours", data.working_hours);
    formData.append("salary_per_hour", data.salary_per_hour);
    formData.append("final_balance", data.final_balance);
    formData.append("project_name", data.project_name);
    formData.append("project_url", data.project_url);
    formData.append("status", data.status);
    formData.append("user_id", record.user_id);

    // if (typeof data.screenshot === "string") {
    //   formData.append("screenshot", data.screenshot);
    // } else {
    //   if (data.screenshot) {
    //     const file = data.screenshot[0];
    //     formData.append("screenshot", file);
    //   }
    // }

    try {
      const response = await updateOverTimeStatus(formData);
      dispatch(setIsLoading(false));
      dispatch(setToast(response?.data?.message));
      setIsEdit(false);
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

  const screenShotImageName = useWatch({ control, name: "screenshot" });

  const workingHours = useWatch({ control, name: "working_hours" }); // Default value of 0
  const salaryPerHour = useWatch({ control, name: "salary_per_hour" }); // Default value of 0

  // Automatically calculate the total balance
  const totalBalance = workingHours * salaryPerHour;
  setValue("final_balance", String(totalBalance));

  useEffect(() => {
    if (updateLeaveStatusDetailsData) {
      dispatch(setIsLoading(false));
      dispatch(setToast(updateLeaveStatusDetailsData.message));
    }
  }, [updateLeavesIsSuccess]);

  return (
    <tr key={record.id || record.itemIndex}>
      <td>{record.itemIndex + 1}</td>
      <td>{record.overtime_date}</td>
      <td>{record.working_hours}</td>
      <td>{record.salary_per_hour}</td>
      <td>{record.final_balance}</td>
      <td>{record.project_name}</td>
      <td>
        <Link to={record.project_url} className="text-black" target="_blank">
          {record.project_url}
        </Link>
      </td>
      <td>
        {record.screenshot ? (
          <img
            src={`${record.screenshot}`}
            alt="Screenshot"
            className="screenshot-thumbnail"
            onClick={() => record.handleViewScreenshot(record.screenshot)}
          />
        ) : (
          "No Screenshot"
        )}
      </td>
      {record.status ? (
        <td>
          <div className="d-flex">
            <div
              className="text-capitalize d-flex justify-content-center"
              style={{
                width: "fit-content",
                margin: "auto",
                backgroundColor:
                  record.status === "approved"
                    ? "#73A617" // green for approved
                    : record.status === "pending"
                    ? "#DD982F" // amber for pending
                    : "#DF3523",

                borderRadius: "2px",
                color:
                  record.status === "approved"
                    ? "#fff" // green for approved
                    : record.status === "pending"
                    ? "#fff" // amber for pending
                    : "#fff",
              }}
            >
              <select
                className="text-xsmall"
                value={record.status}
                onChange={handleStatusChange}
                style={{
                  width: "fit-content",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  padding: "3px 0px",
                }}
              >
                <option value="approved" className="text-black">
                  Approved{" "}
                </option>

                <option disabled hidden value="pending" className="text-black">
                  Pending
                </option>
              </select>
            </div>

            <div
              style={{
                marginTop: "-1px",
                marginLeft: "-2px",
                cursor: "pointer",
              }}
              onClick={() => setIsEdit(true)}
            >
              <TiEdit size={22} />
            </div>
          </div>
        </td>
      ) : (
        <td
          className=""
          style={{
            width: "fit-content",
          }}
        >
          No update request
        </td>
      )}

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
                {overTimeFormFields.map((item, index) => (
                  <div className="col-sm-6 my-2" key={`${item.label}-${index}`}>
                    <InputWithLabel
                      id={`${index}`}
                      label={item.label}
                      name={item.name}
                      register={register}
                      type={item.type}
                      value={item.value}
                      options={item.options}
                      disabled={item.isDisabled}
                    />
                    {item.name === "screenshot" && screenShotImageName && (
                      <>
                        {typeof screenShotImageName === "string" ? (
                          <img
                            src={screenShotImageName}
                            style={{
                              width: "120px",
                              height: "80px",
                              objectFit: "contain",
                            }}
                            className="mt-2"
                          />
                        ) : (
                          <img
                            style={{
                              width: "120px",
                              height: "80px",
                              objectFit: "contain",
                            }}
                            src={URL.createObjectURL(screenShotImageName[0])}
                          />
                        )}
                        <p>
                          {typeof screenShotImageName === "string"
                            ? screenShotImageName?.split("/").pop()
                            : screenShotImageName[0]?.name}
                        </p>
                      </>
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
                {/* <div className="col-sm-6 my-2">
                  <select
                    className="text-small"
                    defaultValue={selectedValue}
                    onChange={(e) => {
                      setSelectedValue(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      padding: "13px 8px",
                    }}
                  >
                    <option value="approved" className="text-black">
                      Approved{" "}
                    </option>

                    <option value="pending" className="text-black">
                      Pending
                    </option>

                    <option
                      disabled
                      hidden
                      value="pending"
                      className="text-black"
                    >
                      Pending
                    </option>
                  </select>
                </div> */}
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
    </tr>
  );
};
