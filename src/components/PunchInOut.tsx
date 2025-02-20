import React, { useEffect, useRef, useState } from "react";
import {
  usePunchOutMutation,
  usePunchInMutation,
  usePunchInOutDetailsQuery,
  useResumeTimeMutation,
} from "../redux/api/punchInOut";
import { getLocalStorageItem } from "../utils/getLocalStorageItem";
import { number } from "zod";
import { formatDateType, formatElapsedTime } from "../utils/formatDate";
import { useAppDispatch } from "../hooks/reduxHook";
import { setIsLoading } from "../redux/slices/loadingSlice";
import SpinnerLoader from "./SpinnerLoader";

const PunchInOut = () => {
  const [isPunchIn, setPunchIn] = useState(false);
  const [isPunchOut, setPunchOut] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState<number | null>(null);
  const [lastTime, setLastTime] = useState("00:00:00");
  const [timeGap, setTimeGap] = useState("");

  const dispatch = useAppDispatch();

  const { data: punchInOutDataDetals, isLoading: isPunchInOutLoading } =
    usePunchInOutDetailsQuery();
  const [
    punchIn,
    {
      data: punchInDataDetails,
      isSuccess: isPunchInSuccess,
      isLoading: isPunchinLoading,
    },
  ] = usePunchInMutation();
  const [
    punchOut,
    { data: punchOutDataDetails, isSuccess: isPunchOutSuccess },
  ] = usePunchOutMutation();
  const [resumeTime, { data: resumeTimeDataDetails }] = useResumeTimeMutation();

  // console.log(punchInDataDetails);

  const timerRefDom = useRef<HTMLSpanElement | null>(null);
  const interValId: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef(null);

  const startTimer = (timer: string | number) => {
    if (interValId.current) clearInterval(interValId.current);
    interValId.current = setInterval(() => {
      const elapsed = Date.now() - Number(timer);
      const { hours, minutes, seconds } = formatElapsedTime(elapsed);

      if (timerRefDom.current) {
        timerRefDom.current.textContent = `${hours}:${minutes}:${seconds}`;
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (interValId.current !== null) {
      clearInterval(interValId.current);
      interValId.current = null; // Reset to null after clearing the interval
    }
  };

  const PunchIn = async () => {
    try {
      dispatch(setIsLoading(true));
      setPunchIn(true);
      const currentTime = new Date().getTime();
      startTimer(currentTime);
      localStorage.setItem("startTimer", JSON.stringify(currentTime));
      localStorage.setItem("isPaused", JSON.stringify(false));
      await punchIn(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const PunchOut = async () => {
    try {
      dispatch(setIsLoading(true));
      setPunchOut(true);
      stopTimer();
      localStorage.removeItem("startTimer");
      localStorage.removeItem("pauseTime");
      localStorage.removeItem("isPaused");
      await punchOut();
    } catch (error) {
      console.error(error);
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
    const currentPauseTime = Date.now();
    setPauseTime(currentPauseTime); // Save the pause time

    // Store paused state and time in localStorage
    localStorage.setItem("isPaused", JSON.stringify(true));
    localStorage.setItem("pauseTime", JSON.stringify(currentPauseTime));
    stopTimer();
  };

  const resumeTimer = () => {
    if (pauseTime) {
      setIsPaused(false);
      const timeGap = Date.now() - pauseTime;
      const startTime = getLocalStorageItem("startTimer") as number; // The time you originally started the timer from local storage
      const newStartTime = startTime + timeGap; // Add timeGap to the original start time to adjust for the pause

      // Update local storage with the adjusted start time and isPaused time
      localStorage.setItem("isPaused", JSON.stringify(false));
      localStorage.setItem("startTimer", JSON.stringify(newStartTime));

      // Start the timer from the updated start time
      startTimer(newStartTime);
      resumeTime({
        time_gap: timeGap,
      });
    }
  };

  // const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const storedStartTime = getLocalStorageItem("startTimer");
    const storedIsPaused = getLocalStorageItem("isPaused");
    const storedPauseTime = getLocalStorageItem("pauseTime");

    if (!storedIsPaused && storedStartTime) {
      startTimer(storedStartTime as string);
      setIsPaused(isPaused as boolean);
    } else if (storedPauseTime) {
      const elapsedTime = Number(storedPauseTime) - Number(storedStartTime); // Calculate time elapsed before pause
      const { hours, minutes, seconds } = formatElapsedTime(elapsedTime);
      setLastTime(`${hours}:${minutes}:${seconds}`);
      setIsPaused(true);
      setPauseTime(storedPauseTime as number);
    }

    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (punchInDataDetails) {
      dispatch(setIsLoading(false));
    }
    if (punchOutDataDetails) {
      dispatch(setIsLoading(false));
    }
  }, [isPunchInSuccess, isPunchOutSuccess]);

  return (
    <div className="shadow sechrcard">
      {isPunchInOutLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="h-100">
          <div className="new_section_inner sechrcard-body">
            <h5 className="font-weight-bold">
              <i className="fas fa-plane new_section_icon"></i>Timesheet
            </h5>

            <p className="new_section_t">
              {/* {formatDateType(new Date().toLocaleDateString(), "short")} */}
            </p>
          </div>

          <div>
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
                    {lastTime}
                  </span>
                )}
              </div>
            </div>

            <div className="punch-btn-section mb-0">
              <div className="d-flex flex-sm-row flex-column gap-1">
                {punchInOutDataDetals?.data &&
                  !punchInOutDataDetals?.data?.timers[0]?.stopped_at && (
                    <button
                      onClick={isPaused ? resumeTimer : pauseTimer}
                      className="btn mybtn punch-btn"
                    >
                      {isPaused ? "Resume" : "Pause"}
                    </button>
                  )}

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
              </div>

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

            {punchInOutDataDetals?.data && (
              <div className="border border-#e5e5e5 bg-white px-4 py-2 mt-1 d-flex justify-content-between">
                {punchInOutDataDetals?.data?.timers[0]?.started_at && (
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
                )}

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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PunchInOut;
