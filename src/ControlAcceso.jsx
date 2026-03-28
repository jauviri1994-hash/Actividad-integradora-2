import React, { useState } from 'react';
import { QRCodeSVG } from "qrcode.react"; 
import "./Registro.css";
// IMPORTACIONES NUEVAS PARA EL BACKEND
// Importo las herramientas para buscar un documento específico en Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config"; // Importo mi conexión a la base de datos

const ControlAcceso = () => {
  const [mascotaId, setMascotaId] = useState(''); // Ahora pido el ID, no el nombre
  const [nombreReal, setNombreReal] = useState(''); // Guardo el nombre que me devuelva Firebase
  const [qrGenerado, setQrGenerado] = useState(false);
  const [accesoPermitido, setAccesoPermitido] = useState(null);
  const [mensaje, setMensaje] = useState(''); // Mensajes de error o carga

  // --- FUNCIÓN CONECTADA A MI BACKEND ---
  const generarQR = async (e) => {
    e.preventDefault();
    if (mascotaId.trim() === '') return;

    setMensaje("Buscando mascota en la base de datos...");
    setQrGenerado(false);
    setAccesoPermitido(null);

    try {
      // Creo la referencia para buscar exactamente ese ID en mi colección "mascotas"
      const mascotaRef = doc(db, "mascotas", mascotaId.trim());
      const mascotaSnap = await getDoc(mascotaRef);

      // Verifico si el ID realmente existe en Firebase
      if (mascotaSnap.exists()) {
        // Extraigo el nombre real de la base de datos
        const datosMascota = mascotaSnap.data();
        setNombreReal(datosMascota.nombreMascota);
        setQrGenerado(true);
        setMensaje(""); // Limpio el mensaje
      } else {
        setMensaje("❌ ID no encontrado. Verifica que lo hayas copiado bien.");
      }
    } catch (error) {
      console.error("Error al buscar en Firebase:", error);
      setMensaje("❌ Hubo un error de conexión con la base de datos.");
    }
  };

  const validarAcceso = () => {
    if (qrGenerado) setAccesoPermitido(true);
    else setAccesoPermitido(false);
  };

  return (
    <div className="registration-container">
      {/* Actualicé el título para que sea más limpio */}
      <h2>Control de acceso</h2>

      <form onSubmit={generarQR}>
        <div className="form-group">
          <label>ID de la Mascota (Firestore):</label>
          <input
            type="text"
            value={mascotaId}
            onChange={(e) => setMascotaId(e.target.value)}
            placeholder="Pega aquí el ID largo..."
            required
          />
        </div>

        {/* Actualicé el texto del botón principal */}
        <button className="submit-button" type="submit">
          Verificar ID o acceso
        </button>
      </form>

      {/* Muestro los mensajes de estado de mi base de datos */}
      {mensaje && (
        <p style={{ color: mensaje.includes('❌') ? 'red' : '#0a7a71', textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>
          {mensaje}
        </p>
      )}

      {/* Si el ID es válido en mi base de datos, dibujo el QR de Blanca */}
      {qrGenerado && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <QRCodeSVG value={mascotaId} size={180} /> 
          
          <p style={{ marginTop: '15px' }}>
            QR oficial generado para: <br/>
            <strong style={{ fontSize: '20px', color: '#0a7a71' }}>{nombreReal}</strong>
          </p>

          <button className="submit-button" onClick={validarAcceso} style={{ marginTop: '10px' }}>
            Validar acceso al parque
          </button>
        </div>
      )}

      {accesoPermitido === true && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '15px', fontWeight: 'bold', fontSize: '18px' }}>
          Acceso permitido ✅
        </p>
      )}

      {accesoPermitido === false && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '15px', fontWeight: 'bold', fontSize: '18px' }}>
          Acceso denegado ❌
        </p>
      )}
    </div>
  );
};

export default ControlAcceso;