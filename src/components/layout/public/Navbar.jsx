import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo.svg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 font-sans">
      <div className="mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Lado Esquerdo: Logo e Navegação */}
        <div className="flex items-center gap-4 md:gap-10">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center cursor-pointer">
            <img src={logo} alt="Shio Logo" className="w-[100px] md:w-[132px] h-auto" />
          </Link>

          {/* Links de Navegação (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-[15px] text-gray-800 hover:text-black transition-colors">Inicio</Link>
            <Link to="/" className="text-[15px] text-gray-800 hover:text-black transition-colors">Produtos</Link>
            <Link to="/" className="text-[15px] text-gray-800 hover:text-black transition-colors">Contato</Link>
          </nav>
        </div>

        {/* Centro: Barra de Pesquisa */}
        <div className="flex-1 max-w-xs md:max-w-3xl flex items-center bg-[#f4f4f5] rounded-full px-4 md:px-5 py-2 md:py-3">
          {/* Ícone de Lupa */}
          <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="O que você está buscando?" 
            className="bg-transparent w-full outline-none text-[14px] md:text-[15px] text-gray-700 placeholder-gray-500 font-light"
          />
        </div>

        {/* Lado Direito: Ícones de Ação e Menu Hamburger */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Ícones (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/cart" className="text-black hover:text-gray-600 transition-colors" data-testid="cart-link">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </Link>
            <Link to="/my-account" className="text-black hover:text-gray-600 transition-colors" data-testid="my-account-link">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Link>
          </div>

          {/* Botão Hamburger (Mobile/Tablet) */}
          <button className="lg:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col items-center gap-4 p-4">
            <Link to="/" className="text-[15px] text-gray-800 hover:text-black transition-colors">Inicio</Link>
            <Link to="/" className="text-[15px] text-gray-800 hover:text-black transition-colors">Produtos</Link>
            <Link to="/" className="text-[15px] text-gray-800 hover:text-black transition-colors">Contato</Link>
            <div className="flex gap-4 mt-2">
                <Link to="/cart" className="text-black hover:text-gray-600 transition-colors" data-testid="cart-link-mobile">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                </Link>
                <Link to="/my-account" className="text-black hover:text-gray-600 transition-colors" data-testid="my-account-link-mobile">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}