import { db } from "./conexiondb";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { subirImagenACloudinary } from "../services/cloudinary";

// Referencia a la colección de jugadores
const jugadoresCollection = collection(db, "jugadores");

// Obtener lista de jugadores en tiempo real
export const obtenerJugadores = (callback) => {
  return onSnapshot(jugadoresCollection, (snapshot) => {
    const jugadores = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(jugadores);
  });
};

// Agregar un nuevo jugador a Firestore
export const agregarJugador = async (nuevoJugador, fotoPerfil, fotoParaElBanner, imagenesAdicionales) => {
  try {
    const urlPerfil = fotoPerfil ? await subirImagenACloudinary(fotoPerfil) : "";
    const urlBanner = fotoParaElBanner ? await subirImagenACloudinary(fotoParaElBanner) : "";

    const urlsImagenesAdicionales = await Promise.all(
      imagenesAdicionales.map((imagen) => subirImagenACloudinary(imagen))
    );

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
      fotoParaElBanner: urlBanner,
      imagenesAdicionales: urlsImagenesAdicionales,
    });

    return true;
  } catch (error) {
    console.error("Error al agregar jugador:", error);
    return false;
  }
};

// Eliminar un jugador
export const eliminarJugador = async (id) => {
  if (!window.confirm("¿Estás seguro de que deseas eliminar este jugador?")) return;

  try {
    const jugadorDoc = doc(db, "jugadores", id);
    await deleteDoc(jugadorDoc);
    alert("Jugador eliminado correctamente");
    return true;
  } catch (error) {
    console.error("Error al eliminar jugador:", error);
    alert("Hubo un error al eliminar el jugador.");
    return false;
  }
};

// Editar un jugador en Firestore
export const editarJugador = async (id, datosActualizados, fotoPerfil, fotoParaElBanner, imagenesAdicionales) => {
  try {
    const jugadorRef = doc(db, "jugadores", id);

    const urlPerfil = fotoPerfil ? await subirImagenACloudinary(fotoPerfil) : datosActualizados.fotoPerfil;
    const urlBanner = fotoParaElBanner ? await subirImagenACloudinary(fotoParaElBanner) : datosActualizados.fotoParaElBanner;

    const urlsImagenesAdicionales = imagenesAdicionales.length > 0
      ? await Promise.all(imagenesAdicionales.map((imagen) => subirImagenACloudinary(imagen)))
      : datosActualizados.imagenesAdicionales || [];

    await updateDoc(jugadorRef, {
      ...datosActualizados,
      numero: Number(datosActualizados.numero),
      edad: Number(datosActualizados.edad),
      estadisticas: {
        partidosJugados: datosActualizados.estadisticas.partidosJugados ? Number(datosActualizados.estadisticas.partidosJugados) : 0,
        puntosPorPartido: datosActualizados.estadisticas.puntosPorPartido ? Number(datosActualizados.estadisticas.puntosPorPartido) : 0,
        rebotesPorPartido: datosActualizados.estadisticas.rebotesPorPartido ? Number(datosActualizados.estadisticas.rebotesPorPartido) : 0,
        asistenciasPorPartido: datosActualizados.estadisticas.asistenciasPorPartido ? Number(datosActualizados.estadisticas.asistenciasPorPartido) : 0,
        robosPorPartido: datosActualizados.estadisticas.robosPorPartido ? Number(datosActualizados.estadisticas.robosPorPartido) : 0,
        taponesPorPartido: datosActualizados.estadisticas.taponesPorPartido ? Number(datosActualizados.estadisticas.taponesPorPartido) : 0,
        minutosPorPartido: datosActualizados.estadisticas.minutosPorPartido ? Number(datosActualizados.estadisticas.minutosPorPartido) : 0,
      },
      fotoPerfil: urlPerfil,
      fotoParaElBanner: urlBanner,
      imagenesAdicionales: urlsImagenesAdicionales,
    });

    return true;
  } catch (error) {
    console.error("Error al editar jugador:", error);
    return false;
  }
};


export const obtenerJugadorPorId = async (id) => {
  try {
    const jugadorRef = doc(db, "jugadores", id);
    const jugadorSnap = await getDoc(jugadorRef);

    if (jugadorSnap.exists()) {
      return { id: jugadorSnap.id, ...jugadorSnap.data() };
    } else {
      console.log("No se encontró el jugador con ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el jugador:", error);
    return null;
  }
};