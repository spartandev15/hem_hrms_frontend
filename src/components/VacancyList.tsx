import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/reduxHook"; // Assuming you have an endpoint to fetch vacancies
import { setToast } from "../redux/slices/toastSlice";
import {
  useDeleteVacancyMutation,
  useGetAllVacancyQuery,
  useUpdateVacancyMutation,
} from "../redux/api/interview";
import VacancyCard from "./cards/VacancyCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vacancyFormSchema } from "../validations/formValidation";
import { useGetAllCategoryQuery } from "../redux/api/category";
import InputWithLabel from "./ui/InputWithLabel";
import { setIsLoading } from "../redux/slices/loadingSlice";
import ConfirmDialog from "./ConfirmDialog";

const VacancyList = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState("");
  const [formData, setFormData] = useState();
  const [isConfrim, setIsConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { data: vacanciesData, isLoading } = useGetAllVacancyQuery();
  const [updateVacancy] = useUpdateVacancyMutation();
  const [deleteVacancy] = useDeleteVacancyMutation();

  const handleEdit = (item: any) => {
    setId(item.id);
    setIsEdit(true);
    setFormData({
      ...item,
    });
  };

  const handleFormSubmitEdit = async (data: any) => {
    dispatch(setIsLoading(true));
    try {
      const response = await updateVacancy({
        ...data,
        id,
      }).unwrap();
      setIsEdit(false);
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
  };

  const handleDelete = async (id: string) => {
    try {
      setIsConfirm(true);
      setId(id);
    } catch (err) {
      dispatch(setToast("something went wrong"));
    }
  };

  const handleClose = async (confirm: boolean) => {
    if (confirm) {
      setIsConfirm(false);
      try {
        dispatch(setIsLoading(true));
        const response = await deleteVacancy({
          id,
        });
        dispatch(setToast(response?.data?.message));
        dispatch(setIsLoading(false));
      } catch (err) {
        dispatch(setToast("Error deleting vacancy."));
        dispatch(setIsLoading(false));
      }
    }
    setIsConfirm(false);
  };

  return (
    <div>
      <h2 className="text-start text-blue-primary text-large">Vacancies</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="vacancy-list row g-4">
          {vacanciesData?.data?.length > 0 ? (
            vacanciesData?.data?.map((vacancy: any) => (
              <div className="col-sm-4">
                <VacancyCard
                  key={vacancy.id}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  {...vacancy}
                />
              </div>
            ))
          ) : (
            <p>No Vacancies Available </p>
          )}
        </div>
      )}

      {isEdit && (
        <div
          className="w-100 bg-white py-3"
          style={{
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: 999,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              maxWidth: "1020px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              className="text-end"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setIsEdit(false)}
            >
              X
            </div>
            <VacancyEditForm
              formData={formData}
              handleFormSubmit={handleFormSubmitEdit}
            />
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={isConfrim} onClose={handleClose} />
    </div>
  );
};

const VacancyEditForm = ({
  formData,
  handleFormSubmit,
}: {
  formData: any;
  handleFormSubmit: any;
}) => {
  const { data: allCategory, isLoading: isAllCategoryLoading } =
    useGetAllCategoryQuery();

  const vacancyFormFields = [
    {
      label: "Job Title",
      name: "job_title",
      type: "select",
      options: allCategory?.categories?.map((category: any) => ({
        label: category.name,
        value: category.name,
      })),
      isLoading: isAllCategoryLoading,
      required: true,
      value: "default",
    },
    {
      label: "Location",
      name: "location",
      type: "text",
      value: "default",
    },
    {
      label: "Salary in thousands",
      name: "salary_range",
      type: "select",
      options: [
        {
          label: "10k-20k",
          value: "10-20",
        },
        {
          label: "20k-30k",
          value: "20-30",
        },
        {
          label: "30k-40k",
          value: "30-40",
        },
        {
          label: "40k-50k",
          value: "40-50",
        },
        {
          label: "50k-60k",
          value: "50-60",
        },
      ],
      value: "default",
    },
    {
      label: "Job Type",
      name: "job_type",
      type: "select",
      options: [
        {
          label: "Office",
          value: "Office",
        },
        {
          label: "Hybrid",
          value: "Hybrid",
        },
        {
          label: "Work From Home",
          value: "Work from Home",
        },
      ],
      value: "default",
    },
    {
      placeholder: "Description",
      name: "skills_required",
      type: "textarea",
      rows: 10,
    },
    {
      placeholder: "Job Responsibilities",
      name: "job_responsibilities",
      type: "textarea",
      rows: 10,
    },
    {
      label: "Company Information",
      name: "company_information",
      type: "text",
      value: "default",
    },
    {
      label: "Contact Email",
      name: "contact_email",
      type: "text",
      value: "default",
    },
    {
      label: "Experience",
      name: "experience",
      type: "select",
      options: [
        {
          label: "0-1",
          value: "0-1",
        },
        {
          label: "1-2",
          value: "1-2",
        },
        {
          label: "2-3",
          value: "2-3",
        },
        {
          label: "3-5",
          value: "3-5",
        },
        {
          label: "5-7",
          value: "5-7",
        },
        {
          label: "7-10",
          value: "7-10",
        },
      ],
      value: "default",
    },
    {
      label: "Joining Time",
      name: "joining_time",
      type: "select",
      options: [
        {
          label: "Immediate",
          value: "Immediate",
        },
        {
          label: "15 days",
          value: "15 Days",
        },
        {
          label: "30 days",
          value: "30 Days",
        },
        {
          label: "40 days",
          value: "45 Days",
        },
      ],
      value: "default",
    },
    // {
    //   label: "Mobile",
    //   name: "phone_number",
    //   type: "text",
    //   value: "default",
    // },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: [
        {
          label: "Open",
          value: "open",
        },
        {
          label: "Close",
          value: "closed",
        },
      ],
      value: "default",
    },
  ];

  //   use use-form for hanlding form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...formData,
    },
    resolver: zodResolver(vacancyFormSchema),
  });

  const submitForm = (data: any) => {
    handleFormSubmit(data);
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="border p-3 rounded shadow-sm mt-2"
      >
        <div className="row mt-4">
          {vacancyFormFields.map((item, index) => (
            <div
              className={`${
                item.type === "textarea" ? "col-md-6" : "col-md-6"
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
                disabledPast={true}
                placeholder={item.placeholder}
                rows={item.rows}
                isLoading={item.isLoading}
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

export default VacancyList;
