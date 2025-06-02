import { useState } from 'react';
import './styles/register.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    confirmPassword: '',
    nombres: '',
    apellidos: '',
    correo: '',
    genero: ''
  });

  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const evaluarFuerza = (password) => {
    const tieneMayus = /[A-Z]/.test(password);
    const tieneMinus = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[^A-Za-z0-9]/.test(password);

    if (password.length >= 10 && tieneMayus && tieneMinus && tieneNumero && tieneEspecial) {
      return 'Fuerte';
    } else if (password.length >= 8 && tieneMinus && tieneNumero) {
      return 'Media';
    } else {
      return 'Débil';
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      const fuerza = evaluarFuerza(value);
      setPasswordStrength(fuerza);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!captchaToken) {
      setError('Por favor completa el CAPTCHA');
      return;
    }

    if (!formData.usuario || !formData.password || !formData.confirmPassword || !formData.correo) {
      Swal.fire({
              icon: "error",
              title: "Error",
              text: "Todos los campos son obligatorios",
              timer: 1000
            });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:3007/usuario/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: formData.usuario,
          password: formData.password,
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          correo: formData.correo,
          genero: formData.genero,
          'g-recaptcha-response': captchaToken
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Ya puedes iniciar sesión.',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/login');
      });

      setError('');
      onRegister && onRegister(data);
    } catch (error) {
      setError('Error al registrar usuario.');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        timer: 2000
      });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Crear Cuenta</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label>Nombre de Usuario</label>
          <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Nombre de usuario" />
        </div>

        <div className="input-group">
          <label>Nombres</label>
          <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Ej: Juan" />
        </div>

        <div className="input-group">
          <label>Apellidos</label>
          <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Ej: Pérez" />
        </div>

        <div className="input-group">
          <label>Correo Electrónico</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="ejemplo@email.com" />
        </div>

        <div className="input-group-genero">
          <label>Género</label>
          <select name="genero" value={formData.genero} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
          {formData.password && (
            <small>Fuerza de la contraseña: <strong>{passwordStrength}</strong></small>
          )}
        </div>

        <div className="input-group">
          <label>Confirmar Contraseña</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
        </div>

        <div className="input-group">
          <ReCAPTCHA
            sitekey="6LfPjEsrAAAAABoCSE1trjE8pulyFgf00G2oosWL"
            onChange={handleCaptchaChange}
          />
        </div>

        <button type="submit" className="register-button">
          Registrarse
        </button>

        <div className="links">
          <span>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Register;
