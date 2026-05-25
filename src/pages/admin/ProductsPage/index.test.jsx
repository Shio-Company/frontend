import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductsPage from './index';

describe('ProductsPage', () => {
  it('renders headline', () => {
    render(<ProductsPage />);
    const headline = screen.getByText(/ProductsPage/i);
    expect(headline).toBeInTheDocument();
  });
});
