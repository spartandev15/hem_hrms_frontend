import React from "react";
import "../assets/styles/vacancyInfo.css";

// This component will receive the job details as props or fetch the data from an API

const VacancyInfo = ({ jobData }: { jobData: any }) => {
  console.log(jobData);
  // Destructure the jobData object for easier access
  const {
    job_title,
    location,
    skills_required,
    salary_range,
    job_type,
    company_information,
    job_responsibilities,
    contact_email,
    experience,
    created_at,
    joining_time,
  } = jobData;

  // Split the skills_required into an array
  const skills = skills_required
    .split(",")
    .filter((skill: any) => skill.trim() !== "");

  // Split the job_responsibilities into an array (split by '\n')
  const responsibilities = job_responsibilities
    .split("\n")
    .filter((responsibility: any) => responsibility.trim() !== "");

  return (
    <div className="vacancy-detail">
      <h1 className="text-blue-primary text-xlarge">{job_title}</h1>

      <div className="job-header">
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Job Type:</strong> {job_type}
        </p>
        <p>
          <strong>Posted On:</strong>{" "}
          {new Date(created_at).toLocaleDateString("en-GB")}
        </p>
        <p>
          <strong>Salary:</strong> {salary_range}K
        </p>
        <p>
          <strong>Experience Level:</strong> {experience} years
        </p>
      </div>

      <section className="company-info">
        <h2 className="text-start">About {company_information}</h2>
        <p>
          {company_information} is a company known for its innovation in the
          tech space. We're passionate about delivering cutting-edge solutions
          for clients.
        </p>
      </section>

      <section className="job-description">
        <h2 className="text-start">Job Description</h2>
        <p>{job_responsibilities}</p>
      </section>

      <section className="key-responsibilities">
        <h2 className="text-start">Key Responsibilities</h2>
        <ul>
          {responsibilities.map((responsibility: any, index: number) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </section>

      <section className="skills-qualifications">
        <h2 className="text-start">Skills & Qualifications</h2>
        <ul>
          {skills.map((skill: any, index: number) => (
            <li key={index}>{skill.trim()}</li>
          ))}
        </ul>
      </section>

      <section className="apply-section">
        <p>
          If you're interested in this position, please apply via email at:{" "}
          <a href={`mailto:${contact_email}`}>{contact_email}</a>
        </p>
        <p>Join us in making a difference with technology!</p>
      </section>
    </div>
  );
};

export default VacancyInfo;

// Example usage: The job data can be fetched from an API or passed in as props.
