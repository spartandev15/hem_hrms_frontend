import React, { useEffect, useRef, useState } from "react";
import {
  usePunchOutMutation,
  usePunchInMutation,
  usePunchInOutDetailsQuery,
} from "../redux/api/punchInOut";
import { getLocalStorageItem } from "../utils/getLocalStorageItem";
import { number } from "zod";
import { formatDateType } from "../utils/formatDate";

const PunchInOut = () => {
  const [isPunchIn, setPunchIn] = useState(false);
  const [isPunchOut, setPunchOut] = useState(false);

  const { data: punchInOutDataDetals, isLoading: isPunchInOutLoading } =
    usePunchInOutDetailsQuery();
  const [punchIn, { data: punchInDataDetails }] = usePunchInMutation();
  const [punchOut, { data: punchOutDataDetails }] = usePunchOutMutation();

  // console.log(punchInDataDetails);

  const timerRefDom = useRef<HTMLSpanElement | null>(null);
  const interValId: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef(null);

  const startTimer = (timer: string | number) => {
    interValId.current = setInterval(() => {
      const elapsed = Date.now() - Number(timer);
      const hours = Math.floor(elapsed / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      // Explicitly check for null before assignment
      if (timerRefDom.current) {
        timerRefDom.current.textContent = `${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (interValId.current !== null) {
      clearInterval(interValId.current);
      interValId.current = null; // Reset to null after clearing the interval
    }
  };

  const PunchOut = async () => {
    try {
      setPunchOut(true);
      stopTimer();
      localStorage.removeItem("startTimer");
      await punchOut();
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(punchInOutDataDetals);

  const PunchIn = async () => {
    try {
      setPunchIn(true);
      const timer = new Date().getTime();
      startTimer(timer);
      localStorage.setItem("startTimer", JSON.stringify(timer));
      await punchIn(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const timer = getLocalStorageItem("startTimer");
    if (timer) {
      startTimer(timer as string);
      // setPunchIn(true);
    }
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="shadow sechrcard">
      {isPunchInOutLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="new_section_inner sechrcard-body">
            <h5 className="font-weight-bold">
              {" "}
              <i className="fas fa-plane new_section_icon"></i>Timesheet
            </h5>
            <p className="new_section_t">
              {/* {formatDateType(currentDate, "short")} */}
            </p>
          </div>

          <div className="punch-info mt-3">
            <div className="punch-hours position-relative">
              {punchInOutDataDetals?.data?.timers[0] &&
              punchInOutDataDetals?.data?.timers[0]?.stopped_at ? (
                <span>
                  {punchInOutDataDetals?.data?.timers[0]?.running_duration}
                  <span
                    className="position-absolute start-50 "
                    style={{
                      transform: "translate(-50%, 0)",
                      top: "60%",
                    }}
                  >
                    Hrs
                  </span>
                </span>
              ) : (
                <span className="timerRef" ref={timerRefDom}>
                  00:00:00
                </span>
              )}
            </div>
          </div>
          {/* <Timer isPunchIn={isPunchIn} /> */}

          <div className="punch-btn-section mb-0">
            {punchInOutDataDetals?.data && (
              <button
                type="button"
                onClick={PunchOut}
                className="btn mybtn punch-btn"
                style={{
                  opacity:
                    punchInOutDataDetals?.data?.timers[0]?.stopped_at ||
                    isPunchOut
                      ? 0.4
                      : 1,
                }}
                disabled={
                  punchInOutDataDetals?.data?.timers[0]?.stopped_at
                    ? true
                    : false
                }
              >
                Punch Out
              </button>
            )}

            <button
              type="button"
              onClick={PunchIn}
              className="btn mybtn punch-btn"
              style={{
                opacity: punchInOutDataDetals?.data || isPunchIn ? 0.4 : 1,
              }}
              disabled={punchInOutDataDetals?.data ? true : false}
            >
              Punch In
            </button>
          </div>

          <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-1 d-flex justify-content-between">
            <div className="punch-det text-start">
              <h6 className="text-xsmall">Punch In at</h6>
              <div className="text-xsmall">
                {/* <p>{formatDateType(currentDate, "long")}</p> /{" "} */}
                <span>
                  {punchInOutDataDetals?.data?.timers[0]?.started_at &&
                    new Date(
                      punchInOutDataDetals?.data?.timers[0]?.started_at
                    ).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {punchInOutDataDetals?.data?.timers[0]?.stopped_at && (
              <div className="punch-det text-start">
                <h6 className="text-xsmall">Punch Out at</h6>
                <div className="puch_t">
                  {/* <p>{formatDateType(currentDate, "long")}</p>{" "} */}
                  <span>
                    {punchInOutDataDetals?.data?.timers[0]?.stopped_at &&
                      new Date(
                        punchInOutDataDetals?.data?.timers[0]?.stopped_at
                      ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PunchInOut;
