import mysql from 'mysql2';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda_ropa',
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 50,
    connectTimeout: 10000, // 10 segundos
    idleTimeout: 600000, //cierra conexiones inactivas después de 10 minutos
    enableKeepAlive: true, // Mantiene las conexiones vivas
}).promise();
export default pool;