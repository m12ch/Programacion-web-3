  import { useState, useContext } from 'react';
  import { useNavigate } from 'react-router-dom';
  import ReCAPTCHA from 'react-google-recaptcha';
  import './styles/AdminLogin.css';
  import Swal from 'sweetalert2';
  import { AuthContext } from '../../context/AuthContext.jsx';

  const SITE_KEY = '6LfPjEsrAAAAABoCSE1trjE8pulyFgf00G2oosWL'; // Reemplaza con tu clave pública

  const LoginAdmin = () => {
    const [credentials, setCredentials] = useState({ usuario: '', password: '' });
    const [captcha, setCaptcha] = useState(null);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext); // ✅ usamos login del contexto
    const navigate = useNavigate();

    const handleCaptchaChange = (value) => {
      setCaptcha(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!captcha) {
        return setError('Por favor completa el CAPTCHA');
      }

      try {
        const response = await fetch('http://localhost:3007/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...credentials, 'g-recaptcha-response': captcha })
        });

        const data = await response.json();

        if (response.ok) {
          login({
            ...data,
            esAdmin: true // ✅ importante para el contexto
          });

          Swal.fire({
            title: "Inicio exitoso",
            icon: "success",
            timer: 1000,
            showConfirmButton: false
          });

          setTimeout(() => {
            console.log("✅ Redirigiendo a dashboard...");
            navigate('/admin/dashboard'); // 🔥 IMPORTANTE: usar ruta correcta aquí
            window.location.href = '/admin/dashboard';
          }, 1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error...",
            text: data.message || "Error al iniciar sesión",
            timer: 1500
          });
          setError(data.message || 'Error de autenticación');
        }
      } catch (err) {
        console.error("Error al iniciar sesión:", err);
        setError('Error al conectar con el servidor');
      }
    };

    return (
      <div className="admin-login-container">
        <form onSubmit={handleSubmit} className="admin-login-form">
          <h2>Acceso Administrador</h2>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={credentials.usuario}
              onChange={(e) => setCredentials({ ...credentials, usuario: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />

          <button type="submit" className="admin-login-button">
            Ingresar
          </button>
        </form>
      </div>
    );
  };

  export default LoginAdmin;
