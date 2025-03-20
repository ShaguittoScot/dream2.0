// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Asumiendo que useAuth gestiona la autenticación

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O algún loader
  }

  if (!user) {
    return <Navigate to="/administracion" replace />; // Redirige al login si no está autenticado
  }

  return children;
};

export default ProtectedRoute;
