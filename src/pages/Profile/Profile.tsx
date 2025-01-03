import React, { useState } from "react";
import "../../assets/styles/profile.css";
const user = "/images/profile.png";

import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/cards/ProfileCard";
import GeneralTabContent from "../../components/GeneralTabContent";
import TabContainer, { Tabs } from "../../components/Tabs";
import { useAppDispatch } from "../../hooks/ReduxHook";
import { useGetProfileQuery } from "../../redux/api/profile";
import { setIsLoading } from "../../redux/slices/loadingSlice";

const Profile = () => {
  const { data: userData, isLoading } = useGetProfileQuery();
  const [profileImageFile, setprofileImageFile] = useState();
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const onSave = async (e) => {
    e.preventDefault();
    const postData = {
      name: data.fullname,
      email: data.email,
      emp_id: data.employee_id,
      joining_date: data.date_of_joining,
      tax_number: data.tax_number,
      dob: data.date_of_birth,
      phone: data.phone_number,
      job_title: data.position,
      profile_photo: data.profile_photo,
      address: data.address,
    };
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const Value = e.target.value;
    setData({ ...data, [name]: Value });
  };

  const profileUpload = async (e) => {
    // dispatch(isLoader(true))
  };

  const TabsData = [
    {
      label: "general",
      content: <GeneralTabContent />,
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

  // show or hide the loading based on data fully load or not
  if (isLoading) dispatch(setIsLoading(true));
  else dispatch(setIsLoading(false));

  return (
    <div className="profile-wrapper">
      <section>
        <div className="container">
          <div className="row py-3">
            <div className="col-12  text-start">
              <div className="heading-text-msg">
                <h5 className="m-0">View Test</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12 pd-4">
              <ProfileCard />
            </div>

            {/* <div className="col-lg-3 col-md-3 col-sm-12 pd-4 ">
              <div className="viewem border">
                <div className="employebox">
                  <div className="d-flex justify-content-center">
                    <div className="pic-holder-account">
                      <img
                        src={data.profile_photo}
                        alt="UploadPhoto"
                        id="blah1"
                        className="pic"
                      />
                      <label
                        htmlFor="newProfilePhoto"
                        className="upload-file-block"
                      >
                        <input
                          id="newProfilePhoto"
                          className="form-control"
                          type="file"
                          onChange={profileUpload}
                          accept="image/*"
                        />
                        <span className="text-center">
                          <i className="fa fa-camera fa-2x"></i>
                          <br />
                          Update <br /> Profile Photo
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="profileimgboxdetail">
                    <h5 style={{ textTransform: "capitalize" }}>John dee</h5>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12"></div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <h6
                        className="profileimgboxcompanydetail1 text-capitalize"
                        style={{ color: "#134d75", font: "bold" }}
                      >
                        S0001
                      </h6>
                    </div>
                  </div>
                  <hr
                    class="hr"
                    style={{ marginBlock: "0.2rem", opacity: "0.1" }}
                  />
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div class="small text-muted" href="tel:+1-7807114210">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        &nbsp;+1-7807114210
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div
                        class="small text-muted"
                        href="mailto:himanshu@spartanbots.com"
                      >
                        <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;
                        himanshu@spartanbots.com
                      </div>
                    </div>
                  </div>
                  <hr
                    class="hr"
                    style={{ marginBlock: "0.2rem", opacity: "0.1" }}
                  />
                  <div className="row mt-2">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <h6
                        className="profileimgboxcompanydetail1 text-capitalize"
                        style={{ color: "#134d75", font: "bold" }}
                      >
                        Department
                      </h6>
                      <div class="small text-muted">Admin</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <h6
                        className="profileimgboxcompanydetail1 text-capitalize"
                        style={{ color: "#134d75", font: "bold" }}
                      >
                        Line Manager
                      </h6>
                      <div class="small text-muted">Ramesh Kumar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-lg-9 col-md-9 col-sm-12 pb-4">
              <TabContainer defaultValue={0}>
                {TabsData.map((item, index) => (
                  <Tabs key={`${item.label}-${index}`} label={item.label}>
                    {item.content}
                  </Tabs>
                ))}
              </TabContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
