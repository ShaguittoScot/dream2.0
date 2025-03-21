import React, { useState, useEffect } from "react";
import { db } from "../../db/conexiondb";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { subirImagenACloudinary } from "../../services/cloudinary";

const FormularioJugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre: "",
    sobrenombre: "",
    numero: "",
    edad: "",
    posicion: "",
    equipo: "Dreamers",
    descripcion: "",
    estadisticas: {
      partidosJugados: "",
      puntosPorPartido: "",
      rebotesPorPartido: "",
      asistenciasPorPartido: "",
      robosPorPartido: "",
      taponesPorPartido: "",
      minutosPorPartido: "",
    },
    fotoPerfil: "",
    fotoEnCancha: ""
  });

  const [cargando, setCargando] = useState(true);
  const [agregando, setAgregando] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoEnCancha, setFotoEnCancha] = useState(null);
  const [previewPerfil, setPreviewPerfil] = useState(null);
  const [previewEnCancha, setPreviewEnCancha] = useState(null);

  useEffect(() => {
    const jugadoresCollection = collection(db, "jugadores");

    const unsubscribe = onSnapshot(jugadoresCollection, (snapshot) => {
      setJugadores(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (event, tipo) => {
    const file = event.target.files[0];
    if (tipo === "perfil") {
      setFotoPerfil(file);
      setPreviewPerfil(URL.createObjectURL(file));
    } else {
      setFotoEnCancha(file);
      setPreviewEnCancha(URL.createObjectURL(file));
    }
  };

  const agregarJugador = async () => {
    if (!nuevoJugador.nombre || !nuevoJugador.equipo || !nuevoJugador.posicion || !nuevoJugador.numero) {
      alert("Todos los campos obligatorios deben completarse");
      return;
    }

    setAgregando(true);
    try {
      const urlPerfil = fotoPerfil ? await subirImagenACloudinary(fotoPerfil) : "";
      const urlEnCancha = fotoEnCancha ? await subirImagenACloudinary(fotoEnCancha) : "";

      const jugadoresCollection = collection(db, "jugadores");

      await addDoc(jugadoresCollection, {
        ...nuevoJugador,
        numero: Number(nuevoJugador.numero),
        edad: Number(nuevoJugador.edad),
        estadisticas: {
          partidosJugados: nuevoJugador.estadisticas.partidosJugados ? Number(nuevoJugador.estadisticas.partidosJugados) : 0,
          puntosPorPartido: nuevoJugador.estadisticas.puntosPorPartido ? Number(nuevoJugador.estadisticas.puntosPorPartido) : 0,
          rebotesPorPartido: nuevoJugador.estadisticas.rebotesPorPartido ? Number(nuevoJugador.estadisticas.rebotesPorPartido) : 0,
          asistenciasPorPartido: nuevoJugador.estadisticas.asistenciasPorPartido ? Number(nuevoJugador.estadisticas.asistenciasPorPartido) : 0,
          robosPorPartido: nuevoJugador.estadisticas.robosPorPartido ? Number(nuevoJugador.estadisticas.robosPorPartido) : 0,
          taponesPorPartido: nuevoJugador.estadisticas.taponesPorPartido ? Number(nuevoJugador.estadisticas.taponesPorPartido) : 0,
          minutosPorPartido: nuevoJugador.estadisticas.minutosPorPartido ? Number(nuevoJugador.estadisticas.minutosPorPartido) : 0,
        },
        fotoPerfil: urlPerfil,
        fotoEnCancha: urlEnCancha,
      });

      setNuevoJugador({
        nombre: "",
        sobrenombre: "",
        numero: "",
        edad: "",
        posicion: "",
        equipo: "",
        descripcion: "",
        estadisticas: {
          partidosJugados: "",
          puntosPorPartido: "",
          rebotesPorPartido: "",
          asistenciasPorPartido: "",
          robosPorPartido: "",
          taponesPorPartido: "",
          minutosPorPartido: "",
        },
        fotoPerfil: "",
        fotoEnCancha: ""
      });

      setFotoPerfil(null);
      setFotoEnCancha(null);
      setPreviewPerfil(null);
      setPreviewEnCancha(null);
    } catch (error) {
      console.error("Error al agregar jugador:", error);
      alert("Hubo un error al agregar el jugador.");
    } finally {
      setAgregando(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mt-10 mb-8">Gestión de Jugadores</h1>

      <div className="bg-black/80 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Agregar Jugador</h2>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Nombre" value={nuevoJugador.nombre} onChange={(e) => setNuevoJugador({ ...nuevoJugador, nombre: e.target.value })} className="bg-gray-800 text-white p-2 rounded" />
          <input type="text" placeholder="Sobrenombre" value={nuevoJugador.sobrenombre} onChange={(e) => setNuevoJugador({ ...nuevoJugador, sobrenombre: e.target.value })} className="bg-gray-800 text-white p-2 rounded" />
          <input type="number" placeholder="Número" value={nuevoJugador.numero} onChange={(e) => setNuevoJugador({ ...nuevoJugador, numero: e.target.value })} className="bg-gray-800 text-white p-2 rounded" />
          <input type="number" placeholder="Edad" value={nuevoJugador.edad} onChange={(e) => setNuevoJugador({ ...nuevoJugador, edad: e.target.value })} className="bg-gray-800 text-white p-2 rounded" />
          <select
            value={nuevoJugador.posicion}
            onChange={(e) => setNuevoJugador({ ...nuevoJugador, posicion: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value="" disabled>Selecciona una posición</option>
            <option value="Base">Base (PG)</option>
            <option value="Escolta">Escolta (SG)</option>
            <option value="Alero">Alero (SF)</option>
            <option value="Ala-pívot">Ala-pívot (PF)</option>
            <option value="Pívot">Pívot (C)</option>
          </select>

          <input
            type="text"
            value= {nuevoJugador.equipo}
            readOnly
            className="bg-gray-800 text-white p-2 rounded"
          />

          <div className="col-span-2">
            <textarea
              placeholder="Descripción"
              value={nuevoJugador.descripcion}
              onChange={(e) => {
                if (e.target.value.length <= 200) { // Limita a 200 caracteres
                  setNuevoJugador({ ...nuevoJugador, descripcion: e.target.value });
                }
              }}
              maxLength={200} // Limita el campo a 200 caracteres
              rows={4} // Número de filas visibles
              className="bg-gray-800 text-white p-2 rounded w-full resize-none"
            />
            <div className="mt-2 text-sm text-gray-400">
              {nuevoJugador.descripcion.length}/200 caracteres
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-400 mt-4">Estadísticas (Opcionales)</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(nuevoJugador.estadisticas).map((key) => (
            <input key={key} type="number" placeholder={key} value={nuevoJugador.estadisticas[key]} onChange={(e) => setNuevoJugador({ ...nuevoJugador, estadisticas: { ...nuevoJugador.estadisticas, [key]: e.target.value } })} className="bg-gray-800 text-white p-2 rounded" />
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-xl text-white font-semibold mb-2">Foto de Perfil</label>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "perfil")}
              className="file:bg-blue-500 file:text-white file:py-2 file:px-6 file:rounded-lg file:border-0 file:cursor-pointer hover:file:bg-blue-400 transition"
            />
            {previewPerfil && (
              <img
                src={previewPerfil}
                alt="Previsualización Foto Perfil"
                className="mt-2 w-40 h-40 object-cover rounded-lg shadow-lg border-4 border-blue-500"
              />
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xl text-white font-semibold mb-2">Foto en Cancha</label>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "cancha")}
              className="file:bg-blue-500 file:text-white file:py-2 file:px-6 file:rounded-lg file:border-0 file:cursor-pointer hover:file:bg-blue-400 transition"
            />
            {previewEnCancha && (
              <img
                src={previewEnCancha}
                alt="Previsualización Foto Cancha"
                className="mt-2 w-40 h-40 object-cover rounded-lg shadow-lg border-4 border-blue-500"
              />
            )}
          </div>
        </div>


        <button onClick={agregarJugador} disabled={agregando} className="mt-4 px-6 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-black">
          {agregando ? "Agregando..." : "Agregar Jugador"}
        </button>
      </div>
      {/* Sección para mostrar los jugadores almacenados */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Jugadores Registrados</h2>

        {cargando ? (
          <p className="text-white">Cargando jugadores...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="p-3 border border-gray-700">#</th>
                  <th className="p-3 border border-gray-700">Nombre</th>
                  <th className="p-3 border border-gray-700">Equipo</th>
                  <th className="p-3 border border-gray-700">Número</th>
                  <th className="p-3 border border-gray-700">Foto Perfil</th>
                  <th className="p-3 border border-gray-700">Foto Cancha</th>
                </tr>
              </thead>
              <tbody>
                {jugadores.map((jugador, index) => (
                  <tr key={jugador.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{jugador.nombre}</td>
                    <td className="p-3">{jugador.equipo}</td>
                    <td className="p-3">{jugador.numero}</td>
                    <td className="p-3">
                      {jugador.fotoPerfil ? (
                        <img src={jugador.fotoPerfil} alt="Foto Perfil" className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        "Sin foto"
                      )}
                    </td>
                    <td className="p-3">
                      {jugador.fotoEnCancha ? (
                        <img src={jugador.fotoEnCancha} alt="Foto Cancha" className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        "Sin foto"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioJugadores;

