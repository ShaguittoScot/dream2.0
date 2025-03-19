import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Registrar usuario
export async function registrarUsuario(email, password) {
  const usuario = await createUserWithEmailAndPassword(auth, email, password);
  return usuario;
}

// Iniciar sesión
export async function iniciarSesion(email, password) {
  const usuario = await signInWithEmailAndPassword(auth, email, password);
  return usuario;
}
