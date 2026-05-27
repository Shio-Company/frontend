import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './index';

describe('HomePage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/HomePage/i);
    expect(headline).toBeInTheDocument();
  });
});
