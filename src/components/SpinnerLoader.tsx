import React from "react";
import "../assets/styles/spinnerLoader.css";

const SpinnerLoader = ({ size = 30 }: { size?: number }) => {
  return (
    <div className="spinner-container">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export default SpinnerLoader;
