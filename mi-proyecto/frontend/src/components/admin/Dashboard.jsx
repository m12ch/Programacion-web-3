import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './styles/Dasboard.css';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);

  const cerrarSesion = async () => {
    await logout();
    navigate('/ruta-segura-1778466/admin-login');
  };

  const obtenerDatos = async () => {
    try {
      const res = await fetch('http://localhost:3007/logs/admin/resumen-eventos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setDatos(data);
    } catch (error) {
      console.error('Error al obtener datos del gráfico:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Panel de Control del Administrador</h1>
      <p>Bienvenido, aquí puedes gestionar el contenido de la tienda.</p>

      <div className="admin-actions">
        <button onClick={cerrarSesion}>🚪 Cerrar Sesión</button>
      </div>

      <div className="grafico-estadistico mt-5">
        <h2>📊 Eventos de Acceso</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="evento" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
