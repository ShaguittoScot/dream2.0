import { storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Subir una foto
export async function subirFoto(rutaArchivo, archivo) {
  const fotoRef = ref(storage, rutaArchivo);
  await uploadBytes(fotoRef, archivo);
  return await getDownloadURL(fotoRef);
}

// Subir un video
export async function subirVideo(rutaArchivo, archivo) {
  const videoRef = ref(storage, rutaArchivo);
  await uploadBytes(videoRef, archivo);
  return await getDownloadURL(videoRef);
}
