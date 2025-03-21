import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Gallery from "../components/Gallery";
import VideoGallery from '../components/VideoGalery.jsx';
import { db } from "../db/conexiondb.js";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const images = Array.from({ length: 15 }).map(
  (_, index) => `/images/galeria/galeria (${index + 1}).jpg`
);

// Generar videos dinámicamente
const videos = Array.from({ length: 17 }).map((_, index) => ({
  url: `/videos/video (${index + 1}).mp4`,
  title: `Video ${index + 1}`,
  date: `${Math.floor(Math.random() * 30) + 1}d`,
  category: index % 2 === 0 ? "game" : "players",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
}));

const Home = () => {
  const [partidos, setPartidos] = useState([]);

  // Leer partidos desde Firebase
  useEffect(() => {
    const fetchPartidos = async () => {
      const partidosCollection = collection(db, "partidos");
      const partidosSnapshot = await getDocs(partidosCollection);
      const partidosList = partidosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartidos(partidosList);
    };

    fetchPartidos();
  }, []);


  const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPlayers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "jugadores")); // Asegúrate de que la colección se llama "jugadores"
          const playersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPlayers(playersData);
        } catch (error) {
          console.error("Error al obtener jugadores:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPlayers();
    }, []);

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

      {/* Próximos Partidos */}
      <section className="schedule py-20 bg-gradient-to-br from-orange-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-400 blur-[150px] opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-500 blur-[150px] opacity-40"></div>
        </div>

        <h2 className="text-center text-5xl font-arvo font-bold text-white mb-12 animate-fade-in">
          PRÓXIMOS PARTIDOS
        </h2>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-6 pb-6">
            {partidos.map((game, index) => (
              <div
                key={game.id}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-orange-500/90 to-red-600/90 backdrop-blur-md border-2 border-orange-400/30 rounded-2xl shadow-2xl transform transition-transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,100,0,0.6)] duration-300 cursor-pointer snap-center"
              >
                <div className="p-8 flex flex-col justify-center items-center text-center relative">
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-orange-500/20 blur-2xl rounded-lg"></div>


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

              
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {game.equipo1} vs. {game.equipo2}
                  </h3>
                  <p className="text-orange-100 text-lg font-medium">{game.fecha}</p>

                  <button className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border-2 border-orange-200/20 text-orange-100 font-semibold rounded-lg hover:bg-white/20 hover:border-orange-200/40 transition-all duration-300">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Próximos Partidos */}

      {/* About Team */}
      <section className="about-team text-center py-20 bg-gray-100 px-6 relative overflow-hidden">
        {/* Fondo con gradiente sutil usando los colores del logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#23878e] via-[#f4a244] to-[#d24d33] opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Texto sobre el equipo */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-center text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-arvo tracking-wide">
              SOBRE EL EQUIPO
            </h2>
            <p className="mt-6 text-lg text-gray-800 leading-relaxed">
              Somos un equipo apasionado por el baloncesto, comprometidos con la excelencia y el trabajo en equipo.
              ¡Únete a nuestra comunidad y vive la pasión del baloncesto con nosotros!
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#23878e] to-[#d24d33] mx-auto lg:mx-0"></div>
          </div>

          {/* Imagen del equipo con efecto hover */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative group">
              <img
                src="/images/galeria/galeria (39).jpg"
                alt="Nuestro equipo"
                className="w-full max-w-full rounded-2xl shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Decoración adicional con colores del logo */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#23878e] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#d24d33] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -top-40 right-0 w-48 h-48 bg-[#f4a244] rounded-full opacity-20 blur-3xl"></div>
      </section>
      

      {/* Team Template */}
      <section className="team-roster py-20 bg-black relative overflow-hidden">
        {/* Efecto de fondo sutil con colores del logo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#23878e] blur-[150px] opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#d24d33] blur-[150px] opacity-40"></div>
        </div>

        {/* Título con efecto de texto brillante usando colores del logo */}
        <h2 className="text-center text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-arvo tracking-wide">
          EQUIPO
        </h2>

        {/* Contenedor de jugadores con scroll horizontal */}
        <div className="relative">
          {/* Botón de navegación izquierda */}
          <button
            onClick={() => {
              const container = document.querySelector('.team-container');
              container.scrollBy({ left: -300, behavior: 'smooth' });
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-neutral-900/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-neutral-800/90 border-2 border-neutral-800/50 hover:border-[#f4a244]/30 z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#f4a244" />
            </svg>
          </button>

          {/* Contenedor de jugadores */}
          <div className="overflow-x-auto scrollbar-hide team-container">
            <div className="flex space-x-8 px-12 py-4">
              {loading ? (
              <p className="text-white text-center">Cargando jugadores...</p>
            ) : (
              players.map((player, index) => (
                <Link to={`/jugador/${player.id}`} key={player.id} className="no-underline">
                <div
                  className="min-w-[310px] bg-neutral-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-neutral-800/90 border-2 border-neutral-800/50 hover:border-[#f4a244]/30"
                >
                  {/* Imagen del jugador */}
                  <div className="w-76 h-80 flex items-center justify-center relative">
                    <img
                      src={player.fotoPerfil}
                      alt={player.nombre}
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                    <div className="absolute inset-0 bg-[#23878e]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>

                  {/* Número y nombre del jugador */}
                  <h3 className="text-[#f4a244] text-5xl font-bold mt-4">{player.numero}</h3>
                  <p className="text-gray-300 text-xl uppercase font-semibold tracking-wide mt-2">
                    {player.sobrenombre}
                  </p>


                  {/* Botón de "Ver perfil" 
                  <button className="mt-4 px-6 py-2 bg-orange-500/10 backdrop-blur-sm border-2 border-orange-500/20 text-orange-500 font-semibold rounded-lg hover:bg-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                    Ver perfil
                  </button> */}
                </div>
                </Link>
              )
            ))}
            </div>
          </div>

          {/* Botón de navegación derecha */}
          <button
            onClick={() => {
              const container = document.querySelector('.team-container');
              container.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-neutral-900/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-neutral-800/90 border-2 border-neutral-800/50 hover:border-[#f4a244]/30 z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.8205 3.26875C8.2111 2.87823 8.8442 2.87823 9.2348 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.88 14.155L9.3097 20.7304C8.9192 21.121 8.286 21.121 7.8955 20.7304C7.505 20.3399 7.505 19.7067 7.8955 19.3162L14.4675 12.7442C14.8581 12.3536 14.8581 11.7205 14.4675 11.33L7.8205 4.68297C7.43 4.29244 7.43 3.65928 7.8205 3.26875Z" fill="#f4a244" />
            </svg>
          </button>
        </div>

        {/* Botón para ver más */}
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center justify-center text-white font-semibold text-lg bg-gradient-to-r from-[#23878e] to-[#d24d33] px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            VER TODO EL EQUIPO
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

      {/* Galería */}
      <section className="gallery bg-gray-100 overflow-hidden w-full">
        <Gallery images={images} />
      </section>

      {/* Videos Destacados */}
      <section className="videos overflow-hidden w-full">
        <VideoGallery videos={videos} />
      </section>
      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
