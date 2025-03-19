import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jugadores from "./pages/Jugadores";
import Contacto from "./pages/Contacto";
import Acceso from "./pages/Acceso";

const AuthGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-20">Cargando...</div>;
  return user ? children : <Navigate to="/acceso" replace />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar fijo con sombra y z-index alto */}
        <Navbar className="fixed top-0 w-full z-50 bg-white shadow-md" />
        
        {/* Contenedor principal con margen para el navbar */}
        <div className="flex-1 mt-20 p-4"> {/* Añadido padding general */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/acceso" element={<Acceso />} />
            
            <Route
              path="/admin/partidos"
              element={
                <AuthGuard>
                  <Acceso />
                </AuthGuard>
              }
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
