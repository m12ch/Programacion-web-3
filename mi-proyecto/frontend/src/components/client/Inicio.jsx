import { FaWhatsapp, FaTshirt, FaFemale, FaChild, FaSearch, FaStore, FaUsers, FaTruck } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import './styles/inicio.css';
import './styles/slick-overrides.css'; // Asegúrate de importar los estilos del carrusel

function Inicio() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  const featuredSellers = [
    { id: 1, name: "Moda Elegante", photo: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b", phone: "549123456789" },
    { id: 2, name: "Ropa Infantil", photo: "https://st3.depositphotos.com/3591429/12958/i/450/depositphotos_129589086-stock-photo-fashionable-kids-outdoors.jpg", phone: "549987654321" },
    { id: 3, name: "Jeans Urbanos", photo: "https://images.unsplash.com/photo-1542272604-787c3835535d", phone: "549456789123" },
    { id: 4, name: "Vestidos Casual", photo: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b", phone: "549789123456" }
  ];

  const testimonials = [
    { id: 1, name: "María", comment: "Compré un vestido y el trato fue excelente", photo: "https://randomuser.me/api/portraits/women/43.jpg" },
    { id: 2, name: "Carlos", comment: "Rápido y sin complicaciones", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Lucía", comment: "El vendedor me ayudó a elegir mi talla", photo: "https://randomuser.me/api/portraits/women/65.jpg" }
  ];

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Moda con Trato Directo</h1>
          <p>Compra sin intermediarios, contacta al vendedor en segundos</p>
          <div className="search-bar">
            <input type="text" placeholder="Busca jeans, vestidos, zapatos..." />
            <button>
              <FaSearch />
            </button>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="business-model">
        <h2>¿Cómo funciona?</h2>
        <div className="model-cards">
          <div className="card">
            <FaStore className="icon" />
            <h3>Para Vendedores</h3>
            <p>Publica tus prendas en minutos. Recibe consultas directas en tu WhatsApp.</p>
          </div>
          <div className="card">
            <FaUsers className="icon" />
            <h3>Para Compradores</h3>
            <p>Encuentra ofertas exclusivas y habla con el vendedor sin complicaciones.</p>
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="featured-sellers">
        <h2>Vendedores Destacados</h2>
        <Slider {...settings}>
          {featuredSellers.map(seller => (
            <div key={seller.id} className="seller-card">
              <img src={seller.photo} alt={seller.name} />
              <h3>{seller.name}</h3>
              <a href={`https://wa.me/${seller.phone}`} className="seller-whatsapp">
                <FaWhatsapp /> Contactar
              </a>
            </div>
          ))}
        </Slider>
      </section>

      {/* Process Steps */}
      <section className="process-steps">
        <h2>Compra en 3 pasos</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon"><FaSearch /></div>
            <p>Encuentra prendas</p>
          </div>
          <div className="step">
            <div className="step-icon"><FaWhatsapp /></div>
            <p>Habla directo con el vendedor</p>
          </div>
          <div className="step">
            <div className="step-icon"><FaTruck /></div>
            <p>Acuerda envío/pago</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Lo que dicen nuestros compradores</h2>
        <div className="testimonial-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial">
              <img src={testimonial.photo} alt={testimonial.name} />
              <p>"{testimonial.comment}"</p>
              <span>- {testimonial.name}</span>
            </div>
          ))}
        </div>
      </section>

      

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/TUNUMERO" className="float-whatsapp">
        <FaWhatsapp />
      </a>
    </div>
  );
}

export default Inicio;