import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/ReduxHook";
import Header from "../layouts/Header/Header";

const ProtectedRoute = () => {
  const { isAuthenticateUser } = useAppSelector((state) => state.authUser);
  return (
    <React.Fragment>
      {isAuthenticateUser ? (
        <div>
          <Header />
          <Outlet />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
