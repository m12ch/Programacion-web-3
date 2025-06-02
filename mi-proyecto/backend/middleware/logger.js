export const logger = (req, res, next) => {
    const fecha = new Date().toISOString();
    const metodo = req.method;
    const ruta = req.originalUrl;
    const ip = req.ip;

    console.log(`[${fecha}] ${metodo} ${ruta} desde IP: ${ip}`);

    next();
};
