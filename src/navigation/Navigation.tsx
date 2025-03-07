import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "../assets/styles/dialogbox.css";
import "../assets/styles/employee.css";
import "../assets/styles/inputWithLabel.css";
import "../assets/styles/leave.css";
import "../assets/styles/ovetimeTable.css";

// const Login = lazy(() => import("../pages/Auth/Login"));
// const Signup = lazy(() => import("../pages/Auth/SingUp"));
// const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
// const ChangePassword = lazy(() => import("../pages/Auth/ChangePassword"));

const Profile = lazy(() => import("../pages/Profile/Profile"));
const AddEmployee = lazy(() => import("../pages/Employee/AddEmployee"));
const Employees = lazy(() => import("../pages/Employee/Employees"));
const Category = lazy(() => import("../pages/Category/Category"));

const Leave = lazy(() => import("../pages/Leave/Leave"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const EmployeeDetails = lazy(() => import("../pages/Employee/EmployeeDetails"));

const EmployeeBirthday = lazy(
  () => import("../pages/Employee/EmployeeBirthday")
);
const EmployeeWorkAniversary = lazy(
  () => import("../pages/Employee/EmployeeWorkAniversary")
);
const OverTime = lazy(() => import("../pages/OverTime/OverTime"));
const OverTimeManagement = lazy(
  () => import("../pages/OverTime/OverTimeManagement")
);
const Notice = lazy(() => import("../pages/Notice/Notice"));
const UserNotice = lazy(() => import("../components/UsersNotice"));
const ScheduleInterview = lazy(
  () => import("../pages/Interview/ScheduleInterview")
);
const Vacancy = lazy(() => import("../pages/Interview/Vacancy"));
const VacancyDetails = lazy(() => import("../pages/Interview/VacancyDetails"));
const UserDocuments = lazy(() => import("../pages/Documents/UserDocuments"));
const HRDocuments = lazy(() => import("../pages/Documents/HRDocuments"));
const DocumentOverview = lazy(
  () => import("../pages/Documents/DocumentOverview")
);

import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../routes/ProtectedRoute";

import ChangePassword from "../pages/Auth/ChangePassword";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/SingUp";
// import Profile from "../pages/Profile/Profile";
// import AddEmployee from "../pages/Employee/AddEmployee";
// import Employees from "../pages/Employee/Employees";
// import Category from "../pages/Category/Category";
// import Leave from "../pages/Leave/Leave";
// import NotFound from "../pages/NotFound/NotFound";
// import EmployeeDetails from "../pages/Employee/EmployeeDetails";

// import EmployeeBirthday from "../pages/Employee/EmployeeBirthday";
// import EmployeeWorkAniversary from "../pages/Employee/EmployeeWorkAniversary";
// import OverTime from "../pages/OverTime/OverTime";
// import OverTimeManagement from "../pages/OverTime/OverTimeManagement";
// import { Notice } from "../pages/Notice/Notice";
// import UserNotice from "../components/UsersNotice";
// import ScheduleInterview from "../pages/Interview/ScheduleInterview";
// import Vacancy from "../pages/Interview/Vacancy";
// import VacancyDetails from "../pages/Interview/VacancyDetails";
// import UserDocuments from "../pages/Documents/UserDocuments";
// import HRDocuments from "../pages/Documents/HRDocuments";
// import DocumentOverview from "../pages/Documents/DocumentOverview";

const Navigation = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={""}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={""}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <Suspense fallback={""}>
              <ChangePassword />
            </Suspense>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" />} />
        {/* Protected Routes  */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route
            path="add-employee"
            element={
              <Suspense fallback={""}>
                <AddEmployee />
              </Suspense>
            }
          />

          <Route
            path="employees"
            element={
              <Suspense fallback={""}>
                <AddEmployee />
              </Suspense>
            }
          />
          <Route
            path="all/employees"
            element={
              <Suspense fallback={""}>
                <Employees />
              </Suspense>
            }
          />
          <Route
            path="create/category"
            element={
              <Suspense fallback={""}>
                <Category />
              </Suspense>
            }
          />
          <Route
            path="leave-details"
            element={
              <Suspense fallback={""}>
                <Leave />
              </Suspense>
            }
          />
          <Route
            path="employees-birthdays"
            element={
              <Suspense fallback={""}>
                <EmployeeBirthday />
              </Suspense>
            }
          />
          <Route
            path="employees-anniversary"
            element={
              <Suspense fallback={""}>
                <EmployeeWorkAniversary />
              </Suspense>
            }
          />
          <Route
            path="overtime"
            element={
              <Suspense fallback={""}>
                <OverTimeManagement />
              </Suspense>
            }
          />
          <Route
            path="announcements"
            element={
              <Suspense fallback={""}>
                <Notice />
              </Suspense>
            }
          />
          <Route
            path="schedule-interviews"
            element={
              <Suspense fallback={""}>
                <ScheduleInterview />
              </Suspense>
            }
          />
          <Route
            path="vacancies"
            element={
              <Suspense fallback={""}>
                <Vacancy />
              </Suspense>
            }
          />
          <Route
            path="vacancy-details/:id"
            element={
              <Suspense fallback={""}>
                <VacancyDetails />
              </Suspense>
            }
          />
          <Route
            path="documents"
            element={
              <Suspense fallback={""}>
                <HRDocuments />
              </Suspense>
            }
          />
          <Route
            path="documents/:id"
            element={
              <Suspense fallback={""}>
                <DocumentOverview />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="profile"
            element={
              <Suspense fallback={""}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="overtime"
            element={
              <Suspense fallback={""}>
                <OverTime />
              </Suspense>
            }
          />
          <Route
            path="notices"
            element={
              <Suspense fallback={""}>
                <UserNotice />
              </Suspense>
            }
          />
          <Route
            path="/documents"
            element={
              <Suspense fallback={""}>
                <UserDocuments />
              </Suspense>
            }
          />

          <Route
            path="/employee-details/:employee-name/:id"
            element={
              <Suspense fallback={""}>
                <EmployeeDetails />
              </Suspense>
            }
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

// Lazy load the components
