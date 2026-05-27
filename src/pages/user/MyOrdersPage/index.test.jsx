import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MyOrdersPage from './index';

describe('MyOrdersPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <MyOrdersPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/MyOrdersPage/i);
    expect(headline).toBeInTheDocument();
  });
});
