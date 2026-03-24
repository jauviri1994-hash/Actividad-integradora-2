import React, { useState } from 'react';
import RegistroGeneral from './Residentesymascotas.jsx';
import ControlAcceso from './ControlAcceso.jsx';
// Importo mi nueva pantalla de Login que acabo de crear para probar mi backend
import Login from './Login.jsx'; 

function App() {
  const [vista, setVista] = useState('registro');

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
      {vista === 'login' && <Login />} {/* Muestro mi componente de Login cuando sea seleccionado */}
    </div>
  );
}

export default App;