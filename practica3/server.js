const express = require('express');
const cors = require('cors');
const pool = require('./database'); 

const app = express();
app.use(express.json()); 
app.use(cors()); 

// Ruta para agregar un libro
app.post('/agregar', async (req, res) => {
    const { nombre, autor, precio } = req.body;

    if (!nombre || !autor || !precio) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const [resultado] = await pool.query(
            'INSERT INTO libros (nombre, autor, precio) VALUES (?, ?, ?)',
            [nombre, autor, precio]
        );
        res.status(201).json({ message: "Libro agregado", id: resultado.insertId });
    } catch (error) {
        console.error("Error al insertar:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para obtener los libros
app.get('/libros', async (req, res) => {
    try {
        const [libros] = await pool.query('SELECT * FROM libros');
        res.json(libros);
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Editar un libro 
app.put('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, autor, precio } = req.body;

    if (!nombre || !autor || !precio) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const [resultado] = await pool.query(
            'UPDATE libros SET nombre = ?, autor = ?, precio = ? WHERE id = ?',
            [nombre, autor, precio, id]
        );
        if (resultado.affectedRows > 0) {
            res.json({ message: "Libro actualizado correctamente" });
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Eliminar un libro 
app.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [resultado] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);
        if (resultado.affectedRows > 0) {
            res.json({ message: "Libro eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
