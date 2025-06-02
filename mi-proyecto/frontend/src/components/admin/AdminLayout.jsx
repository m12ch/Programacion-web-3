import AdminNavbar from "./AdminNavbar.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main style={{ marginTop: "56px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
