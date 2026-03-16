import React, { useState } from 'react';
import { QRCodeSVG } from "qrcode.react"; // <-- Corregido aquí
import "./Registro.css";

const ControlAcceso = () => {
  const [mascota, setMascota] = useState('');
  const [qrGenerado, setQrGenerado] = useState(false);
  const [accesoPermitido, setAccesoPermitido] = useState(null);

  const generarQR = (e) => {
    e.preventDefault();
    if (mascota.trim() !== '') {
      setQrGenerado(true);
      setAccesoPermitido(null);
    }
  };

  const validarAcceso = () => {
    if (qrGenerado) setAccesoPermitido(true);
    else setAccesoPermitido(false);
  };

  return (
    <div className="registration-container">
      <h2>Generación de QR y Control de Acceso</h2>

      <form onSubmit={generarQR}>
        <div className="form-group">
          <label>Nombre de la Mascota:</label>
          <input
            type="text"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
            required
          />
        </div>

        <button className="submit-button" type="submit">
          Generar QR
        </button>
      </form>

      {qrGenerado && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {/* Aquí es donde estaba el error, ya lo cambié por QRCodeSVG */}
          <QRCodeSVG value={mascota} size={180} /> 
          
          <p>QR generado para: <strong>{mascota}</strong></p>

          <button className="submit-button" onClick={validarAcceso}>
            Validar acceso al parque
          </button>
        </div>
      )}

      {accesoPermitido === true && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '15px' }}>
          Acceso permitido ✅
        </p>
      )}

      {accesoPermitido === false && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>
          Acceso denegado ❌
        </p>
      )}
    </div>
  );
};

export default ControlAcceso;