import React, { useState } from 'react';
import './Registro.css';
// 1. IMPORTAMOS MIS FUNCIONES DE BACKEND
import { crearDepartamento, registrarMascota } from './firebase/db_funciones';
// Importo la librería que acabo de instalar para generar el QR (Historia PPL-03)
import { QRCodeCanvas } from 'qrcode.react'; 

const RegistroGeneral = () => {
  const [tipoRegistro, setTipoRegistro] = useState('residente');

  const [residenteData, setResidenteData] = useState({
    username: '',
    email: '',
    password: '',
    torre: '',
    departamento: '',
    mascotas: 0
  });

  const [mascotaData, setMascotaData] = useState({
    nombreMascota: '',
    especie: '',
    raza: '',
    edad: '',
    idDueno: ''
  });

  // Estado para guardar el ID de la mascota recién registrada y generar su QR
  const [qrMascotaId, setQrMascotaId] = useState(null);

  const handleResidenteChange = (e) => {
    setResidenteData({
      ...residenteData,
      [e.target.name]: e.target.value
    });
  };

  const handleMascotaChange = (e) => {
    setMascotaData({
      ...mascotaData,
      [e.target.name]: e.target.value
    });
  };

  const submitResidente = async (e) => {
    e.preventDefault();

    if (!residenteData.username || !residenteData.email || !residenteData.password) {
      alert("Todos los campos obligatorios deben llenarse");
      return;
    }

    if (residenteData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      console.log("Intentando guardar en Firebase...");
      const exito = await crearDepartamento(residenteData.departamento, residenteData.torre);

      if (exito) {
        alert("¡Registro exitoso! El usuario y el departamento se guardaron en Firebase.");
      } else {
        alert("Error al guardar en la base de datos.");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un fallo en la conexión con Firebase.");
    }
  };

  // --- FUNCIÓN PARA REGISTRAR MASCOTAS Y GENERAR QR (HISTORIAS PPL-02 y PPL-03) ---
  const submitMascota = async (e) => {
    e.preventDefault();
    
    if (!mascotaData.nombreMascota || !mascotaData.especie) {
      alert("Por favor, llena los campos obligatorios de la mascota.");
      return;
    }

    try {
      console.log("Enviando mascota a mi base de datos en Firebase...");
      const resultado = await registrarMascota(mascotaData);

      if (resultado.exito) {
        alert("✅ ¡Éxito! Mascota registrada en el sistema.\n\n⚠️ COPIA ESTE ID PARA GENERAR SU QR:\n" + resultado.id);
        
        // ¡AQUÍ CUMPLO MI TAREA DE BACKEND! Asocio el ID único de la base de datos al QR
        setQrMascotaId(resultado.id); 
        
        // Limpio el formulario
        setMascotaData({
          nombreMascota: '',
          especie: '',
          raza: '',
          edad: '',
          idDueno: ''
        });
      } else {
        alert("❌ Error al registrar: " + resultado.mensajeError);
      }
    } catch (error) {
      console.error("Error en el registro de mascota:", error);
      alert("Hubo un fallo en mi conexión con Firebase.");
    }
  };

  return (
    <div className="registration-container">
      <div className="tab-container">
        <button
          className={tipoRegistro === 'residente' ? 'tab-button active' : 'tab-button'}
          onClick={() => {
            setTipoRegistro('residente');
            setQrMascotaId(null); // Oculto el QR si cambio de pestaña
          }}
        >
          Residente
        </button>
        <button
          className={tipoRegistro === 'mascota' ? 'tab-button active' : 'tab-button'}
          onClick={() => setTipoRegistro('mascota')}
        >
          Mascota
        </button>
      </div>

      {tipoRegistro === 'residente' ? (
        <form onSubmit={submitResidente}>
          <h2>Registro de Usuarios</h2>
          <div className="form-group">
            <label>Nombre de Usuario:</label>
            <input name="username" type="text" onChange={handleResidenteChange} required />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input name="email" type="email" onChange={handleResidenteChange} required />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input name="password" type="password" onChange={handleResidenteChange} required />
          </div>
          <div className="form-group">
            <label>Torre:</label>
            <input name="torre" type="text" onChange={handleResidenteChange} placeholder="Ej: Torre A" required />
          </div>
          <div className="form-group">
            <label>Departamento:</label>
            <input name="departamento" type="text" onChange={handleResidenteChange} placeholder="Ej: 101" required />
          </div>
          <div className="form-group">
            <label>Cantidad de Mascotas:</label>
            <input name="mascotas" type="number" min="0" onChange={handleResidenteChange} defaultValue="0" />
          </div>
          <button type="submit" className="submit-button">Finalizar Registro</button>
        </form>
      ) : (
        <div>
          <form onSubmit={submitMascota}>
              <h2>Registro de Mascotas</h2>
              <div className="form-group">
                  <label>Nombre de la Mascota:</label>
                  <input name="nombreMascota" type="text" value={mascotaData.nombreMascota} onChange={handleMascotaChange} required />
              </div>
              <div className="form-group">
                  <label>Especie:</label>
                  <select name="especie" className="select-style" value={mascotaData.especie} onChange={handleMascotaChange} required >
                      <option value="">Seleccione una</option>
                      <option value="canino">Canino</option>
                      <option value="felino">Felino</option>
                      <option value="otro">Otro</option>
                  </select>
              </div>
              <button type="submit" className="submit-button">Guardar Mascota</button>
          </form>

          {/* --- SECCIÓN DEL CÓDIGO QR --- */}
          {/* Si ya tengo un ID de mascota exitoso de mi base de datos, dibujo el QR */}
          {qrMascotaId && (
            <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', backgroundColor: '#f0f9f9', borderRadius: '10px', border: '2px dashed #0a7a71' }}>
              <h3 style={{ color: '#0a7a71', marginTop: 0 }}>¡QR Generado con Éxito!</h3>
              <QRCodeCanvas value={qrMascotaId} size={150} />
              <p style={{ fontSize: '12px', color: '#555', marginTop: '10px', wordBreak: 'break-all' }}>
                <strong>ID Firestore:</strong> {qrMascotaId}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegistroGeneral;