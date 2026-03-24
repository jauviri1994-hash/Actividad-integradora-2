import React, { useState } from 'react';
import RegistroGeneral from './Residentesymascotas.jsx';
import ControlAcceso from './ControlAcceso.jsx';
// Importo mi nueva pantalla de Login que acabo de crear para probar mi backend
import Login from './Login.jsx'; 

function App() {
  // Inicializamos la vista en 'login' para que sea la primera pantalla al entrar
  const [vista, setVista] = useState('login');

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button onClick={() => setVista('registro')} style={{ marginRight: 10 }}>
          Registro
        </button>

        <button onClick={() => setVista('acceso')} style={{ marginRight: 10 }}>
          Control de acceso
        </button>

        {/* Agrego el botón para poder acceder a mi módulo de Login */}
        <button onClick={() => setVista('login')}>
          Iniciar Sesión
        </button>
      </div>

      {/* Aquí controlo qué pantalla se muestra dependiendo del botón que se presione */}
      {vista === 'registro' && <RegistroGeneral />}
      {vista === 'acceso' && <ControlAcceso />}
      {/* Muestro mi componente de Login y le paso la función para cambiar de vista si Blanca lo requiere */}
      {vista === 'login' && <Login cambiarVista={setVista} />} 
    </div>
  );
}

export default App;