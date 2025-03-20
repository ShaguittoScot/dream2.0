import { initializeApp } from "firebase/app";
import keys from "../../keys.json";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Configuración de Firebase (extrae esto desde Firebase Console)
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(keys);

// Exporta los servicios que vas a usar
export const db = getFirestore(app); // Base de datos
export const storage = getStorage(app); // Almacenamiento
export const auth = getAuth(app); // Autenticación
