import React, { useState } from "react";
import AdminJugadores from "../../components/admin/AdminJugadores";
import PartidosAdmin from "../../components/admin/PartidosAdmin";
import AdminEquipo from "../../components/admin/AdminEquipo"; // Importa el nuevo componente

const SECCIONES = {
  JUGADORES: "jugadores",
  PARTIDOS: "partidos",
  EQUIPO: "equipo",  // Agregar esta sección
};

const AdminDashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState(SECCIONES.JUGADORES);
  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para controlar el menú en móviles

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-900 text-white">
      {/* Botón de menú para móviles */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="md:hidden p-4 bg-gray-800 text-white fixed bottom-0 w-full z-50"
      >
        {menuAbierto ? "Cerrar Menú" : "Abrir Menú"}
      </button>

      {/* Sidebar */}
      <aside
        className={`${menuAbierto ? "block" : "hidden"} md:block md:w-1/4 w-full bg-gray-800 p-6 fixed md:relative bottom-0 md:bottom-auto z-40`}
      >
        <h2 className="text-xl font-bold mb-4 mt-20">Panel de Administración</h2>
        <ul className="space-y-2">
          <li
            className={`p-3 cursor-pointer transition-all rounded-md ${seccionActiva === SECCIONES.JUGADORES ? "bg-amber-500 text-black font-bold" : "hover:bg-gray-700"}`}
            onClick={() => {
              setSeccionActiva(SECCIONES.JUGADORES);
              setMenuAbierto(false); // Cerrar el menú en móviles al seleccionar una opción
            }}
          >
            ⚽ Administrar Jugadores
          </li>
          <li
            className={`p-3 cursor-pointer transition-all rounded-md ${seccionActiva === SECCIONES.PARTIDOS ? "bg-amber-500 text-black font-bold" : "hover:bg-gray-700"}`}
            onClick={() => {
              setSeccionActiva(SECCIONES.PARTIDOS);
              setMenuAbierto(false); // Cerrar el menú en móviles al seleccionar una opción
            }}
          >
            🏆 Administrar Partidos
          </li>
          <li
            className={`p-3 cursor-pointer transition-all rounded-md ${seccionActiva === SECCIONES.EQUIPO ? "bg-amber-500 text-black font-bold" : "hover:bg-gray-700"}`}
            onClick={() => {
              setSeccionActiva(SECCIONES.EQUIPO);
              setMenuAbierto(false); // Cerrar el menú en móviles al seleccionar una opción
            }}
          >
            🏀 Administrar Equipo
          </li>
        </ul>
      </aside>

      {/* Contenido Principal */}
      <main className="md:w-3/4 w-full p-6 mt-10 md:mt-0">
        {seccionActiva === SECCIONES.JUGADORES && <AdminJugadores />}
        {seccionActiva === SECCIONES.PARTIDOS && <PartidosAdmin />}
        {seccionActiva === SECCIONES.EQUIPO && <AdminEquipo />}
      </main>
    </div>
  );
};

export default AdminDashboard;