import React, { useState } from 'react';
import './Registro.css'; // Usamos los mismos estilos del proyecto
import { iniciarSesion } from './firebase/db_funciones'; // Importo mi función de Backend

const Login = () => {
  // Estados para guardar lo que el usuario escriba
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Función que se ejecuta al darle clic a "Entrar"
  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("Verificando credenciales en Firebase...");

    // Llamo a mi función de backend pasando los datos del formulario
    const resultado = await iniciarSesion(correo, password);

    // Reviso si mi función me devolvió éxito o error
    if (resultado.exito) {
      setMensaje(`✅ ¡Éxito! Bienvenido al sistema.`);
      // Aquí después Blanca puede agregar el código para cambiar a la pantalla de "Inicio"
    } else {
      setMensaje(`❌ ${resultado.mensajeError}`);
    }
  };

  return (
    <div className="registration-container">
      <h2>Iniciar Sesión</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input 
            type="email" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            placeholder="ejemplo@correo.com"
            required 
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="******"
            required 
          />
        </div>

        <button type="submit" className="submit-button">
          Entrar al Sistema
        </button>
      </form>

      {/* Muestro el mensaje de éxito o error forzando el color verde o rojo para que no se pierda en el fondo */}
      {mensaje && (
        <p style={{ marginTop: '20px', textAlign: 'center', fontWeight: 'bold', color: mensaje.includes('❌') ? 'red' : 'green', fontSize: '18px' }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default Login;