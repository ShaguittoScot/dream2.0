import React,{ useState } from "react";
import AdminJugadores from "../../components/admin/AdminJugadores";
import PartidosAdmin from "../../components/admin/PartidosAdmin";

const SECCIONES = {
  JUGADORES: "jugadores",
  PARTIDOS: "partidos",
};

const AdminDashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState(SECCIONES.JUGADORES);

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-gray-800 p-6 ">
        <h2 className="text-xl font-bold mb-4 mt-20">Panel de Administración</h2>
        <ul className="space-y-2">
          <li
            role="button"
            tabIndex="0"
            className={`p-3 cursor-pointer transition-all rounded-md ${
              seccionActiva === SECCIONES.JUGADORES
                ? "bg-amber-500 text-black font-bold "
                : "hover:bg-gray-700"
            }`}
            onClick={() => setSeccionActiva(SECCIONES.JUGADORES)}
            onKeyDown={(e) => e.key === "Enter" && setSeccionActiva(SECCIONES.JUGADORES)}
          >
            ⚽ Administrar Jugadores
          </li>
          <li
            role="button"
            tabIndex="0"
            className={`p-3 cursor-pointer transition-all rounded-md ${
              seccionActiva === SECCIONES.PARTIDOS
                ? "bg-amber-500 text-black font-bold"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setSeccionActiva(SECCIONES.PARTIDOS)}
            onKeyDown={(e) => e.key === "Enter" && setSeccionActiva(SECCIONES.PARTIDOS)}
          >
            🏆 Administrar Partidos
          </li>
        </ul>
      </aside>

      {/* Contenido Principal */}
      <main className="md:w-3/4 w-full p-6 transition-opacity duration-300 mt-10">
        {seccionActiva === SECCIONES.JUGADORES && <AdminJugadores />}
        {seccionActiva === SECCIONES.PARTIDOS && <PartidosAdmin />}
      </main>
    </div>
  );
};

export default AdminDashboard;
