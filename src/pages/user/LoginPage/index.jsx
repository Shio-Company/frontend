import logo from '../../../assets/logo/logo.svg';
import { PageMarker } from '../../../components/ui/ShioDesign';

const LoginPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-16 font-maginia text-black">
      <PageMarker name="LoginPage" />
      <section className="w-full max-w-[470px] text-center">
        <img src={logo} alt="Shio Logo" className="mx-auto h-auto w-[190px]" />
        <p className="mt-1 text-[18px] text-black/50">Acesse sua conta</p>

        <h1 className="mt-10 text-[34px] font-normal text-black">Bem vindo(a)</h1>
        <p className="mt-4 text-[18px] text-black/45">Faca login para continuar</p>

        <button className="mt-14 flex h-[64px] w-full items-center justify-center gap-7 rounded-[16px] border border-black/45 bg-white text-[24px] text-black/80 transition hover:border-black">
          <span className="font-sans text-[26px] font-bold text-[#4285f4]">G</span>
          Continuar com o Google
        </button>

        <div className="mt-8 flex justify-center gap-6 text-sm text-black/55">
          <a href="/signup" className="hover:text-black">Criar conta</a>
          <a href="/change-password" className="hover:text-black">Esqueci a senha</a>
        </div>

        <p className="mt-28 text-sm text-black/40">
          Ao continuar voce concorda com nossos Termos de uso e Politica de Privacidade
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
