import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Pon tus datos reales aquí:
const firebaseConfig = {
  apiKey: "AIzaSyAg5pzjiTBb3qXxvZhJ9SvNksg2ecAANNA",
  authDomain: "parque-limpio.firebaseapp.com",
  projectId: "parque-limpio",
  storageBucket: "parque-limpio.firebasestorage.app",
  messagingSenderId: "1075338997971",
  appId: "1:1075338997971:web:103a8831720a54d6f06426"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos tu base de datos lista para usarse
export const db = getFirestore(app);