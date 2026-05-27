import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CartPage from './index';

describe('CartPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/CartPage/i);
    expect(headline).toBeInTheDocument();
  });
});
