import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Detectar el desplazamiento de la página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`p-4 text-white fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Nombre del equipo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold font-arvo hover:text-orange-400">Dreamers</h1>
        </div>

        {/* Logo */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <img src="/images/logo.png" alt="Logo" className="w-24" />
        </div>

        {/* Menú Escritorio */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          <li>
            <Link
              to="/"
              className="text-gray-100 no-underline hover:text-orange-400 transition-all duration-300 font-arvo"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/jugadores"
              className="text-gray-100 no-underline hover:text-orange-400 transition-all duration-300 font-arvo"
            >
              Jugadores
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/admin"
                className="text-gray-100 no-underline hover:text-orange-400 transition-all duration-300 font-arvo"
              >
                Admin
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <button
                onClick={logout}
                className="text-gray-100 no-underline hover:text-orange-400 transition-all duration-300 font-arvo"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-100 no-underline hover:text-orange-400 transition-all duration-300 font-arvo"
              >
                Acceso
              </Link>
            )}
          </li>
        </ul>


        {/* Botón de menú móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menú Móvil */}
        {menuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-8">
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-4xl text-white">
              <FaTimes />
            </button>
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-orange-400 text-2xl no-underline hover:text-white"
            >
              Inicio
            </Link>
            <Link
              to="/jugadores"
              onClick={toggleMenu}
              className="text-white text-2xl no-underline hover:text-orange-400"
            >
              Jugadores
            </Link>
            {user && (
              <Link
                to="/admin"
                onClick={toggleMenu}
                className="text-white text-2xl no-underline hover:text-orange-400"
              >
                Panel de Administración
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="text-white text-2xl no-underline hover:text-orange-400"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="text-white text-2xl no-underline hover:text-orange-400"
              >
                Acceso
              </Link>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
