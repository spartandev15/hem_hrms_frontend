import React, { useState, useEffect } from "react";
import NoticeCard from "../../components/cards/NoticeCard";
import {
  useGetAllNoticesOfUsersQuery,
  useGetAllNoticesQuery,
} from "../../redux/api/notice";
import SpinnerLoader from "../../components/SpinnerLoader";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  const { data: allNotices, isLoading: isAllNoticesLoading } =
    useGetAllNoticesQuery();

  return (
    <div className="notice-list">
      <h2 className="text-start text-large text-blue-primary">Notices</h2>

      {isAllNoticesLoading ? (
        <div className="d-flex justify-content-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="row g-3">
          {allNotices && allNotices?.data && allNotices?.data?.length > 0 ? (
            allNotices?.data?.map((notice: any, index: number) => (
              <div className="col-md-12">
                <NoticeCard
                  key={index}
                  title={notice.title}
                  description={notice.description}
                  date={notice.created_at}
                  file={notice.attachment}
                />
              </div>
            ))
          ) : (
            <p>notices not found!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeList;
