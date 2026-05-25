import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChangePasswordPage from './index';

describe('ChangePasswordPage', () => {
  it('renders headline', () => {
    render(<ChangePasswordPage />);
    const headline = screen.getByText(/ChangePasswordPage/i);
    expect(headline).toBeInTheDocument();
  });
});
