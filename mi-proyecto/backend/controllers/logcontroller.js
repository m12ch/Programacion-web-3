import * as Log from '../models/logmodel.js';

export const obtenerLogsPorUsuario = async (req, res) => {
    try{
        const { id } = req.params;
        const logs = await Log.obtenerLogsAccesoporUsuario(id);
        res.json(logs);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener los logs', error: error.message });
    }
}

export const obtenerLogs = async (req, res) => {
    try{
        const logs = await Log.obtenerTodosLogsAcceso();
        res.json(logs);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener los logs', error: error.message });
    }
}
export const obtenerResumenEventos = async (req, res) => {
  try {
    const result = await Log.obtenerResumenEventos();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el resumen', error: error.message });
  }
};
