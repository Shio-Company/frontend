import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyAccountPage from './index';

describe('MyAccountPage', () => {
  it('renders headline', () => {
    render(<MyAccountPage />);
    const headline = screen.getByText(/MyAccountPage/i);
    expect(headline).toBeInTheDocument();
  });
});
