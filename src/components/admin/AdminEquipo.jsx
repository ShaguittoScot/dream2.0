import React, { useState, useEffect } from "react";
import { db } from "../../db/conexiondb";
import { getDoc, doc, updateDoc, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { subirImagenACloudinary } from "../../services/cloudinary";

const AdminEquipo = () => {
  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState("");
  const [multimedia, setMultimedia] = useState([]);
  const [nuevoMedia, setNuevoMedia] = useState({ archivo: null, url: "", descripcion: "", tipo: "" });
  const [subiendo, setSubiendo] = useState(false);
  const [subiendoLogo, setSubiendoLogo] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null); // Estado para la previsualización del logo
  const [bannerSeleccionado, setBannerSeleccionado] = useState(""); // Estado para almacenar la URL del banner seleccionado

  useEffect(() => {
    const obtenerDatosEquipo = async () => {
      const equipoRef = doc(db, "equipo", "datos");
      const equipoSnap = await getDoc(equipoRef);
      if (equipoSnap.exists()) {
        const data = equipoSnap.data();
        setNombre(data.nombre || "");
        setLogo(data.logo || "");
        setBannerSeleccionado(data.banner || ""); // Establecer el banner si ya está guardado
      }

      const multimediaSnap = await getDocs(collection(equipoRef, "multimedia"));
      setMultimedia(multimediaSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    obtenerDatosEquipo();
  }, []);

  const actualizarEquipo = async () => {
    const equipoRef = doc(db, "equipo", "datos");
    await updateDoc(equipoRef, { nombre, logo, banner: bannerSeleccionado }); // Guardar el banner seleccionado
    alert("Datos actualizados correctamente");
  };

  const manejarCambioArchivo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    // Detectar automáticamente el tipo de archivo
    const tipoArchivo = archivo.type.startsWith("image/") ? "imagen" : archivo.type.startsWith("video/") ? "video" : "";
    
    setNuevoMedia({
      ...nuevoMedia,
      archivo,
      tipo: tipoArchivo,
    });
  };

  const manejarSubidaArchivo = async () => {
    if (!nuevoMedia.archivo) {
      alert("Seleccione un archivo antes de subir.");
      return;
    }

    setSubiendo(true);
    try {
      const url = await subirImagenACloudinary(nuevoMedia.archivo);
      const equipoRef = doc(db, "equipo", "datos");
      const multimediaRef = collection(equipoRef, "multimedia");

      const nuevoDocumento = await addDoc(multimediaRef, {
        tipo: nuevoMedia.tipo,
        url,
        descripcion: nuevoMedia.descripcion,
        fechaSubida: new Date(),
      });

      setMultimedia([...multimedia, { id: nuevoDocumento.id, tipo: nuevoMedia.tipo, url, descripcion: nuevoMedia.descripcion }]);
      setNuevoMedia({ archivo: null, url: "", descripcion: "", tipo: "" });
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Error al subir el archivo.");
    }
    setSubiendo(false);
  };

  const eliminarMultimedia = async (id) => {
    const equipoRef = doc(db, "equipo", "datos");
    await deleteDoc(doc(equipoRef, "multimedia", id));

    setMultimedia(multimedia.filter(item => item.id !== id));
  };

  // Función para subir el logo
  const manejarSubidaLogo = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    // Validar que el archivo sea una imagen
    if (!archivo.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    // Previsualización del logo
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewLogo(reader.result);
    };
    reader.readAsDataURL(archivo);

    setSubiendoLogo(true);
    try {
      const url = await subirImagenACloudinary(archivo);
      // Guardar el URL del logo en Firebase
      const equipoRef = doc(db, "equipo", "datos");
      await updateDoc(equipoRef, { logo: url });
      setLogo(url); // Guardar el URL localmente
      alert("Logo subido correctamente");
    } catch (error) {
      console.error("Error al subir el logo:", error);
      alert("Error al subir el logo.");
    }
    setSubiendoLogo(false);
  };

  // Función para seleccionar una imagen como banner
  const seleccionarBanner = (url) => {
    setBannerSeleccionado(url);
  };

  return (
    <div className="p-6 bg-zinc-900 text-white">
      <h2 className="text-xl font-bold mb-4">⚙️ Administrar Equipo</h2>

      {/* Editar Nombre del equipo */}
      <div className="mb-6">
        <label className="block mb-2">Nombre del equipo:</label>
        <input
          type="text"
          className="w-full p-2 text-black rounded-md"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      {/* Subir el logo */}
      <div className="mb-6">
        <label className="block mb-2">Logo del equipo:</label>
        <input
          type="file"
          accept="image/*"
          className="p-2 rounded-md text-white bg-gray-800"
          onChange={manejarSubidaLogo}
        />
        {subiendoLogo && <p>Cargando logo...</p>}
        {(previewLogo || logo) && (
          <img
            src={previewLogo || logo}
            alt="Logo del equipo"
            className="mt-4 w-24 h-24 rounded-lg object-cover"
          />
        )}
      </div>

      {/* Seleccionar banner del equipo */}
      <h3 className="text-lg font-bold mt-10">📸 Seleccionar Banner del Equipo</h3>
      <div className="flex gap-2 mb-4">
        {multimedia.map((item) => (
          <div key={item.id} className="relative">
            {item.tipo === "imagen" ? (
              <img
                src={item.url}
                alt="Imagen del equipo"
                className={`w-24 h-24 rounded-lg object-cover cursor-pointer ${bannerSeleccionado === item.url ? "border-4 border-blue-500" : ""}`}
                onClick={() => seleccionarBanner(item.url)}
              />
            ) : (
              <video
                src={item.url}
                controls
                className="w-24 h-24 rounded-lg cursor-pointer"
              />
            )}
            <p className="text-sm text-center">{item.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Subir una nueva imagen o video */}
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

      {/* Botón de guardar cambios */}
      <button
        onClick={actualizarEquipo}
        className="mt-4 p-3 bg-blue-500 rounded-md hover:bg-blue-700"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default AdminEquipo;
