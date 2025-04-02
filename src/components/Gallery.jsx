import React, { useState, useRef } from "react";

const PhotoGallery = ({ photos = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedPhoto, setExpandedPhoto] = useState(null);
  const galleryRef = useRef(null);

  const categorias = [
    "all", "general", "entrenamiento", "partido",
    "entrevista", "detrasEscenas", "eventos", "sponsors"
  ];

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.categoria === selectedCategory);

  return (
    <section className="py-16 px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#23878e] via-[#f4a244] to-[#d24d33] opacity-10 pointer-events-none"></div>
      
      {/* Decoración con burbujas de color */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#23878e] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#d24d33] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-48 h-48 bg-[#f4a244] rounded-full opacity-10 blur-3xl"></div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Encabezado con gradiente */}
        <div className="text-center mb-12">
          <h2 className="text-center text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-arvo tracking-wide">
            GALERÍA
          </h2>
        </div>

        {/* Filtros con estilo moderno */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide justify-center">
          <div className="flex space-x-2">
            {categorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => {
                  setSelectedCategory(categoria);
                  galleryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                  selectedCategory === categoria
                    ? "bg-gradient-to-r from-[#23878e] to-[#d24d33] text-white border-transparent shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {categoria === "all" ? "Todos" : categoria}
              </button>
            ))}
          </div>
        </div>

        {/* Galería tipo mosaico */}
        <div 
          ref={galleryRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-2xl bg-white group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setExpandedPhoto(photo)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.descripcion}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl">{photo.descripcion || "Sin título"}</h3>
                  <p className="text-sm text-white/90 mt-1">
                    {photo.fechaSubida?.seconds
                      ? new Date(photo.fechaSubida.seconds * 1000).toLocaleDateString()
                      : "Fecha no disponible"}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    {photo.categoria || "general"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay fotos */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No hay fotos en esta categoría</p>
            <button 
              onClick={() => setSelectedCategory("all")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#23878e] to-[#d24d33] text-white rounded-full hover:shadow-md transition-all"
            >
              Ver todas las fotos
            </button>
          </div>
        )}
      </div>

      {/* Modal para foto expandida */}
      {expandedPhoto && (
        <div 
          className="fixed inset-0 bg-white/95 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedPhoto(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg z-10 hover:bg-gray-100 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedPhoto(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col lg:flex-row gap-8 h-full">
              <div className="lg:w-2/3 h-full flex items-center">
                <img
                  src={expandedPhoto.url}
                  alt={expandedPhoto.descripcion}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-xl"
                />
              </div>
              <div className="lg:w-1/3 flex flex-col justify-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">
                    {expandedPhoto.descripcion || "Sin título"}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#23878e] to-[#d24d33] mb-4"></div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Fecha:</span> {expandedPhoto.fechaSubida?.seconds
                      ? new Date(expandedPhoto.fechaSubida.seconds * 1000).toLocaleDateString()
                      : "No disponible"}
                  </p>
                  <p className="text-gray-600 mb-6">
                    <span className="font-medium">Categoría:</span> {expandedPhoto.categoria || "general"}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    className="px-5 py-2 bg-gradient-to-r from-[#23878e] to-[#d24d33] text-white rounded-full hover:shadow-md transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Descargar
                  </button>
                  <button 
                    className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;