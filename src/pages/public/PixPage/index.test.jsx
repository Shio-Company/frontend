import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PixPage from './index';

describe('PixPage', () => {
  it('renders headline', () => {
    render(<PixPage />);
    const headline = screen.getByText(/PixPage/i);
    expect(headline).toBeInTheDocument();
  });
});
