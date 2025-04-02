import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion, registrarUsuario } from "../../db/auth"; // Ajusta la ruta según corresponda

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor, introduce un correo válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      if (isRegistering) {
        await registrarUsuario(email, password);
        alert("¡Administrador registrado!");
      } else {
        await iniciarSesion(email, password);
      }
      setError('');
      navigate("/admin");
    } catch (error) {
      const errorMessages = {
        "auth/invalid-email": "Correo electrónico inválido.",
        "auth/user-not-found": "No se encontró un usuario con este correo.",
        "auth/wrong-password": "Contraseña incorrecta.",
        "auth/email-already-in-use": "El correo ya está registrado.",
        "auth/weak-password": "La contraseña es demasiado débil.",
      };

      setError(errorMessages[error.code] || "Ocurrió un error. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-arvo">
      <div className="bg-black/80 p-8 rounded-xl w-full max-w-md mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">
          {isRegistering ? "Registro Administrativo" : "Acceso Administrativo"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-amber-400 text-black py-2 rounded font-bold hover:bg-amber-500 transition-colors"
          >
            {isRegistering ? "Registrar Administrador" : "Ingresar"}
          </button>
        </form>

        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
            setEmail('');
            setPassword('');
          }}
          className="text-amber-400 hover:text-amber-500 w-full text-center mt-4"
        >
          {isRegistering ? "¿Ya tienes cuenta? Ingresa aquí" : "¿Primer acceso? Regístrate como administrador"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
