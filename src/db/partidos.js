import React, { useEffect, useState } from "react";
import { obtenerPartidos } from "./partidos";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerPartidos();
        console.log("Datos de los partidos:", data); // Verifica si los datos llegan correctamente
        setPartidos(data);
      } catch (error) {
        console.error("Error al cargar los partidos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="partidos-container">
      <h2 className="text-3xl font-bold text-center mb-6">Próximos Partidos</h2>
      <div className="flex gap-4 justify-center flex-wrap">
        {partidos.length > 0 ? (
          partidos.map((partido) => (
            <div
              key={partido.id}
              className="flex-shrink-0 w-80 bg-gradient-to-br from-orange-500/90 to-red-600/90 backdrop-blur-md border-2 border-orange-400/30 rounded-2xl shadow-2xl transform transition-transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,100,0,0.6)] duration-300 cursor-pointer snap-center"
            >
              <div className="p-8 flex flex-col justify-center items-center text-center relative">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {partido.equipo1} vs. {partido.equipo2}
                </h3>
                <p className="text-orange-100 text-lg font-medium">{partido.fecha}</p>
                <button className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-orange-200/20 text-orange-100 font-semibold rounded-lg hover:bg-white/20 hover:border-orange-200/40 transition-all duration-300">
                  Ver detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">Cargando partidos...</p>
        )}
      </div>
    </div>
  );
};

export default Partidos;
