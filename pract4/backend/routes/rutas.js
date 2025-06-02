import { Router } from "express";
import { obtenerDatos, crearNew, actualizarNewDatos, eliminarReg } from "../controller/controlador.js";

const router= Router();
router.get('/libros', obtenerDatos);
router.post('/libros', crearNew);
router.put('/libros/:id', actualizarNewDatos);
router.delete('/libros/:id', eliminarReg);

export default router;