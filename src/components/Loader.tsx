import React from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks/reduxHook";

const Loader = () => {
  const { isLoading } = useAppSelector((state) => state.loader);
  return (
    <>
      <div className={`loader-blur-bg ${isLoading ? "" : "d-none"}`}>
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loader;
