import { Router } from "express";
import {obtenerProductos, getProductosPorCategoriayGenero, crearNuevoProducto, actualizarProducto, eliminarProducto} from "../controllers/controlador.js";
import { verificarTokenAdmin } from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const router = Router();
//ruta para obtener productos por categoria y genero Publico
router.get('/productos/:categoria/:genero', getProductosPorCategoriayGenero);


router.get('/admin/productos', verificarTokenAdmin, obtenerProductos);
router.post('/admin/productos', verificarTokenAdmin, upload.single('imagen'), crearNuevoProducto);
router.put('/admin/productos/:id', verificarTokenAdmin, upload.single('imagen'), actualizarProducto);
router.delete('/admin/productos/:id', verificarTokenAdmin, eliminarProducto);
export default router;
