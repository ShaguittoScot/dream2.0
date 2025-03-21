import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../db/conexiondb";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Función de cierre de sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('firebase-auth-token'); // Si usas tokens personalizados
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return { user, loading, logout };
};

export { useAuth };

