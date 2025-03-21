import { useParams } from "react-router-dom";
import React,{ useEffect, useState } from "react";
import { db } from "../db/conexiondb.js";
import { doc, getDoc } from "firebase/firestore";

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const playerRef = doc(db, "jugadores", id);
      const playerSnap = await getDoc(playerRef);

      if (playerSnap.exists()) {
        setPlayer({ id: playerSnap.id, ...playerSnap.data() });
      } else {
        console.log("Jugador no encontrado");
      }
      setLoading(false);
    };

    fetchPlayer();
  }, [id]);

  if (loading) return <p className="text-white text-center">Cargando datos...</p>;

  if (!player) return <p className="text-white text-center">Jugador no encontrado</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 text-white">
      <h1 className="text-4xl font-bold text-center">{player.nombre}</h1>
      <p className="text-gray-300 text-lg text-center mt-2">{player.sobrenombre}</p>
      
      <div className="flex flex-col md:flex-row mt-6">
        <img src={player.fotoPerfil} alt={player.nombre} className="w-64 h-64 object-cover rounded-lg mx-auto md:mx-0" />
        <div className="ml-6">
          <p><strong>Número:</strong> {player.numero}</p>
          <p><strong>Edad:</strong> {player.edad}</p>
          <p><strong>Posición:</strong> {player.posicion}</p>
          <p><strong>Equipo:</strong> {player.equipo}</p>
          <p><strong>Descripción:</strong> {player.descripcion}</p>
          
          <h3 className="mt-4 text-2xl font-semibold">Estadísticas</h3>
          <ul>
            <li>Partidos Jugados: {player.estadisticas.partidosJugados}</li>
            <li>Puntos por Partido: {player.estadisticas.puntosPorPartido}</li>
            <li>Rebotes por Partido: {player.estadisticas.rebotesPorPartido}</li>
            <li>Asistencias por Partido: {player.estadisticas.asistenciasPorPartido}</li>
            <li>Robos por Partido: {player.estadisticas.robosPorPartido}</li>
            <li>Tapones por Partido: {player.estadisticas.taponesPorPartido}</li>
            <li>Minutos por Partido: {player.estadisticas.minutosPorPartido}</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8">
        <img src={player.fotoEnCancha} alt="Foto en cancha" className="w-full rounded-lg" />
      </div>
    </div>
  );
};

export default PlayerDetail;
