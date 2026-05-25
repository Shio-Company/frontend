import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DropDetailsPage from './index';

describe('DropDetailsPage', () => {
  it('renders headline', () => {
    render(<DropDetailsPage />);
    const headline = screen.getByText(/DropDetailsPage/i);
    expect(headline).toBeInTheDocument();
  });
});
