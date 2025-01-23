import React from 'react';

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
          </ol>

          <div className="carousel-inner w-100">
      <div className="carousel-item active relative h-[780px]">
        <img src="/assets/img1.jpg" className="d-block w-full h-full object-cover" alt="First slide" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
        <div className="carousel-caption d-none d-md-block relative z-10">
          <h1>Entrando<br /> a Territorio Dreamer</h1>
        </div>
      </div>
      <div className="carousel-item relative h-[780px]">
        <img src="/assets/img2.jpg" className="d-block w-full h-full object-cover" alt="Second slide" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
        <div className="carousel-caption d-none d-md-block relative z-10">
          <h1>¡Sigue<br /> tus sueños!</h1>
        </div>
      </div>
      <div className="carousel-item relative h-[780px]">
        <img src="/assets/img3.jpg" className="d-block w-full h-full object-cover" alt="Third slide" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
        <div className="carousel-caption d-none d-md-block relative z-10">
          <h1>¡Vive la pasión!</h1>
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
    </div>
  );
};

export default Home;
