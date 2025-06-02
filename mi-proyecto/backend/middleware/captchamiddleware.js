import axios from 'axios';

const SECRET_KEY = '6LfPjEsrAAAAADCp9qv9ni0bCZ4vF87m7ImKsFQg';

export const verificarCaptcha = async (req, res, next) => {
  const token = req.body['g-recaptcha-response'];
  if (!token) return res.status(400).json({ message: 'Captcha no enviado' });

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`
    );
    const data = response.data;
    if (!data.success) return res.status(403).json({ message: 'Captcha inválido' });
    next();
  } catch (error) {
    console.error('Error verificando el captcha:', error);
    res.status(500).json({ message: 'Error verificando captcha' });
  }
};
