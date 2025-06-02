import express from 'express';
import { obtenerMedicinas, CrearMedicamentos, ActualizatMedicamentos, EliminarMedicamentos } from '../controllers/FarmaciaController.js'
const routes = express.Router();

routes.get('/', obtenerMedicinas);
routes.post('/', CrearMedicamentos);
routes.put('/:id', ActualizatMedicamentos);
routes.delete('/:id', EliminarMedicamentos);
export default routes;