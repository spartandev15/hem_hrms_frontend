import React from "react";
import "../../assets/styles/noticeCard.css";

interface NoticeCardProps {
  title: string;
  description: string;
  date: string;
  file?: string;
}

const NoticeCard = ({ title, description, date, file }: NoticeCardProps) => {
  const createdAt = new Date(date).toLocaleDateString("en-Us");
  return (
    <div className="notice-card">
      <div className="notice-date">Date: {createdAt}</div>
      <div className="notice-title mt-2">{title}</div>
      <div className="notice-description">{description}</div>
      {file && (
        <a
          href={file}
          className="notice-file"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download File
        </a>
      )}
    </div>
  );
};

export default NoticeCard;
