import React, { useState, useEffect } from "react";
import AdminJugadores from "../../components/admin/AdminJugadores";
import PartidosAdmin from "../../components/admin/PartidosAdmin";
import AdminEquipo from "../../components/admin/AdminEquipo";

const SECCIONES = {
  JUGADORES: "jugadores",
  PARTIDOS: "partidos",
  EQUIPO: "equipo",
};

const AdminDashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState(SECCIONES.JUGADORES);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar menú al cambiar de sección en móvil
  useEffect(() => {
    if (menuAbierto && isMobile) {
      setMenuAbierto(false);
    }
  }, [seccionActiva, isMobile]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-900 text-white">
      {/* Botón de menú para móviles */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className={`md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all ${
          menuAbierto ? 'bg-red-500' : 'bg-amber-500'
        }`}
      >
        {menuAbierto ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar mejorado */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-full md:w-64 lg:w-72 bg-gray-800 p-6 transform mt-20 ${
          menuAbierto ? 'translate-y-0' : 'translate-y-full md:translate-y-0'
        } transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none`}
        style={{
          height: isMobile ? '70vh' : '100vh',
          bottom: 0,
          top: 'auto',
          borderTopLeftRadius: '1.5rem',
          borderTopRightRadius: '1.5rem',
          overflowY: 'auto'
        }}
      >
        <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center md:text-left border-b border-gray-700 pb-3">
          🚀 Panel de Control
        </h2>
        <ul className="space-y-3">
          <li
            className={`p-4 cursor-pointer transition-all rounded-xl flex items-center ${
              seccionActiva === SECCIONES.JUGADORES
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold shadow-md"
                : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setSeccionActiva(SECCIONES.JUGADORES);
              if (isMobile) setMenuAbierto(false);
            }}
          >
            <span className="mr-3 text-lg">👤</span>
            <span className="text-lg">Jugadores</span>
          </li>
          <li
            className={`p-4 cursor-pointer transition-all rounded-xl flex items-center ${
              seccionActiva === SECCIONES.PARTIDOS
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold shadow-md"
                : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setSeccionActiva(SECCIONES.PARTIDOS);
              if (isMobile) setMenuAbierto(false);
            }}
          >
            <span className="mr-3 text-lg">📅</span>
            <span className="text-lg">Partidos</span>
          </li>
          <li
            className={`p-4 cursor-pointer transition-all rounded-xl flex items-center ${
              seccionActiva === SECCIONES.EQUIPO
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold shadow-md"
                : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setSeccionActiva(SECCIONES.EQUIPO);
              if (isMobile) setMenuAbierto(false);
            }}
          >
            <span className="mr-3 text-lg">🏟️</span>
            <span className="text-lg">Multimedia</span>
          </li>
        </ul>
      </aside>

      {/* Contenido Principal mejorado */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 mt-20"
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth'
      }}>
        <div className="bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 min-h-[calc(100vh-8rem)]">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-amber-400 border-b border-gray-700 pb-2">
              {seccionActiva === SECCIONES.JUGADORES && "Administración de Jugadores"}
              {seccionActiva === SECCIONES.PARTIDOS && "Calendario de Partidos"}
              {seccionActiva === SECCIONES.EQUIPO && "Multimedia del Equipo"}
            </h1>
          </div>
          
          {seccionActiva === SECCIONES.JUGADORES && <AdminJugadores />}
          {seccionActiva === SECCIONES.PARTIDOS && <PartidosAdmin />}
          {seccionActiva === SECCIONES.EQUIPO && <AdminEquipo />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;