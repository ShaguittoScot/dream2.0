import React from 'react';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <section className="banner_main relative">
        <div id="myCarousel" className="carousel slide banner" data-bs-ride="carousel" data-bs-interval="3000">
          <ol className="carousel-indicators">
            <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
            <li data-bs-target="#myCarousel" data-bs-slide-to="3"></li>
          </ol>

          <div className="carousel-inner w-100">
            <div className="carousel-item active relative h-[780px]">
              <img src="/images/banner/img1.jpg" className="d-block w-full h-full object-cover" alt="First slide" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
              <div className="carousel-caption d-none d-md-block relative z-10">
                <h1>Entrando<br /> a Territorio Dreamer</h1>
              </div>
            </div>
            <div className="carousel-item relative h-[780px]">
              <img src="/images/banner/img2.jpg" className="d-block w-full h-full object-cover" alt="Second slide" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
              <div className="carousel-caption d-none d-md-block relative z-10">
                <h1>¡Sigue<br /> tus sueños!</h1>
              </div>
            </div>
            <div className="carousel-item relative h-[780px]">
              <img src="/images/banner/img3.jpg" className="d-block w-full h-full object-cover" alt="Third slide" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
              <div className="carousel-caption d-none d-md-block relative z-10">
                <h1>¡Vive la pasión!</h1>
              </div>
            </div>
            <div className="carousel-item relative h-[780px]">
              <img src="/images/banner/img4.jpg" className="d-block w-full h-full object-cover" alt="Third slide" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
              <div className="carousel-caption d-none d-md-block relative z-10">
                <h1>¡Sueña en grande!</h1>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev" style={{ transition: 'background-color 0.3s ease', transform: 'scale(1.1)' }}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next" style={{ transition: 'background-color 0.3s ease', transform: 'scale(1.1)' }}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
      {/* End Banner */}


      {/* About */}
      <section className="about-team text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-bold">Sobre Nosotros</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Somos un equipo apasionado por el baloncesto, comprometidos con la excelencia y el trabajo en equipo.
          ¡Únete a nuestra comunidad y vive la pasión del baloncesto con nosotros!
        </p>
      </section>

      {/*end About */}

      {/*calendar */}

      <section className="schedule py-16">
        <h2 className="text-center text-3xl font-bold mb-8">Próximos Partidos</h2>
        <div className="max-w-2xl mx-auto">
          <ul className="border border-gray-300 rounded-lg overflow-hidden">
            <li className="p-4 border-b flex justify-between">
              <span>Equipo vs. Rival</span> <span>12 de Marzo, 2025</span>
            </li>
            <li className="p-4 border-b flex justify-between">
              <span>Equipo vs. Otro Rival</span> <span>18 de Marzo, 2025</span>
            </li>
            <li className="p-4 flex justify-between">
              <span>Equipo vs. Último Rival</span> <span>25 de Marzo, 2025</span>
            </li>
          </ul>
        </div>
      </section>

      {/*end calendar */}

      {/*gallery */}

      <section className="gallery py-16 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-8">Galería</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <img
            src="/images/galeria/galeria1.jpg"
            className="rounded shadow-md sm:col-span-2 sm:row-span-2 object-cover w-full h-full"
            alt="Galería 1"
          />
          <img
            src="/images/galeria/galeria2.jpg"
            className="rounded shadow-md object-cover w-full h-full"
            alt="Galería 2"
          />
          <img
            src="/images/galeria/galeria3.jpg"
            className="rounded shadow-md sm:col-span-1 sm:row-span-2 object-cover w-full h-full"
            alt="Galería 3"
          />
          <img
            src="/images/galeria/galeria4.jpg"
            className="rounded shadow-md object-cover w-full h-full"
            alt="Galería 4"
          />
          <img
            src="/images/galeria/galeria5.jpg"
            className="rounded shadow-md sm:col-span-2 object-cover w-full h-full"
            alt="Galería 5"
          />
          <img
            src="/images/galeria/galeria6.jpg"
            className="rounded shadow-md object-cover w-full h-full"
            alt="Galería 6"
          />
        </div>
      </section>


      {/*end gallery */}

      {/*Team Template */}
      <section className="team-roster py-16 bg-gray-100">
        <h2 className="text-center text-4xl font-bold mb-12 text-gray-900">
          PRIMER EQUIPO
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
    </div>
  );
};

export default Home;
