import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaRegEye } from "react-icons/fa6";

const UserProfileCard = ({ userDetails }: any) => {
  return (
    <section>
      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="new_section shadow">
              <div className="d-flex gap-3">
                <div className="">
                  <div className="d-flex align-items-center gap-1">
                    <div>
                      <HiOutlineUserCircle size={35} color="#4B95AE" />
                    </div>

                    <div className="">
                      <h2 className="mb-0 text-small">
                        {userDetails?.name} {userDetails?.last_name}
                      </h2>
                      {/* <div className="clearfix"></div> */}
                      <small className="text-muted">
                        {userDetails?.designation}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <p className="m-0">5 years</p>
                  <p className="m-0">USA</p>

                  <div
                    className="border rounded-1 d-flex justify-content-center align-items-center"
                    style={{
                      width: "36px",
                      height: "36px",
                      cursor: "pointer",
                    }}
                  >
                    <FaRegEye size={22} color="#DC3545" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileCard;
