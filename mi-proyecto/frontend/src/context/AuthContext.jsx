import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const EXPIRACION_MS = 1000 * 60 * 60 * 2; // 2 horas

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("usuario");
      const isAdminStored = localStorage.getItem("esAdmin");
      const timestamp = localStorage.getItem("expiraEn");

      if (userData && userData !== "undefined") {
        const now = Date.now();
        if (timestamp && now > parseInt(timestamp)) {
          logout(); // Sesión expirada
        } else {
          const parsedUser = JSON.parse(userData);
          setUsuario(parsedUser);
          setEsAdmin(isAdminStored === "true");
          console.log("Usuario cargado desde localStorage:", parsedUser);
        }
      }
    } catch (error) {
      console.error("Error al recuperar sesión:", error);
      logout();
    }
  }, []);

  const login = (usuarioData) => {
    const expiraEn = Date.now() + EXPIRACION_MS;
    const isAdmin = usuarioData?.esAdmin === true;

    // Guardar en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    localStorage.setItem("expiraEn", expiraEn.toString());
    localStorage.setItem("esAdmin", isAdmin.toString());
    if (usuarioData.token) {
      localStorage.setItem("token", usuarioData.token);
    }

    // Actualizar estado global
    setUsuario(usuarioData);
    setEsAdmin(isAdmin);
    console.log("Login realizado:", usuarioData);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("esAdmin") === "true";

    try {
      if (token) {
        const endpoint = isAdmin
          ? "http://localhost:3007/admin/logout"
          : "http://localhost:3007/usuario/logout";

        await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      // Limpiar estado y almacenamiento
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      localStorage.removeItem("expiraEn");
      localStorage.removeItem("esAdmin");

      setUsuario(null);
      setEsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, esAdmin, login, logout, setUsuario, setEsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
