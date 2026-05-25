import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductDetailPage from './index';

describe('ProductDetailPage', () => {
  it('renders headline', () => {
    render(<ProductDetailPage />);
    const headline = screen.getByText(/ProductDetailPage/i);
    expect(headline).toBeInTheDocument();
  });
});
