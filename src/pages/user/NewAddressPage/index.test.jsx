import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NewAddressPage from './index';

describe('NewAddressPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <NewAddressPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/NewAddressPage/i);
    expect(headline).toBeInTheDocument();
  });
});
