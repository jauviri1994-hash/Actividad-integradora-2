// Importamos las herramientas de Firestore para guardar datos
import { collection, addDoc } from "firebase/firestore"; 
// Importamos tu conexión a la base de datos que acabas de hacer
import { db } from "./config"; 

// Esta es la función que Blanca va a llamar desde su código (Frontend)
export const crearDepartamento = async (numeroDepto, edificio) => {
  try {
    // Apuntamos a la colección "departamentos" (si no existe, Firebase la crea sola)
    const docRef = await addDoc(collection(db, "departamentos"), {
      numero: numeroDepto,
      edificio: edificio,
      ocupado: false // Por defecto, al registrarlo decimos que está vacío
    });
    
    console.log("¡Éxito! Departamento guardado con ID: ", docRef.id);
    return true; // Le avisamos al frontend que todo salió bien
    
  } catch (error) {
    console.error("Hubo un error al guardar el departamento: ", error);
    return false; // Le avisamos al frontend que hubo un error
  }
};