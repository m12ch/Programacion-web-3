import { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTshirt, FaUser, FaMale, FaFemale, FaChild } from 'react-icons/fa';
import './styles/estiloscliente.css';
import HoverNavDropdown from './HoverNavDropdown.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function Menu() {
  const { usuario, logout, setUsuario } = useContext(AuthContext);
  console.log("Usuario actual:", usuario);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formulario, setFormulario] = useState({
    usuario: '',
    nombres: '',
    apellidos: '',
    correo: '',
    genero: '',
    actual: '',
    nueva: ''
  });
  // Declarar antes del useEffect
  const [datosEditados, setDatosEditados] = useState({
    usuario: '',
    nombres: '',
    apellidos: '',
    correo: '',
    genero: ''
  });

  useEffect(() => {
    if (usuario) {
      setDatosEditados({
        usuario: usuario.usuario,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        genero: usuario.genero
      });
    }
  }, [usuario]);


  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (usuario) {
      setFormulario({
        usuario: usuario.usuario || '',
        nombres: usuario.nombres || '',
        apellidos: usuario.apellidos || '',
        correo: usuario.correo || '',
        genero: usuario.genero || '',
        actual: '',
        nueva: ''
      });
    }
    setShow(true);
  };

  const handleGuardarCambios = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3007/usuario/edit/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formulario)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al actualizar perfil");

      Swal.fire({
              title: "Perfil Actualizado Correctamente",
              icon: "success",
              timer: 1000,
              showConfirmButton: false
            });
      setUsuario(prev => ({
        ...prev,
        usuario: formulario.usuario,
        nombres: formulario.nombres,
        apellidos: formulario.apellidos,
        correo: formulario.correo,
        genero: formulario.genero
      }));


      handleClose();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
      <motion.div
        className="divmenu"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 10, mass: 0.8, velocity: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '10px'
        }}
      >
      <div className='divmenu'>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className='px-4 shadow z-3'>
          <Container>
            <Navbar.Brand as={Link} to="/">🛍️ ModaGo</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu-principal" />
            <Navbar.Collapse id="menu-principal">
              <Nav className="me-auto">

                <HoverNavDropdown
                  title={<span className="menu-icon-text"><FaTshirt /><span className="menu-text"> Hombre</span></span>}
                  id="menu-hombre"
                  className="menu-hover no-arrow"
                >
                  <NavDropdown.Item as={Link} to="/hombre/torso">Torso</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/hombre/piernas">Piernas</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/hombre/calzados">Calzados</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/hombre/accesorios">Accesorios</NavDropdown.Item>
                </HoverNavDropdown>

                <HoverNavDropdown
                  title={<span className="menu-icon-text"><FaFemale /><span className="menu-text"> Mujer</span></span>}
                  id="menu-mujer"
                  className="menu-hover no-arrow"
                >
                  <NavDropdown.Item as={Link} to="/mujer/torso">Torso</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/mujer/piernas">Piernas</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/mujer/calzados">Calzados</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/mujer/accesorios">Accesorios</NavDropdown.Item>
                </HoverNavDropdown>

                <HoverNavDropdown
                  title={<span className="menu-icon-text"><FaChild /><span className="menu-text"> Niños</span></span>}
                  id="menu-niños"
                  className="menu-hover no-arrow"
                >
                  <NavDropdown.Item as={Link} to="/niños/torso">Torso</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/niños/piernas">Piernas</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/niños/calzados">Calzados</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/niños/accesorios">Accesorios</NavDropdown.Item>
                </HoverNavDropdown>

              </Nav>

              <Nav>
                {!usuario ? (
                <Nav.Link as={Link} to="/login" className="menu-hover">
                  <span className="menu-icon-text"><FaUser /><span className="menu-text"> Iniciar Sesión</span></span>
                </Nav.Link>
              ) : (
                <HoverNavDropdown
                  title={<span className="menu-icon-text"><FaUser /><span className="menu-text"> {usuario.nombre}</span></span>}
                  id="user-dropdown"
                  align="end"
                  className="menu-hover"
                >
                  <NavDropdown.Item onClick={handleShow}>Editar Perfil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                </HoverNavDropdown>
              )}

              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/*MODAL PARA EDITAR EL PERFIL*/ }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form-editar-perfil">
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={formulario.usuario}
                onChange={(e) => setFormulario({ ...formulario, usuario: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                value={formulario.nombres}
                onChange={(e) => setFormulario({ ...formulario, nombres: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                value={formulario.apellidos}
                onChange={(e) => setFormulario({ ...formulario, apellidos: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                value={formulario.correo}
                onChange={(e) => setFormulario({ ...formulario, correo: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select
                value={formulario.genero}
                onChange={(e) => setFormulario({ ...formulario, genero: e.target.value })}
              >
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </Form.Select>
            </Form.Group>

            <hr />
            <Form.Group className="mb-3">
              <Form.Label>Contraseña actual</Form.Label>
              <Form.Control
                type="password"
                value={formulario.actual}
                onChange={(e) => setFormulario({ ...formulario, actual: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nueva contraseña (opcional)</Form.Label>
              <Form.Control
                type="password"
                value={formulario.nueva}
                onChange={(e) => setFormulario({ ...formulario, nueva: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

    </motion.div>
    
  );
}

export default Menu;
