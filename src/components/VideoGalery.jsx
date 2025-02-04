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
    <section className="py-10 bg-white w-full px-6">
      <h2 className="text-black text-3xl font-bold mb-6">ÚLTIMOS VIDEOS</h2>

      {/* Video Principal */}
      <div className="relative w-full bg-black max-w-3xl mx-auto rounded-lg"
        onMouseEnter={() => setShowText(false)} // Ocultar el texto al pasar el mouse sobre la capa
        onMouseLeave={() => setShowText(true)} // Mostrar el texto al quitar el mouse de la capa
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg max-h-[450px]">
          {/* Video */}
          <video
            src={videos[selectedVideo].url}
            className="object-contain w-full h-[450px] mx-auto rounded-lg "
            controls
            playsInline
            preload="auto"
          />
          {/* Capa para el título y texto */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 z-10 transition-transform duration-300 ${showText ? "translate-y-0" : "translate-y-full"
              }`}
          >
            <h3 className="text-white text-2xl font-bold mb-2">
              {videos[selectedVideo].title}
            </h3>
            <p className="text-gray-300 text-sm">
              {videos[selectedVideo].date} • {videos[selectedVideo].category}
            </p>
          </div>
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="relative mt-6 flex items-center">
        <button
          onClick={scrollLeft}
          className="absolute left-0 bg-black bg-opacity-60 text-white p-3 rounded-full shadow-md hover:bg-opacity-80 z-10"
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
              className={`relative rounded-lg overflow-hidden cursor-pointer shadow-md transition-all flex-shrink-0 w-60 ${selectedVideo === index ? "border-2 border-yellow-400" : ""
                }`}
              onClick={() => {
                setSelectedVideo(index);
                console.log("Video seleccionado:", index);
              }}
            >
              <video
                src={video.url}
                className="w-full h-full object-cover rounded-lg"
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
              <div className="absolute bottom-0 bg-black bg-opacity-70 text-white p-2 w-full">
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
          className="absolute right-0 bg-black bg-opacity-60 text-white p-3 rounded-full shadow-md hover:bg-opacity-80 z-10"
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