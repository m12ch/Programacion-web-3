import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección Newsletter */}
        <section className="newsletter">
            <div className="newsletter-header">
                <h3 className="newsletter-title">¿Quieres vender con nosotros?</h3>
                <p className="newsletter-subtitle">Únete a nuestra comunidad de vendedores</p>
            </div>
            
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <input 
                        type="email" 
                        placeholder="Ingresa tu correo electrónico" 
                        required 
                        className="newsletter-input"
                    />
                    <button type="submit" className="newsletter-button">
                    Quiero vender
                    <span className="button-icon">→</span>
                    </button>
                </div>
                
            </form>
        </section>

        {/* Sección enlaces */}
        <div className="footer-links">
          <div className="links-column">
            <h4>Comprar</h4>
            <ul>
              <li><a href="/hombre/torso">Ropa para Hombre</a></li>
              <li><a href="/mujer/torso">Ropa para Mujer</a></li>
              <li><a href="/ninos/torso">Ropa para Niños</a></li>
            </ul>
          </div>

          
        </div>

        {/* Sección redes sociales y copyright */}
        <div className="footer-bottom">
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>

          <div className="copyright">
            <p>
              © {currentYear} ModaGo. Todos los derechos reservados. 
              Diseñado por <a href="https://www.linkedin.com/in/mchambi" target="_blank" rel="noopener noreferrer">Marcelo Chambi Mch</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;