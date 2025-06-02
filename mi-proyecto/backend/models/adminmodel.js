import pool from "../config/db.js";
import bcrypt from "bcrypt";

// Buscar admin por nombre de usuario
export const buscarAdminPorUsuario = async (usuario) => {
    const [array] = await pool.query('SELECT * FROM administradores WHERE usuario = ?', [usuario]);
    return array[0];
};

// Crear un nuevo administrador
export const crearNuevoadmin = async (usuario, password) => {
    const hash = await bcrypt.hash(password, 15);
    const [resultado] = await pool.query('INSERT INTO administradores (usuario, password) VALUES (?, ?)', [usuario, hash]);
    return resultado.insertId;
};

//verificar credenciales de administrador
export const verificarCredenciales = async (usuario, password) => {
    const admin = await buscarAdminPorUsuario(usuario)
    if (!admin) return false;
    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const esValido = await bcrypt.compare(password, admin.password);
    return esValido ? admin : false;
};



