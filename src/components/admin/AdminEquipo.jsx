import React, { useState, useEffect } from "react";
import { db } from "../../db/conexiondb";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { subirImagenACloudinary } from "../../services/cloudinary";

const AdminGaleria = () => {
  const [multimedia, setMultimedia] = useState([]);
  const [nuevoMedia, setNuevoMedia] = useState({
    archivo: null,
    url: "",
    descripcion: "",
    tipo: "",
    categoria: "general",
    fechaEvento: "",
    destacado: false,
    tags: []
  });
  const [subiendo, setSubiendo] = useState(false);
  const [nuevoTag, setNuevoTag] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [buscador, setBuscador] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  const categorias = [
    "general",
    "entrenamiento",
    "partido",
    "entrevista",
    "detrasEscenas",
    "eventos",
    "sponsors"
  ];

  useEffect(() => {
    const obtenerGaleria = async () => {
      try {
        const galeriaSnap = await getDocs(collection(db, "galeria"));
        const galeriaData = galeriaSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          tags: doc.data().tags || []
        }));

        galeriaData.sort((a, b) => b.fechaSubida?.toDate() - a.fechaSubida?.toDate());
        setMultimedia(galeriaData);
      } catch (error) {
        console.error("Error al obtener la galería:", error);
      }
    };
    obtenerGaleria();
  }, []);

  // Función para cargar datos en el formulario de edición
  const iniciarEdicion = (item) => {
    setEditandoId(item.id);
    setNuevoMedia({
      archivo: null,
      url: item.url,
      descripcion: item.descripcion,
      tipo: item.tipo,
      categoria: item.categoria,
      fechaEvento: item.fechaEvento?.toDate?.().toISOString().split('T')[0] || "",
      destacado: item.destacado || false,
      tags: item.tags || []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para cancelar edición
  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoMedia({
      archivo: null,
      url: "",
      descripcion: "",
      tipo: "",
      categoria: "general",
      fechaEvento: "",
      destacado: false,
      tags: []
    });
  };

  const manejarCambioArchivo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    let tipoArchivo = "";
    if (archivo.type.startsWith("image/")) {
      tipoArchivo = "imagen";
    } else if (archivo.type.startsWith("video/")) {
      tipoArchivo = "video";
    } else {
      tipoArchivo = "otro";
    }

    setNuevoMedia({
      ...nuevoMedia,
      archivo,
      tipo: tipoArchivo,
      fechaEvento: nuevoMedia.fechaEvento || new Date().toISOString().split('T')[0]
    });
  };

  const agregarTag = () => {
    if (nuevoTag.trim() && !nuevoMedia.tags.includes(nuevoTag.trim())) {
      setNuevoMedia({
        ...nuevoMedia,
        tags: [...nuevoMedia.tags, nuevoTag.trim()]
      });
      setNuevoTag("");
    }
  };

  const eliminarTag = (tagToRemove) => {
    setNuevoMedia({
      ...nuevoMedia,
      tags: nuevoMedia.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const manejarSubidaArchivo = async () => {
    if (!nuevoMedia.archivo && !editandoId) {
      alert("Seleccione un archivo antes de subir.");
      return;
    }

    setSubiendo(true);
    try {
      let url = nuevoMedia.url;

      // Si hay un archivo nuevo, subirlo a Cloudinary
      if (nuevoMedia.archivo) {
        url = await subirImagenACloudinary(nuevoMedia.archivo);
      }

      const mediaData = {
        tipo: nuevoMedia.tipo,
        url,
        descripcion: nuevoMedia.descripcion,
        categoria: nuevoMedia.categoria,
        destacado: nuevoMedia.destacado,
        tags: nuevoMedia.tags,
        fechaSubida: editandoId ? nuevoMedia.fechaSubida : new Date(),
        fechaEvento: nuevoMedia.fechaEvento ? new Date(nuevoMedia.fechaEvento) : null,
        ...(nuevoMedia.archivo && {
          metadata: {
            nombreArchivo: nuevoMedia.archivo.name,
            tamaño: nuevoMedia.archivo.size,
            tipoMIME: nuevoMedia.archivo.type
          }
        })
      };

      if (editandoId) {
        // Actualizar documento existente
        await updateDoc(doc(db, "galeria", editandoId), mediaData);
        setMultimedia(prev =>
          prev.map(item =>
            item.id === editandoId ? { ...item, ...mediaData } : item
          )
        );
      } else {
        // Crear nuevo documento
        const galeriaRef = collection(db, "galeria");
        const nuevoDocumento = await addDoc(galeriaRef, mediaData);
        setMultimedia(prev => [
          {
            id: nuevoDocumento.id,
            ...mediaData,
            fechaSubida: new Date()
          },
          ...prev
        ]);
      }

      // Resetear formulario
      cancelarEdicion();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubiendo(false);
    }
  };

  const eliminarMultimedia = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este elemento?")) return;

    try {
      await deleteDoc(doc(db, "galeria", id));
      setMultimedia(prev => prev.filter(item => item.id !== id));
      if (editandoId === id) cancelarEdicion();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el elemento.");
    }
  };

  // Filtrar elementos según búsqueda y categoría
  const elementosFiltrados = multimedia.filter(item => {
    const coincideBusqueda = item.descripcion?.toLowerCase().includes(buscador.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(buscador.toLowerCase()));
    const coincideCategoria = categoriaFiltro === "todas" || item.categoria === categoriaFiltro;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="p-6 bg-zinc-900 text-white max-w-7xl mx-auto mt-15">
      <h2 className="text-2xl font-bold mb-6">📸 Administrador de Galería Multimedia</h2>

      {/* Formulario de subida/edición */}
      <div className="bg-zinc-800 p-6 rounded-lg mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          {editandoId ? "✏️ Editar Elemento" : "➕ Subir Nuevo Elemento"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">
                {editandoId ? "Reemplazar archivo (opcional)" : "Archivo (imagen/video)"}
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600"
                onChange={manejarCambioArchivo}
              />
              {nuevoMedia.archivo ? (
                <p className="mt-1 text-sm text-zinc-300">
                  Archivo seleccionado: {nuevoMedia.archivo.name} ({Math.round(nuevoMedia.archivo.size / 1024)} KB)
                </p>
              ) : editandoId && (
                <p className="mt-1 text-sm text-zinc-300">
                  Archivo actual: {nuevoMedia.url.split('/').pop()}
                </p>
              )}
            </div>

            {editandoId && nuevoMedia.tipo === "imagen" && (
              <div>
                <label className="block mb-2 font-medium">Vista previa</label>
                <img
                  src={nuevoMedia.url}
                  alt="Preview"
                  className="max-h-48 object-contain border border-zinc-600 rounded-md"
                />
              </div>
            )}
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Descripción</label>
              <textarea
                className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600 text-white"
                placeholder="Descripción detallada..."
                rows="3"
                value={nuevoMedia.descripcion}
                onChange={(e) => setNuevoMedia({ ...nuevoMedia, descripcion: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Categoría</label>
                <select
                  className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600"
                  value={nuevoMedia.categoria}
                  onChange={(e) => setNuevoMedia({ ...nuevoMedia, categoria: e.target.value })}
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Fecha del Evento</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600"
                  value={nuevoMedia.fechaEvento}
                  onChange={(e) => setNuevoMedia({ ...nuevoMedia, fechaEvento: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="destacado"
                className="mr-2"
                checked={nuevoMedia.destacado}
                onChange={(e) => setNuevoMedia({ ...nuevoMedia, destacado: e.target.checked })}
              />
              <label htmlFor="destacado" className="font-medium">Destacado</label>
            </div>

            <div>
              <label className="block mb-2 font-medium">Etiquetas</label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-l-md bg-zinc-700 border border-zinc-600"
                  placeholder="Añadir etiqueta..."
                  value={nuevoTag}
                  onChange={(e) => setNuevoTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && agregarTag()}
                />
                <button
                  onClick={agregarTag}
                  className="px-4 bg-blue-600 rounded-r-md hover:bg-blue-700"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {nuevoMedia.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-zinc-600 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => eliminarTag(tag)}
                      className="ml-1 text-xs hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          {editandoId && (
            <button
              onClick={cancelarEdicion}
              className="px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={manejarSubidaArchivo}
            className={`px-6 py-2 rounded-md flex items-center justify-center ${subiendo ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
              }`}
            disabled={subiendo}
          >
            {subiendo ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {editandoId ? "Actualizando..." : "Subiendo..."}
              </>
            ) : (
              editandoId ? "Guardar Cambios" : "Subir Elemento"
            )}
          </button>
        </div>
      </div>

      {/* Galería de elementos */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold">
            📁 Galería ({elementosFiltrados.length} de {multimedia.length} elementos)
          </h3>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <select
              className="p-2 rounded-md bg-zinc-700 border border-zinc-600"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="todas">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Buscar por descripción o etiquetas..."
              className="p-2 rounded-md bg-zinc-700 border border-zinc-600 flex-1 max-w-md"
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
            />
          </div>
        </div>

        {elementosFiltrados.length === 0 ? (
          <div className="bg-zinc-800 p-8 rounded-lg text-center">
            <p className="text-lg">No se encontraron elementos</p>
            <p className="text-zinc-400">Prueba con otros filtros o términos de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {elementosFiltrados.map((item) => (
              <div
                key={item.id}
                className={`bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${item.destacado ? "ring-2 ring-yellow-400" : ""
                  }`}
              >
                <div className="relative group">
                  {item.tipo === "imagen" ? (
                    <img
                      src={item.url}
                      alt={item.descripcion || "Imagen"}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-48 object-cover bg-black"
                    />
                  )}

                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.destacado && (
                      <span className="bg-yellow-500 text-xs px-2 py-1 rounded-full">⭐</span>
                    )}
                    <button
                      onClick={() => iniciarEdicion(item)}
                      className="bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => eliminarMultimedia(item.id)}
                      className="bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-yellow-400 capitalize">
                      {item.categoria}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {item.fechaSubida
                        ? new Date(item.fechaSubida.seconds * 1000).toLocaleDateString()
                        : "Fecha no disponible"}
                    </span>

                  </div>

                  <p className="text-sm mb-3 line-clamp-2">{item.descripcion}</p>

                  <div className="flex flex-wrap gap-1">
                    {item.tags?.map(tag => (
                      <span key={tag} className="text-xs bg-zinc-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Botones de edición y eliminación en la parte inferior */}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => iniciarEdicion(item)}
                      className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 flex items-center gap-1 text-sm"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarMultimedia(item.id)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 flex items-center gap-1 text-sm"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGaleria;