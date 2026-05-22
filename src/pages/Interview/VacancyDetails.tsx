import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetVacancyByIdQuery } from "../../redux/api/interview";
import VacancyInfo from "../../components/VacancyInfo";

const VacancyDetails = () => {
  const params = useParams();
  const [vacancyDetails, setVacanyDetails] = useState();
  const [getVacancyById] = useLazyGetVacancyByIdQuery();

  const getVacancyByIdFnx = async (id: string) => {
    try {
      const response = await getVacancyById({ id });
      setVacanyDetails(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getVacancyByIdFnx(params.id as string);
  }, []);
  return (
    <div className="container py-4">
      {vacancyDetails ? (
        <VacancyInfo jobData={vacancyDetails} />
      ) : (
        <p>Please Wait..</p>
      )}
    </div>
  );
};

export default VacancyDetails;
