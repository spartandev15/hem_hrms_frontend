import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/SingUp";
import ProtectedRoute from "../routes/ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import AddEmployee from "../pages/Employee/AddEmployee";
import Employees from "../pages/Employee/Employees";
import Category from "../pages/Category/Category";
import Leave from "../pages/Leave/Leave";
import NotFound from "../pages/NotFound/NotFound";

const Navigation = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Protected Routes  */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees" element={<Employees />} />
          <Route path="create/category" element={<Category />} />
          <Route path="leave-details" element={<Leave />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          {/* <Route path="dashboard" element={<Dashboard />}>
            <Route path="dashboard/add-employee" element={<AddEmployee />} />
          </Route> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default Navigation;
