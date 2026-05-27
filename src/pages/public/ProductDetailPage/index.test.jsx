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
    const headline = screen.getByText(/ProductDetailPage/i);
    expect(headline).toBeInTheDocument();
  });
});
