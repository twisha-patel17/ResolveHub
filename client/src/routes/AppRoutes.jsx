import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/user/DashboardPage";
import CreateComplaintPage from "../pages/user/CreateComplaintPage";
import MyComplaintsPage from "../pages/user/MyComplaintsPage";
import ComplaintDetailPage from "../pages/user/ComplaintDetailPage";
import NotificationsPage from "../pages/user/NotificationsPage";
import ProfilePage from "../pages/user/ProfilePage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminPublicRoutes from "./AdminPublicRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Route>
      
      <Route element={<ProtectedRoute />}>

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/complaints/create"
          element={<CreateComplaintPage />}
        />

        <Route
          path="/complaints"
          element={<MyComplaintsPage />}
        />

        <Route
          path="/complaints/:id"
          element={<ComplaintDetailPage />}
        />

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

      </Route>

      <Route element={<AdminPublicRoutes />}>
        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboardPage />}
        />
      </Route>

    </Routes>
  );
};

export default AppRoutes;