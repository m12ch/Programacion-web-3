import mysql from 'mysql2';
const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'tarea3crud'
}).promise(); 
export default pool;
