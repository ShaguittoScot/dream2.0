import React, { useState, useEffect } from "react";
import { agregarPartido, actualizarPartido, eliminarPartido, obtenerPartidos } from "../../firebase/partidos";

function Partidos() {
  const [partidos, setPartidos] = useState([]);
  const [nuevoPartido, setNuevoPartido] = useState({});

  useEffect(() => {
    const cargarPartidos = async () => {
      const data = await obtenerPartidos();
      setPartidos(data);
    };
    cargarPartidos();
  }, []);

  const handleAgregar = async () => {
    const partidoId = `partido-${Date.now()}`;
    await agregarPartido(partidoId, nuevoPartido);
    setPartidos([...partidos, { id: partidoId, ...nuevoPartido }]);
  };

  return (
    <div>
      <h1>Gestión de Partidos</h1>
      <textarea
        placeholder="Datos del partido (JSON)"
        value={JSON.stringify(nuevoPartido)}
        onChange={(e) => setNuevoPartido(JSON.parse(e.target.value))}
      />
      <button onClick={handleAgregar}>Agregar Partido</button>
      <ul>
        {partidos.map((partido) => (
          <li key={partido.id}>{JSON.stringify(partido)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Partidos;

