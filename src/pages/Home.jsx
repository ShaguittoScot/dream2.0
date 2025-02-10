import React from 'react';
import Footer from '../components/Footer';
import Gallery from "../components/Gallery";
import VideoGallery from '../components/VideoGalery.jsx';

const images = Array.from({ length: 15 }).map(
  (_, index) => `/images/galeria/galeria (${index + 1}).jpg`
);

// Generar videos dinámicamente
const videos = Array.from({ length: 17 }).map((_, index) => ({
  url: `/videos/video (${index + 1}).mp4`,
  title: `Video ${index + 1}`,
  date: `${Math.floor(Math.random() * 30) + 1}d`,
  category: index % 2 === 0 ? "game" : "players",
}));

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <section className="banner_main relative">
        <div id="myCarousel" className="carousel slide banner" data-bs-ride="carousel" data-bs-interval="3000">
          {/* Indicadores */}
          <ol className="carousel-indicators">
            {[0, 1, 2, 3].map((index) => (
              <li
                key={index}
                data-bs-target="#myCarousel"
                data-bs-slide-to={index}
                className={`${index === 0 ? "active" : ""} w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300`}
              ></li>
            ))}
          </ol>

          {/* Contenido del carrusel */}
          <div className="carousel-inner w-100">
            {[
              { src: "/images/banner/img1.jpg", text: "Entrando a Territorio Dreamer" },
              { src: "/images/banner/img2.jpg", text: "¡Sigue tus sueños!" },
              { src: "/images/banner/img3.jpg", text: "¡Vive la pasión!" },
              { src: "/images/banner/img4.jpg", text: "¡Sueña en grande!" },
            ].map((slide, index) => (
              <div
                key={index}
                className={`carousel-item relative h-[780px] ${index === 0 ? "active" : ""}`}
              >
                {/* Imagen del banner */}
                <img
                  src={slide.src}
                  className="d-block w-full h-full object-cover transform transition-transform duration-700 scale-100 hover:scale-105"
                  alt={`Slide ${index + 1}`}
                />

                {/* Capa de degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Texto del banner */}
                <div className="carousel-caption d-none d-md-block relative z-10 text-white animate-fadeIn">
                  <h1 className="text-6xl font-extrabold drop-shadow-md font-arvo mb-4">
                    {slide.text}
                  </h1>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Controles de navegación */}
          <a
            className="carousel-control-prev custom-nav"
            href="#myCarousel"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-black/50 rounded-full p-4 hover:bg-black/70 transition-all duration-300"
              aria-hidden="true"
            ></span>
          </a>
          <a
            className="carousel-control-next custom-nav"
            href="#myCarousel"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-black/50 rounded-full p-4 hover:bg-black/70 transition-all duration-300"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </section>
      {/* End Banner */}
      {/*calendar */}

      <section className="schedule py-20 bg-gradient-to-br from-orange-600 to-red-700 relative overflow-hidden">
        {/* Efecto de resplandor en el fondo (se mantiene igual) */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-400 blur-[150px] opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-500 blur-[150px] opacity-40"></div>
        </div>

        <h2 className="text-center text-5xl font-arvo font-bold text-white mb-12 animate-fade-in">
          Próximos Partidos
        </h2>

        {/* Contenedor tipo carrusel */}
        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Flechas de navegación (opcional) */}
          <button className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm border-2 border-orange-200/20 text-orange-100 rounded-full hover:bg-white/20 hover:border-orange-200/40 transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm border-2 border-orange-200/20 text-orange-100 rounded-full hover:bg-white/20 hover:border-orange-200/40 transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>

          {/* Tarjetas deslizables */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-6 pb-6">
            {[
              { match: "Equipo vs. Rival", date: "12 de Marzo, 2025" },
              { match: "Equipo vs. Otro Rival", date: "18 de Marzo, 2025" },
              { match: "Equipo vs. Último Rival", date: "25 de Marzo, 2025" },
            ].map((game, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-orange-500/90 to-red-600/90 backdrop-blur-md border-2 border-orange-400/30 rounded-2xl shadow-2xl transform transition-transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,100,0,0.6)] duration-300 cursor-pointer snap-center"
              >
                <div className="p-8 flex flex-col justify-center items-center text-center relative">
                  {/* Efecto de resplandor en hover */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-orange-500/20 blur-2xl rounded-lg"></div>

                  {/* Icono de estadio */}
                  <div className="mb-6">
                    <svg
                      className="w-12 h-12 text-orange-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>

                  {/* Información del partido */}
                  <h3 className="text-2xl font-bold text-white mb-2">{game.match}</h3>
                  <p className="text-orange-100 text-lg font-medium">{game.date}</p>

                  {/* Botón de "Ver más" */}
                  <button className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-orange-200/20 text-orange-100 font-semibold rounded-lg hover:bg-white/20 hover:border-orange-200/40 transition-all duration-300">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*end calendar */}

      {/* About Team */}

      <section className="about-team text-center py-20 bg-gray-100 px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">

          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-orange-400  tracking-wide uppercase font-arvo">
              Sobre Nosotros
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Somos un equipo apasionado por el baloncesto, comprometidos con la excelencia y el trabajo en equipo.
              ¡Únete a nuestra comunidad y vive la pasión del baloncesto con nosotros!
            </p>

            <div className="mt-6 w-24 h-1 bg-orange-400 mx-auto"></div>
          </div>

          <div className="lg:w-2/3 flex justify-center lg:justify-start">
            <img
              src="/images/galeria/galeria (39).jpg"
              alt="Nuestro equipo"
              className="w-full max-w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>



      {/* Team Template */}
      <section className="team-roster py-20 bg-black relative overflow-hidden">
        {/* Efecto de fondo sutil */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500 blur-[150px] opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-600 blur-[150px] opacity-40"></div>
        </div>

        {/* Título con efecto de texto brillante */}
        <h2 className="text-center text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-arvo tracking-wide">
          Nuestro Equipo
        </h2>

        {/* Contenedor de jugadores con scroll horizontal */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-8 px-12 py-4">
            {[
              { num: 66, name: "Juan Diego", img: "/images/volpi.png" },
              { num: 7, name: "Abisha", img: "/images/placeholder.png" },
              { num: 3, name: "Alexander", img: "/images/equipo/Alex.jpg" },
              { num: 14, name: "Ian", img: "/images/equipo/Ian.jpg" },
              { num: 4, name: "Capy", img: "/images/mendez.png" },
              { num: 11, name: "Kamil", img: "/images/equipo/Kamil.jpg" },
              { num: 9, name: "Bruno", img: "/images/mendez.png" },
              { num: 99, name: "Omar", img: "/images/mendez.png" },
              { num: 30, name: "Dani", img: "/images/mendez.png" },
              { num: 14, name: "Edgar", img: "/images/mendez.png" },
              { num: 12, name: "Leo", img: "/images/mendez.png" },
              { num: 13, name: "Iker", img: "/images/equipo/Iker.jpeg" },
              { num: 44, name: "Alex", img: "/images/mendez.png" },
              { num: 14, name: "Oswaldo", img: "/images/mendez.png" },
            ].map((player, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-neutral-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-neutral-800/90 border-2 border-neutral-800/50 hover:border-orange-500/30"
              >
                {/* Imagen del jugador con efecto de brillo */}
                <div className="w-56 h-56 flex items-center justify-center relative">
                  <img
                    src={player.img}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>

                {/* Número y nombre del jugador */}
                <h3 className="text-orange-500 text-5xl font-bold mt-4">{player.num}</h3>
                <p className="text-gray-300 text-xl uppercase font-semibold tracking-wide mt-2">
                  {player.name}
                </p>

                {/* Botón de "Ver perfil" */}
                <button className="mt-4 px-6 py-2 bg-orange-500/10 backdrop-blur-sm border-2 border-orange-500/20 text-orange-500 font-semibold rounded-lg hover:bg-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                  Ver perfil
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botón para ver más */}
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center justify-center text-white font-semibold text-lg bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            VER TODO EL EQUIPO →
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </section>
      {/* End Team Template */}

      {/*gallery */}
      <section className="gallery bg-gray-100 w-full px-4">
        <Gallery images={images} />
      </section>

      {/* Featured Videos */}
      <section className="videos ">
        <VideoGallery videos={videos} />
      </section>
      {/* End Featured Videos */}

      {/*footer */}
      <Footer />
      {/*end footer */}
    </div >
  );
};

export default Home;
