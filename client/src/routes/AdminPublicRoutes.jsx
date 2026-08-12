import { Navigate, Outlet } from "react-router-dom";

const AdminPublicRoute = () => {
  const token = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return <Outlet />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    return <Outlet />;
  }

  if (user.role === "admin" && user.isActive !== false) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminPublicRoute;