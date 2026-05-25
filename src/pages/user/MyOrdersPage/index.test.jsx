import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyOrdersPage from './index';

describe('MyOrdersPage', () => {
  it('renders headline', () => {
    render(<MyOrdersPage />);
    const headline = screen.getByText(/MyOrdersPage/i);
    expect(headline).toBeInTheDocument();
  });
});
