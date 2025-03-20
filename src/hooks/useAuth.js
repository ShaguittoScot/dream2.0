// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { registrarUsuario, iniciarSesion } from '../firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);  // ✅ Solo actualiza estado, sin navegación
    });
    return unsubscribe;
  }, []);  // ❌ Eliminamos navigate de las dependencias

  const handleAuth = async (email, password, isRegistering) => {
    try {
      if (isRegistering) {
        await registrarUsuario(email, password);
        alert('Admin registrado ✅');
      } else {
        await iniciarSesion(email, password);
      }
      setError('');
      return { success: true };
    } catch (error) {
      const errorMsg = error.message.replace('Firebase: ', '');
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  return { user, loading, error, handleAuth, handleLogout };
};
