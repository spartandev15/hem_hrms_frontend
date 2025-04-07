import { useState } from "react";
import "../../assets/styles/profile.css";
const user = "/images/profile.png";

import { useLocation } from "react-router-dom";
import ProfileCard from "../../components/cards/ProfileCard";
import GeneralTabContent from "../../components/GeneralTabContent";
import SpinnerLoader from "../../components/SpinnerLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/profile";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";

const Profile = () => {
  const {
    data: userData,
    isLoading,
    isSuccess: userDataIsSuccess,
  } = useGetProfileQuery();

  const dispatch = useAppDispatch();

  const [updateProfile] = useUpdateProfileMutation();
  const { status } = useAppSelector((state) => state.authUser);

  // const oldData = JSON.parse(localStorage.getItem("user")!);
  // const [data, setData] = useState({
  //   fullname: oldData?.name || "",
  //   email: oldData?.email || "",
  //   employee_id: oldData?.emp_id || "",
  //   date_of_joining: oldData?.joining_date || "",
  //   tax_number: oldData?.tax_number || "",
  //   date_of_birth: oldData?.dob || "",
  //   phone_number: oldData?.phone_number || "",
  //   position: oldData?.job_title || "",
  //   address: oldData?.address || "",
  //   profile_photo: oldData?.profile_photo || "",
  // });

  const handleProfileChange = async (profile: File) => {
    try {
      dispatch(setIsLoading(true));
      const formData = new FormData();
      formData.append("profile_photo", profile);
      const response = await updateProfile(formData);
      dispatch(setToast(response?.data?.message));
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="profile-wrapper container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <section>
            <div>
              <div className="row py-3">
                <div className="col-12  text-start">
                  <div className="heading-text-msg">
                    <h5 className="m-0">Profile</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 pd-4 position-sticky top-0">
                  <div
                    className="position-sticky"
                    style={{
                      top: "0.5%",
                    }}
                  >
                    {
                      <ProfileCard
                        data={userData?.user?.user_details!}
                        onProfileChange={handleProfileChange}
                      />
                    }
                  </div>
                </div>

                <div className="col-lg-9 col-md-9 col-sm-12 pb-4">
                  <GeneralTabContent
                    role={status}
                    isEdit={
                      status === "HR" || status === "owner" ? true : false
                    }
                    data={{
                      ...userData?.user,
                    }}
                  />
                </div>

                {/* <div className="col-lg-9 col-md-9 col-sm-12 pb-4">
                  <TabContainer defaultValue={0}>
                    {TabsData.map((item, index) => (
                      <Tabs key={`${item.label}-${index}`} label={item.label}>
                        {item.content}
                      </Tabs>
                    ))}
                  </TabContainer>
                </div> */}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Profile;
