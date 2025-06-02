import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx'; // ✅ Layout para admin
import Loginpage from './components/client/LoginClient.jsx';
import Register from './components/client/Register.jsx';
import Inicio from './components/client/Inicio.jsx';
import Productos from './components/client/Productos.jsx';
import AdminLogin from './components/admin/LoginAdmin.jsx';
import AdminRoute from './components/admin/AdminRoute.jsx';
import Dashboard from './components/admin/Dashboard.jsx';
import AdminProductos from './components/admin/AdminProductos.jsx';
import AdminLog from './components/admin/AdminLogs.jsx';

function App() {
  return (
    <Routes>
      {/* Rutas públicas del cliente con Layout */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Inicio />} />

              {/* Rutas Hombre */}
              <Route path="/hombre/torso" element={<Productos genero="hombre" categoria="parte-superior" />} />
              <Route path="/hombre/piernas" element={<Productos genero="hombre" categoria="parte-inferior" />} />
              <Route path="/hombre/calzados" element={<Productos genero="hombre" categoria="calzado" />} />
              <Route path="/hombre/accesorios" element={<Productos genero="hombre" categoria="accesorios" />} />

              {/* Rutas Mujer */}
              <Route path="/mujer/torso" element={<Productos genero="mujer" categoria="parte-superior" />} />
              <Route path="/mujer/piernas" element={<Productos genero="mujer" categoria="parte-inferior" />} />
              <Route path="/mujer/calzados" element={<Productos genero="mujer" categoria="calzado" />} />
              <Route path="/mujer/accesorios" element={<Productos genero="mujer" categoria="accesorios" />} />

              {/* Rutas Niños */}
              <Route path="/niños/torso" element={<Productos genero="niños" categoria="parte-superior" />} />
              <Route path="/niños/piernas" element={<Productos genero="niños" categoria="parte-inferior" />} />
              <Route path="/niños/calzados" element={<Productos genero="niños" categoria="calzado" />} />
              <Route path="/niños/accesorios" element={<Productos genero="niños" categoria="accesorios" />} />

              {/* Autenticación cliente */}
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        }
      />

      {/* Login admin en ruta segura */}
      <Route path="/ruta-segura-1778466/admin-login" element={<AdminLogin />} />

      {/* Ruta protegida con layout y subrutas */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="logs" element={<AdminLog />} />
          {/* Aquí puedes agregar más rutas de administración según sea necesario */}
          
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
