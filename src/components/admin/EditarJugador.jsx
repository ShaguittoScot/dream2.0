import React, { useState, useEffect } from "react";
import { obtenerJugadorPorId, editarJugador } from "../../db/jugadores";

const EditarJugador = ({ jugadorId, onClose }) => {
  const [jugador, setJugador] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [nuevaFotoPerfil, setNuevaFotoPerfil] = useState(null);
  const [nuevoBanner, setNuevoBanner] = useState(null);
  const [nuevasImagenes, setNuevasImagenes] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (!jugadorId) return;

      setCargando(true);
      try {
        const datos = await obtenerJugadorPorId(jugadorId);
        if (datos) {
          // Convertir campos numéricos
          datos.numero = Number(datos.numero);
          datos.edad = Number(datos.edad);
          setJugador(datos);
        } else {
          setJugador(null);
          console.error("No se encontraron datos del jugador.");
        }
      } catch (error) {
        console.error("Error obteniendo el jugador:", error);
        setJugador(null);
      }
      setCargando(false);
    };

    obtenerDatos();
  }, [jugadorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convertir campos numéricos
    const convertedValue = name === 'numero' || name === 'edad' ? Number(value) : value;
    setJugador({ ...jugador, [name]: convertedValue });
  };

  const handleActualizar = async () => {
    try {
      const exito = await editarJugador(
        jugadorId,
        jugador,
        nuevaFotoPerfil,
        nuevoBanner,
        nuevasImagenes
      );
      
      if (exito) {
        alert("Jugador actualizado correctamente");
        onClose();
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error detallado:', error);
      alert(`Error al actualizar: ${error.message}`);
    }
  };

  if (cargando) return <p>Cargando...</p>;
  if (!jugador) return <p>Error: No se encontró el jugador.</p>;

  return (
    <div className="modal">
      <h2>Editar Jugador</h2>
      
      <input
        type="text"
        name="nombre"
        value={jugador.nombre || ""}
        onChange={handleChange}
        placeholder="Nombre"
      />
      
      <input
        type="number"
        name="numero"
        value={jugador.numero || ""}
        onChange={handleChange}
        placeholder="Número"
      />
      
      <input
        type="number"
        name="edad"
        value={jugador.edad || ""}
        onChange={handleChange}
        placeholder="Edad"
      />

      <div className="seccion-imagenes">
        <label>Nueva Foto de Perfil:
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setNuevaFotoPerfil(e.target.files[0])}
          />
        </label>

        <label>Nuevo Banner:
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setNuevoBanner(e.target.files[0])}
          />
        </label>

        <label>Imágenes adicionales (máx. 5):
          <input 
            type="file" 
            multiple
            accept="image/*"
            onChange={(e) => setNuevasImagenes([...e.target.files])}
          />
        </label>
      </div>

      <button onClick={handleActualizar}>Actualizar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditarJugador;
