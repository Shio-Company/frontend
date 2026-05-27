import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ChangePasswordPage from './index';

describe('ChangePasswordPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <ChangePasswordPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/ChangePasswordPage/i);
    expect(headline).toBeInTheDocument();
  });
});
