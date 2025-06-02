//ENLACE CON EL MODELO

import * as Libro from '../model/modelo.js';

export const obtenerDatos = async(req, res)=>{
    try{
        const lib= await Libro.obtenerTodoDatos();
        res.status(200).json(lib);
    }catch(error){
        res.status(500).json({message:'Error al obtener los datos',message: error.message});
    }
}
export const crearNew = async(req, res)=>{
    try{
        const {titulo, autor, genero, anio_publicacion} = req.body;
        const newlib = await Libro.crearNuevos(titulo, autor, genero, anio_publicacion);
        res.status(201).json({id: newlib, message: 'Creado correctamente'});
    }catch(error){
        res.status(500).json({message: 'Error al caragar los datos', error: error.message})
    }
}
export const actualizarNewDatos=async(req, res)=>{
    try{
        const {id} = req.params;
        const lib = await Libro.BuscarRegistro(id);
        if(!lib) return res.status(404).json({message: 'Dato NO encontrado'});
        await Libro.editarDatos(id, req.body.titulo, req.body.autor, req.body.genero, req.body.anio_publicacion);
        res.status(200).json({message: 'Actualizado correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al actualizar los datos', error: error.message})
    }
}
export const eliminarReg = async(req, res)=>{
    try{
        const {id} = req.params;
        const buscar = await Libro.BuscarRegistro(id);
        if(!buscar) return res.status(404).json({message: 'Regstro NO encontrado'});
        await Libro.eliminarRegistro(id);
        res.status(200).json({message: 'Registro eliminado correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).jsin({message: 'Error al elimiar el registro', error: error.message});
    }
}