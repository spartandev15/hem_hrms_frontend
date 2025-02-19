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
import { EmployeeDetails } from "../pages/Employee/EmployeeDetails";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ChangePassword from "../pages/Auth/ChangePassword";
import EmployeeBirthday from "../pages/Employee/EmployeeBirthday";
import EmployeeWorkAniversary from "../pages/Employee/EmployeeWorkAniversary";
import OverTime from "../pages/OverTime/OverTime";
import OverTimeManagement from "../pages/OverTime/OverTimeManagement";
import { Notice } from "../pages/Notice/Notice";
import UserNotice from "../components/UsersNotice";
import ScheduleInterview from "../pages/Interview/ScheduleInterview";
import Vacancy from "../pages/Interview/Vacancy";
import VacancyDetails from "../pages/Interview/VacancyDetails";
import UserDocuments from "../pages/Documents/UserDocuments";
import HRDocuments from "../pages/Documents/HRDocuments";
import DocumentOverview from "../pages/Documents/DocumentOverview";

const Navigation = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password/:token" element={<ChangePassword />} />

        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Protected Routes  */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees" element={<Employees />} />
          <Route path="create/category" element={<Category />} />
          <Route path="leave-details" element={<Leave />} />
          <Route path="employees-birthdays" element={<EmployeeBirthday />} />
          <Route
            path="employees-anniversary"
            element={<EmployeeWorkAniversary />}
          />
          <Route path="overtime" element={<OverTimeManagement />} />
          <Route path="notices" element={<Notice />} />
          <Route path="schedule-interviews" element={<ScheduleInterview />} />
          <Route path="vacancies" element={<Vacancy />} />
          <Route path="vacancy-details/:id" element={<VacancyDetails />} />
          <Route path="documents" element={<HRDocuments />} />
          <Route path="documents/:id" element={<DocumentOverview />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="overtime" element={<OverTime />} />
          <Route path="notices" element={<UserNotice />} />
          <Route path="/documents" element={<UserDocuments />} />

          <Route
            path="/employee-details/:employee-name/:id"
            element={<EmployeeDetails />}
          />

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
