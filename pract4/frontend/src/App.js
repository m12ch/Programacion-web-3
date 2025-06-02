import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

function App() {
  const [libros, setLibros] = useState([]);
  /*VARIABLES PARA EL MODAL */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [mostrar, setMostrar] = useState(false);
  const cerrarModal = () => setMostrar(false);
  const abrirModal = () => setMostrar(true);
  const [libroId, setLibroId] = useState(null);
  /*VARIABLES PARA EL MODAL */
  const [formularioAgregar, setFormularioAgregar] = useState({
    titulo: '',
    autor: '',
    genero: '',
    anio_publicacion: ''
  });
  const [FormularioEditar, setEditarLibro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    anio_publicacion: ''
  });
  /*FUNCION PARA OBTEENR LOS DATOS DE LA BASE DE DATOS*/
  const fetchData = useCallback( async() => {
    try{
      const respuesta = await fetch('http://localhost:3005/api/libros');
      const data = await respuesta.json();
      setLibros(data);//almacena informacion de los datos

    }catch(error){
      alert('ERROR'+error);
    }
  },[]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  

  /*FUNCION PARA AGREGAR */
  const agregar = async(e) =>{
    e.preventDefault();
    if(!formularioAgregar.titulo.trim() || !formularioAgregar.autor.trim() || !formularioAgregar.genero.trim() || !formularioAgregar.anio_publicacion.trim()){
      Swal.fire({
        title: "Por Favor Complete los campos",
        text: "No se puede dejar campos vacios",
        icon: "warning",
        timer: 3000
      });
      return;
    }
    try{
      const respuesta = await fetch('http://localhost:3005/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formularioAgregar
        })
      });
      if(!respuesta.ok){
        let errormessage = 'Error al agregar el libro';
        try{
          const error = await respuesta.json();
          errormessage = error.message || errormessage;
        }catch(error){
          console.error(error);
        }
        throw new Error(errormessage);
      }
      handleClose();
      Swal.fire({
        title: "Agregado Correctamente",
        icon: "success",
        draggable: true,
        timer: 2000
      });
      fetchData();
      setFormularioAgregar({
        titulo: '',
        autor: '',
        genero: '',
        anio_publicacion: ''
      });
    }catch(error){
      console.error('Error al agregar el libro:', error); 
      Swal.fire({
        title: "NO se pudo Agregar Correctamente",
        icon: "error",
        draggable: true,
        timer: 2000
      });
    }
  }
  const cambiosFormularioAgregar = (e) => {
    setFormularioAgregar({
      ...formularioAgregar,//realiza un copia del campo
      [e.target.name]: e.target.value
    })
    
  }

  /*FUNCION PARA EDITAR REGISTRO*/
  const EditarRegistro = (libro)=>{
    setEditarLibro({
      titulo: libro.titulo,
      autor: libro.autor,
      genero: libro.genero,
      anio_publicacion: libro.anio_publicacion
    });
    setLibroId(libro.id);
    abrirModal();
  }
  const cambioFormularioEditar = (e) =>{
    setEditarLibro({
      ...FormularioEditar,
      [e.target.name]: e.target.value
    });
  }
  /*FUNCION PARA EDITAR*/
  const editarLib = async(e) =>{
    e.preventDefault();
    if(!FormularioEditar.titulo.trim() || !FormularioEditar.autor.trim() || !FormularioEditar.genero.trim() || !FormularioEditar.anio_publicacion.toString().trim()){
      Swal.fire({
        title: "Por Favor Complete los campos",
        text: "No se puede dejar campos vacios",
        icon: "warning",
        timer: 3000
      });
      return;
    }
    try{
      const respuesta = await fetch(`http://localhost:3005/api/libros/${libroId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...FormularioEditar
        })
      });
      if(!respuesta.ok){
        let errormessage = 'Error al editar el libro';
        try{
          const error = await respuesta.json();
          errormessage = error.message || errormessage;
        }catch(error){
          console.error(error);
        }
        throw new Error(errormessage);
      }
      cerrarModal();
      Swal.fire({
        title: "Editado Correctamente",
        icon: "success",
        draggable: true,
        timer: 2000
      });
      fetchData();
    }catch(error){
      console.error('Error al guardar el libro editado:', error); 
      Swal.fire({
        title: "NO se pudo Editar Correctamente",
        icon: "error",
        draggable: true,
        timer: 2000
      });
    }
  }

  /*FUNCION PARA ELIMINAR REGISTRO*/
  const EliminarRegistro = async(id) =>{
    Swal.fire({
      title: "Estas seguro de ELIMINAR este registro?",
      text: "No podras deshacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, eliminar!",
      cancelButtonText: "Cancelar"
    }).then(async(result) =>{
      if(result.isConfirmed){
        try{
          await fetch(`http://localhost:3005/api/libros/${id}`, {
            method: 'DELETE'
          });
          Swal.fire({
            title: "ELIMINADO correctamente!",
            text: "el registro a sido eliminado.",
            icon: "success",
            timer: 2000
          });
          fetchData();
        }catch(error){
          Swal.fire({
            title: "No se pudo ELIMINAR el producto!",
            icon: "warning",
            timer: 2000
          });
        }
      }
    });
  }

  return (
    <div className="App">
      <h2>MARCELO ALVARO CHAMBI CHILLO</h2>
      <h1>CRUD LIBROS</h1>
      

      {/* TABLA */}
      <div className='tabla'>
        {/* Button to open the modal */}
        <Button className="boton-crear" variant="success" onClick={handleShow}>
        Crear Registro
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="titulo"
                  name='titulo'
                  value={formularioAgregar.titulo}
                  onChange={cambiosFormularioAgregar}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Autor"
                  name='autor'
                  value={formularioAgregar.autor}
                  onChange={cambiosFormularioAgregar}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Genero</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Genero"
                  name='genero'
                  value={formularioAgregar.genero}
                  onChange={cambiosFormularioAgregar}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Año de Publicacion</Form.Label>
                <Form.Control
                  type="integer"
                  placeholder="Año de Publicacion"
                  name='anio_publicacion'
                  value={formularioAgregar.anio_publicacion}
                  onChange={cambiosFormularioAgregar}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          {/*BOTONES DEL MODAL PARA CREAR REGISTRO*/}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={agregar}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
        </Modal>

        {/*MODAL PARA EDITAR REGISTRO*/}
        <Modal show={mostrar} onHide={cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="titulo"
                  name='titulo'
                  value={FormularioEditar.titulo}
                  onChange={cambioFormularioEditar}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Autor"
                  name='autor'
                  value={FormularioEditar.autor}
                  onChange={cambioFormularioEditar}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Genero</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Genero"
                  name='genero'
                  value={FormularioEditar.genero}
                  onChange={cambioFormularioEditar}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Año de Publicacion</Form.Label>
                <Form.Control
                  type="integer"
                  placeholder="Año de Publicacion"
                  name='anio_publicacion'
                  value={FormularioEditar.anio_publicacion}
                  onChange={cambioFormularioEditar}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          {/*BOTONES DEL MODAL PARA CREAR REGISTRO*/}
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrarModal}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={editarLib}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
        </Modal>





        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Genero</th>
              <th>Año de Publicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map(libro=>(
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.genero}</td>
                <td>{libro.anio_publicacion}</td>
                <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="warning" className="boton-editar me-2 rounded-pill d-flex align-items-center gap-2" onClick={()=>{EditarRegistro(libro)}}>
                    <span>Editar</span>
                    <FaRegEdit />
                  </Button>
                  <Button variant="danger" className="boton-eliminar rounded-pill d-flex align-items-center gap-2" onClick={()=>{EliminarRegistro(libro.id)}}>
                    <span>Eliminar</span>
                    <MdDelete />
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

export default App;
