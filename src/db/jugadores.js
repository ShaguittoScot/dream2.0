import { db } from "./firebaseConfig";
import { collection, doc, setDoc, updateDoc, deleteDoc, getDocs, getDoc } from "firebase/firestore";

// Agregar un jugador
export async function agregarJugador(jugadorId, datosJugador) {
  const jugadorRef = doc(collection(db, "jugadores"), jugadorId);
  await setDoc(jugadorRef, datosJugador);
}

// Actualizar un jugador
export async function modificarJugador(jugadorId, datosActualizados) {
  const jugadorRef = doc(db, "jugadores", jugadorId);
  await updateDoc(jugadorRef, datosActualizados);
}

// Eliminar un jugador
export async function eliminarJugador(jugadorId) {
  const jugadorRef = doc(db, "jugadores", jugadorId);
  await deleteDoc(jugadorRef);
}

// Obtener todos los jugadores
export async function obtenerJugadores() {
  const jugadoresSnapshot = await getDocs(collection(db, "jugadores"));
  return jugadoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener un jugador específico
export async function obtenerJugador(jugadorId) {
  const jugadorRef = doc(db, "jugadores", jugadorId);
  const jugadorSnap = await getDoc(jugadorRef);
  if (jugadorSnap.exists()) {
    return jugadorSnap.data();
  } else {
    console.log("No existe el jugador");
  }
}
