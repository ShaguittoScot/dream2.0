import { db } from "./firebaseConfig";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Funciones para Partidos
export async function actualizarPartido(partidoId, datosActualizados) {
  const partidoRef = doc(db, "partidos", partidoId);
  await updateDoc(partidoRef, datosActualizados);
}

// Funciones para Jugadores
export async function agregarJugador(jugadorId, datosJugador) {
  const jugadorRef = doc(db, "jugadores", jugadorId);
  await setDoc(jugadorRef, datosJugador);
}

export async function eliminarJugador(jugadorId) {
  const jugadorRef = doc(db, "jugadores", jugadorId);
  await deleteDoc(jugadorRef);
}

export async function modificarJugador(jugadorId, datosActualizados) {
  const jugadorRef = doc(db, "jugadores", jugadorId);
  await updateDoc(jugadorRef, datosActualizados);
}
