import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DropsPage from './index';

vi.mock('../../../hooks/useApi', () => ({
  useApi: () => ({ data: null, loading: false, error: null, refetch: vi.fn() }),
}));

describe('DropsPage', () => {
  it('renders headline', () => {
    render(<MemoryRouter><DropsPage /></MemoryRouter>);
    expect(screen.getByText(/DropsPage/i)).toBeInTheDocument();
  });
});
