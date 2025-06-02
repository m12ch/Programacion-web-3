import pool from "../config/db.js";
import bcrypt from "bcrypt";

// Buscar admin por nombre de usuario
export const buscarClientePorUsuario = async (usuario) => {
    const [array] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return array[0];
};

// Crear un nuevo administrador
export const crearNuevoUsuario = async (usuario, password, nombres, apelldos, correo, genero, rol='cliente') => {
    const hash = await bcrypt.hash(password, 8);
    const [resultado] = await pool.query('INSERT INTO usuarios (usuario, password, nombres, apellidos, correo, genero, rol) VALUES (?, ?, ?, ?, ?, ?, ?)', [usuario, hash, nombres, apelldos, correo, genero, rol]);
    return resultado.insertId;
};

//verificar credenciales de administrador
export const verificarCredenciales = async (usuario, password) => {
    const cliente = await buscarClientePorUsuario(usuario)
    if (!cliente) return false;
    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const esValido = await bcrypt.compare(password, cliente.password);
    return esValido ? cliente : false;
};

export const actualizarUsuario = async (
  id,
  { usuario, password, nombres, apellidos, correo, genero }
) => {
  const campos = [];
  const valores = [];

  if (usuario) {
    campos.push("usuario = ?");
    valores.push(usuario);
  }

  if (nombres) {
    campos.push("nombres = ?");
    valores.push(nombres);
  }

  if (apellidos) {
    campos.push("apellidos = ?");
    valores.push(apellidos);
  }

  if (correo) {
    campos.push("correo = ?");
    valores.push(correo);
  }

  if (genero) {
    campos.push("genero = ?");
    valores.push(genero);
  }

  if (password && password !== '') {
    const hash = await bcrypt.hash(password, 8);
    campos.push("password = ?");
    valores.push(hash);
  }

  if (campos.length === 0) {
    throw new Error("No se proporcionaron datos para actualizar.");
  }

  valores.push(id);

  const [resultado] = await pool.query(
    `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`,
    valores
  );

  return resultado;
};


