import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProductDetailPage from './index';

describe('ProductDetailPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );
    const loading = screen.getByText(/Carregando produto/i);
    expect(loading).toBeInTheDocument();
  });
});
