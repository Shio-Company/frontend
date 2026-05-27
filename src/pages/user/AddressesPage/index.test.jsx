import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AddressesPage from './index';

describe('AddressesPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <AddressesPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/AddressesPage/i);
    expect(headline).toBeInTheDocument();
  });
});
