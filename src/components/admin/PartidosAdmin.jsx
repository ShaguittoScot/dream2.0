import React, { useState, useEffect } from "react";
import { db } from "../../db/conexiondb";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const PartidosAdmin = () => {
  const [partidos, setPartidos] = useState([]);
  const [nuevoPartido, setNuevoPartido] = useState({
    equipo1: "",
    equipo2: "",
    fecha: ""
  });
  const [edicionId, setEdicionId] = useState(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      const partidosCollection = collection(db, "partidos");
      const partidosSnapshot = await getDocs(partidosCollection);
      const partidosList = partidosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartidos(partidosList);
    };
    fetchPartidos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoPartido.equipo1 || !nuevoPartido.equipo2 || !nuevoPartido.fecha) return;

    try {
      if (edicionId) {
        // Modificar partido existente
        const partidoRef = doc(db, "partidos", edicionId);
        await updateDoc(partidoRef, nuevoPartido);
        setPartidos(partidos.map(p => p.id === edicionId ? { id: edicionId, ...nuevoPartido } : p));
      } else {
        // Agregar nuevo partido
        const docRef = await addDoc(collection(db, "partidos"), nuevoPartido);
        setPartidos([...partidos, { id: docRef.id, ...nuevoPartido }]);
      }
      setNuevoPartido({ equipo1: "", equipo2: "", fecha: "" });
      setEdicionId(null);
    } catch (error) {
      console.error("Error al guardar partido:", error);
    }
  };

  const iniciarEdicion = (partido) => {
    setEdicionId(partido.id);
    setNuevoPartido({
      equipo1: partido.equipo1,
      equipo2: partido.equipo2,
      fecha: partido.fecha
    });
  };

  const eliminarPartido = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este partido?")) {
      await deleteDoc(doc(db, "partidos", id));
      setPartidos(partidos.filter(partido => partido.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 flex-wrap mt-10">
        <h1 className="text-3xl font-bold text-amber-400">Gestión de Partidos</h1>
      </div>

      {/* Formulario */}
      <div className="bg-black/80 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">
          {edicionId ? "Editar Partido" : "Agregar Partido"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Equipo 1"
            value={nuevoPartido.equipo1}
            onChange={(e) => setNuevoPartido({ ...nuevoPartido, equipo1: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="text"
            placeholder="Equipo 2"
            value={nuevoPartido.equipo2}
            onChange={(e) => setNuevoPartido({ ...nuevoPartido, equipo2: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="text"
            placeholder="Fecha (DD/MM/AAAA HH:mm)"
            value={nuevoPartido.fecha}
            onChange={(e) => setNuevoPartido({ ...nuevoPartido, fecha: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-amber-400"
          />
          <div className="md:col-span-3 flex gap-2">
            <button
              type="submit"
              className="mt-4 bg-amber-400 hover:bg-amber-500 text-black px-6 py-2 rounded-lg transition-colors"
            >
              {edicionId ? 'Guardar Cambios' : 'Agregar Partido'}
            </button>
            {edicionId && (
              <button
                type="button"
                onClick={() => {
                  setEdicionId(null);
                  setNuevoPartido({ equipo1: "", equipo2: "", fecha: "" });
                }}
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de partidos */}
      <div className="bg-black/80 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Partidos Programados</h2>
        <div className="space-y-3">
          {partidos.map((partido) => (
            <div
              key={partido.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center flex-wrap gap-3"
            >
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-amber-400 font-medium">{partido.equipo1}</span>
                <span className="mx-1 text-white">vs</span>
                <span className="text-amber-400 font-medium">{partido.equipo2}</span>
                <span className="ml-3 text-gray-300 text-sm md:text-base">{partido.fecha}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => iniciarEdicion(partido)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors shrink-0"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarPartido(partido.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors shrink-0"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartidosAdmin;

