import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PaymentPage from './index';

describe('PaymentPage', () => {
  it('renders headline', () => {
    render(<PaymentPage />);
    const headline = screen.getByText(/PaymentPage/i);
    expect(headline).toBeInTheDocument();
  });
});
