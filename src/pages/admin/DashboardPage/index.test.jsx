import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardPage from './index';

describe('DashboardPage', () => {
  it('renders headline', () => {
    render(<DashboardPage />);
    const headline = screen.getByText(/DashboardPage/i);
    expect(headline).toBeInTheDocument();
  });
});
