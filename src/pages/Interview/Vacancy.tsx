import React from "react";
import VacancyForm from "../../components/VacancyForm";
import VacancyList from "../../components/VacancyList";

const Vacancy = () => {
  return (
    <div className="container py-4">
      <div>
        <VacancyForm />
      </div>

      <div className="mt-4">
        <VacancyList />
      </div>
    </div>
  );
};

export default Vacancy;
