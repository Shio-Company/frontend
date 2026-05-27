import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PixPage from './index';

describe('PixPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <PixPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/PixPage/i);
    expect(headline).toBeInTheDocument();
  });
});
