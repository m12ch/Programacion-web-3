// src/components/Layout.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Menu from "./client/Menu";
import AdminNavbar from "./admin/AdminNavbar";

const Layout = ({ children }) => {
  const { esAdmin } = useContext(AuthContext);

  return (
    <>
      {esAdmin ? <AdminNavbar /> : <Menu />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
