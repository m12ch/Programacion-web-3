//MARCELO ALVARO CHAMBI CHILLO
const mysql = require('mysql2/promise');
const readline=require('readline');

const rl = readline.createInterface({
    input: process.stdin,//Usa la entrada estándar del sistema (teclado).
    output: process.stdout //Usa la salida estándar del sistema (pantalla/terminal).
});

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
        const resultado = await connection.query(
            'INSERT INTO product(nombreprod, descripcion, stock, precio) VALUES(?, ?, ?, ?)',
            ['pepsi', 'gaseosa', '15', '19']
        );
        console.log('Id del nuevo Registro: ', resultado[0].insertId);
        //query usando promesas
        const[rows, fields] = await connection.execute('SELECT * FROM product');
        console.log('Query: ', rows);

        //finalizar coneccion
        console.timeEnd('Usando Promesas:');

        const id = await new Promise(resolve => {
            rl.question('Ingresa el ID del producto que deseas actualizar: ', resolve);
        });
        
        const nombre = await new Promise(resolve => {
            rl.question('Ingresa el nuevo nombre: ', resolve);
        });
        
        const descripcion = await new Promise(resolve => {
            rl.question('Ingresa la nueva descripcion: ', resolve);
        });
        
        const stock = await new Promise(resolve => {
            rl.question('Ingresa el stock nuevo: ', resolve);
        });
        
        const precio = await new Promise(resolve => {
            rl.question('Ingresa el nuevo precio: ', resolve);
        });
        
        console.time('tiempo update')
        await connection.query(
            'UPDATE product SET nombreprod = ?, descripcion = ?, stock = ?, precio = ? WHERE idp = ?',
            [nombre, descripcion, stock, precio, id]
        );
        console.log('Registro actualizado correctamente.');

        const [array] = await connection.query('SELECT * FROM product'); // Corregido: 'estudiante' -> 'product'
        console.log('Registros actualizados:', array);
        await connection.end();
        rl.close();
        console.timeEnd('tiempo update');
    }catch(err){
        console.log('Error: ', err);

    }
}
main();