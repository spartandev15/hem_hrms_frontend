import React, { useState, useEffect } from "react";
import NoticeCard from "../../components/cards/NoticeCard";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Simulating an API fetch or static data.
    const fetchedNotices = [
      {
        title: "Notice 1",
        description: "This is the description for notice 1.",
        date: "2025-02-01",
        file: "https://example.com/file1.pdf", // Optional
      },
      {
        title: "Notice 2",
        description: "This is the description for notice 2.",
        date: "2025-02-02",
        file: "", // No file in this case
      },
      {
        title: "Notice 3",
        description: "This is the description for notice 3.",
        date: "2025-02-03",
        file: "https://example.com/file3.pdf",
      },
    ];

    setNotices(fetchedNotices);
  }, []);

  return (
    <div className="notice-list">
      <h2>Notices</h2>
      {notices.map((notice, index) => (
        <NoticeCard
          key={index}
          title={notice.title}
          description={notice.description}
          date={notice.date}
          file={notice.file}
        />
      ))}
    </div>
  );
};

export default NoticeList;
