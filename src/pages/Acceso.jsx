import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Acceso = () => {
  // Estados para autenticación dual
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Estados para CRUD de partidos
  const [partidos, setPartidos] = useState([]);
  const [nuevoPartido, setNuevoPartido] = useState({
    equipo1: "",
    equipo2: "",
    fecha: "",
  });

  // Autenticación dual mejorada
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('¡Administrador registrado! Verifica tu correo');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setError('');
      navigate('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  // Logout actualizado
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  // CRUD Partidos (sin cambios)
  useEffect(() => {
    const fetchPartidos = async () => {
      if(user) {
        const partidosCollection = collection(db, "partidos");
        const partidosSnapshot = await getDocs(partidosCollection);
        const partidosList = partidosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPartidos(partidosList);
      }
    };
    fetchPartidos();
  }, [user]);

  const agregarPartido = async () => {
    if (nuevoPartido.equipo1 && nuevoPartido.equipo2 && nuevoPartido.fecha) {
      const partidosCollection = collection(db, "partidos");
      await addDoc(partidosCollection, nuevoPartido);
      setNuevoPartido({ equipo1: "", equipo2: "", fecha: "" });
      const partidosSnapshot = await getDocs(partidosCollection);
      setPartidos(partidosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const eliminarPartido = async (id) => {
    const partidoDoc = doc(db, "partidos", id);
    await deleteDoc(partidoDoc);
    setPartidos(partidos.filter(partido => partido.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-arvo ">
      {!user ? (
        <div className="bg-black/80 p-8 rounded-xl w-full max-w-md mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">
            {isRegistering ? 'Registro Administrativo' : 'Acceso Administrativo'}
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
              {isRegistering ? 'Registrar Administrador' : 'Ingresar'}
            </button>
          </form>

          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="text-amber-400 hover:text-amber-500 w-full text-center mt-4"
          >
            {isRegistering ? '¿Ya tienes cuenta? Ingresa aquí' : '¿Primer acceso? Regístrate como administrador'}
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Panel de gestión */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-amber-400">Gestión de Partidos</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Formulario CRUD */}
          <div className="bg-black/80 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Agregar Partido</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Equipo 1"
                value={nuevoPartido.equipo1}
                onChange={(e) => setNuevoPartido({ ...nuevoPartido, equipo1: e.target.value })}
                className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="text"
                placeholder="Equipo 2"
                value={nuevoPartido.equipo2}
                onChange={(e) => setNuevoPartido({ ...nuevoPartido, equipo2: e.target.value })}
                className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="text"
                placeholder="Fecha (DD/MM/AAAA HH:mm)"
                value={nuevoPartido.fecha}
                onChange={(e) => setNuevoPartido({ ...nuevoPartido, fecha: e.target.value })}
                className="bg-gray-800 text-white p-2 rounded focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <button
              onClick={agregarPartido}
              className="mt-4 bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Agregar Partido
            </button>
          </div>

          {/* Lista de partidos */}
          <div className="bg-black/80 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Partidos Programados</h2>
            <div className="space-y-3">
              {partidos.map((partido) => (
                <div
                  key={partido.id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <span className="text-amber-400 font-medium">{partido.equipo1}</span>
                    <span className="mx-2 text-white">vs</span>
                    <span className="text-amber-400 font-medium">{partido.equipo2}</span>
                    <span className="ml-4 text-gray-300">{partido.fecha}</span>
                  </div>
                  <button
                    onClick={() => eliminarPartido(partido.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Acceso;
