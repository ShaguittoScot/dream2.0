import React from 'react';

const AddPartidoForm = ({ nuevoPartido, setNuevoPartido, agregarPartido }) => (
  <form onSubmit={agregarPartido} className="space-y-8 relative z-10">
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-orange-300">Equipo Local</label>
        <div className="relative group">
          <input
            type="text"
            value={nuevoPartido.equipo1}
            onChange={(e) => setNuevoPartido({...nuevoPartido, equipo1: e.target.value})}
            className="w-full bg-zinc-700/30 border-2 border-zinc-600 rounded-xl p-4 text-zinc-100 
                     focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
          />
          <div className="absolute inset-0 rounded-xl border border-orange-500/0 group-hover:border-orange-500/30 transition-all pointer-events-none"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-orange-300">Equipo Visitante</label>
        <div className="relative group">
          <input
            type="text"
            value={nuevoPartido.equipo2}
            onChange={(e) => setNuevoPartido({...nuevoPartido, equipo2: e.target.value})}
            className="w-full bg-zinc-700/30 border-2 border-zinc-600 rounded-xl p-4 text-zinc-100 
                     focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all"
          />
          <div className="absolute inset-0 rounded-xl border border-orange-500/0 group-hover:border-orange-500/30 transition-all pointer-events-none"></div>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <label className="block text-sm font-semibold text-orange-300">Fecha del Encuentro</label>
      <div className="relative">
        <input
          type="datetime-local"
          value={nuevoPartido.fecha}
          onChange={(e) => setNuevoPartido({...nuevoPartido, fecha: e.target.value})}
          className="w-full bg-zinc-700/30 border-2 border-zinc-600 rounded-xl p-4 text-zinc-100
                   focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>

    <button 
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-zinc-900 font-bold py-4 rounded-xl
               transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-orange-500/20"
    >
      Programar Encuentro
      <span className="ml-3">⚽</span>
    </button>
  </form>
);

export default AddPartidoForm;
