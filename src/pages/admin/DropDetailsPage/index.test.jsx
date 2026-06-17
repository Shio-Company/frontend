import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DropDetailsPage from './index';

vi.mock('../../../hooks/useApi', () => ({
  useApi: (url) => {
    if (typeof url === 'string' && url.includes('/products/') && !url.match(/\/drops\//)) {
      return { data: [], loading: false, error: null, refetch: vi.fn() };
    }
    return {
      data: {
        id: '1',
        name: 'Drop Teste',
        description: 'Descrição do drop',
        launch_date: '2024-06-01T00:00:00Z',
        is_active: true,
        products: [],
      },
      loading: false,
      error: null,
      refetch: vi.fn(),
    };
  },
}));

describe('DropDetailsPage', () => {
  it('renders headline', () => {
    render(
      <MemoryRouter initialEntries={['/admin/drops/1']}>
        <Routes>
          <Route path="/admin/drops/:id" element={<DropDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/DropDetailsPage/i)).toBeInTheDocument();
  });
});
