import { Router } from 'express';
import { generarReporteLogs } from '../controllers/pdfController.js';
import { verificarTokenAdmin } from '../middleware/authmiddleware.js';

const router = Router();
router.get('/admin/reporte-logs', verificarTokenAdmin, generarReporteLogs);

export default router;
