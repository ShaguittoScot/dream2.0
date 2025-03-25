import React from "react";
import { useNavigate } from "react-router-dom";

const ListaJugadores = ({ jugadores, onEliminar, cargando }) => {
  const navigate = useNavigate(); // Llamar a useNavigate en el cuerpo del componente

  if (cargando) return <p className="text-white text-center">Cargando jugadores...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jugadores.map((jugador) => (
        <div key={jugador.id} className="bg-neutral-900/80 p-4 rounded-2xl shadow-lg">
          <img
            src={jugador.fotoPerfil || "default-image.jpg"}
            alt={jugador.nombre}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-white">{jugador.nombre}</h3>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={() => navigate(`/admin/editar-jugador/${jugador.id}`)} // Usar navigate aquí
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(jugador.id)}
              className="px-4 py-1 bg-red-500 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaJugadores;