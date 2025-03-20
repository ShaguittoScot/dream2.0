// pages/AdminPartidos.jsx
import React from 'react';
import PartidosAdmin from '../components/Partidos/PartidosAdmin';
import { usePartidos } from '../hooks/usePartidos';
import { useAuth } from '../hooks/useAuth';

const AdminPartidos = () => {
  const { user, handleLogout } = useAuth();
  const { partidos, nuevoPartido, setNuevoPartido, agregarPartido, eliminarPartido } = usePartidos(user);

  return (
    <PartidosAdmin
      partidos={partidos}
      nuevoPartido={nuevoPartido}
      agregarPartido={agregarPartido}
      eliminarPartido={eliminarPartido}
      setNuevoPartido={setNuevoPartido}
      onLogout={handleLogout}
    />
  );
};

export default AdminPartidos;
