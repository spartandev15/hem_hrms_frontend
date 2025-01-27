import React from "react";
import { date } from "zod";

const userLogo = "/images/account.png";

const UpcommingEvetns = ({ data, isLoading }: any) => {
  // const upcomingEvent = [
  //   ...(Array.isArray(data?.upcoming_birthdays)
  //     ? data?.upcoming_birthdays
  //     : []),
  //   ...(Array.isArray(data?.upcoming_anniversaries)
  //     ? data?.upcoming_anniversaries
  //     : []),
  // ];

  // console.log(data);
  return (
    <div className="new_section shadow">
      <div className="new_section_inner">
        <i className="fas fa-calendar new_section_icon"></i>
        <h5 className="font-weight-bold">Upcomming Events</h5>
        <a href="#" className="new_section_t">
          View All
        </a>
      </div>
      <div className="row">
        {(data && data?.upcoming_anniversaries?.length > 0) ||
        (data?.upcoming_birthdays?.length > 0 && Object.keys(data)) ? (
          Object.keys(data).map((key) => {
            const events = data[key];

            // Only process keys that have array values
            if (Array.isArray(events) && events.length > 0) {
              return (
                <section key={key} className="mt-3">
                  <h2 className="text-xsmall text-start mb-1">
                    {key.replace("_", " ")}:
                  </h2>
                  {events.map((event, index) => (
                    <div key={index} className="col-lg-12">
                      <div className="border d-flex justify-content-between align-items-center bg-white px-4 py-2">
                        <div className="d-flex align-items-center">
                          <a href="#" className="hravatar">
                            <img src={userLogo} alt="userimg" />
                          </a>
                          <div className="hrmr-3">
                            <h6 className="mb-0 font-weight-bold">
                              {event.first_name} {event.last_name}
                              <p className="hrtext-muted-5">
                                {event.designation}
                              </p>
                            </h6>

                            {key === "upcoming_birthdays" ? (
                              <p className="hrtext-muted-5">
                                <i className="fas fa-cake-candles"></i> Birthday
                              </p>
                            ) : (
                              <p className="hrtext-muted-5">
                                <i className="fas fa-gift"></i> Anniversary
                              </p>
                            )}

                            {key === "upcoming_birthdays" ? (
                              <p className="hrtext-muted-6">
                                {new Date(
                                  event.date_of_birth
                                ).toLocaleDateString()}
                              </p>
                            ) : (
                              <p className="hrtext-muted-6">
                                {new Date(
                                  event.joining_date
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-end">
                          <button type="button" className="hrdetailbtn rounded">
                            Wish Them
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              );
            }
            return null; // Skip if there are no events
          })
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>No Data Available</p>
        )}

        {/* <div className="col-lg-12 mt-3">
          <div className="border d-flex justify-content-between align-items-center bg-white px-4 py-2">
            <div className="d-flex align-items-center ">
              <a href="#" className="hravatar">
                <img src={userLogo} alt="userimg" />
              </a>
              <div className="hrmr-3">
                <h6 className="mb-0 font-weight-bold">
                  Jens Brincker{" "}
                  <p className="hrtext-muted-5">(HR Specialist)</p>
                </h6>

                <p className="hrtext-muted-5">
                  <i className="fa fa-cake-candles"></i> Birthday
                </p>
                <p className="hrtext-muted-6">Monday, 7 Aug 2023</p>
              </div>
            </div>
            <div className="text-end">
              <button type="button" className="hrdetailbtn rounded">
                Wish Them
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UpcommingEvetns;
