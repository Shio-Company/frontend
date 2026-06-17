import logo from '../../../assets/logo/logo.svg';
import { PageMarker } from '../../../components/ui/ShioDesign';
import { useGoogleAuth } from '../../../context/useGoogleAuth';
import { GoogleLoginButton } from '../../../context/GoogleLoginButton';

const SignUpPage = () => {
  const { handleGoogleLogin, isLoading, error } = useGoogleAuth({
    onSuccessRedirect: '/my-account',
    requireAdmin: false,
  });

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-16 font-inter text-black">
      <PageMarker name="SignUpPage" />
      <section className="w-full max-w-[470px] text-center">
        <img src={logo} alt="Shio Logo" className="mx-auto h-auto w-[190px]" />
        <p className="mt-1 text-[18px] text-black/50">Crie sua conta</p>

        <h1 className="mt-10 text-[34px] font-normal text-black">Bem vindo(a)</h1>
        <p className="mt-4 text-[18px] text-black/45">Cadastre-se para continuar</p>

        <div className="mt-14">
          <GoogleLoginButton
            onSuccess={handleGoogleLogin}
            onError={() => {}}
          />
        </div>

        {isLoading && <p className="mt-4 text-[13px] text-black/50">Autenticando...</p>}
        {error && (
          <p className="mt-4 rounded-[12px] border border-red-100 bg-red-50 p-3 text-[13px] text-red-600">
            {error}
          </p>
        )}

        <p className="mt-8 text-sm text-black/45">
          Ja tem conta?{' '}
          <a href="/login" className="font-semibold text-black">Entrar</a>
        </p>

        <p className="mt-28 text-sm text-black/40">
          Ao continuar voce concorda com nossos Termos de uso e Politica de Privacidade
        </p>
      </section>
    </main>
  );
};

export default SignUpPage;
