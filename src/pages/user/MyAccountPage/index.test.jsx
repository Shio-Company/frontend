import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MyAccountPage from './index';

describe('MyAccountPage', () => {
  it('renders headline', () => {
    render(
      <BrowserRouter>
        <MyAccountPage />
      </BrowserRouter>
    );
    const headline = screen.getByText(/MyAccountPage/i);
    expect(headline).toBeInTheDocument();
  });
});
