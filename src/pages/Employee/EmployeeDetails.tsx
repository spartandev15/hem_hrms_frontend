import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import "../../assets/styles/profile.css";
import TabContainer, { Tabs } from "../../components/Tabs";
import GeneralTabContent from "../../components/GeneralTabContent";
import { useGetEmployeeDetailsByIdQuery } from "../../redux/api/employee";
import { useParams } from "react-router-dom";

export const EmployeeDetails = () => {
  const params = useParams();
  const { data: userDetails, isLoading: userDetailsIsLoading } =
    useGetEmployeeDetailsByIdQuery(params.id);

  const TabsData = [
    {
      label: "general",
      content: <GeneralTabContent data={userDetails?.EmployeeDetails} />,
    },
    {
      label: "job",
      content: <GeneralTabContent />,
    },
    {
      label: "qualification",
      content: <GeneralTabContent />,
    },
    {
      label: "salary",
      content: <GeneralTabContent />,
    },
  ];

  return (
    <div className="container">
      {userDetailsIsLoading ? (
        <p className="mt-2">Loading...</p>
      ) : userDetails?.result ? (
        <div className="row py-3">
          <div className="col-lg-3 profile-wrapper">
            <ProfileCard {...userDetails?.EmployeeDetails} />
          </div>

          <div className="col-lg-9 col-md-9 col-sm-12 pb-4 overflow-x-auto">
            <TabContainer defaultValue={0}>
              {TabsData.map((item, index) => (
                <Tabs key={`${item.label}-${index}`} label={item.label}>
                  {item.content}
                </Tabs>
              ))}
            </TabContainer>
          </div>
        </div>
      ) : (
        <p className="mt-3">User Not Found!</p>
      )}
    </div>
  );
};
