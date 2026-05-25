import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryPage from './index';

describe('CategoryPage', () => {
  it('renders headline', () => {
    render(<CategoryPage />);
    const headline = screen.getByText(/CategoryPage/i);
    expect(headline).toBeInTheDocument();
  });
});
