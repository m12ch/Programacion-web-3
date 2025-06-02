import jwt from 'jsonwebtoken';
const SECRET_KEY = 'chambichillo';

export const verificarTokenUsuario = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token, SECRET_KEY);
        
        if (!decode || decode.rol !== 'cliente') {
            return res.status(403).json({ message: 'Acceso denegado, No es usuario' });
        }
        req.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}