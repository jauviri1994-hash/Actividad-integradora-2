import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; // Importo la bóveda de seguridad para el Login

// Aquí coloco mis credenciales reales de conexión al proyecto en Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyAg5pzjiTBb3qXxvZhJ9SvNksg2ecAANNA",
  authDomain: "parque-limpio.firebaseapp.com",
  projectId: "parque-limpio",
  storageBucket: "parque-limpio.firebasestorage.app",
  messagingSenderId: "1075338997971",
  appId: "1:1075338997971:web:103a8831720a54d6f06426"
};

// Inicializo mi aplicación de Firebase con la configuración anterior
const app = initializeApp(firebaseConfig);

// Exporto mi base de datos (Firestore) y la autenticación (Auth) listas para usarlas en el resto del proyecto
export const db = getFirestore(app);
export const auth = getAuth(app);