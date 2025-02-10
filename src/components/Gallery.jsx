import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevImage = useCallback(() => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevImage, nextImage, closeLightbox]);

  return (
    <section className="py-16 bg-gray-50 w-full px-4 flex flex-col items-center">
      <h2 className="text-center text-4xl font-bold mb-6 text-orange-500 font-arvo">
        Galería
      </h2>
      {/* Contenedor de la imagen principal */}
      <div className="relative w-full max-w-3xl h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={images[selectedImage]}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              alt={`Imagen ${selectedImage + 1}`}
            />
          </motion.div>
        </AnimatePresence>
        {/* Botón Izquierda */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-3xl p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
          onClick={prevImage}
          aria-label="Imagen anterior"
        >
          &#10094;
        </button>
        {/* Botón Derecha */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-3xl p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
          onClick={nextImage}
          aria-label="Siguiente imagen"
        >
          &#10095;
        </button>
      </div>
      {/* Miniaturas */}
      <div className="flex mt-6 gap-2 overflow-x-auto w-full max-w-3xl px-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative w-20 h-16 rounded-md cursor-pointer border-2 ${
              index === selectedImage ? "border-orange-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={image}
              className="w-full h-full object-cover rounded-md"
              alt={`Miniatura ${index + 1}`}
            />
            {index === selectedImage && (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-30 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-[90%] max-w-4xl flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click en la imagen
            >
              <img
                src={images[selectedImage]}
                className="w-full h-auto max-h-[80vh] rounded-lg shadow-lg object-contain"
                alt={`Imagen ${selectedImage + 1}`}
              />
              {/* Botón Cerrar */}
              <button
                className="absolute top-4 right-4 bg-white text-black text-3xl p-2 rounded-full shadow-lg hover:bg-gray-300 transition"
                onClick={closeLightbox}
              >
                &#10006;
              </button>
              {/* Botón Izquierda */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black text-3xl p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
                onClick={prevImage}
                aria-label="Imagen anterior"
              >
                &#10094;
              </button>
              {/* Botón Derecha */}
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-black text-3xl p-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
                onClick={nextImage}
                aria-label="Siguiente imagen"
              >
                &#10095;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
