import React, { useState, useRef } from "react";

const VideoGallery = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [showText, setShowText] = useState(true); // Estado para controlar la visibilidad del texto
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  // Función para navegar al siguiente video
  const nextVideo = () => {
    setSelectedVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="py-16 bg-black w-full px-6 relative">
  {/* Efecto de fondo sutil */}
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500 blur-[150px] opacity-40 animate-pulse-slow"></div>
    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-600 blur-[150px] opacity-40 animate-pulse-slow"></div>
  </div>

  {/* Título con efecto de texto brillante */}
  <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-arvo tracking-wide">
    VIDEOS
  </h2>

  {/* Contenedor principal del video y detalles */}
  <div className="relative flex flex-col lg:flex-row w-full bg-black max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
    {/* Sección del Video Principal */}
    <div
      className="relative w-full lg:w-2/3 bg-black"
      onMouseEnter={() => setShowText(false)}
      onMouseLeave={() => setShowText(true)}
    >
      <div className="flex justify-center items-center bg-black">
        <video
          src={videos[selectedVideo].url}
          className="object-contain w-full h-[300px] sm:h-[400px] lg:h-[500px] mx-auto rounded-2xl"
          controls
          playsInline
          preload="auto"
        />
      </div>
    </div>

    {/* Panel de Información */}
    <div className="w-full lg:w-1/3 bg-black text-white p-4 flex flex-col justify-between">
      <div>
        <h4 className="text-2xl font-bold mb-2">{videos[selectedVideo].title}</h4>
        <p className="text-sm mb-4">{videos[selectedVideo].duration}</p>
        <p className="text-gray-300 text-sm">{videos[selectedVideo].description}</p>
      </div>
      {/* Flecha para navegar entre videos */}
      <div className="flex justify-end mt-4">
        <button
          onClick={nextVideo}
          className="text-white font-bold"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.98047 3.51001C1.43047 4.39001 0.980469 9.09992 0.980469 12.4099C0.980469 15.7199 1.41047 20.4099 3.98047 21.3199C6.69047 22.2499 14.9805 16.1599 14.9805 12.4099C14.9805 8.65991 6.69047 2.58001 3.98047 3.51001Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 5.92004C23 4.53933 21.8807 3.42004 20.5 3.42004C19.1193 3.42004 18 4.53933 18 5.92004V18.92C18 20.3008 19.1193 21.42 20.5 21.42C21.8807 21.42 23 20.3008 23 18.92V5.92004Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {/* Botones de Navegación y Lista de Videos */}
  <div className="relative mt-8 flex items-center">
    <button
      onClick={scrollLeft}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-neutral-900/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-neutral-800/90 border-2 border-neutral-800/50 hover:border-[#f4a244]/30 z-10"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#f4a244" />
      </svg>
    </button>

    {/* Lista de Videos Pequeños */}
    <div
      ref={scrollRef}
      className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth px-6 w-full"
      style={{ scrollBehavior: "smooth" }}
    >
      {videos.map((video, index) => (
        <div
          key={index}
          className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all flex-shrink-0 w-56 sm:w-64 hover:scale-105 ${selectedVideo === index ? "border-2 border-orange-500" : "border-2 border-transparent"
            }`}
          onClick={() => setSelectedVideo(index)}
        >
          <video
            src={video.url}
            className="w-full h-32 sm:h-40 object-cover rounded-2xl"
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <button className="text-white shadow-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z" stroke="#f4a244" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 text-white p-4 w-full">
            <p className="text-sm font-semibold">{video.title}</p>
            <p className="text-xs text-gray-300">
              {video.date} • {video.category}
            </p>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={scrollRight}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-neutral-900/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-neutral-800/90 border-2 border-neutral-800/50 hover:border-[#f4a244]/30 z-10"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.8205 3.26875C8.2111 2.87823 8.8442 2.87823 9.2348 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.88 14.155L9.3097 20.7304C8.9192 21.121 8.286 21.121 7.8955 20.7304C7.505 20.3399 7.505 19.7067 7.8955 19.3162L14.4675 12.7442C14.8581 12.3536 14.8581 11.7205 14.4675 11.33L7.8205 4.68297C7.43 4.29244 7.43 3.65928 7.8205 3.26875Z" fill="#f4a244" />
      </svg>
    </button>
  </div>
</section>

  );
};

export default VideoGallery;