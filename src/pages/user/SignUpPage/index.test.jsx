import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from './index';

describe('SignUpPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/Bem vindo/i);
    expect(headline).toBeInTheDocument();
  });
});
