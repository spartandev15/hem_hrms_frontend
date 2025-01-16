import React from "react";
import { usePunchInMutation } from "../redux/api/punchInOut";
import { getLocalStorageItem } from "../utils/getLocalStorageItem";

const PunchInOut = () => {
  const [punchIn, { data: PunchInOutDataDetals }] = usePunchInMutation();
  console.log(PunchInOutDataDetals);

  const PunchOut = async () => {};
  const PunchIn = async () => {
    try {
      await punchIn({});
    } catch (error) {
      console.error(error);
    }
  };

  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="shadow sechrcard">
      <div>
        <div className="new_section_inner sechrcard-body">
          <i className="fas fa-plane new_section_icon"></i>
          <h5 className="font-weight-bold">Timesheet</h5>
          <p className="new_section_t">{currentDate}</p>
        </div>

        <div className="punch-info mt-3">
          <div className="punch-hours">
            <span>3.45 hrs</span>
          </div>
        </div>

        <div className="punch-btn-section mb-0">
          <button
            type="button"
            onClick={PunchOut}
            className="btn mybtn punch-btn"
          >
            Punch Out
          </button>
          <button
            type="button"
            onClick={PunchIn}
            className="btn mybtn punch-btn"
          >
            Punch In
          </button>
        </div>

        <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-1">
          <div className="punch-det text-start">
            <h6>Punch In at</h6>
            <div className="puch_t">
              <p>Wed, 30 Aug 2023</p> <span>10.00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchInOut;
