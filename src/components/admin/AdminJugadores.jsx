import React, { useState, useEffect } from "react";
import { obtenerJugadores, agregarJugador, eliminarJugador } from "../../db/jugadores";
import FormularioAgregarJugador from "./FormularioAgregarJugador.jsx";
import ListaJugadores from "./ListaJugadores.jsx";
import EditarJugador from "../admin/EditarJugador";

const FormularioJugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [agregando, setAgregando] = useState(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

  useEffect(() => {
    const unsubscribe = obtenerJugadores((jugadores) => {
      console.log("Jugadores obtenidos:", jugadores); // Verifica si se obtienen datos
      setJugadores(jugadores);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAgregarJugador = async (nuevoJugador, fotoPerfil, fotoParaElBanner, imagenesAdicionales) => {
    setAgregando(true);
    const exito = await agregarJugador(nuevoJugador, fotoPerfil, fotoParaElBanner, imagenesAdicionales);
    setAgregando(false);
    if (exito) {
      // Actualizar la lista de jugadores
    }
  };

  const handleEliminarJugador = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este jugador?")) {
      const exito = await eliminarJugador(id);
      if (exito) {
        setJugadores(jugadores.filter((jugador) => jugador.id !== id));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-blue-400 mt-10 mb-8">Gestión de Jugadores</h1>
      <FormularioAgregarJugador onSubmit={handleAgregarJugador} cargando={agregando} />
      <ListaJugadores
        jugadores={jugadores}
        onEditar={setJugadorSeleccionado}
        onEliminar={handleEliminarJugador}
        cargando={cargando}
      />


      {jugadorSeleccionado && (
        <EditarJugador
          jugadorId={jugadorSeleccionado}
          onClose={() => setJugadorSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default FormularioJugadores;