import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { db } from "../db/conexiondb.js";
import { doc, getDoc } from "firebase/firestore";

const BasketballProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const playerRef = doc(db, "jugadores", id);
      const playerSnap = await getDoc(playerRef);

      if (playerSnap.exists()) {
        setPlayer({ id: playerSnap.id, ...playerSnap.data() });
      }
      setLoading(false);
    };

    fetchPlayer();
  }, [id]);

  if (loading) return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <p className="text-gray-800 text-xl">Cargando perfil...</p>
    </div>
  );

  if (!player) return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <p className="text-[#FF6B35] text-xl">Jugador no encontrado</p>
    </div>
  );

  // *************** INICIO DATOS PARA GRÁFICAS ***************
  const radarData = [
    { stat: 'PTS', value: player.estadisticas.puntosPorPartido },
    { stat: 'AST', value: player.estadisticas.asistenciasPorPartido },
    { stat: 'REB', value: player.estadisticas.rebotesPorPartido },
    { stat: 'ROB', value: player.estadisticas.robosPorPartido },
    { stat: 'BLK', value: player.estadisticas.taponesPorPartido }
  ];
  // *************** FIN DATOS PARA GRÁFICAS ***************

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">

      {/* *************** INICIO BANNER SUPERIOR *************** */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-[560px] md:h-[600px] relative overflow-hidden shadow-2xl"
      >
        <img
          src={player.fotoEnCancha}
          alt="Banner del jugador"
          className="w-full h-full object-cover object-center brightness-90"
        />

        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

        {/* Texto del banner */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 pt-24">
          <div className="max-w-7xl mx-auto text-white">
            <h2 className="text-6xl font-black tracking-tight opacity-95">
            </h2>
            <p className="text-2xl font-medium mt-3 opacity-90">
            </p>
          </div>
        </div>
      </motion.div>
      {/* *************** FIN BANNER SUPERIOR *************** */}

      {/* *************** INICIO CONTENIDO PRINCIPAL *************** */}
      <div className="px-8">


        {/* ********** INICIO HEADER DEL JUGADOR ********** */}
        <div className="relative z-20 px-8 -mt-36 md:-mt-44">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100/80 w-full md:w-4/5 lg:w-3/5 mx-auto"
          >
            <div className="flex items-start gap-8">
              {/* Foto del jugador */}
              <div className="relative">
                <img
                  src={player.fotoPerfil}
                  alt="Perfil"
                  className="w-40 h-52 object-cover rounded-xl shadow-lg border-[0.5px] border-gray-200/80 transform transition-transform hover:scale-105"
                />
                <div className="absolute -bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md border border-gray-100 text-lg font-medium">
                  #{player.numero}
                </div>
              </div>

              {/* Información del jugador */}
              <div className="flex-1 space-y-3">
                <div className="flex items-baseline gap-4">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    {player.nombre.toUpperCase()}
                  </h1>
                  <h2 className="text-2xl text-[#FF6B35] font-medium italic">
                    "{player.sobrenombre}"
                  </h2>
                </div>

                <h3 className="text-xl text-gray-600 font-semibold mb-4">
                  {player.descripcion}
                </h3>

                {/* Badges informativos */}
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="bg-gray-50 px-4 py-2 rounded-full text-base font-medium text-gray-700 border border-gray-200">
                    {player.posicion}
                  </span>

                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{player.equipo}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Edad: {player.edad}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.header>
        </div>
        {/* ********** FIN HEADER DEL JUGADOR ********** */}



        {/* ********** INICIO MAIN CONTENT ********** */}
        <main className="grid lg:grid-cols-2 gap-8 mt-24">

          {/* >>>>>>>>>> INICIO SECCIÓN IZQUIERDA <<<<<<<<<< */}
          <div className="space-y-9">

            {/* --- Estadísticas Generales --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 p-6 rounded-2xl border border-gray-200"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Estadísticas Generales</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Partidos Jugados" value={player.estadisticas.partidosJugados} />
                <StatCard label="Minutos por Partido" value={player.estadisticas.minutosPorPartido} />
                <StatCard label="Dobles-Dobles" value={player.estadisticas.doblesDobles} />
                <StatCard label="Triples por Partido" value={player.estadisticas.triplesPorPartido} />
              </div>
            </motion.div>

            {/* --- Gráfico Radar --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 p-6 rounded-2xl border border-gray-200"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Distribución de Habilidades</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <Radar
                      dataKey="value"
                      stroke="#FF6B35"
                      fill="#FF6B35"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          {/* >>>>>>>>>> FIN SECCIÓN IZQUIERDA <<<<<<<<<< */}

          {/* >>>>>>>>>> INICIO SECCIÓN DERECHA <<<<<<<<<< */}
          <div className="space-y-8">

            {/* --- Gráfico de Barras --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 p-6 rounded-2xl border border-gray-200"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Rendimiento por Partido</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[player.estadisticas]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <Bar dataKey="puntosPorPartido" fill="#FF6B35" name="Puntos" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="asistenciasPorPartido" fill="#E5E7EB" name="Asistencias" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rebotesPorPartido" fill="#D1D5DB" name="Rebotes" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="robosPorPartido" fill="#9CA3AF" name="Robos" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="taponesPorPartido" fill="#6B7280" name="Tapones" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* --- Estadísticas Adicionales --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 p-6 rounded-2xl border border-gray-200"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Detalles Adicionales</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Eficiencia TS%" value={`${player.estadisticas.eficiencia}%`} />
                <StatCard label="Puntos Totales" value={player.estadisticas.puntosTotales} />
              </div>
            </motion.div>
          </div>
          {/* >>>>>>>>>> FIN SECCIÓN DERECHA <<<<<<<<<< */}

        </main>
        {/* ********** FIN MAIN CONTENT ********** */}

      </div>
      {/* *************** FIN CONTENIDO PRINCIPAL *************** */}

    </div>
  );
};

// *************** COMPONENTE STAT CARD ***************
const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-xl font-bold text-[#FF6B35]">{value}</span>
    </div>
  </div>
);

export default BasketballProfile;
