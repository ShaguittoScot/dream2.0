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

  return (
    <section className="py-16 bg-black w-full px-6 relative">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500 blur-[150px] opacity-40 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-600 blur-[150px] opacity-40 animate-pulse-slow"></div>
      </div>

      {/* Título con efecto de texto brillante */}
      <h2 className="text-center text-5xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-arvo tracking-wide">
        ÚLTIMOS VIDEOS
      </h2>

      {/* Video Principal */}
      <div
        className="relative w-full bg-black max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
        onMouseEnter={() => setShowText(false)} // Ocultar el texto al pasar el mouse sobre la capa
        onMouseLeave={() => setShowText(true)} // Mostrar el texto al quitar el mouse de la capa
      >
        <div className="relative overflow-hidden rounded-2xl">
          {/* Video */}
          <div className="flex justify-center items-center bg-black">
            <video
              src={videos[selectedVideo].url}
              className="object-contain w-full h-[500px] mx-auto rounded-2xl"
              controls
              playsInline
              preload="auto"
            />
          </div>
          {/* Capa para el título y texto */}
          <div
            className={`absolute inset-0 text-white flex flex-col justify-end p-20 z-10 transition-transform duration-300 ${showText ? "translate-y-0" : "translate-y-full"
              }`}
            style={{
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
            }}
          >
            <h3 className="text-white text-3xl font-bold mb-2">
              {videos[selectedVideo].title}
            </h3>
            <p className="text-gray-300 text-sm">
              {videos[selectedVideo].date} • {videos[selectedVideo].category}
            </p>
          </div>
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="relative mt-8 flex items-center">
        <button
          onClick={scrollLeft}
          className="absolute left-0 bg-black bg-opacity-60 text-white p-3 rounded-full shadow-md hover:bg-opacity-80 z-10 transform transition-transform hover:scale-110"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#fff" />
            <path d="M8.5863 10.941L13.3065 8.15419C14.0663 7.70561 15 8.28947 15 9.21316V14.7868C15 15.7105 14.0663 16.2944 13.3065 15.8458L8.5863 13.059C7.80458 12.5974 7.80458 11.4026 8.5863 10.941Z" fill="#000" />
          </svg>
        </button>
        {/* Lista de Videos Pequeños */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-6 w-full"
          style={{ scrollBehavior: "smooth" }}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all flex-shrink-0 w-64 hover:scale-105 ${selectedVideo === index ? "border-2 border-orange-500" : "border-2 border-transparent"
                }`}
              onClick={() => {
                setSelectedVideo(index);
                console.log("Video seleccionado:", index);
              }}
            >
              <video
                src={video.url}
                className="w-full h-40 object-cover rounded-2xl"
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button className="text-white shadow-md">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#fff" />
                    <path d="M15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868V9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059Z" fill="#000" />
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-0  text-white p-4 w-full">
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
          className="absolute right-0 bg-black bg-opacity-60 text-white p-3 rounded-full shadow-md hover:bg-opacity-80 z-10 transform transition-transform hover:scale-110"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#fff" />
            <path d="M15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868V9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059Z" fill="#000" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default VideoGallery;