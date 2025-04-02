import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../db/conexiondb";
import { collection, getDocs } from "firebase/firestore";

const Gallery = () => {
  const [multimedia, setMultimedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const obtenerGaleria = async () => {
      const galeriaSnap = await getDocs(collection(db, "galeria"));
      setMultimedia(galeriaSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    obtenerGaleria();
  }, []);

  const closeLightbox = useCallback(() => setSelectedMedia(null), []);

  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox]);

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-[#23878e]/10 to-[#d24d33]/10">
      <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#23878e] to-[#d24d33]">
        GALERÍA
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {multimedia.map((item) => (
          <motion.div
            key={item.id}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => setSelectedMedia(item)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            {item.tipo === "imagen" ? (
              <img
                src={item.url}
                alt={item.descripcion}
                className="w-full h-40 md:h-56 object-cover"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-40 md:h-56 object-cover"
                muted
                loop
              />
            )}
            
            {item.descripcion && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
                <p className="text-white text-sm font-medium">{item.descripcion}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-full max-w-4xl p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.tipo === "imagen" ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.descripcion}
                  className="w-full max-h-[90vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full max-h-[90vh] rounded-lg"
                />
              )}
              
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-red-500 text-white text-2xl p-2 rounded-full hover:bg-red-400 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
