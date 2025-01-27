import React, { useEffect } from "react";
import PunchInOut from "../../components/PunchInOut";
import { useGetDashboardDetailsQuery } from "../../redux/api/dashboard";
import UpcommingEvetns from "../../components/UpcommingEvetns";
import UserProfileCard from "../../components/cards/UserProfileCard";
import { useAppSelector } from "../../hooks/reduxHook";
import LeavesRequest from "../../components/LeavesRequest";
import LeavesStatus from "../../components/LeavesStatus";

const userLogo = "/images/account.png";
const user = "/images/profile.png";

const Dashboard = () => {
  const { status } = useAppSelector((state) => state.authUser);
  const getTimer = async () => {};
  const {
    data: dashboardDataDetails,
    isLoading: isDashboardDataDetailsLoading,
  } = useGetDashboardDetailsQuery();

  console.log(dashboardDataDetails);

  useEffect(() => {
    getTimer();
  }, []);

  return (
    <section className="container">
      <UserProfileCard userDetails={dashboardDataDetails?.data?.user} />

      <section id="heading-txt">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-start">
              <div className="heading-text-msg">
                <h3 className="m-0">Welcome !</h3>
                <h5>
                  <i className="fa  fa-gauge"></i> HRMS Dashboard
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="row">
          {status === "HR" ? (
            <div className="col-lg-8">
              <UpcommingEvetns
                data={dashboardDataDetails?.data?.upcoming_events}
                isLoading={isDashboardDataDetailsLoading}
              />
            </div>
          ) : (
            <div className="col-lg-8">
              <div className="sechrcard shadow">
                <div className="sechrcard-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold">Pending / approval</h5>
                    <span className="badge-sec">
                      <p>5</p>
                    </span>
                  </div>
                </div>

                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="table-responsive recent_jobs pt-2 pb-2 ps-2 pe-2 card-body">
                      <table className="table mb-0 text-nowrap">
                        <tbody>
                          {[1, 2, 3, 4].map((x) => {
                            return (
                              <tr className="border-bottom">
                                <td>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className=" hravatar">
                                      <img
                                        src={userLogo}
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="me-3 mt-0 mt-sm-1 d-block">
                                      <h6 className="mb-0">Faith Harris</h6>
                                      <div className="clearfix"></div>
                                      <small className="text-muted">
                                        UI designer
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
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <ul className="list-group">
                      {[1, 2, 3, 4].map(() => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          style={{ background: "transparent" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="hravatar">
                              <img src={user} alt="img" className="img-fluid" />
                            </div>
                            <div className="me-3 mt-0 mt-sm-1 d-block">
                              <h6 className="mb-0" style={{ color: "black" }}>
                                Faith Harris
                              </h6>
                              <div className="clearfix"></div>
                              <small
                                className="text-muted"
                                style={{ color: "black" }}
                              >
                                UI designer
                              </small>
                            </div>
                          </div>
                          <span>1 day • Unpaid Time Off</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    <div className="table-responsive recent_jobs pt-2 pb-2 ps-2 pe-2 card-body">
                      <table className="table mb-0 text-nowrap">
                        <tbody>
                          <tr
                            className="border-bottom"
                            style={{ verticalAlign: "middle" }}
                          >
                            <td>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className=" hravatar">
                                  <img
                                    src={user}
                                    alt="img"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="me-3 mt-0 mt-sm-1 d-block">
                                  <h6 className="mb-0">Faith Harris</h6>
                                  <div className="clearfix"></div>
                                  <small className="text-muted">
                                    UI designer
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
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Contact"
                                aria-label="Contact"
                              >
                                <i
                                  className="fa fa-phone text-primary"
                                  style={{ rotate: "90deg" }}
                                ></i>
                              </a>
                              <a
                                className="action-btns"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Mail"
                                aria-label="Mail"
                              >
                                <i className="fa fa-envelope text-primary"></i>
                              </a>
                              <a
                                className="action-btns"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Delete"
                                aria-label="Delete"
                              >
                                <i className="fa fa-trash text-danger"></i>
                              </a>
                            </td>
                          </tr>
                          <tr
                            className="border-bottom"
                            style={{ verticalAlign: "middle" }}
                          >
                            <td>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className=" hravatar">
                                  <img
                                    src={user}
                                    alt="img"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="me-3 mt-0 mt-sm-1 d-block">
                                  <h6 className="mb-0">Faith Harris</h6>
                                  <div className="clearfix"></div>
                                  <small className="text-muted">
                                    UI designer
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
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Contact"
                                aria-label="Contact"
                              >
                                <i
                                  className="fa fa-phone text-primary"
                                  style={{ rotate: "90deg" }}
                                ></i>
                              </a>
                              <a
                                className="action-btns"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Mail"
                                aria-label="Mail"
                              >
                                <i className="fa fa-envelope text-primary"></i>
                              </a>
                              <a
                                className="action-btns"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Delete"
                                aria-label="Delete"
                              >
                                <i className="fa fa-trash text-danger"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-lg-4">
            <PunchInOut />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-5">
              <div className="sechrcard shadow">
                <div className="sechrcard-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold">Who's off today</h5>
                    <span className="badge-sec">
                      <p>5</p>
                    </span>
                  </div>
                  {/* content part */}
                  <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                    <div className="d-flex align-items-center">
                      <a href="#" className="hravatar">
                        <img
                          src={userLogo}
                          alt="userimg"
                          className="img-fluid"
                        />
                      </a>
                      <div className="hrmr-3">
                        <h6 className="mb-0 font-weight-bold">John Doe</h6>
                        <span className="text-muted">Frontend Developer</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center text-start mt-3">
                      <div className="w-50">
                        <h6 className="mb-0">4 Aug 2023</h6>
                        <span className="text-sm text-muted">Leave Date</span>
                      </div>
                      <div className="w-50 text-end">
                        <span className="d-inline-block py-1 px-3 text-sm text-white mybtn">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                    <div className="d-flex align-items-center">
                      <a href="#" className="hravatar">
                        <img
                          src={userLogo}
                          alt="userimg"
                          className="img-fluid"
                        />
                      </a>
                      <div className="hrmr-3">
                        <h6 className="mb-0 font-weight-bold">John Doe</h6>
                        <span className="text-muted">Frontend Developer</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center text-start  mt-3">
                      <div className="w-50">
                        <h6 className="mb-0">4 Aug 2023</h6>
                        <span className="text-sm text-muted">Leave Date</span>
                      </div>
                      <div className="w-50 text-end">
                        <span className="d-inline-block py-1 px-3 text-sm text-white mybtn">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* load more button  */}
                  <div className="mt-4 text-center">
                    <button type="button" className="hrloadbtn rounded">
                      {" "}
                      Load More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {status == "HR" && (
              <div className="col-lg-7">
                <LeavesStatus
                  approvedLeaves={dashboardDataDetails?.data?.approved_leave}
                  pendingLeaves={dashboardDataDetails?.data?.pending_leave}
                  rejectedLeaves={dashboardDataDetails?.data?.rejected_leave}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-4 mb-4">
          <div className="row">
            <div className="col-lg-4">
              <div className="sechrcard shadow">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="font-weight-bold"> Notice Board</h5>
                  <span className="badge-sec">
                    <p>5</p>
                  </span>
                </div>

                <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                  <div className="d-flex align-items-center">
                    <a href="#" className="hravatar">
                      <img src={userLogo} alt="userimg" />
                    </a>
                    <div className="hrmr-3">
                      <h6 className="mb-0 font-weight-bold">John Doe</h6>
                      <p className="hrtext-muted-5">
                        Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.
                      </p>
                      <p className="hrtext-muted-6">7 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                  <div className="d-flex align-items-center">
                    <a href="#" className="hravatar">
                      <img src={userLogo} alt="userimg" />
                    </a>
                    <div className="hrmr-3">
                      <h6 className="mb-0 font-weight-bold">John Doe</h6>
                      <p className="hrtext-muted-5">
                        Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.
                      </p>
                      <p className="hrtext-muted-6">7 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                  <div className="d-flex align-items-center">
                    <a href="#" className="hravatar">
                      <img src={userLogo} alt="userimg" />
                    </a>
                    <div className="hrmr-3">
                      <h6 className="mb-0 font-weight-bold">John Doe</h6>
                      <p className="hrtext-muted-5">
                        Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.
                      </p>
                      <p className="hrtext-muted-6">7 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <LeavesRequest
                leavesData={dashboardDataDetails?.data?.leave_requests}
                isLoading={isDashboardDataDetailsLoading}
              />
            </div>

            <div className="col-lg-4">
              <div className="sechrcard shadow">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="font-weight-bold">My Time Off</h5>
                </div>
                <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                  <div className="d-flex align-items-center ">
                    <a href="#" className="hravatar">
                      <img src={userLogo} alt="userimg" />
                    </a>
                    <div className="hrmr-3">
                      <h6 className="mb-0 font-weight-bold">
                        Jens Brincker
                        <p className="hrtext-muted-5">(HR Specialist)</p>
                      </h6>
                      <p className="hrtext-muted-5">
                        <i className="fa fa-cake-candles"></i>Sick Leave
                        (Unpaid)
                      </p>
                      <p className="hrtext-muted-6 text-start">
                        Monday, 7 Aug 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <button type="button" className="hrdetailbtn rounded">
                      {" "}
                      Pending
                    </button>
                  </div>
                </div>
                <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                  <div className="d-flex align-items-center ">
                    <a href="#" className="hravatar">
                      <img src={userLogo} alt="userimg" />
                    </a>
                    <div className="hrmr-3">
                      <h6 className="mb-0 font-weight-bold">
                        Jens Brincker{" "}
                        <p className="hrtext-muted-5">(Designer)</p>
                      </h6>

                      <p className="hrtext-muted-5">Unpaid Time Off</p>
                      <p className="hrtext-muted-6 text-start ">
                        Monday, 7 May 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <button type="button" className="hrdetailbtn rounded">
                      {" "}
                      Pending
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
