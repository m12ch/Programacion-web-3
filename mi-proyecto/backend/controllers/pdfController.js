import PDFDocument from 'pdfkit';
import * as Log from '../models/logmodel.js'; // Asegúrate de que la ruta sea correcta

export const generarReporteLogsPDF = async (req, res) => {
  try {
    const logs = await Log.obtenerTodosLogsAcceso();

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    let filename = "reporte_logs.pdf";

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
    
    doc.pipe(res);

    doc.fontSize(16).text('Reporte de Logs de Acceso', { align: 'center' });
    doc.moveDown();

    logs.forEach((log, i) => {
      doc.fontSize(10).text(`${i + 1}. ${log.usuario} | ${log.nombres} ${log.apellidos} | ${log.correo} | IP: ${log.ip} | ${log.evento} | ${log.navegador} | ${new Date(log.fecha_hora).toLocaleString()}`);
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el PDF', error: error.message });
  }
};

