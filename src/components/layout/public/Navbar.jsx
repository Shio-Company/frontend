import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo.svg';
import { Icon } from '../../ui/ShioDesign';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white font-maginia text-black">
      <div className="relative flex h-9 items-center justify-center bg-black px-10 text-center text-[13px] text-white">
        <p>
          Sign up and get 20% off to your first order.{' '}
          <Link to="/signup" className="font-semibold underline underline-offset-2">
            Sign Up Now
          </Link>
        </p>
        <button className="absolute right-5 top-1/2 -translate-y-1/2 text-white" aria-label="Fechar promocao">
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto flex h-[104px] max-w-[1240px] items-center justify-between gap-6 border-b border-black/10 px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Shio Logo" className="h-auto w-[116px]" />
          </Link>

          <nav className="hidden items-center gap-8 text-[16px] lg:flex">
            <Link to="/" className="transition hover:text-black/60">Inicio</Link>
            <Link to="/" className="transition hover:text-black/60">Produtos</Link>
            <Link to="/" className="transition hover:text-black/60">Contato</Link>
          </nav>
        </div>

        <label className="hidden h-12 max-w-[610px] flex-1 items-center gap-3 rounded-full bg-[#f0f0f0] px-5 text-black/45 md:flex">
          <Icon name="search" className="h-5 w-5 shrink-0" />
          <input
            type="search"
            placeholder="O que voce esta buscando?"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-black/35"
          />
        </label>

        <div className="flex items-center gap-5">
          <Link to="/cart" className="hidden transition hover:text-black/60 md:inline-flex" data-testid="cart-link" aria-label="Carrinho">
            <Icon name="cart" className="h-6 w-6" />
          </Link>
          <Link to="/my-account" className="hidden transition hover:text-black/60 md:inline-flex" data-testid="my-account-link" aria-label="Minha conta">
            <Icon name="user" className="h-6 w-6" />
          </Link>
          <button className="lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Abrir menu">
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-b border-black/10 bg-white px-6 py-5 lg:hidden">
          <label className="mb-5 flex h-12 items-center gap-3 rounded-full bg-[#f0f0f0] px-5 text-black/45">
            <Icon name="search" className="h-5 w-5 shrink-0" />
            <input
              type="search"
              placeholder="O que voce esta buscando?"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-black/35"
            />
          </label>
          <nav className="flex flex-col gap-4 text-[16px]">
            <Link to="/">Inicio</Link>
            <Link to="/">Produtos</Link>
            <Link to="/">Contato</Link>
          </nav>
          <div className="mt-5 flex gap-5">
            <Link to="/cart" data-testid="cart-link-mobile" aria-label="Carrinho mobile">
              <Icon name="cart" className="h-6 w-6" />
            </Link>
            <Link to="/my-account" data-testid="my-account-link-mobile" aria-label="Minha conta mobile">
              <Icon name="user" className="h-6 w-6" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
