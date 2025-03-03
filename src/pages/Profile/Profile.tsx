import React, { useState } from "react";
import "../../assets/styles/profile.css";
const user = "/images/profile.png";

import ProfileCard from "../../components/cards/ProfileCard";
import GeneralTabContent from "../../components/GeneralTabContent";
import TabContainer, { Tabs } from "../../components/Tabs";
import { useGetProfileQuery } from "../../redux/api/profile";
import SpinnerLoader from "../../components/SpinnerLoader";
import { EditableForm } from "../../components/EditableForm";

const Profile = () => {
  const {
    data: userData,
    isLoading,
    isSuccess: userDataIsSuccess,
  } = useGetProfileQuery();

  // console.log(userData);
  // const [profileImageFile, setprofileImageFile] = useState();
  // const [activeTab, setActiveTab] = useState("");
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const oldData = JSON.parse(localStorage.getItem("user")!);

  const [data, setData] = useState({
    fullname: oldData?.name || "",
    email: oldData?.email || "",
    employee_id: oldData?.emp_id || "",
    date_of_joining: oldData?.joining_date || "",
    tax_number: oldData?.tax_number || "",
    date_of_birth: oldData?.dob || "",
    phone_number: oldData?.phone_number || "",
    position: oldData?.job_title || "",
    address: oldData?.address || "",
    profile_photo: oldData?.profile_photo || "",
  });

  // const onSave = async (e) => {
  //   e.preventDefault();
  //   const postData = {
  //     name: data.fullname,
  //     email: data.email,
  //     emp_id: data.employee_id,
  //     joining_date: data.date_of_joining,
  //     tax_number: data.tax_number,
  //     dob: data.date_of_birth,
  //     phone: data.phone_number,
  //     job_title: data.position,
  //     profile_photo: data.profile_photo,
  //     address: data.address,
  //   };
  // };

  // const handleInput = (e) => {
  //   const name = e.target.name;
  //   const Value = e.target.value;
  //   setData({ ...data, [name]: Value });
  // };

  // const profileUpload = async (e) => {
  //   // dispatch(isLoader(true))
  // };

  // const TabsData = [
  //   {
  //     label: "general",
  //     content: <GeneralTabContent data={userData?.user} />,
  //   },
  //   // {
  //   //   label: "job",
  //   //   content: <GeneralTabContent />,
  //   // },
  //   // {
  //   //   label: "qualification",
  //   //   content: <GeneralTabContent />,
  //   // },
  //   // {
  //   //   label: "salary",
  //   //   content: <GeneralTabContent />,
  //   // },
  // ];

  // show or hide the loading based on data fully load or not

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
                <div className="col-lg-3 col-md-3 col-sm-12 pd-4">
                  {<ProfileCard data={userData?.user?.user_details!} />}
                </div>

                <div className="col-lg-9 col-md-9 col-sm-12 pb-4">
                  <GeneralTabContent
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
