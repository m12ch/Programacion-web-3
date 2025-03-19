//MARCELO ALVARO CHAMBI CHILLO
const mysql = require('mysql2');
//tiempo de ejecucion
console.time('Agrupamiento por conexiones');
// crear conexion pool
const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pract2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//query a la base de datos usando la conexion pool
pool.query('SELECT * FROM users', (err, results, fields) =>{
    if(err) throw err;
    console.log(results);
    console.timeEnd('Agrupamiento por conexiones');
    pool.end();
});