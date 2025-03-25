// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import Jugadores from "./pages/Jugadores";
import AuthPage from "./components/admin/login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayerDetail from "./pages/PlayerDetail.jsx";
import EditarJugador from "./pages/admin/EditarJugador.jsx"; // Importar el componente de edición

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
          <Route path="/login" element={<AuthPage />} />

          {/* RUTAS PROTEGIDAS */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editar-jugador/:id"
            element={
              <ProtectedRoute>
                <EditarJugador />
              </ProtectedRoute>
            }
          />

          {/* Redirigir rutas no existentes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;