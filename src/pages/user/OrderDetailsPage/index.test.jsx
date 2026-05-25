import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import OrderDetailsPage from './index';

describe('OrderDetailsPage', () => {
  it('renders headline', () => {
    render(<OrderDetailsPage />);
    const headline = screen.getByText(/OrderDetailsPage/i);
    expect(headline).toBeInTheDocument();
  });
});
