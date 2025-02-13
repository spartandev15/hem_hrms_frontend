import React from "react";
import { useGetAllNoticesOfUsersQuery } from "../redux/api/notice";
import NoticeCard from "./cards/NoticeCard";

const UserNotice = () => {
  const { data: allNotices, isLoading: isALlNoticesLoading } =
    useGetAllNoticesOfUsersQuery();
  console.log(allNotices);

  return (
    <div className="container py-3">
      <div>
        <div
          className="d-flex flex-column"
          style={{
            maxWidth: "724px",
            margin: "auto",
            gap: "1rem",
          }}
        >
          <h2 className="text-start text-small m-0 text-blue-primary">
            Notices
          </h2>

          {isALlNoticesLoading ? (
            <p>Loading...</p>
          ) : allNotices?.data?.length > 0 ? (
            allNotices?.data?.map((notice: any, index: number) => (
              <div key={index}>
                <NoticeCard
                  index={index}
                  date={notice.created_at}
                  title={notice.title}
                  description={notice.description}
                  file={notice.attachment}
                />
              </div>
            ))
          ) : (
            <p>No Data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNotice;
