// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jugadores from "./pages/Jugadores";
import AuthPage from "./components/admin/login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayerDetail from "./pages/PlayerDetail.jsx"

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/jugador/:id" element={<PlayerDetail />} />
          
          {/* Página de Login */}
          <Route path="/administracion" element={<AuthPage />} />

          {/* RUTA PROTEGIDA - Dashboard de Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirigir rutas no existentes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
