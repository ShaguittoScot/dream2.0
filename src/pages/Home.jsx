import React from 'react';
import Footer from '../components/Footer';
import Gallery from "../components/Gallery";
import VideoGallery from '../components/VideoGalery.jsx';

const images = Array.from({ length: 15 }).map(
  (_, index) => `/images/galeria/galeria (${index + 1}).jpg`
);

  // Generar videos dinámicamente
  const videos = Array.from({ length: 17 }).map((_, index) => ({
    url: `/videos/video (${index + 1}).mp4`, // Asegúrate de que los videos estén en la carpeta public/videos
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
              <li key={index} data-bs-target="#myCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""}></li>
            ))}
          </ol>
          <div className="carousel-inner w-100">
            {[
              { src: "/images/banner/img1.jpg", text: "Entrando a Territorio Dreamer" },
              { src: "/images/banner/img2.jpg", text: "¡Sigue tus sueños!" },
              { src: "/images/banner/img3.jpg", text: "¡Vive la pasión!" },
              { src: "/images/banner/img4.jpg", text: "¡Sueña en grande!" },
            ].map((slide, index) => (
              <div key={index} className={`carousel-item relative h-[780px] ${index === 0 ? "active" : ""}`}>
                <img
                  src={slide.src}
                  className="d-block w-full h-full object-cover transform transition-transform duration-700 scale-100 hover:scale-105"
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="carousel-caption d-none d-md-block relative z-10 text-white animate-fadeIn">
                  <h1 className="text-5xl font-extrabold drop-shadow-md font-arvo">
                    {slide.text}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <a className="carousel-control-prev custom-nav" href="#myCarousel" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <a className="carousel-control-next custom-nav" href="#myCarousel" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>
      </section>

      {/* End Banner */}


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

      {/*calendar */}

      <section className="schedule py-16 bg-gradient-to-r from-orange-500 to-orange-700">
        <h2 className="text-center text-4xl font-arvo mb-12 animate-fade-in text-white font-bold">
          Próximos Partidos
        </h2>

        <div className="max-w-4xl mx-auto px-6">
          <ul className="bg-gradient-to-r from-orange-400 to-orange-600 bg-opacity-20 backdrop-blur-lg border border-orange-500 rounded-lg overflow-hidden shadow-2xl">
            <li className="p-6 border-b border-gray-700 flex justify-between items-center hover:bg-orange-800 transition-all duration-300 rounded-lg">
              <span className="text-lg font-semibold text-white">Equipo vs. Rival</span>
              <span className="text-gray-300">12 de Marzo, 2025</span>
            </li>
            <li className="p-6 border-b border-gray-700 flex justify-between items-center hover:bg-orange-800 transition-all duration-300 rounded-lg">
              <span className="text-lg font-semibold text-white">Equipo vs. Otro Rival</span>
              <span className="text-gray-300">18 de Marzo, 2025</span>
            </li>
            <li className="p-6 flex justify-between items-center hover:bg-orange-800 transition-all duration-300 rounded-lg">
              <span className="text-lg font-semibold text-white">Equipo vs. Último Rival</span>
              <span className="text-gray-300">25 de Marzo, 2025</span>
            </li>
          </ul>
        </div>
      </section>


      {/*end calendar */}

      {/*gallery */}
      <section className="gallery bg-gray-100 w-full px-4">
        <Gallery images={images} />
      </section>

      {/* Team Template */}
      <section className="team-roster py-20 bg-black">
        <h2 className="text-center text-5xl font-extrabold mb-12 text-orange-400 font-arvo tracking-wide">
          Nuestro Equipo
        </h2>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-10 px-12 py-4">

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
              { num: 14, name: "Oswaldo", img: "/images/mendez.png" }
            ].map((player, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-neutral-800 p-4 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-56 h-56 flex items-center justify-center">
                  <img
                    src={player.img}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-red-500 text-4xl font-bold mt-3">{player.num}</h3>
                <p className="text-gray-400 text-lg uppercase tracking-wide">{player.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botón para ver más */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="text-white font-semibold text-lg bg-orange-500 px-8 py-4 rounded-full transition-all duration-300 hover:bg-orange-600 hover:shadow-xl"
          >
            VER TODO EL EQUIPO →
          </a>
        </div>
      </section>
      {/* End Team Template */}

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
