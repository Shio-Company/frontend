import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NewDropPage from './index';

describe('NewDropPage', () => {
  it('renders headline', () => {
    render(<MemoryRouter><NewDropPage /></MemoryRouter>);
    expect(screen.getByText(/NewDropPage/i)).toBeInTheDocument();
  });
});
