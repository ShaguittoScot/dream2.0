import React, { useState, useEffect } from "react";
import { db } from "../../db/conexiondb";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { subirImagenACloudinary } from "../../services/cloudinary";
import Gallery from "../Gallery";

const AdminGaleria = () => {
  const [multimedia, setMultimedia] = useState([]);
  const [nuevoMedia, setNuevoMedia] = useState({ archivo: null, url: "", descripcion: "", tipo: "" });
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    const obtenerGaleria = async () => {
      try {
        const galeriaSnap = await getDocs(collection(db, "galeria"));
        setMultimedia(galeriaSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error al obtener la galería:", error);
      }
    };
    obtenerGaleria();
  }, []);

  const manejarCambioArchivo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const tipoArchivo = archivo.type.startsWith("image/") ? "imagen" : archivo.type.startsWith("video/") ? "video" : "";
    setNuevoMedia({ ...nuevoMedia, archivo, tipo: tipoArchivo });
  };

  const manejarSubidaArchivo = async () => {
    if (!nuevoMedia.archivo) {
      alert("Seleccione un archivo antes de subir.");
      return;
    }

    setSubiendo(true);
    try {
      const url = await subirImagenACloudinary(nuevoMedia.archivo);
      const galeriaRef = collection(db, "galeria");

      const nuevoDocumento = await addDoc(galeriaRef, {
        tipo: nuevoMedia.tipo,
        url,
        descripcion: nuevoMedia.descripcion,
        fechaSubida: new Date(),
      });

      setMultimedia(prev => [...prev, { id: nuevoDocumento.id, tipo: nuevoMedia.tipo, url, descripcion: nuevoMedia.descripcion }]);
      setNuevoMedia({ archivo: null, url: "", descripcion: "", tipo: "" });
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Error al subir el archivo.");
    }
    setSubiendo(false);
  };

  const eliminarMultimedia = async (id) => {
    try {
      await deleteDoc(doc(db, "galeria", id));
      setMultimedia(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      alert("No se pudo eliminar el archivo.");
    }
  };

  return (
    <div className="p-6 bg-zinc-900 text-white">
      <h2 className="text-xl font-bold mb-4">📸 Administrar Galería</h2>

      <div className="mb-4 flex gap-2 items-center">
        <input
          type="file"
          accept="image/*,video/*"
          className="p-2 rounded-md text-white bg-gray-800"
          onChange={manejarCambioArchivo}
        />
        <input
          type="text"
          className="p-2 text-black rounded-md w-full"
          placeholder="Descripción opcional"
          value={nuevoMedia.descripcion}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, descripcion: e.target.value })}
        />
        <button
          onClick={manejarSubidaArchivo}
          className="p-2 bg-green-500 rounded-md hover:bg-green-700"
          disabled={subiendo}
        >
          {subiendo ? "Subiendo..." : "➕ Subir"}
        </button>
      </div>

      <p className="text-gray-400 text-sm">📂 Tipo detectado: <span className="font-bold">{nuevoMedia.tipo || "Ninguno"}</span></p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {multimedia.map((item) => (
          <div key={item.id} className="relative group">
            {item.tipo === "imagen" ? (
              <img src={item.url} alt="Imagen" className="w-full h-32 object-cover rounded-lg" />
            ) : (
              <video src={item.url} controls className="w-full h-32 rounded-lg" />
            )}
            <p className="text-sm text-center mt-2">{item.descripcion}</p>
            <button
  onClick={() => eliminarMultimedia(item.id)}
  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition"
>
  ❌
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGaleria;