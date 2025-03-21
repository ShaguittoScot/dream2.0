import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-center py-8">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/administracion" replace />;
  }

  return children;
};

export default ProtectedRoute;
