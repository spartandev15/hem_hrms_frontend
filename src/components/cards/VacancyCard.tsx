import React, { useState } from "react";
import "../../assets/styles/vacancyCard.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import useOutsideClick from "../../hooks/useOutsideClick";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

interface VacancyCardProps {
  job_title: string;
  location: string;
  salary_range: string;
  job_type: string;
  status: string;
  id: string;
  joining_time?: string;
  experience?: string;
  phone_number?: string;
  contact_email?: string;
  company_information?: string;
  skills_required?: string;
  job_responsibilities?: string;
  onEdit: (data: any) => void;
  onDelete: (id: string) => void;
}

const VacancyCard: React.FC<VacancyCardProps> = ({
  job_title,
  location,
  salary_range,
  job_type,
  status,
  joining_time,
  experience,
  contact_email,
  company_information,
  skills_required,
  job_responsibilities,
  id,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="vacancy-card p-3 position-relative">
      <div className="vacancy-card-header d-flex justify-content-between mt-3">
        <h2 className="m-0 text-blue-primary">{job_title}</h2>
        <div className="vacancy-status">
          <span
            className={`badge ${
              status === "open" ? "bg-success" : "bg-danger"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="vacancy-card-body mt-2">
        <p className="mb-1">
          <strong>Location:</strong> {location}
        </p>
        <p className="mb-1">
          <strong>Salary Range:</strong> {salary_range}k
        </p>
        <p className="mb-1">
          <strong>Job Type:</strong> {job_type}
        </p>
      </div>

      <div
        ref={divRef}
        className="position-absolute"
        style={{
          top: "3%",
          right: "2%",
          cursor: "pointer",
        }}
      >
        <BsThreeDotsVertical onClick={() => setIsOpen(!isOpen)} />

        <div className="position-relative">
          {isOpen && (
            <div
              className="position-absolute rounded p-2"
              style={{
                right: "2%",
                top: "20%",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                className="d-flex align-items-center gap-1"
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={() =>
                  onEdit({
                    id,
                    job_title,
                    location,
                    salary_range,
                    job_type,
                    status,
                    joining_time,
                    experience,
                    contact_email,
                    company_information,
                    skills_required,
                    job_responsibilities,
                  })
                }
              >
                <RiEdit2Line /> <span>Edit</span>
              </div>

              <div
                className="d-flex align-items-center gap-1 mt-1"
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={() => onDelete(id)}
              >
                <RiDeleteBin6Line /> <span>Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <Link
          to={`/dashboard/vacancy-details/${id}`}
          style={{
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default VacancyCard;
