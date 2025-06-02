import pool from '../config/db.js';

export const registrarLogAcceso = async (usuario_id, ip, navegador, evento) =>{
    await pool.query(
        'INSERT INTO logs_acceso (usuario_id, ip, navegador, evento) VALUES (?, ?, ?, ?)',
        [usuario_id, ip, navegador, evento]
    );
}

export const obtenerLogsAcceso = async (usuario_id) => {
    const [logs] = await pool.query(
        'SELECT * FROM logs_acceso WHERE usuario_id = ? ORDER BY fecha_hora DESC',
        [usuario_id]
    );
    return logs;
}

export const obtenerTodosLogsAcceso = async () => {
    const [logs] = await pool.query(`SELECT us.usuario, 
            us.nombres, 
            us.apellidos, 
            us.correo, 
            us.genero, 
            lc.ip, 
            lc.evento, 
            lc.navegador, 
            lc.fecha_hora FROM logs_acceso lc, usuarios us WHERE lc.usuario_id = us.id ORDER BY fecha_hora DESC`);
    return logs;
}

export const obtenerLogsAccesoporUsuario = async (usuario_id) => {
    const [logs] = await pool.query(
        `SELECT 
            us.usuario, 
            us.nombres, 
            us.apellidos, 
            us.correo, 
            us.genero, 
            lc.ip, 
            lc.evento, 
            lc.navegador, 
            lc.fecha_hora 
        FROM 
            logs_acceso lc
        JOIN 
            usuarios us ON lc.usuario_id = us.id
        WHERE 
            lc.usuario_id = ?
        ORDER BY 
            lc.fecha_hora DESC`,
        [usuario_id]  // Parámetro para prevenir SQL injection
    );
    return logs;
};
export const obtenerResumenEventos = async () => {
    const [result] = await pool.query(`
        SELECT evento, COUNT(*) as cantidad 
        FROM logs_acceso 
        GROUP BY evento
    `);
    return result;
}