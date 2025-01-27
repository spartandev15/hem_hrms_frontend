import React from "react";

const userLogo = "/images/account.png";

const LeavesStatus = ({
  approvedLeaves,
  pendingLeaves,
  rejectedLeaves,
}: any) => {
  const leavesStatus = [
    ...(Array.isArray(approvedLeaves) ? approvedLeaves : []),
    ...(Array.isArray(pendingLeaves) ? pendingLeaves : []),
    ...(Array.isArray(rejectedLeaves) ? rejectedLeaves : []),
  ];

  return (
    <div>
      <div className="sechrcard shadow">
        <div className="sechrcard-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="font-weight-bold">Pending / approval</h5>
            <span className="badge-sec">
              <p>5</p>
            </span>
          </div>
        </div>

        <div className="overflow-scroll">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Designation</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {leavesStatus && leavesStatus?.length > 0 ? (
                leavesStatus.map((leave: any, index: number) => (
                  <tr key={leave.id}>
                    <td>{index + 1}</td>
                    <td>
                      {leave.employee_detail.name}{" "}
                      {leave.employee_detail.last_name}
                    </td>
                    <td>{leave.leave_type}</td>
                    <td>{leave.start_date}</td>
                    <td>{leave.end_date}</td>
                    <td
                      style={{
                        minWidth: "160px",
                      }}
                    >
                      {leave.reason}
                    </td>
                    <td>
                      <span
                        style={{
                          backgroundColor:
                            leave.status === "approved"
                              ? "#73A617" // green for approved
                              : leave.status === "pending"
                              ? "#DD982F" // amber for pending
                              : "#DF3523",
                          padding: "2px 1rem",
                          borderRadius: "4px",
                          color:
                            leave.status === "approved"
                              ? "#fff" // green for approved
                              : leave.status === "pending"
                              ? "#fff" // amber for pending
                              : "#fff",
                        }}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td>{leave.employee_detail.designation}</td>
                    <td>{leave.employee_detail.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center">
                    No Data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <div className="tab-content" id="myTabContent">
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
                              <small className="text-muted">UI designer</small>
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
                      <small className="text-muted" style={{ color: "black" }}>
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
                          <img src={user} alt="img" className="img-fluid" />
                        </div>
                        <div className="me-3 mt-0 mt-sm-1 d-block">
                          <h6 className="mb-0">Faith Harris</h6>
                          <div className="clearfix"></div>
                          <small className="text-muted">UI designer</small>
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
                          <img src={user} alt="img" className="img-fluid" />
                        </div>
                        <div className="me-3 mt-0 mt-sm-1 d-block">
                          <h6 className="mb-0">Faith Harris</h6>
                          <div className="clearfix"></div>
                          <small className="text-muted">UI designer</small>
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
        </div> */}
      </div>
    </div>
  );
};

export default LeavesStatus;
