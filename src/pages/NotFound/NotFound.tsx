import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/NotFound.css"; // Assuming you're using a separate CSS file for styling

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-header">404</h1>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="not-found-suggestion">
          You can go back to the{" "}
          <span className="highlighted-text" onClick={() => navigate("/")}>
            home page
          </span>{" "}
          or explore other sections of the site.
        </p>
        {/* <div className="not-found-image">
          <img src="https://via.placeholder.com/400" alt="404 illustration" />
        </div> */}
        <p className="not-found-timer">
          Redirecting you to the home page in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFound;
