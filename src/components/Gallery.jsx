import React, { useState } from "react";


const Gallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const openLightbox = (index) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);
    const prevImage = () =>
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextImage = () =>
      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  
    return (
      <section className="gallery py-16 bg-gray-100 w-full px-4">
        <h2 className="text-center text-4xl font-bold mb-12 text-orange-400 animate-fade-in font-arvo">
          Galería
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img src={image} className="object-cover w-full h-full aspect-[3/2]" alt={`Galería ${index + 1}`} />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  Imagen {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
  
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
              <button className="absolute top-4 right-4 text-white text-4xl z-50" onClick={closeLightbox}>
                &times;
              </button>
              <img src={images[selectedImage]} className="max-w-full max-h-full object-contain" alt={`Galería ${selectedImage + 1}`} />
              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-4xl p-2 rounded-full hover:bg-opacity-70 transition-all duration-300" onClick={prevImage}>
                &#10094;
              </button>
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-4xl p-2 rounded-full hover:bg-opacity-70 transition-all duration-300" onClick={nextImage}>
                &#10095;
              </button>
            </div>
          </div>
        )}
      </section>
    );
  };
  
  export default Gallery;
  