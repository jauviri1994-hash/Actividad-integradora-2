import React, { useState } from 'react';
import './Registro.css';

const RegistroGeneral = () => {
    const [tipoRegistro, setTipoRegistro] = useState('residente');

    const [residenteData, setResidenteData] = useState({
    username: '', email: '', torre: '', departamento: '', mascotas: 0
  });

  const [mascotaData, setMascotaData] = useState({
    nombreMascota: '', especie: '', raza: '', edad: '', idDueno: ''
  });

    const handleResidenteChange = (e) => {
    setResidenteData({ ...residenteData, [e.target.name]: e.target.value });
  };

  const handleMascotaChange = (e) => {
    setMascotaData({ ...mascotaData, [e.target.name]: e.target.value });
  };

    const submitResidente = (e) => {
    e.preventDefault();
    console.log("Residente registrado:", residenteData);
    alert("Residente registrado con éxito");
  };

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
        <form onSubmit={submitMascota}>
          <h2>Registro de Mascotas</h2>
          <div className="form-group">
            <label>Nombre de la Mascota:</label>
            <input name="nombreMascota" type="text" onChange={handleMascotaChange} required />
          </div>
          <div className="form-group">
            <label>Especie:</label>
            <select name="especie" className="select-style" onChange={handleMascotaChange} required>
              <option value="">Seleccione una</option>
              <option value="canino">Canino</option>
              <option value="felino">Felino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Raza:</label>
            <input name="raza" type="text" onChange={handleMascotaChange} />
          </div>
          <div className="form-group">
            <label>Edad (años):</label>
            <input name="edad" type="number" onChange={handleMascotaChange} />
          </div>
          <button type="submit" className="submit-button">Guardar Mascota</button>
        </form>
      )}
    </div>
  );
};

export default RegistroGeneral;