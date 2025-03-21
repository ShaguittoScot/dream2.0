import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Datos desde Firebase
const playerData = {
  descripcion: "(cadena)",
  edad: 22,
  equipo: "Dreamers",
  estadisticas: {
    asistenciasPorPartido: 789,
    minutosPorPartido: 587,
    partidosJugados: 256,
    puntosPorPartido: 589,
    rebotesPorPartido: 354,
    robosPorPartido: 175,
    taponesPorPartido: 12
  },
  fotoEnCancha: "https://res.cloudinary.com/dyfx2br3h/image/upload/v1742484273/tvwz9pzecvk0myqgrt6j.jpg",
  fotoPerfil: "https://res.cloudinary.com/dyfx2br3h/image/upload/v1742484272/vvpye06y0drdm1ug1vwd.jpg",
  nombre: "Ariel",
  numero: 23,
  posicion: "Delantero",
  sobrenombre: "Sadriel"
};

const BasketballProfile = () => {
  const radarData = [
    { stat: 'PTS', value: playerData.estadisticas.puntosPorPartido },
    { stat: 'AST', value: playerData.estadisticas.asistenciasPorPartido },
    { stat: 'REB', value: playerData.estadisticas.rebotesPorPartido },
    { stat: 'ROB', value: playerData.estadisticas.robosPorPartido },
    { stat: 'TAP', value: playerData.estadisticas.taponesPorPartido }
  ];

  return (
    <div className="bg-slate-900 min-h-screen p-8 text-gray-100 font-sans">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-xl p-6 mb-8 shadow-xl border border-slate-700"
      >
        <div className="flex items-center gap-6">
          <img 
            src={playerData.fotoPerfil}
            alt="Perfil"
            className="w-20 h-20 rounded-full border-2 border-red-600"
          />
          <div>
            <h1 className="text-4xl font-bold">{playerData.nombre}</h1>
            <h2 className="text-2xl text-red-400">"{playerData.sobrenombre}"</h2>
            <div className="flex gap-3 mt-2 items-center">
              <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
                {playerData.posicion}
              </span>
              <span className="text-red-400 font-medium">
                #{playerData.numero}
              </span>
              <div className="flex gap-2">
                <span className="text-slate-400">{playerData.equipo}</span>
                <span className="text-slate-400">Edad: {playerData.edad}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Estadísticas por Partido</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis dataKey="stat" stroke="#e2e8f0" />
                  <Radar
                    dataKey="value"
                    stroke="#dc2626"
                    fill="#dc2626"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Detalles de Juego</h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                label="Partidos Jugados"
                value={playerData.estadisticas.partidosJugados}
              />
              <StatCard 
                label="Minutos por Partido"
                value={playerData.estadisticas.minutosPorPartido}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <div className="relative group">
              <img
                src={playerData.fotoEnCancha}
                alt={playerData.nombre}
                className="w-full h-96 object-cover rounded-xl transform group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 p-4 rounded-b-xl">
                <h2 className="text-3xl font-bold">{playerData.equipo}</h2>
                <p className="text-slate-400">Temporada actual</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Promedios</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[playerData.estadisticas]}>
                  <Bar 
                    dataKey="puntosPorPartido" 
                    fill="#dc2626" 
                    name="Puntos"
                    label={{ fill: 'white' }}
                  />
                  <Bar 
                    dataKey="asistenciasPorPartido" 
                    fill="#94a3b8" 
                    name="Asistencias"
                  />
                  <Bar 
                    dataKey="rebotesPorPartido" 
                    fill="#475569" 
                    name="Rebotes"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Componente auxiliar para estadísticas
const StatCard = ({ label, value }) => (
  <div className="bg-slate-700 p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-xl font-bold text-red-500">{value}</span>
    </div>
  </div>
);

export default BasketballProfile;
