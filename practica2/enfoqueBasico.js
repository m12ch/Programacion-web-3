//MARCELO ALVARO CHAMBI CHILLO
const mysql = require('mysql2');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

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
    function update() {
        rl.question('ID del usuario a actualizar: ', (id) => {
          rl.question('Nuevo nombre: ', (nombre) => {
            rl.question('Nuevo email: ', (email) => {
              // mide tiempo 
              console.time('Tiempo de UPDATE');
              
              // actualización
              const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
              connection.query(sql, [nombre, email, id], (err, result) => {
                console.timeEnd('Tiempo de UPDATE');
                
                if (err) throw err;
                console.log(`Filas afectadas: ${result.affectedRows}`);

                if (result.affectedRows === 0) {
                  console.log('No se encontró ningún usuario con ese ID');
                } else {
                  console.log('Usuario actualizado exitosamente');
                }
                
                // Mostrar los datos
                connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                  if (err) throw err;
                  console.log('Datos actualizados:', results[0]);
                  rl.question('¿Desea actualizar otro usuario? (s/n): ', (respuesta) => {
                    if (respuesta.toLowerCase() === 's') {
                      solicitarDatos();
                    } else {
                      connection.end();
                      rl.close();
                    }
                  });
                });
              });
            });
          });
        });
    }
    update();
});

