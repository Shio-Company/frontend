import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './index';

vi.mock('../../../lib/authToken', () => ({
  getAccessToken: vi.fn(() => null),
  clearAuthTokens: vi.fn(),
}));

describe('DashboardPage', () => {
  it('renders headline', () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>);
    expect(screen.getByText(/DashboardPage/i)).toBeInTheDocument();
  });
});
