import React from "react";

const userLogo = "/images/account.png";

const LeavesRequest = ({ leavesData, isLoading }: any) => {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          className="sechrcard shadow"
          style={{
            minHeight: "430px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="font-weight-bold">Leave Requests</h5>
            <span className="badge-sec">
              <p>{leavesData?.length}</p>
            </span>
          </div>

          {leavesData && leavesData?.length > 0 ? (
            leavesData?.map((item: any, index: number) => (
              <div
                className="border border-#e5e5e5 bg-white px-4 py-2 mt-3"
                key={index}
              >
                <div className="d-flex align-items-center ">
                  <a href="#" className="hravatar">
                    <img src={userLogo} alt="userimg" />
                  </a>
                  <div className="hrmr-3">
                    <h6 className="mb-0 font-weight-bold">
                      {item?.employee_detail?.name}
                    </h6>
                    <p className="hrtext-muted-5">{item?.leave_type}</p>
                    <p className="hrtext-muted-6 text-start ">
                      {item?.start_date} <br /> {item?.end_date}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <button type="button" className="hrdetailbtn rounded">
                    View Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Data</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeavesRequest;
