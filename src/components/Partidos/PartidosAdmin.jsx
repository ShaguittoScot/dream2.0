// components/Partidos/PartidosAdmin.jsx
import React from 'react';
import AddPartidoForm from './AddPartidoForm';
import PartidosList from './PartidosList';

const PartidosAdmin = ({ 
  partidos, 
  nuevoPartido, 
  agregarPartido, 
  eliminarPartido, 
  setNuevoPartido,
  onLogout
}) => (
  <div className="min-h-screen bg-zinc-900 text-zinc-100">
    {/* Header con Degradado */}
    <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">DREAMERS FC</h1>
          <p className="text-zinc-400 mt-1">Panel de Control - Gestión de Partidos</p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-6 py-3 rounded-xl transition-all font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 22h14v2H5v-2zm7-20a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5 5 5 0 0 0-5 5H5a7 7 0 0 1 7-7zm7 10v2h2v-2h-2zm-14 0H2v2h3v-2zm15.92-1.384l1.414-1.415 1.414 1.415-1.414 1.414-1.414-1.414zm-14.02 0L9.05 7.808l1.414 1.414-1.414 1.415-1.414-1.415zM12 18a1 1 0 0 1 1 1v4h-2v-4a1 1 0 0 1 1-1z"/>
          </svg>
          Cerrar sesión
        </button>
      </div>
    </div>

    {/* Contenido Principal */}
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Tarjeta de Formulario con Borde Luminoso */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9731620_0%,transparent_70%)]"></div>
        <h2 className="text-2xl font-bold text-orange-400 mb-8">Programar Nuevo Encuentro</h2>
        <AddPartidoForm
          nuevoPartido={nuevoPartido}
          setNuevoPartido={setNuevoPartido}
          agregarPartido={agregarPartido}
        />
      </div>

      {/* Listado con Efecto Holográfico */}
      <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-orange-300">Calendario de Partidos</h3>
          <div className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-lg border border-orange-500/20">
            {partidos.length} encuentros programados
          </div>
        </div>
        <PartidosList partidos={partidos} eliminarPartido={eliminarPartido} />
      </div>
    </div>
  </div>
);


export default PartidosAdmin;
