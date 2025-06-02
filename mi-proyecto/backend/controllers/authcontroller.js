import jwt from 'jsonwebtoken';
import * as auth from '../models/adminmodel.js';
import { addToBlacklist } from '../middleware/authmiddleware.js';
import axios from 'axios';

const SECRET_KEY = "chambichillo";
const CAPTCHA_SECRET_KEY = '6LfPjEsrAAAAADCp9qv9ni0bCZ4vF87m7ImKsFQg';

// Función para iniciar sesión del administrador (con verificación CAPTCHA)
export const loginAdmin = async (req, res) => {
    const { usuario, password, 'g-recaptcha-response': captchaToken } = req.body;

    if (!usuario || !password || !captchaToken) {
        return res.status(400).json({ message: "Usuario, contraseña y CAPTCHA son requeridos" });
    }

    try {
        // Verificar el CAPTCHA
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${captchaToken}`
        );
        const data = response.data;
        if (!data.success) {
            return res.status(403).json({ message: "Captcha inválido" });
        }

        // Verificar credenciales del admin
        const admin = await auth.verificarCredenciales(usuario, password);
        if (!admin) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = jwt.sign({ id: admin.id, usuario: admin.usuario, rol: 'admin' }, SECRET_KEY, { expiresIn: "2h" });

        res.json({ token, message: "Bienvenido de nuevo" });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión', detalle: error.message });
    }
};

// Logout del administrador
export const logoutAdmin = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(400).json({ success: false, message: "Token no proporcionado" });
    }

    try {
        addToBlacklist(token);
        res.json({ success: true, message: "Sesión cerrada exitosamente" });
    } catch (error) {
        console.error("Error en logout:", error);
        res.status(500).json({ success: false, message: "Error al cerrar sesión" });
    }
};

// Crear un nuevo administrador
export const crearAdmin = async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
    }

    try {
        const adminExistente = await auth.buscarAdminPorUsuario(usuario);
        if (adminExistente) {
            return res.status(409).json({ message: "El administrador ya existe" });
        }

        const nuevoAdmin = await auth.crearNuevoadmin(usuario, password);
        res.status(201).json({ id: nuevoAdmin, message: "Administrador creado exitosamente" });
    } catch (error) {
        console.error('Error al crear el administrador:', error);
        res.status(500).json({ error: 'Error al registrar el administrador', detalle: error.message });
    }
};
