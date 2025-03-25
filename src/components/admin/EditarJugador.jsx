import React, { useState, useEffect } from "react";
import { obtenerJugadorPorId, editarJugador } from "../../db/jugadores";

const EditarJugador = ({ jugadorId, onClose }) => {
  const [jugador, setJugador] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("Jugador ID recibido en EditarJugador:", jugadorId);

    const obtenerDatos = async () => {
      if (!jugadorId) return;

      setCargando(true); // Mostrar "Cargando..." mientras se obtienen los datos
      try {
        const datos = await obtenerJugadorPorId(jugadorId);
        console.log("Datos del jugador:", datos);

        if (datos) {
          setJugador(datos); // Establecer los datos del jugador
        } else {
          setJugador(null); // Si no hay datos, establecer jugador en null
          console.error("No se encontraron datos del jugador.");
        }
      } catch (error) {
        console.error("Error obteniendo el jugador:", error);
        setJugador(null); // En caso de error, establecer jugador en null
      }
      setCargando(false); // Finalizar la carga
    };

    obtenerDatos();
  }, [jugadorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJugador({ ...jugador, [name]: value });
  };

  const handleActualizar = async () => {
    const exito = await editarJugador(jugadorId, jugador);
    if (exito) {
      alert("Jugador actualizado correctamente");
      onClose(); // Cerrar el modal o la vista de edición
    } else {
      alert("Hubo un error al actualizar el jugador.");
    }
  };

  // Renderizar "Cargando..." mientras se obtienen los datos
  if (cargando) return <p>Cargando...</p>;

  // Renderizar "Error: No se encontró el jugador." si no hay datos
  if (!jugador) return <p>Error: No se encontró el jugador.</p>;

  // Renderizar el formulario de edición si hay datos
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
        type="text"
        name="sobrenombre"
        value={jugador.sobrenombre || ""}
        onChange={handleChange}
        placeholder="Sobrenombre"
      />
      <button onClick={handleActualizar}>Actualizar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditarJugador;