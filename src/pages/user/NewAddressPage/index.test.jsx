import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewAddressPage from './index';

describe('NewAddressPage', () => {
  it('renders headline', () => {
    render(<NewAddressPage />);
    const headline = screen.getByText(/NewAddressPage/i);
    expect(headline).toBeInTheDocument();
  });
});
