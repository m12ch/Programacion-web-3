import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaBox, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Asegúrate de que la ruta sea correcta
import './styles/AdminNavbar.css';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.isConfirmed) {
        await logout(); // Llama a tu función de logout que ya llama al backend
        navigate('/');  // Redirige a la página principal del cliente
      }
    });
  };

  return (
    <motion.div
      className="admin-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50, damping: 10 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar px-4">
        <Container>
          <Navbar.Brand as={Link} to="/admin/dashboard">🛠️ AdminPanel</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/admin/productos'><FaBox className="me-1" /> Productos</Nav.Link>
              <Nav.Link as={Link} to='/admin/logs'><FaClipboardList className="me-1" /> Logs</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}><FaSignOutAlt className="me-1" /> Cerrar sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default AdminNavbar;
