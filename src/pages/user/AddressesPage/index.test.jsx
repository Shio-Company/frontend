import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AddressesPage from './index';

describe('AddressesPage', () => {
  it('renders headline', () => {
    render(<AddressesPage />);
    const headline = screen.getByText(/AddressesPage/i);
    expect(headline).toBeInTheDocument();
  });
});
