import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setToast } from "../redux/slices/toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { toastMessage } = useAppSelector((state) => state.toast);
  useEffect(() => {
    if (toastMessage != "") {
      const timer = setTimeout(() => {
        dispatch(setToast(""));
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);
  return (
    <div className={`toast-container ${toastMessage === "" ? "d-none" : ""}`}>
      {toastMessage}
    </div>
  );
};

export default Toast;
