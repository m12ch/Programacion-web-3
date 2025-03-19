//MARCELO ALVARO CHAMBI CHILLO
const mysql = require('mysql2');
console.time('Enfoque Basico:');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pract2'
});
// conectar al base de datos
connection.connect((err)=>{
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
    //query
    connection.query('SELECT * FROM users', (err, results, fields) =>{
        if(err) throw err;
        console.log(results);
    });
    console.timeEnd('Enfoque Basico:');
    connection.end();
});
