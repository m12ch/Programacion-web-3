import * as Producto from '../models/modelo.js';

//obtener productos administrador
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.obtenerProductosAdmin();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

//obtener productos por categoria y genero
export const getProductosPorCategoriayGenero = async (req, res) => {
    try{
        const { categoria, genero} = req.params;
        const productos = await Producto.obtenerProductosPorCategoriayGenero(categoria, genero);
        res.json(productos);
    }catch(error){
        console.error('Error al obtener productos por categoria y genero:', error);
        res.status(500).json({ error: 'Error al obtener productos por categoria y genero' });
    }
}

export const crearNuevoProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, genero } = req.body;
        const imagen = req.file ? req.file.filename : null;

        if (!nombre || !descripcion || !precio || !categoria || !genero || !imagen) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newProduct = await Producto.crearNuevoProductoAdmin(nombre, descripcion, imagen, precio, categoria, genero);
        res.status(201).json({ id: newProduct, message: 'Producto creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.BuscarRegistro(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        const { nombre, descripcion, precio, categoria, genero } = req.body;
        const imagen = req.file ? req.file.filename : producto.imagen; // si no se envía nueva imagen, conservar la anterior

        await Producto.actualizarProductoAdmin(id, nombre, descripcion, imagen, precio, categoria, genero);
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try{
        const {id}= req.params;
        const buscar = await Producto.BuscarRegistro(id);
        if(!buscar) return res.status(404).json({message: 'Producto no encontrado'});
        await Producto.EliminarProductoAdmin(id);
        res.status(200).json({message: 'Producto eliminado exitosamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al eliminar el producto', error: error.message});
    }
}

