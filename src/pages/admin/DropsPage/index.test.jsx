import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DropsPage from './index';

describe('DropsPage', () => {
  it('renders headline', () => {
    render(<DropsPage />);
    const headline = screen.getByText(/DropsPage/i);
    expect(headline).toBeInTheDocument();
  });
});
