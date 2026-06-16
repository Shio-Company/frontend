import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AdminLoginPage from './index';
import { useGoogleAuth } from '../../../context/useGoogleAuth';

// Mock do hook e do componente de botão
vi.mock('../../../context/useGoogleAuth');
vi.mock('../../../context/GoogleLoginButton', () => ({
  GoogleLoginButton: ({ onSuccess, disabled }) => (
    <div
      role="button"
      aria-label="Continuar com o Google"
      onClick={() => onSuccess('fake-google-token')}
      data-disabled={disabled}
    >
      Google Login Mock
    </div>
  ),
}));

describe('AdminLoginPage', () => {
  const handleGoogleLoginMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (hookValue) => {
    useGoogleAuth.mockReturnValue(hookValue);
    return render(
      <MemoryRouter>
        <AdminLoginPage />
      </MemoryRouter>
    );
  };

  it('renderiza a página de login corretamente', () => {
    renderComponent({
      handleGoogleLogin: handleGoogleLoginMock,
      isLoading: false,
      error: null,
    });

    expect(screen.getByAltText('Shio Logo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Bem vindo\(a\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continuar com o Google/i })).toBeInTheDocument();
  });

  it('exibe mensagem de carregamento e desabilita o botão durante a autenticação', () => {
    renderComponent({
      handleGoogleLogin: handleGoogleLoginMock,
      isLoading: true,
      error: null,
    });

    expect(screen.getByText(/Autenticando.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continuar com o Google/i })).toHaveAttribute('data-disabled', 'true');
  });

  it('exibe uma mensagem de erro em caso de falha', () => {
    const errorMessage = 'Acesso negado.';
    renderComponent({ handleGoogleLogin: handleGoogleLoginMock, isLoading: false, error: errorMessage });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
