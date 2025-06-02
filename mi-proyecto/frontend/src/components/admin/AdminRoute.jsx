import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const esAdmin = localStorage.getItem("esAdmin") === "true";
  const token = localStorage.getItem("token");

  return esAdmin && token ? <Outlet /> : <Navigate to="/ruta-segura-1778466/admin-login" />;
};

export default AdminRoute;
