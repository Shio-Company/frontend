import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SignUpPage from './index';

describe('SignUpPage', () => {
  it('renders headline', () => {
    render(<SignUpPage />);
    const headline = screen.getByText(/SignUpPage/i);
    expect(headline).toBeInTheDocument();
  });
});
