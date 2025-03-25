import React, { useState } from "react";
import InputFile from "./InputFile.jsx";

const FormularioAgregarJugador = ({ onSubmit, cargando }) => {
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
  });

  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoParaElBanner, setFotoParaElBanner] = useState(null);
  const [imagenesAdicionales, setImagenesAdicionales] = useState([]);
  const [previewPerfil, setPreviewPerfil] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewImagenesAdicionales, setPreviewImagenesAdicionales] = useState([]);

  const handleFileChange = (event, tipo) => {
    const file = event.target.files[0];
    if (!file) return;

    if (tipo === "perfil") {
      setFotoPerfil(file);
      setPreviewPerfil(URL.createObjectURL(file));
    } else if (tipo === "banner") {
      setFotoParaElBanner(file);
      setPreviewBanner(URL.createObjectURL(file));
    }
  };

  const handleMultipleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    setImagenesAdicionales([...imagenesAdicionales, ...files]);
    setPreviewImagenesAdicionales([
      ...previewImagenesAdicionales,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in nuevoJugador.estadisticas) {
      setNuevoJugador({
        ...nuevoJugador,
        estadisticas: {
          ...nuevoJugador.estadisticas,
          [name]: value,
        },
      });
    } else {
      setNuevoJugador({
        ...nuevoJugador,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(nuevoJugador, fotoPerfil, fotoParaElBanner, imagenesAdicionales);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black/80 p-6 rounded-xl mb-8">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">Agregar Jugador (Campos obligatorios)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={nuevoJugador.nombre}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 rounded"
        />
        <input
          type="text"
          placeholder="Sobrenombre"
          name="sobrenombre"
          value={nuevoJugador.sobrenombre}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 rounded"
        />
        <input
          type="number"
          placeholder="Número"
          name="numero"
          value={nuevoJugador.numero}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 rounded"
        />
        <input
          type="number"
          placeholder="Edad"
          name="edad"
          value={nuevoJugador.edad}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 rounded"
        />
        <select
          name="posicion"
          value={nuevoJugador.posicion}
          onChange={handleChange}
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
          name="equipo"
          value={nuevoJugador.equipo}
          readOnly
          className="bg-gray-800 text-white p-2 rounded"
        />
        <div className="col-span-1 md:col-span-2">
          <textarea
            placeholder="Descripción"
            name="descripcion"
            value={nuevoJugador.descripcion}
            onChange={(e) => {
              if (e.target.value.length <= 200) {
                handleChange(e);
              }
            }}
            maxLength={200}
            rows={4}
            className="bg-gray-800 text-white p-2 rounded w-full resize-none"
          />
          <div className="mt-2 text-sm text-gray-400">
            {nuevoJugador.descripcion.length}/200 caracteres
          </div>
        </div>
      </div>

      <InputFile
        label="Foto de Perfil"
        onChange={(e) => handleFileChange(e, "perfil")}
        preview={previewPerfil}
        aspectRatio="3/4"
      />
      <InputFile
        label="Foto para el banner del jugador"
        onChange={(e) => handleFileChange(e, "banner")}
        preview={previewBanner}
        aspectRatio="2/1"
      />

      <h3 className="text-lg font-semibold text-blue-400 mt-4">Estadísticas (Opcionales)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(nuevoJugador.estadisticas).map((key) => (
          <input
            key={key}
            type="number"
            placeholder={key}
            name={key}
            value={nuevoJugador.estadisticas[key]}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded"
          />
        ))}
      </div>

      <div className="mt-6">
        <input
          type="file"
          multiple
          onChange={handleMultipleFilesChange}
          className="file:bg-blue-500 file:text-white file:py-2 file:px-6 file:rounded-lg file:border-0 file:cursor-pointer hover:file:bg-blue-400 transition bg-gray-800 text-white p-2 rounded w-full"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {previewImagenesAdicionales.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Imagen adicional ${index}`}
                className="w-full h-32 md:h-40 object-cover rounded-lg shadow-lg border-4 border-blue-500"
              />
              <button
                onClick={() => {
                  const nuevasImagenes = [...previewImagenesAdicionales];
                  nuevasImagenes.splice(index, 1);
                  setPreviewImagenesAdicionales(nuevasImagenes);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="mt-6 w-full px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-300"
      >
        {cargando ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Agregando...
          </div>
        ) : (
          "Agregar Jugador"
        )}
      </button>
    </form>
  );
};

export default FormularioAgregarJugador;