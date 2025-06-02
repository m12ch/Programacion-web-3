import { Router } from "express";
import { loginAdmin, logoutAdmin,crearAdmin } from "../controllers/authcontroller.js";
import { verificarTokenAdmin } from "../middleware/authmiddleware.js";

const router = Router();
// Ruta para iniciar sesión
router.post('/login', loginAdmin);
router.post('/logout', verificarTokenAdmin, logoutAdmin);
router.post('/register', crearAdmin);

export default router;

