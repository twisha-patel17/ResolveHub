import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return <Navigate to="/admin/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (user.isActive === false) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;