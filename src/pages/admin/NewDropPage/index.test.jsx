import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewDropPage from './index';

describe('NewDropPage', () => {
  it('renders headline', () => {
    render(<NewDropPage />);
    const headline = screen.getByText(/NewDropPage/i);
    expect(headline).toBeInTheDocument();
  });
});
