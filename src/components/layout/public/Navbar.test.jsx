import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render the logo and navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logo = screen.getByAltText('Shio Logo');
    expect(logo).toBeInTheDocument();

    const inicioLink = screen.getByRole('link', { name: 'Inicio' });
    expect(inicioLink).toHaveAttribute('href', '/');

    const produtosLink = screen.getByRole('link', { name: 'Produtos' });
    expect(produtosLink).toHaveAttribute('href', '/');

    const contatoLink = screen.getByRole('link', { name: 'Contato' });
    expect(contatoLink).toHaveAttribute('href', '/');

    const cartLink = screen.getByTestId('cart-link');
    expect(cartLink).toBeInTheDocument();

    const myAccountLink = screen.getByTestId('my-account-link');
    expect(myAccountLink).toBeInTheDocument();
  });
});
