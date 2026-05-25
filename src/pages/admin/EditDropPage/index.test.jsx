import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EditDropPage from './index';

describe('EditDropPage', () => {
  it('renders headline', () => {
    render(<EditDropPage />);
    const headline = screen.getByText(/EditDropPage/i);
    expect(headline).toBeInTheDocument();
  });
});
