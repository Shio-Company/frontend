import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';

const ChangePasswordPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="ChangePasswordPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Alterar Senha</h1>

      <form className="max-w-[720px] rounded-[18px] border border-black/20 p-8 md:p-12">
        <div className="grid gap-8">
          {['Senha atual', 'Nova senha', 'Confirmar nova senha'].map((label) => (
            <label key={label} className="block">
              <span className="text-[20px] text-black/55">{label}</span>
              <input type="password" className="mt-5 h-12 w-full rounded-full border border-black/20 px-5 outline-none focus:border-black" />
            </label>
          ))}
        </div>

        <button className="mt-12 h-[62px] w-full rounded-[16px] bg-black text-[18px] font-bold uppercase text-white">
          Atualizar senha
        </button>
      </form>
    </AccountLayout>
  );
};

export default ChangePasswordPage;
