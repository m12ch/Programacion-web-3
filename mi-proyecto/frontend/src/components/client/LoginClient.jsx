import React, { useState, useContext } from 'react';
import './styles/estilologin.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { AuthContext } from '../../context/AuthContext';

function LoginClient() {
  const [usuario, setusuario] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!captchaToken) {
      setError('Por favor, completa el CAPTCHA.');
      return;
    }

    try {
      console.time("login-request");

      const res = await fetch('http://localhost:3007/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario,
          password,
          'g-recaptcha-response': captchaToken
        })
      });

      console.timeEnd("login-request");

      const data = await res.json();

      if (!res.ok) return setError(data.message || 'Error al iniciar sesión');

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      login(data.usuario); // Llama al contexto para guardar usuario
      navigate('/');       // Redirige a la página principal

      Swal.fire({
        title: "Inicio exitoso",
        icon: "success",
        timer: 1000,
        showConfirmButton: false
      });

    } catch (err) {
      setError('Error de red. Por favor, inténtalo de nuevo más tarde.');
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Error al iniciar sesion",
        timer: 1000
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setusuario(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="input-group">
          <ReCAPTCHA
            sitekey="6LfPjEsrAAAAABoCSE1trjE8pulyFgf00G2oosWL" // Captchca del frontned
            onChange={handleCaptchaChange}
          />
        </div>

        <button type="submit" className="login-button">
          Ingresar
        </button>

        <div className="links">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          <span>¿No tienes cuenta? <Link to={"/register"}>Regístrate</Link></span>
        </div>
      </form>
    </div>
  );
}

export default LoginClient;
