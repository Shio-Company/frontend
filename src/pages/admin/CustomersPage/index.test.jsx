import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomersPage from './index';

describe('CustomersPage', () => {
  it('renders headline', () => {
    render(<CustomersPage />);
    const headline = screen.getByText(/CustomersPage/i);
    expect(headline).toBeInTheDocument();
  });
});
