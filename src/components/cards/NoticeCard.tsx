import React, { useState } from "react";
import "../../assets/styles/noticeCard.css";

interface NoticeCardProps {
  index?: number;
  title: string;
  description: string;
  date: string;
  file?: string;
}

const NoticeCard = ({
  title,
  description,
  date,
  file,
  index,
}: NoticeCardProps) => {
  console.log(file);
  const [isExpanded, setIsExpanded] = useState(false);

  const createdAt = new Date(date).toLocaleDateString("en-Us");

  // Function to truncate the description and add "Read More" functionality
  const truncatedDescription =
    description.length > 800 && !isExpanded
      ? `${description.slice(0, 400)}...`
      : description;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`notice-card ${(index as number) % 2 === 0 ? "even" : "odd"}`}
    >
      <div className="notice-date">Date: {createdAt}</div>
      <div className="notice-title mt-2">{title}</div>

      <div className="notice-description">{truncatedDescription}</div>
      {description.length > 800 && (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <button onClick={toggleDescription} className="read-more-btn">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      )}

      {file && (
        <div
          style={{
            width: "200px",
            height: "200px",
          }}
        >
          <img
            src={file}
            className="notice-file"
            alt="Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NoticeCard;
