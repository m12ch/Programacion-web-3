export const evaluarFuerzaContrasena = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: "Contraseña requerida" });
    }

    const fuerza = evaluar(password);

    req.fuerza = fuerza; // Se pasa al controlador
    next();
};

const evaluar = (password) => {
    const longitud = password.length;
    const tieneMayusculas = /[A-Z]/.test(password);
    const tieneMinusculas = /[a-z]/.test(password);
    const tieneNumeros = /\d/.test(password);
    const tieneEspeciales = /[\W_]/.test(password);

    if (longitud < 6) return "débil";
    if (longitud >= 6 && tieneMayusculas && tieneMinusculas && tieneNumeros) {
        return tieneEspeciales ? "fuerte" : "intermedio";
    }
    return "débil";
};
