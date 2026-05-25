import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CartPage from './index';

describe('CartPage', () => {
  it('renders headline', () => {
    render(<CartPage />);
    const headline = screen.getByText(/CartPage/i);
    expect(headline).toBeInTheDocument();
  });
});
