import { useState, useEffect } from 'react';
import { FaWhatsapp, FaSpinner } from 'react-icons/fa';
import './styles/Productos.css';

const Productos = ({ genero, categoria }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3007/api/productos/${categoria}/${genero}`);

        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria, genero]);

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="seccion-productos">
      <div className="encabezado-seccion">
        <h2>{genero} - {categoria}</h2>
        <p>Productos seleccionados para ti</p>
      </div>

      {productos.length > 0 ? (
        <div className="grid-productos">
          {productos.map((producto) => (
            <div key={producto.id} className="card-producto">
              <div className="imagen-producto-container">
                <img 
                    src={`http://localhost:3007/uploads/${producto.imagen}`} 
                    alt={producto.nombre}
                    className="imagen-producto"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=Sin+imagen';
                    }}
                />

              </div>
              <div className="info-producto">
                <h3>{producto.nombre}</h3>
                <p className="precio">${parseFloat(producto.precio).toFixed(2)}</p>
                <p className='descripcion'>{producto.descripcion}</p>
                <p className="vendedor">Vendido por: {producto.vendedor || 'Anónimo'}</p>
                <a 
                    href={`https://wa.me/59161181690?text=${encodeURIComponent(
                        `Hola, estoy interesado en ${producto.nombre} (${genero} - ${categoria})\n\n` +
                        `Precio: $${producto.precio}\n\n` +
                        `Descripcion: ${producto.descripcion}\n\n` +
                        `¿Podrías darme más información?`
                    )}`}
                    className="boton-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <FaWhatsapp /> Contactar
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sin-productos">
          <p>No hay productos disponibles en esta categoría</p>
        </div>
      )}
    </section>
  );
};

export default Productos;
