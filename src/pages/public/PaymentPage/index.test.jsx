import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PaymentPage from './index';

describe('PaymentPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <PaymentPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/PaymentPage/i);
    expect(headline).toBeInTheDocument();
  });
});
