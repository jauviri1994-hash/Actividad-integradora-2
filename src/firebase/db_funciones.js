// Importo las herramientas de Firestore para guardar datos en mi base
import { collection, addDoc } from "firebase/firestore"; 
// Importo la herramienta de Firebase Auth para el inicio de sesión
import { signInWithEmailAndPassword } from "firebase/auth";
// Importo mis conexiones configuradas (Base de datos y Autenticación)
import { db, auth } from "./config"; 

// --- FUNCIÓN PARA REGISTRO DE DEPARTAMENTOS ---
// Esta es la función que preparé para que el frontend registre la infraestructura
export const crearDepartamento = async (numeroDepto, edificio) => {
  try {
    // Apunto a mi colección "departamentos" (si no existe, Firebase la crea automáticamente)
    const docRef = await addDoc(collection(db, "departamentos"), {
      numero: numeroDepto,
      edificio: edificio,
      ocupado: false // Por defecto, defino que al registrarlo está vacío
    });
    
    console.log("¡Éxito! Guardé el departamento con ID: ", docRef.id);
    return true; // Retorno 'true' para avisarle al frontend que la operación fue un éxito
    
  } catch (error) {
    console.error("Hubo un error al guardar el departamento en mi base: ", error);
    return false; // Retorno 'false' para que el frontend maneje el error
  }
};

// --- FUNCIÓN PARA EL LOGIN (HISTORIA PPL-09) ---
// Esta función recibe las credenciales del frontend y las valida en mi bóveda de Firebase
export const iniciarSesion = async (correo, password) => {
  try {
    // Intento autenticar al usuario con el correo y contraseña recibidos
    const credenciales = await signInWithEmailAndPassword(auth, correo, password);
    const usuario = credenciales.user;
    
    console.log("¡Éxito! Logré loguear al usuario con ID:", usuario.uid);
    return { exito: true, usuario: usuario }; // Retorno el usuario validado al frontend
    
  } catch (error) {
    console.error("Error al iniciar sesión:", error.code);
    
    // Traduzco los códigos de error de Firebase al español para mejorar la experiencia del usuario final
    let mensaje = "Error al intentar entrar.";
    if (error.code === 'auth/user-not-found') mensaje = "Este correo no está registrado en el sistema.";
    if (error.code === 'auth/wrong-password') mensaje = "La contraseña es incorrecta.";
    if (error.code === 'auth/invalid-email') mensaje = "El formato del correo no es válido.";
    if (error.code === 'auth/invalid-credential') mensaje = "Correo o contraseña incorrectos.";
    
    return { exito: false, mensajeError: mensaje }; // Retorno el error formateado al frontend
  }
};