import React, { useState, useEffect } from "react";
import { db } from "../../db/conexiondb";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const FormularioJugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre: "",
    equipo: "",
    posicion: "",
    numero: ""
  });
  const [cargando, setCargando] = useState(true);
  const [agregando, setAgregando] = useState(false);

  useEffect(() => {
    const jugadoresCollection = collection(db, "jugadores");
    
    // Escucha en tiempo real
    const unsubscribe = onSnapshot(jugadoresCollection, (snapshot) => {
      setJugadores(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setCargando(false);
    });

    return () => unsubscribe(); // Limpia la suscripción
  }, []);

  const agregarJugador = async () => {
    if (!nuevoJugador.nombre || !nuevoJugador.equipo || !nuevoJugador.posicion || !nuevoJugador.numero) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setAgregando(true);
    try {
      const jugadoresCollection = collection(db, "jugadores");
      await addDoc(jugadoresCollection, nuevoJugador);
      setNuevoJugador({ nombre: "", equipo: "", posicion: "", numero: "" });
    } catch (error) {
      console.error("Error al agregar jugador:", error);
      alert("Hubo un error al agregar el jugador.");
    } finally {
      setAgregando(false);
    }
  };

  const eliminarJugador = async (id) => {
    try {
      await deleteDoc(doc(db, "jugadores", id));
    } catch (error) {
      console.error("Error al eliminar jugador:", error);
      alert("No se pudo eliminar el jugador.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mt-10 mb-8">Gestión de Jugadores</h1>

      {/* Formulario */}
      <div className="bg-black/80 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Agregar Jugador</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoJugador.nombre}
            onChange={(e) => setNuevoJugador({ ...nuevoJugador, nombre: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Equipo"
            value={nuevoJugador.equipo}
            onChange={(e) => setNuevoJugador({ ...nuevoJugador, equipo: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Posición"
            value={nuevoJugador.posicion}
            onChange={(e) => setNuevoJugador({ ...nuevoJugador, posicion: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Número"
            value={nuevoJugador.numero}
            onChange={(e) => setNuevoJugador({ ...nuevoJugador, numero: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={agregarJugador}
          disabled={agregando}
          className={`mt-4 px-6 py-2 rounded-lg transition-colors ${
            agregando ? "bg-gray-500 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500 text-black"
          }`}
        >
          {agregando ? "Agregando..." : "Agregar Jugador"}
        </button>
      </div>

      {/* Lista de jugadores */}
      <div className="bg-black/80 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Lista de Jugadores</h2>

        {cargando ? (
          <p className="text-white">Cargando jugadores...</p>
        ) : jugadores.length === 0 ? (
          <p className="text-gray-400">No hay jugadores registrados.</p>
        ) : (
          <div className="space-y-3">
            {jugadores.map((jugador) => (
              <div
                key={jugador.id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center flex-wrap gap-3"
              >
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-blue-400 font-medium">{jugador.nombre}</span>
                  <span className="mx-1 text-white">({jugador.equipo})</span>
                  <span className="text-blue-400 font-medium">{jugador.posicion}</span>
                  <span className="ml-3 text-gray-300 text-sm md:text-base"># {jugador.numero}</span>
                </div>
                <button
                  onClick={() => eliminarJugador(jugador.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors shrink-0"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioJugadores;
