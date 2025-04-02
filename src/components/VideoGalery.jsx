import React, { useState, useRef, useEffect } from "react";

const VideoGallery = ({ videos = [] }) => {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const scrollRef = useRef(null);

  const categorias = [
    "all", "general", "entrenamiento", "partido",
    "entrevista", "detrasEscenas", "eventos", "sponsors"
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.categoria === selectedCategory);

  // Auto-scroll al video seleccionado
  useEffect(() => {
    if (scrollRef.current && filteredVideos.length > 0) {
      const container = scrollRef.current;
      const selectedElement = container.children[selectedVideo];
      
      if (selectedElement) {
        const containerWidth = container.offsetWidth;
        const elementLeft = selectedElement.offsetLeft;
        const elementWidth = selectedElement.offsetWidth;
        
        container.scrollTo({
          left: elementLeft - (containerWidth / 2) + (elementWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [selectedVideo, filteredVideos]);

  const scrollGallery = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ 
        left: direction * 300, 
        behavior: "smooth" 
      });
    }
  };

  const nextVideo = () => {
    setSelectedVideo(prev => (prev + 1) % filteredVideos.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-16 bg-black w-full px-4 sm:px-6 relative overflow-hidden">
      {/* Efecto de fondo mejorado */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#23878e] blur-[180px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#d24d33] blur-[180px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#f4a244] blur-[120px] opacity-20 animate-pulse-slow-delayed"></div>
      </div>

      {/* Título con gradiente mejorado */}
      <h2 className="text-center text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-arvo tracking-wide">
        VIDEOS
      </h2>

      {/* Filtros mejorados */}
      <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide max-w-6xl mx-auto">
        <div className="flex space-x-2 mx-auto px-2">
          {categorias.map(categoria => (
            <button
              key={categoria}
              onClick={() => {
                setSelectedCategory(categoria);
                setSelectedVideo(0);
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === categoria
                  ? "bg-gradient-to-r from-[#23878e] to-[#d24d33] text-white shadow-md"
                  : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
              }`}
            >
              {categoria === "all" ? "Todos" : categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor principal con mejoras visuales */}
      <div className="relative flex flex-col lg:flex-row w-full bg-neutral-900/80 backdrop-blur-sm max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
        {/* Sección del video */}
        <div className="relative w-full lg:w-2/3 bg-black">
          <div className="relative aspect-video">
            {filteredVideos.length > 0 ? (
              <>
                <video
                  ref={videoRef}
                  src={filteredVideos[selectedVideo]?.url}
                  className="object-contain w-full h-[300px] sm:h-[400px] lg:h-[500px] mx-auto rounded-2xl"
                  controls
                  playsInline
                  autoPlay={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={togglePlay}
                />
                {!isPlaying && (
                  <button 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center w-full h-full group"
                  >
                    <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-[#f4a244]/20 transition-all duration-300">
                      <svg className="w-12 h-12 text-[#f4a244]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No hay videos en esta categoría
              </div>
            )}
          </div>
        </div>

        {/* Panel de información mejorado */}
        <div className="w-full lg:w-1/3 bg-neutral-900/70 text-white p-6 flex flex-col">
          <div className="mb-4">
            <h4 className="text-2xl font-bold mb-2 text-[#f4a244]">
              {filteredVideos[selectedVideo]?.descripcion || "Sin título"}
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#23878e] to-[#d24d33] mb-3"></div>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-medium">Fecha:</span> {filteredVideos[selectedVideo]?.fechaSubida?.seconds ? 
                new Date(filteredVideos[selectedVideo].fechaSubida.seconds * 1000).toLocaleDateString() : 
                "No disponible"}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-medium">Categoría:</span> {filteredVideos[selectedVideo]?.categoria || "general"}
            </p>
          </div>
          
          <div className="mt-auto pt-4 border-t border-neutral-700/50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                {selectedVideo + 1} / {filteredVideos.length}
              </span>
              <button 
                onClick={nextVideo}
                className="flex items-center space-x-1 bg-[#f4a244]/10 hover:bg-[#f4a244]/20 text-[#f4a244] px-4 py-2 rounded-full transition-all"
              >
                <span>Siguiente</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Miniaturas con mejor navegación */}
      <div className="relative mt-8 max-w-6xl mx-auto">
        <button 
          onClick={() => scrollGallery(-1)} 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900/80 hover:bg-[#f4a244]/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-neutral-700/50 hover:border-[#f4a244]/30 transition-all"
        >
          <svg className="w-5 h-5 text-[#f4a244]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
        >
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <div 
                key={index}
                onClick={() => {
                  setSelectedVideo(index);
                  setIsPlaying(true);
                }}
                className={`relative flex-shrink-0 w-48 sm:w-56 rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedVideo === index 
                    ? "ring-2 ring-[#f4a244] scale-105" 
                    : "opacity-90 hover:opacity-100 hover:scale-[1.03]"
                }`}
              >
                <video
                  src={video.url}
                  className="w-full h-28 sm:h-32 object-cover"
                  muted
                  playsInline
                />
                <div className={`absolute inset-0 flex items-end p-2 bg-gradient-to-t ${
                  selectedVideo === index 
                    ? "from-black/70 to-transparent" 
                    : "from-black/50 to-transparent"
                }`}>
                  <p className="text-white text-xs font-medium truncate w-full">
                    {video.descripcion}
                  </p>
                </div>
                {selectedVideo === index && (
                  <div className="absolute top-2 right-2 bg-[#f4a244] text-black text-xs px-2 py-1 rounded-full">
                    <svg className="w-3 h-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4l4 4" />
                    </svg>
                    Reproduciendo
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-gray-400">
              No hay videos disponibles
            </div>
          )}
        </div>

        <button 
          onClick={() => scrollGallery(1)} 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-neutral-900/80 hover:bg-[#f4a244]/10 backdrop-blur-sm p-3 rounded-full shadow-lg border border-neutral-700/50 hover:border-[#f4a244]/30 transition-all"
        >
          <svg className="w-5 h-5 text-[#f4a244]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default VideoGallery;