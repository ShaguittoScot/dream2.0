import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox]);

  return (
    <section className="py-16 w-full px-4 flex flex-col items-center bg-gradient-to-r from-[#23878e]/10 via-[#f4a244]/10 to-[#d24d33]/10">
      {/* Título con gradiente */}
      <h2 className="text-center text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#23878e] to-[#d24d33] font-arvo tracking-wide">
        GALERIA
      </h2>

      {/* Mosaico de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => {
              setSelectedImage(image);
              setLightboxOpen(true);
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              className="w-full h-40 object-cover rounded-lg"
              alt={`Imagen ${index + 1}`}
            />
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-[90%] max-w-4xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click en la imagen
            >
              <img
                src={selectedImage}
                className="w-full h-auto max-h-[80vh] rounded-lg shadow-lg object-contain"
                alt="Imagen seleccionada"
              />

              {/* Botón Cerrar */}
              <button
                className="absolute top-4 right-4 bg-[#d24d33] text-white text-3xl p-2 rounded-full shadow-lg hover:bg-[#f4a244] transition"
                onClick={closeLightbox}
              >
                &#10006;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
