import { storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Subir una foto
export async function subirFoto(rutaArchivo, archivo) {
  const fotoRef = ref(storage, rutaArchivo);
  await uploadBytes(fotoRef, archivo);
  const url = await getDownloadURL(fotoRef);
  return url; // Devuelve la URL de descarga
}

// Subir un video
export async function subirVideo(rutaArchivo, archivo) {
  const videoRef = ref(storage, rutaArchivo);
  await uploadBytes(videoRef, archivo);
  const url = await getDownloadURL(videoRef);
  return url; // Devuelve la URL de descarga
}

// Descargar un archivo
export async function descargarArchivo(rutaArchivo) {
  const archivoRef = ref(storage, rutaArchivo);
  const url = await getDownloadURL(archivoRef);
  return url; // Devuelve la URL de descarga
}
