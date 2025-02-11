import React from "react";
import { useGetAllNoticesOfUsersQuery } from "../redux/api/notice";
import NoticeCard from "./cards/NoticeCard";

const UserNotice = () => {
  const { data: allNotices } = useGetAllNoticesOfUsersQuery();
  console.log(allNotices);

  return (
    <div className="container py-3">
      <div>
        <h2 className="text-start text-small m-0 text-blue-primary">Notices</h2>

        <div className="mt-2">
          {allNotices?.data?.map((notice: any, index: number) => (
            <div key={index}>
              <NoticeCard
                date={notice.created_at}
                title={notice.title}
                description={notice.title}
                file={notice.file}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNotice;
