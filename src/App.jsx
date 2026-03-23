import React, { useState } from 'react';
import RegistroGeneral from './Residentesymascotas.jsx';
import ControlAcceso from './ControlAcceso.jsx';
import Login from './Login.jsx';

function App() {
  const [vista, setVista] = useState('login');

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setVista('login')} style={{ marginRight: 10 }}>
          Login
        </button>

        <button onClick={() => setVista('registro')} style={{ marginRight: 10 }}>
          Registro
        </button>

        <button onClick={() => setVista('acceso')}>
          Control de acceso
        </button>
      </div>

      {vista === 'login' && <Login cambiarVista={setVista} />}
      {vista === 'registro' && <RegistroGeneral />}
      {vista === 'acceso' && <ControlAcceso />}
    </div>
  );
}

export default App;