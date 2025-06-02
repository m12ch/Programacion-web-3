import { Router } from "express";
import { registrarUsuario, loginUsuario, logOutUsuario ,editarPerfilCliente } from '../controllers/usercontroller.js';
import { verificarCaptcha } from '../middleware/captchamiddleware.js';
import { evaluarFuerzaContrasena } from '../middleware/fuerzacontraseñas.js';
import { verificarTokenUsuario } from '../middleware/usermiddleware.js';

const router = Router();

router.post('/register', verificarCaptcha, evaluarFuerzaContrasena, registrarUsuario);
router.post('/login', verificarCaptcha, loginUsuario);
router.post('/logout', verificarTokenUsuario, logOutUsuario);  
router.put('/edit/:id', verificarTokenUsuario, editarPerfilCliente)
export default router;