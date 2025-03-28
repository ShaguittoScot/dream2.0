import { auth } from "./conexiondb";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function registrarUsuario(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem('redirectPath', '/admin/partidos');
    return userCredential;
  } catch (error) {
    throw new Error(error.message.replace('Firebase: ', ''));
  }
}

export async function iniciarSesion(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem('redirectPath', '/admin/partidos');
    return userCredential;
  } catch (error) {
    throw new Error(error.message.replace('Firebase: ', ''));
  }
}
