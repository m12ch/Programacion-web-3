// CONSULTAS A LA BASE DE DATOS

import pool from '../config/db.js';

export const obtenerTodoDatos=async()=>{
    const [array]=await pool.query('SELECT * FROM libros');
    return array;
}
export const crearNuevos=async(titulo, autor, genero, anio_publicacion)=>{
    const [resultado]=await pool.query('INSERT INTO libros(titulo, autor, genero, anio_publicacion) VALUES(?,?,?,?)', [titulo, autor, genero, anio_publicacion]);
    return resultado.insertId;
}
export const editarDatos=async(id, titulo, autor, genero, anio_publicacion)=>{
    await pool.query('UPDATE libros SET titulo=?, autor=?, genero=?, anio_publicacion=? WHERE id=?', [titulo, autor, genero, anio_publicacion, id]);
}
export const BuscarRegistro=async(id)=>{
    const [array]=await pool.query('SELECT * FROM libros WHERE id=?', [id]);
    return array[0];
}
export const eliminarRegistro=async(id)=>{
    await pool.query('DELETE FROM libros WHERE id=?', [id]);
}