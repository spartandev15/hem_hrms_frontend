import React from "react";
import { getDurationInDays } from "../utils/formatDate";
import ReactPaginate from "react-paginate";

const userLogo = "/images/account.png";
const user = "/images/profile.png";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const WhoOffToday = ({ todayOff, isLoading }: any) => {
  return (
    <div className="sechrcard shadow">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="sechrcard-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="font-weight-bold">Who's off today</h5>
            <span className="badge-sec">
              <p>{todayOff?.length}</p>
            </span>
          </div>

          {todayOff && todayOff.length > 0 ? (
            todayOff.map((item: any) => (
              <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-3">
                <div className="d-flex align-items-center">
                  <a href="#" className="hravatar">
                    <img src={userLogo} alt="userimg" className="img-fluid" />
                  </a>
                  <div className="hrmr-3">
                    <h6 className="mb-0 font-weight-bold">
                      {item?.employee_detail?.name}
                    </h6>
                    <span className="text-muted text-xsmall">
                      {item?.employee_detail?.designation}
                    </span>
                  </div>
                </div>
                <div className="text-start  mt-3">
                  <div className="w-100">
                    <h5 className="text-xsmall">
                      Leave Duration :{" "}
                      {getDurationInDays(item?.start_date, item?.end_date)}
                    </h5>

                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <p className="m-0 text-xsmall">
                          Start Date : {item?.start_date}
                        </p>
                      </div>

                      <div>
                        <p className="m-0 text-xsmall">
                          End Date : {item?.end_date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-100 text-end">
                    {/* <span
                    className="text-xsmall d-inline-block py-1 px-3 text-sm text-white mybtn"
                    style={{
                      background: "green",
                    }}
                  >
                    {item?.status}
                  </span> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Data</p>
          )}

          {/* load more button  */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            // onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={8}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            // className="d-flex gap-2"
          />
          {/* <div className="mt-4 text-center">
            <button type="button" className="hrloadbtn rounded">
              {" "}
              Load More
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};
