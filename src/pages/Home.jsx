import React from 'react';
import Footer from '../components/Footer';
import Gallery from "../components/Gallery";

const images = Array.from({ length: 15 }).map(
  (_, index) => `/images/galeria/galeria (${index + 1}).jpg`
);

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

      {/*end gallery */}

      {/*Team Template */}
      <section className="team-roster py-16 bg-gray-100">
        <h2 className="text-center text-4xl font-bold mb-12 text-orange-400 font-arvo">
          Equipo
        </h2>

        <div className="overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-8 px-8">

            <div className="min-w-[250px] text-center">
              <img
                src="/images/volpi.png"
                alt="Tiago Volpi"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">66</h3>
              <p className="text-gray-500 text-sm uppercase">Juan Diego</p>
              <p className="text-gray-900 text-xl font-bold">Diego</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/placeholder.png"
                alt="Diego Barbosa"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">7</h3>
              <p className="text-gray-500 text-sm uppercase">Abisha</p>
              <p className="text-gray-900 text-xl font-bold">Abisha</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/equipo/Alex.jpg"
                alt="Antonio Briseño"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">3</h3>
              <p className="text-gray-500 text-sm uppercase">Alexander</p>
              <p className="text-gray-900 text-xl font-bold">Alexander</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/equipo/Ian.jpg"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">14</h3>
              <p className="text-gray-500 text-sm uppercase">Ian</p>
              <p className="text-gray-900 text-xl font-bold">Ian</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">4</h3>
              <p className="text-gray-500 text-sm uppercase">Capy</p>
              <p className="text-gray-900 text-xl font-bold">Capy</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">14</h3>
              <p className="text-gray-500 text-sm uppercase">Jean</p>
              <p className="text-gray-900 text-xl font-bold">Jean</p>
            </div>



            <div className="min-w-[250px] text-center">
              <img
                src="/images/equipo/Shack.jpg"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">66</h3>
              <p className="text-gray-500 text-sm uppercase">Shack</p>
              <p className="text-gray-900 text-xl font-bold">Shack</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/equipo/Kamil.jpg"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">11</h3>
              <p className="text-gray-500 text-sm uppercase">Kamil</p>
              <p className="text-gray-900 text-xl font-bold">Kamil</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">9</h3>
              <p className="text-gray-500 text-sm uppercase">Bruno</p>
              <p className="text-gray-900 text-xl font-bold">MÉNDEZ</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">99</h3>
              <p className="text-gray-500 text-sm uppercase">Omar</p>
              <p className="text-gray-900 text-xl font-bold">Omar</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">30</h3>
              <p className="text-gray-500 text-sm uppercase">Dani</p>
              <p className="text-gray-900 text-xl font-bold">Dani</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">14</h3>
              <p className="text-gray-500 text-sm uppercase">Edgar</p>
              <p className="text-gray-900 text-xl font-bold">Edgar</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">12</h3>
              <p className="text-gray-500 text-sm uppercase">Leo</p>
              <p className="text-gray-900 text-xl font-bold">Leo</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/equipo/Iker.jpeg"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">13</h3>
              <p className="text-gray-500 text-sm uppercase">Iker</p>
              <p className="text-gray-900 text-xl font-bold">Iker</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">44</h3>
              <p className="text-gray-500 text-sm uppercase">Alex</p>
              <p className="text-gray-900 text-xl font-bold">Alex</p>
            </div>

            <div className="min-w-[250px] text-center">
              <img
                src="/images/mendez.png"
                alt="Bruno Méndez"
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-red-600 text-3xl font-bold mt-4">14</h3>
              <p className="text-gray-500 text-sm uppercase">Oswaldo</p>
              <p className="text-gray-900 text-xl font-bold">Oswaldo</p>
            </div>

          </div>
        </div>

        {/* Botón para ver más */}
        <div className="text-center mt-12">
          <a href="#" className="text-black font-semibold text-lg hover:underline">
            VER TODO EL EQUIPO →
          </a>
        </div>
      </section>
      {/*end Team Template */}

      {/* Featured Videos */}
      <section className="videos py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Videos Destacados</h2>
        <div className="flex justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video" frameBorder="0" allowFullScreen></iframe>
        </div>
      </section>
      {/* End Featured Videos */}

      {/*footer */}
      <Footer />
      {/*end footer */}
    </div >
  );
};

export default Home;
