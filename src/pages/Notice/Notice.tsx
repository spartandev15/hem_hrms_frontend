import React from "react";
import NoticeForm from "../../components/NoticeForm";
import NoticeList from "./NoticeList";

export const Notice = () => {
  return (
    <div className="container">
      <div className="mt-4">
        <NoticeForm />
        {/* <NoticeList /> */}
      </div>
    </div>
  );
};
