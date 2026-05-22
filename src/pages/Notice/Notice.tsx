import React from "react";
import NoticeForm from "../../components/NoticeForm";
import NoticeList from "./NoticeList";

const Notice = () => {
  return (
    <div className="container py-4">
      <div className="">
        <NoticeForm />
      </div>

      <div className="mt-4">
        <NoticeList />
      </div>
    </div>
  );
};

export default Notice;
