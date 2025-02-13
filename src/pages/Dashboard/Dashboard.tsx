import React, { useEffect } from "react";
import LeavesRequest from "../../components/LeavesRequest";
import LeavesStatus from "../../components/LeavesStatus";
import PunchInOut from "../../components/PunchInOut";
import UpcommingEvetns from "../../components/UpcommingEvetns";
import { WhoOffToday } from "../../components/WhoOffToday";
import UserProfileCard from "../../components/cards/UserProfileCard";
import { useAppSelector } from "../../hooks/reduxHook";
import { useGetDashboardDetailsQuery } from "../../redux/api/dashboard";

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
            <div className="col-xl-7 col-lg-6">
              <UpcommingEvetns
                data={dashboardDataDetails?.data?.upcoming_events}
                isLoading={isDashboardDataDetailsLoading}
              />
            </div>
          ) : (
            <div className="col-lg-7">
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
          )}

          <div className="col-xl-5 col-lg-6">
            <PunchInOut />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row mt-4">
            {status == "HR" && (
              <div className="col-lg-5">
                <WhoOffToday
                  todayOff={dashboardDataDetails?.data?.whos_off_today}
                  isLoading={isDashboardDataDetailsLoading}
                />
              </div>
            )}

            {status == "HR" && (
              <div className="col-lg-7">
                <LeavesStatus
                  approvedLeaves={dashboardDataDetails?.data?.approved_leave}
                  pendingLeaves={dashboardDataDetails?.data?.pending_leave}
                  rejectedLeaves={dashboardDataDetails?.data?.rejected_leave}
                  isLoading={isDashboardDataDetailsLoading}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-4 mb-4">
          <div className="row">
            {status == "HR" && (
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
                          Lorem ipsum dolor sit amet, id quo eruditi
                          eloquentiam.
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
                          Lorem ipsum dolor sit amet, id quo eruditi
                          eloquentiam.
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
                          Lorem ipsum dolor sit amet, id quo eruditi
                          eloquentiam.
                        </p>
                        <p className="hrtext-muted-6">7 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {status == "HR" && (
              <div className="col-lg-4">
                <LeavesRequest
                  leavesData={dashboardDataDetails?.data?.leave_requests}
                  isLoading={isDashboardDataDetailsLoading}
                />
              </div>
            )}

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
