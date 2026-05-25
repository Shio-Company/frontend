import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminLoginPage from './index';

describe('AdminLoginPage', () => {
  it('renders headline', () => {
    render(<AdminLoginPage />);
    const headline = screen.getByText(/AdminLoginPage/i);
    expect(headline).toBeInTheDocument();
  });
});
