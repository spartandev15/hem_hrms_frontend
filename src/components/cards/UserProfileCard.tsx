import React from "react";

const userLogo = "/images/account.png";

const UserProfileCard = ({ userDetails }: any) => {
  return (
    <section>
      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="new_section shadow">
              <div className="">
                <tbody>
                  <tr className="border-bottom">
                    <td>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className=" hravatar">
                          <img src={userLogo} alt="img" className="img-fluid" />
                        </div>
                        <div className="me-3 mt-0 mt-sm-1 d-block">
                          <h6 className="mb-0">
                            {userDetails?.name} {userDetails?.last_name}
                          </h6>
                          {/* <div className="clearfix"></div> */}
                          <small className="text-muted">
                            {userDetails?.designation}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="text-start fs-13">5 years</td>
                    <td className="text-start fs-13">
                      <i className="feather feather-map-pin text-muted me-2"></i>
                      USA
                    </td>
                    <td className="text-end">
                      <a
                        className="action-btns"
                        data-bs-toggle="tooltip"
                        aria-label="Delete"
                      >
                        <i className="fa fa-eye text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileCard;
