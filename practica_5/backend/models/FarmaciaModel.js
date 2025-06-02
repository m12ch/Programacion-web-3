import conexion from '../config/db.js';

export const ObtenerMedicamentos = async() => {
    const [medicamento] = await conexion.query('SELECT * FROM medicamento');
    return medicamento;
}
export const CrearMedicamento = async(nombre, precio, stock) => {
    const [medicamento] = await conexion.query('INSERT INTO medicamento(nombre,precio,stock) VALUE(?,?,?)', [nombre, precio, stock])
    return { id: medicamento.insertId, nombre, precio, stock };
}
export const ActualizatMedicamento = async(id, nombre, precio, stock) => {
    await conexion.query('UPDATE medicamento SET nombre = ?,precio = ?,stock = ? WHERE id_medicamento = ?', [nombre, precio, stock, id]);
    return { message: 'Se actualizo correctamente' };
}
export const EliminarMedicamento = async(id) => {
    await conexion.query('DELETE FROM medicamento WHERE id_medicamento = ?', [id]);
    return { message: 'Se elimino correctamente' };
}