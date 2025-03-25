import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerJugadorPorId, editarJugador } from "../../db/jugadores";
import InputFile from "../../components/admin/InputFile";

const EditarJugador = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jugador, setJugador] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Estados para las imágenes
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoParaElBanner, setFotoParaElBanner] = useState(null);
  const [imagenesAdicionales, setImagenesAdicionales] = useState([]);
  const [previewPerfil, setPreviewPerfil] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewImagenesAdicionales, setPreviewImagenesAdicionales] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (!id) return;

      setCargando(true);
      try {
        const datos = await obtenerJugadorPorId(id);
        if (datos) {
          setJugador(datos);
          setFotoPerfil(datos.fotoPerfil || null);
          setFotoParaElBanner(datos.fotoParaElBanner || null);
          setImagenesAdicionales(datos.imagenesAdicionales || []);
          setPreviewPerfil(datos.fotoPerfil || null);
          setPreviewBanner(datos.fotoParaElBanner || null);
          setPreviewImagenesAdicionales(datos.imagenesAdicionales || []);
        } else {
          setJugador(null);
        }
      } catch (error) {
        console.error("Error obteniendo el jugador:", error);
        setJugador(null);
      }
      setCargando(false);
    };

    obtenerDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in jugador.estadisticas) {
      setJugador({
        ...jugador,
        estadisticas: {
          ...jugador.estadisticas,
          [name]: value,
        },
      });
    } else {
      setJugador({
        ...jugador,
        [name]: value,
      });
    }
  };

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

  const handleActualizar = async () => {
    const exito = await editarJugador(id, {
      ...jugador,
      fotoPerfil,
      fotoParaElBanner,
      imagenesAdicionales,
    });
    if (exito) {
      alert("Jugador actualizado correctamente");
      navigate("/admin");
    } else {
      alert("Hubo un error al actualizar el jugador.");
    }
  };

  if (cargando) return <p>Cargando...</p>;
  if (!jugador) return <p>Error: No se encontró el jugador.</p>;

  return (
    <div className="p-6 bg-black/80 rounded-xl">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Editar Jugador</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            value={jugador.nombre || ""}
            onChange={handleChange}
            placeholder="Nombre"
            className="bg-gray-800 text-white p-2 rounded"
          />
          <input
            type="text"
            name="sobrenombre"
            value={jugador.sobrenombre || ""}
            onChange={handleChange}
            placeholder="Sobrenombre"
            className="bg-gray-800 text-white p-2 rounded"
          />
          <input
            type="number"
            name="numero"
            value={jugador.numero || ""}
            onChange={handleChange}
            placeholder="Número"
            className="bg-gray-800 text-white p-2 rounded"
          />
          <input
            type="number"
            name="edad"
            value={jugador.edad || ""}
            onChange={handleChange}
            placeholder="Edad"
            className="bg-gray-800 text-white p-2 rounded"
          />
          <select
            name="posicion"
            value={jugador.posicion || ""}
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
            value={jugador.equipo || ""}
            readOnly
            className="bg-gray-800 text-white p-2 rounded"
          />
          <div className="col-span-1 md:col-span-2">
            <textarea
              placeholder="Descripción"
              name="descripcion"
              value={jugador.descripcion || ""}
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
              {jugador.descripcion.length}/200 caracteres
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
          {Object.keys(jugador.estadisticas).map((key) => (
            <input
              key={key}
              type="number"
              name={key}
              value={jugador.estadisticas[key] || ""}
              onChange={handleChange}
              placeholder={key}
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

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleActualizar}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarJugador;