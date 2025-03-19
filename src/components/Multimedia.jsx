import React, { useState } from "react";
import { subirFoto, subirVideo } from "../firebase/multimedia";

function Multimedia() {
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [archivoVideo, setArchivoVideo] = useState(null);
  const [urlFoto, setUrlFoto] = useState("");
  const [urlVideo, setUrlVideo] = useState("");

  // Manejar la subida de fotos
  const handleSubirFoto = async () => {
    if (archivoFoto) {
      try {
        const ruta = `fotos/${archivoFoto.name}`;
        const url = await subirFoto(ruta, archivoFoto);
        setUrlFoto(url);
        alert("Foto subida exitosamente: " + url);
      } catch (error) {
        console.error("Error al subir la foto:", error);
        alert("Hubo un error al subir la foto.");
      }
    } else {
      alert("Selecciona un archivo de foto primero.");
    }
  };

  // Manejar la subida de videos
  const handleSubirVideo = async () => {
    if (archivoVideo) {
      try {
        const ruta = `videos/${archivoVideo.name}`;
        const url = await subirVideo(ruta, archivoVideo);
        setUrlVideo(url);
        alert("Video subido exitosamente: " + url);
      } catch (error) {
        console.error("Error al subir el video:", error);
        alert("Hubo un error al subir el video.");
      }
    } else {
      alert("Selecciona un archivo de video primero.");
    }
  };

  return (
    <div>
      <h1>Gestión de Multimedia</h1>

      {/* Subir Foto */}
      <div>
        <h2>Subir Foto</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setArchivoFoto(e.target.files[0])}
        />
        <button onClick={handleSubirFoto}>Subir Foto</button>
        {urlFoto && (
          <div>
            <p>Foto subida: <a href={urlFoto} target="_blank" rel="noopener noreferrer">{urlFoto}</a></p>
            <img src={urlFoto} alt="Foto subida" style={{ maxWidth: "200px", marginTop: "10px" }} />
          </div>
        )}
      </div>

      {/* Subir Video */}
      <div>
        <h2>Subir Video</h2>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setArchivoVideo(e.target.files[0])}
        />
        <button onClick={handleSubirVideo}>Subir Video</button>
        {urlVideo && (
          <div>
            <p>Video subido: <a href={urlVideo} target="_blank" rel="noopener noreferrer">{urlVideo}</a></p>
            <video controls style={{ maxWidth: "300px", marginTop: "10px" }}>
              <source src={urlVideo} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default Multimedia;
