import jwt from 'jsonwebtoken';

const SECRET_KEY = 'chambichillo';
const invalidTokens = new Set();

// Función para agregar tokens inválidos
export const addToBlacklist = (token) => {
    invalidTokens.add(token);
    console.log(`Token añadido a blacklist. Total: ${invalidTokens.size}`); // Debug
};

// Función para verificar tokens en blacklist
export const isTokenBlacklisted = (token) => {
    return invalidTokens.has(token);
};

export const verificarTokenAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
    }
    const token = authHeader.split(' ')[1];
    
    // Verifica si el token está en la blacklist
    if (isTokenBlacklisted(token)) {
        return res.status(401).json({ message: 'Sesión ya cerrada' });
    }
    try{
        const decode = jwt.verify(token, SECRET_KEY);
        if (!decode || decode.rol !== 'admin') {
            return res.status(403).json({message: 'Acceso denegado, No es administrador, acceso solo para administradores'});
        }
        req.usuario = decode;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

