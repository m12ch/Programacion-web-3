import * as FarmaModel from '../models/FarmaciaModel.js';

export const obtenerMedicinas = async(req, res) => {
    try {
        const medicamentos = await FarmaModel.ObtenerMedicamentos();
        res.json(medicamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const CrearMedicamentos = async(req, res) => {
    try {
        const { nombre, precio, stock } = req.body;
        const medicamento = await FarmaModel.CrearMedicamento(nombre, precio, stock);
        res.status(201).json(medicamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const ActualizatMedicamentos = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;

        const medicamento = await FarmaModel.ActualizatMedicamento(id, nombre, precio, stock);
        res.status(201).json(medicamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const EliminarMedicamentos = async(req, res) => {
    try {
        const { id } = req.params;
        const medicamento = await FarmaModel.EliminarMedicamento(id);
        res.status(201).json(medicamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}