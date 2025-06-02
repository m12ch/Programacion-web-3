import * as Usuario from '../models/usermodel.js';
import * as Log from '../models/logmodel.js';
import jwt from 'jsonwebtoken';
import userAgent from 'express-useragent';

const SECRET_KEY = "chambichillo";

export const registrarUsuario = async (req, res) => {
    try{
        const {usuario, password, nombres, apellidos, correo, genero} = req.body;
        if (!usuario || !password) {
            return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
        }

        const usuarioExistente = await Usuario.buscarClientePorUsuario(usuario);
        if (usuarioExistente) return res.status(409).json({ message: "El usuario ya existe" });
       
        const nuevoUsuario = await Usuario.crearNuevoUsuario(usuario, password, nombres, apellidos, correo, genero);
        res.status(201).json({ id: nuevoUsuario, message: "Usuario creado exitosamente", fuerza: req.fuerza });

    }catch(error){
        res.status(500).json({ error: 'Error al registrar el usuario', error: error.message });
    }
}

export const loginUsuario = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const cliente = await Usuario.verificarCredenciales(usuario, password);
        if (!cliente) return res.status(401).json({ message: "Credenciales incorrectas" });

        // Genera un token JWT
        const token = jwt.sign({ id: cliente.id, usuario: cliente.usuario, rol: 'cliente' }, SECRET_KEY, { expiresIn: "2h" });

        // Registra el acceso
        const ip = req.ip;
        const navegador = userAgent.parse(req.headers['user-agent']).browser;
        await Log.registrarLogAcceso(cliente.id, ip, navegador, 'ingreso');

        res.json({ token, message: "Bienvenido de nuevo", usuario: {id: cliente.id, usuario: cliente.usuario, rol:'cliente', nombres: cliente.nombres, apellidos: cliente.apellidos, correo: cliente.correo, genero: cliente.genero} });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión', error: error.message });
    }
}

export const logOutUsuario = async (req, res) => {
    try{
        const { id } = req.usuario;
        const ip = req.ip;
        const browser = req.headers['user-agent'] || 'Desconocido';
        
        await Log.registrarLogAcceso(id, ip, browser, 'salida');
        res.json({ message: "Sesión cerrada exitosamente" });
    }catch(error){
        console.error("Error en el logoutusuario:", error);
        res.status(500).json({ error: 'Error al cerrar sesión', error: error.message });
    }
}
export const editarPerfilCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica que el usuario autenticado sea el dueño del perfil
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.id != id) return res.status(403).json({ message: "Acceso denegado" });

    // Evita que se cambie el rol desde el frontend
    if (req.body.rol) delete req.body.rol;

    // Verifica que el nuevo nombre de usuario no esté en uso (si es diferente al actual)
    if (req.body.usuario) {
      const clienteExistente = await Usuario.buscarClientePorUsuario(req.body.usuario);
      if (clienteExistente && clienteExistente.id != id) {
        return res.status(400).json({ message: "Ese nombre de usuario ya está en uso" });
      }
    }

    const resultado = await Usuario.actualizarUsuario(id, req.body);
    res.json({ message: "Perfil actualizado correctamente", resultado });

  } catch (error) {
    console.error("Error al editar perfil:", error.message);
    res.status(500).json({ message: "Error al editar perfil", error: error.message });
  }
};