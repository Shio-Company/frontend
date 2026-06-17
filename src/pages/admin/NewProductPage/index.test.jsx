import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NewProductPage from './index';

vi.mock('../../../hooks/useApi', () => ({
  useApi: () => ({ data: null, loading: false, error: null, refetch: vi.fn() }),
}));

describe('NewProductPage', () => {
  it('renders headline', () => {
    render(<MemoryRouter><NewProductPage /></MemoryRouter>);
    expect(screen.getByText(/NewProductPage/i)).toBeInTheDocument();
  });
});
