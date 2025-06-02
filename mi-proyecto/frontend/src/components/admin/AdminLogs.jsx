import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AdminLog = () => {
  const [logs, setLogs] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const obtenerLogs = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3007/logs/admin/logs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!res.ok) throw new Error('No se pudo obtener los logs');

      const data = await res.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
      Swal.fire('Error', err.message, 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerLogs();
  }, []);
  const descargarReportePDF = async () => {
    try {
        const res = await fetch('http://localhost:3007/logs/admin/reporte-logs', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });

        if (!res.ok) throw new Error('No se pudo descargar el PDF');

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'reporte_logs.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        Swal.fire('Error', err.message, 'error');
    }
    };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registros de Acceso</h2>
        <Button onClick={descargarReportePDF} variant="primary" className="mb-3">
            Descargar reporte PDF
        </Button>
      {cargando && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!cargando && !error && logs.length === 0 && (
        <Alert variant="info">No hay registros de acceso disponibles.</Alert>
      )}

      {!cargando && logs.length > 0 && (
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Usuario</th>
                <th>Nombre completo</th>
                <th>Correo</th>
                <th>Género</th>
                <th>IP</th>
                <th>Evento</th>
                <th>Navegador</th>
                <th>Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.usuario}</td>
                  <td>{`${log.nombres} ${log.apellidos}`}</td>
                  <td>{log.correo}</td>
                  <td>{log.genero}</td>
                  <td>{log.ip}</td>
                  <td>{log.evento}</td>
                  <td>{log.navegador}</td>
                  <td>{new Date(log.fecha_hora).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminLog;
