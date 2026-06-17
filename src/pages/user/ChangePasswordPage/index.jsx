import { useState } from 'react';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';

const ChangePasswordPage = () => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <AccountLayout>
      <PageMarker name="ChangePasswordPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Alterar Senha</h1>

      <div className="mb-6 rounded-[14px] border border-black/10 bg-[#f7f7f7] px-6 py-4 text-[15px] text-black/55">
        Alteração de senha via formulário estará disponível em breve. Por enquanto, acesse sua conta via Google.
      </div>

      <form className="max-w-[720px] rounded-[18px] border border-black/20 p-8 md:p-12" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-8">
          <label className="block">
            <span className="text-[20px] text-black/55">Senha atual</span>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              disabled
              className="mt-5 h-12 w-full rounded-full border border-black/20 bg-black/[0.03] px-5 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[20px] text-black/55">Nova senha</span>
            <input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              disabled
              className="mt-5 h-12 w-full rounded-full border border-black/20 bg-black/[0.03] px-5 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[20px] text-black/55">Confirmar nova senha</span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled
              className="mt-5 h-12 w-full rounded-full border border-black/20 bg-black/[0.03] px-5 outline-none"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled
          className="mt-12 h-[62px] w-full cursor-not-allowed rounded-[16px] bg-black/40 text-[18px] font-bold uppercase text-white"
        >
          Atualizar senha
        </button>
      </form>
    </AccountLayout>
  );
};

export default ChangePasswordPage;
