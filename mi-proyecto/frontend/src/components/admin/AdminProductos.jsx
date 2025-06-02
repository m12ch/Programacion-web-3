import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AdminProducts.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const CATEGORIAS = ["parte-superior", "parte-inferior", "calzado", "accesorios"];
const GENEROS = ["hombre", "mujer", "niños"];

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [productoId, setProductoId] = useState(null);
  const [formularioAgregar, setFormularioAgregar] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
    precio: '',
    categoria: '',
    genero: ''
  });
  const [formularioEditar, setFormularioEditar] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
    precio: '',
    categoria: '',
    genero: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cerrarModal = () => setMostrar(false);
  const abrirModal = () => setMostrar(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3007/api/admin/productos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      alert('ERROR: ' + error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cambiosFormularioAgregar = (e) => {
    const { name, value, files } = e.target;
    setFormularioAgregar(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const cambioFormularioEditar = (e) => {
    const { name, value, files } = e.target;
    setFormularioEditar(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const agregar = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, imagen, precio, categoria, genero } = formularioAgregar;

    if (!nombre || !descripcion || !imagen || !precio || !categoria || !genero) {
      Swal.fire("Campos incompletos", "Por favor llena todos los campos", "warning");
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('genero', genero);

    try {
      const res = await fetch('http://localhost:3007/api/admin/productos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!res.ok) throw new Error('Error al agregar producto');

      Swal.fire("Agregado", "Producto agregado correctamente", "success");
      handleClose();
      fetchData();
      setFormularioAgregar({
        nombre: '', descripcion: '', imagen: null, precio: '', categoria: '', genero: ''
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const EditarRegistro = (producto) => {
    setFormularioEditar({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: null, // imagen no precargada
      precio: producto.precio,
      categoria: producto.categoria,
      genero: producto.genero
    });
    setProductoId(producto.id);
    abrirModal();
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, imagen, precio, categoria, genero } = formularioEditar;

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (imagen) formData.append('imagen', imagen); // opcional
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('genero', genero);

    try {
      const res = await fetch(`http://localhost:3007/api/admin/productos/${productoId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!res.ok) throw new Error('Error al editar producto');

      Swal.fire("Editado", "Producto editado correctamente", "success");
      cerrarModal();
      fetchData();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const EliminarRegistro = async (id) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:3007/api/admin/productos/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar", "error");
        }
      }
    });
  };

  const renderInput = (campo, formulario, handleChange) => {
    if (campo === "categoria") {
      return (
        <Form.Select name="categoria" value={formulario.categoria} onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </Form.Select>
      );
    }

    if (campo === "genero") {
      return (
        <Form.Select name="genero" value={formulario.genero} onChange={handleChange}>
          <option value="">Selecciona al publico dirigido</option>
          {GENEROS.map(gen => <option key={gen} value={gen}>{gen}</option>)}
        </Form.Select>
      );
    }

    if (campo === "imagen") {
      return (
        <Form.Control type="file" name="imagen" onChange={handleChange} accept="image/*" />
      );
    }

    return (
      <Form.Control
        type="text"
        placeholder={campo}
        name={campo}
        value={formulario[campo]}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="App">
      <h1 className='titulo-admin'>DASHBOARD PRODUCTOS</h1>
      <div className='tabla'>
        <Button className="boton-crear" variant="success" onClick={handleShow}>Crear Producto</Button>

        {/* Modal Agregar */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton><Modal.Title>Agregar Producto</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              {['nombre', 'descripcion', 'imagen', 'precio', 'categoria', 'genero'].map((campo, i) => (
                <Form.Group className="mb-3" key={i}>
                  <Form.Label>{campo[0].toUpperCase() + campo.slice(1)}</Form.Label>
                  {renderInput(campo, formularioAgregar, cambiosFormularioAgregar)}
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            <Button variant="primary" onClick={agregar}>Guardar</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Editar */}
        <Modal show={mostrar} onHide={cerrarModal}>
          <Modal.Header closeButton><Modal.Title>Editar Producto</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              {['nombre', 'descripcion', 'imagen', 'precio', 'categoria', 'genero'].map((campo, i) => (
                <Form.Group className="mb-3" key={i}>
                  <Form.Label>{campo[0].toUpperCase() + campo.slice(1)}</Form.Label>
                  {renderInput(campo, formularioEditar, cambioFormularioEditar)}
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
            <Button variant="primary" onClick={editarProducto}>Guardar Cambios</Button>
          </Modal.Footer>
        </Modal>

        {/* Tabla productos */}
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Dirigido a:</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td><img src={`http://localhost:3007/uploads/${producto.imagen}`} alt="Producto" width="60" height="60" /></td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.categoria}</td>
                <td>{producto.genero}</td>
                <td>
                  <ButtonGroup>
                    <Button variant="warning" className="boton-editar me-2 rounded-pill d-flex align-items-center gap-2" onClick={() => EditarRegistro(producto)}>
                      <FaRegEdit /> Editar
                    </Button>
                    <Button variant="danger" className="boton-eliminar rounded-pill d-flex align-items-center gap-2" onClick={() => EliminarRegistro(producto.id)}>
                      <MdDelete /> Eliminar
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AdminProductos;
