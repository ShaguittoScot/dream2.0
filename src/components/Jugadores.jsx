import React, { useState, useEffect } from "react";
import { agregarJugador, modificarJugador, eliminarJugador, obtenerJugadores } from "../firebase/jugadores";

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugador, setNuevoJugador] = useState({});

  useEffect(() => {
    const cargarJugadores = async () => {
      const data = await obtenerJugadores();
      setJugadores(data);
    };
    cargarJugadores();
  }, []);

  const handleAgregar = async () => {
    const jugadorId = `jugador-${Date.now()}`;
    await agregarJugador(jugadorId, nuevoJugador);
    setJugadores([...jugadores, { id: jugadorId, ...nuevoJugador }]);
  };

  return (
    <div>
      <h1>Gestión de Jugadores</h1>
      <textarea
        placeholder="Datos del jugador (JSON)"
        value={JSON.stringify(nuevoJugador)}
        onChange={(e) => setNuevoJugador(JSON.parse(e.target.value))}
      />
      <button onClick={handleAgregar}>Agregar Jugador</button>
      <ul>
        {jugadores.map((jugador) => (
          <li key={jugador.id}>{JSON.stringify(jugador)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Jugadores;
