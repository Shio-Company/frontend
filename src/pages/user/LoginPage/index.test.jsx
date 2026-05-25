import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginPage from './index';

describe('LoginPage', () => {
  it('renders headline', () => {
    render(<LoginPage />);
    const headline = screen.getByText(/LoginPage/i);
    expect(headline).toBeInTheDocument();
  });
});
