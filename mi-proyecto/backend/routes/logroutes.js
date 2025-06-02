import { Router } from "express";
import {obtenerLogs, obtenerLogsPorUsuario, obtenerResumenEventos} from '../controllers/logcontroller.js';
import {verificarTokenAdmin} from '../middleware/authmiddleware.js';
import { generarReporteLogsPDF } from '../controllers/pdfController.js';


const router = Router();

router.get('/admin/reporte-logs', verificarTokenAdmin, generarReporteLogsPDF);
router.get('/admin/logs', verificarTokenAdmin, obtenerLogs);
router.get('/admin/logs/:id', verificarTokenAdmin, obtenerLogsPorUsuario);
router.get('/admin/resumen-eventos', verificarTokenAdmin, obtenerResumenEventos);

export default router;