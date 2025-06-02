import pool from "..//config/db.js";

//obtener productos( solo algunos si el adm)
export const obtenerProductosAdmin = async () => {
    const [productos] = await pool.query(`SELECT * FROM productos`);
    return productos;
};
//obtener productos por categoria y genero
export const obtenerProductosPorCategoriayGenero = async (categoria, genero) => {
    const [productos] = await pool.query('SELECT id, nombre, descripcion, imagen, precio FROM productos WHERE categoria=? AND genero=?', [categoria, genero]);
    return productos;
};
export const crearNuevoProductoAdmin=async(nombre, descripcion, imagen, precio, categoria, genero)=>{
    const [resultado] = await pool.query('INSERT INTO productos(nombre, descripcion, imagen, precio, categoria, genero) VALUES(?,?,?,?,?,?)', [nombre, descripcion, imagen, precio, categoria, genero]);
    return resultado.insertId;
}
export const actualizarProductoAdmin=async(id, nombre, descripcion, imagen, precio, categoria, genero)=>{
    await pool.query('UPDATE productos SET nombre=?, descripcion=?, imagen=?, precio=?, categoria=?, genero=? WHERE id=?', [nombre, descripcion, imagen, precio, categoria, genero, id]);

}
export const BuscarRegistro = async(id)=>{
    const[array]=await pool.query('SELECT * FROM productos WHERE id=?', [id]);
    return array[0];
}
export const EliminarProductoAdmin=async(id)=>{
    await pool.query('DELETE FROM productos WHERE id=?', [id]);
}