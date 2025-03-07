import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import "../../assets/styles/profile.css";
import TabContainer, { Tabs } from "../../components/Tabs";
import GeneralTabContent from "../../components/GeneralTabContent";
import {
  useGetEmployeeDetailsByIdQuery,
  useUpdateEmployeeMutation,
} from "../../redux/api/employee";
import { useParams } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";

export const EmployeeDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data: userDetails, isLoading: userDetailsIsLoading } =
    useGetEmployeeDetailsByIdQuery(params.id);
  const { status } = useAppSelector((state) => state.authUser);

  const [updateEmployee] = useUpdateEmployeeMutation();

  const handleProfileChange = async (profile: File, id: string) => {
    dispatch(setIsLoading(true));
    try {
      const formData = new FormData();
      formData.append("profile_photo", profile);
      formData.append("id", id);
      const response = await updateEmployee(formData);
      dispatch(setToast(response?.data?.message));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  // const TabsData = [
  //   {
  //     label: "general",
  //     content: <GeneralTabContent data={userDetails?.EmployeeDetails} />,
  //   },
  //   {
  //     label: "job",
  //     content: <GeneralTabContent />,
  //   },
  //   {
  //     label: "qualification",
  //     content: <GeneralTabContent />,
  //   },
  //   {
  //     label: "salary",
  //     content: <GeneralTabContent />,
  //   },
  // ];

  return (
    <div className="container">
      {userDetailsIsLoading ? (
        <div className="d-flex justify-content-center mt-2">
          <SpinnerLoader />
        </div>
      ) : userDetails?.result ? (
        <div className="row py-3 g-2">
          <div className="col-lg-3 profile-wrapper">
            <div
              className="position-sticky"
              style={{
                top: "0.5%",
              }}
            >
              <ProfileCard
                data={userDetails?.user?.user_details}
                onProfileChange={handleProfileChange}
              />
            </div>
          </div>

          <div className="col-lg-9 col-md-9 col-sm-12 pb-4 overflow-x-auto">
            <GeneralTabContent
              role={status}
              isEdit={status === "HR" || status === "owner" ? true : false}
              data={{
                ...userDetails?.user,
              }}
            />
            {/* <TabContainer defaultValue={0}>
              {TabsData.map((item, index) => (
                <Tabs key={`${item.label}-${index}`} label={item.label}>
                  {item.content}
                </Tabs>
              ))}
            </TabContainer> */}
          </div>
        </div>
      ) : (
        <p className="mt-3">User Not Found!</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
