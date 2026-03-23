import React, { useState } from 'react';
import "./Registro.css";


import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/config";

const Login = ({ cambiarVista }) => {
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!datos.email || !datos.password) {
      setMensaje("Todos los campos son obligatorios");
      setError(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, datos.email, datos.password);

      setMensaje("Acceso exitoso ✅");
      setError(false);
      
      setTimeout(() => {
        cambiarVista('acceso');
      }, 1000);

    } catch (err) {
      console.error(err);
      setMensaje("Correo o contraseña incorrectos ❌");
      setError(true);
    }
  };

  return (
    <div className="registration-container">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Correo:</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>

        <button className="submit-button" type="submit">
          Iniciar Sesión
        </button>
      </form>
      
      {mensaje && (
        <p style={{
          color: error ? 'red' : 'green',
          textAlign: 'center',
          marginTop: '10px'
        }}>
          {mensaje}
        </p>
      )}

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        ¿No tienes cuenta?
      </p>

      <button
        className="submit-button"
        onClick={() => cambiarVista('registro')}
      >
        Ir a Registro
      </button>
    </div>
  );
};

export default Login;