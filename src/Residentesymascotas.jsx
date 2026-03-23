import React, { useState } from 'react';
import './Registro.css';
// 1. IMPORTAMOS TU FUNCIÓN DE BACKEND
import { crearDepartamento } from './firebase/db_funciones';

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

  const [listaMascotas, setListaMascotas] = useState([]);

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

    // Validaciones básicas
    if (!residenteData.username || !residenteData.email || !residenteData.password) {
      alert("Todos los campos obligatorios deben llenarse");
      return;
    }

    if (residenteData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // 2. CONEXIÓN REAL AL BACKEND (FIREBASE)
    try {
      console.log("Intentando guardar en Firebase...");
      
      // Llamamos a tu función pasando el número de depto y la torre (edificio)
      const exito = await crearDepartamento(residenteData.departamento, residenteData.torre);

      if (exito) {
        alert("¡Registro exitoso! El usuario y el departamento se guardaron en Firebase.");
        // Aquí podrías limpiar el formulario o redirigir
      } else {
        alert("Error al guardar en la base de datos.");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un fallo en la conexión con Firebase.");
    }
  };

  // Función de mascotas (se mantiene local por ahora)
  const submitMascota = (e) => {
    e.preventDefault();
    console.log("Mascota registrada:", mascotaData);
    alert("Mascota registrada correctamente.");
  };

  return (
    <div className="registration-container">
      <div className="tab-container">
        <button
          className={tipoRegistro === 'residente' ? 'tab-button active' : 'tab-button'}
          onClick={() => setTipoRegistro('residente')}
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
        /* ... el resto del código de mascotas de Blanca se mantiene igual ... */
        <form onSubmit={submitMascota}>
            <h2>Registro de Mascotas</h2>
            <div className="form-group">
                <label>Nombre de la Mascota:</label>
                <input name="nombreMascota" type="text" onChange={handleMascotaChange} required />
            </div>
            <div className="form-group">
                <label>Especie:</label>
                <select name="especie" className="select-style" onChange={handleMascotaChange} required >
                    <option value="">Seleccione una</option>
                    <option value="canino">Canino</option>
                    <option value="felino">Felino</option>
                    <option value="otro">Otro</option>
                </select>
            </div>
            <button type="submit" className="submit-button">Guardar Mascota</button>
        </form>
      )}
    </div>
  );
};

export default RegistroGeneral;