export const CLOUD_NAME = "dyfx2br3h"; // Agrega tu Cloud Name de Cloudinary
export const UPLOAD_PRESET = "frontend_upload"; // Usa el preset configurado en Cloudinary

export const subirImagenACloudinary = async (imagen) => {
  if (!imagen) return "";

  const formData = new FormData();
  formData.append("file", imagen);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error al subir la imagen");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    alert("No se pudo subir la imagen.");
    return "";
  }
};
