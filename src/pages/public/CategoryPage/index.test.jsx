import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CategoryPage from './index';

describe('CategoryPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <CategoryPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/CategoryPage/i);
    expect(headline).toBeInTheDocument();
  });
});
