import React, { useState, useRef, useEffect } from "react";

const PhotoGallery = ({ photos = [], isLoading = false }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedPhoto, setExpandedPhoto] = useState(null);
  const [columns, setColumns] = useState(3);
  const galleryRef = useRef(null);

  const categorias = [
    "all", "general", "entrenamiento", "partido",
    "entrevista", "detrasEscenas", "eventos", "sponsors"
  ];

  // Ajustar columnas responsivamente
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.categoria === selectedCategory);

  // Crear grid dinámico
  const createGrid = () => {
    const grid = Array.from({ length: columns }, () => []);
    const itemsToShow = isLoading ? 6 : filteredPhotos.length;
    
    for (let i = 0; i < itemsToShow; i++) {
      grid[i % columns].push(
        isLoading ? null : filteredPhotos[i]
      );
    }
    return grid;
  };

  const grid = createGrid();

  return (
    <section className="py-12 px-4 sm:px-6 relative bg-white overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#23878e] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#d24d33] rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Encabezado */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#23878e] via-[#f4a244] to-[#d24d33] font-arvo tracking-wide">
          GALERÍA
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#23878e] to-[#d24d33] mx-auto"></div>
      </div>

      {/* Filtros */}
      <div className="relative z-10 max-w-4xl mx-auto mb-12">
        <div className="flex overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-2 mx-auto px-2">
            {categorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => !isLoading && setSelectedCategory(categoria)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === categoria
                    ? "bg-gradient-to-r from-[#23878e] to-[#d24d33] text-white shadow-md"
                    : isLoading 
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
                }`}
                disabled={isLoading}
              >
                {categoria === "all" ? "Todos" : categoria}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Galería */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {isLoading || filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {grid.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-6">
                {column.map((photo, photoIndex) => (
                  <div 
                    key={isLoading ? `skeleton-${colIndex}-${photoIndex}` : photo.id}
                    className={`relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
                      !isLoading ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => !isLoading && photo && setExpandedPhoto(photo)}
                  >
                    {isLoading ? (
                      <div className="aspect-[4/3] bg-gray-200 animate-pulse rounded-xl"></div>
                    ) : (
                      <>
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={photo.url}
                            alt={photo.descripcion}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-medium text-lg">{photo.descripcion || "Sin título"}</h3>
                            <p className="text-sm text-white/80 mt-1">
                              {photo.fechaSubida?.seconds
                                ? new Date(photo.fechaSubida.seconds * 1000).toLocaleDateString()
                                : "Fecha no disponible"}
                            </p>
                            <span className="inline-block mt-2 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                              {photo.categoria || "general"}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No hay fotos en esta categoría</p>
            <button 
              onClick={() => setSelectedCategory("all")}
              className="px-6 py-2 bg-gradient-to-r from-[#23878e] to-[#d24d33] text-white rounded-full hover:shadow-md transition-all"
            >
              Ver todas las fotos
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
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
              <div className="lg:w-2/3 h-full flex items-center justify-center">
                {isLoading ? (
                  <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
                ) : (
                  <img
                    src={expandedPhoto.url}
                    alt={expandedPhoto.descripcion}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-xl"
                  />
                )}
              </div>
              <div className="lg:w-1/3 flex flex-col justify-center py-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
                    <div className="h-1 bg-gray-200 animate-pulse rounded w-16"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {expandedPhoto.descripcion || "Sin título"}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#23878e] to-[#d24d33] mb-4"></div>
                      <div className="space-y-3">
                        <p className="text-gray-600">
                          <span className="font-medium">Fecha:</span> {expandedPhoto.fechaSubida?.seconds
                            ? new Date(expandedPhoto.fechaSubida.seconds * 1000).toLocaleDateString()
                            : "No disponible"}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Categoría:</span> {expandedPhoto.categoria || "general"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button 
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-[#23878e] to-[#d24d33] text-white rounded-lg hover:shadow-md transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Descargar
                      </button>
                      <button 
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Compartir
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;