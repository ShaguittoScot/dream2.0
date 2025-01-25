import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar el desplazamiento de la pagina
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // menu en dispositivos moviles
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`p-4 text-white fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Nombre del equip */}
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">Dreamers</h1>
        </div>

        {/* Logo*/}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <img src="/images/logo.png" alt="Logo" className="w-24" />
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          <li>
            <Link 
              to="/" 
              className="text-gray-100 no-underline hover:text-gray-400 transition-all duration-300"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/jugadores" 
              className="text-gray-100 no-underline hover:text-gray-400 transition-all duration-300"
            >
              Jugadores
            </Link>
          </li>
          <li>
            <Link 
              to="/contacto" 
              className="text-gray-100 no-underline hover:text-gray-400 transition-all duration-300"
            >
              Contacto
            </Link>
          </li>
        </ul>

        {/* Boton de menu para moviles */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu desplegable */}
        {menuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-8">
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-4xl text-white">
              <FaTimes />
            </button>
            <Link 
              to="/" 
              onClick={toggleMenu}
              className="text-white text-2xl no-underline hover:text-gray-400"
            >
              Inicio
            </Link>
            <Link 
              to="/jugadores" 
              onClick={toggleMenu}
              className="text-white text-2xl no-underline hover:text-gray-400"
            >
              Jugadores
            </Link>
            <Link 
              to="/contacto" 
              onClick={toggleMenu}
              className="text-white text-2xl no-underline hover:text-gray-400"
            >
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
