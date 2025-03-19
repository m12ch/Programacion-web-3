//MARCELO ALVARO CHAMBI CHILLO
const mysql = require('mysql2/promise');
console.time('Usando Promesas:');
async function main(){
    try{
        //conectar a la base de datos usando promesas
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'pract2'
        });
        console.log('conectado a la base de datos MySQL');

        //query usando promesas
        const[rows, fields] = await connection.execute('SELECT * FROM users');
        console.log('Query: ', rows);

        //finalizar coneccion
        console.timeEnd('Usando Promesas:');
        await connection.end();
    }catch(err){
        console.log('Error: ', err);
    }
}
main();