import { Link } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';

const MyAccountPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="MyAccountPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Meus Dados</h1>

      <form className="rounded-[18px] border border-black/20 p-8 md:p-12">
        <div className="grid gap-x-20 gap-y-8 md:grid-cols-2">
          <label className="block">
            <span className="text-[20px] text-black/55">Nome Completo</span>
            <input className="mt-5 h-12 w-full rounded-full border border-[#ff3333] px-5 outline-none" />
          </label>
          <label className="block">
            <span className="text-[20px] text-black/55">E-mail</span>
            <input className="mt-5 h-12 w-full rounded-full border border-black/20 px-5 outline-none" />
            <span className="mt-3 block text-sm text-black/45">O e-mail nao pode ser alterado.</span>
          </label>
          <label className="block">
            <span className="text-[20px] text-black/55">Telefone</span>
            <input className="mt-5 h-12 w-full rounded-full border border-[#ff3333] px-5 outline-none" />
          </label>
          <label className="block">
            <span className="text-[20px] text-black/55">CPF</span>
            <input className="mt-5 h-12 w-full rounded-full border border-[#ff3333] px-5 outline-none" />
          </label>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <Link to="/change-password" className="flex h-[62px] items-center justify-center rounded-[16px] border border-black/25 text-[18px] font-bold uppercase text-black">
            Alterar senha
          </Link>
          <button className="h-[62px] rounded-[16px] bg-black text-[18px] font-bold uppercase text-white">
            Salvar alteracoes
          </button>
        </div>
      </form>
    </AccountLayout>
  );
};

export default MyAccountPage;
