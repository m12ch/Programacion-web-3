import express from 'express';
import rutas from './routes/rutas.js';
import authRutas from './routes/authroutes.js';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userroutes.js';
import logRoutes from './routes/logroutes.js';

const app = express();
const PORT = 3007;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 para leer formularios tipo x-www-form-urlencoded

app.use(cors({origin: 'http://localhost:5173'}));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/auth', authRutas);
app.use('/api', rutas);
app.use('/usuario', userRoutes);
app.use('/logs', logRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el Puerto: ${PORT} ➜ http://localhost:${PORT}`);
});
