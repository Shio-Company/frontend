import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './index';

vi.mock('../../../hooks/useApi', () => ({
  useApi: () => ({ data: null, loading: false, error: null, refetch: vi.fn() }),
}));

describe('ProductsPage', () => {
  it('renders headline', () => {
    render(<MemoryRouter><ProductsPage /></MemoryRouter>);
    expect(screen.getByText(/ProductsPage/i)).toBeInTheDocument();
  });
});
