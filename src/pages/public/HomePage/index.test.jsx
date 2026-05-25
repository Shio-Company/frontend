import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from './index';

describe('HomePage', () => {
  it('renders headline', () => {
    render(<HomePage />);
    const headline = screen.getByText(/HomePage/i);
    expect(headline).toBeInTheDocument();
  });
});
