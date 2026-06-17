import { useState } from 'react';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';

const FIELDS = [
  { key: 'title', label: 'Titulo do endereco' },
  { key: 'cep', label: 'CEP' },
  { key: 'street', label: 'Rua e numero' },
  { key: 'neighborhood', label: 'Bairro' },
  { key: 'city', label: 'Cidade' },
  { key: 'state', label: 'Estado' },
];

const NewAddressPage = () => {
  const [form, setForm] = useState({});

  return (
    <AccountLayout>
      <PageMarker name="NewAddressPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Novo Endereço</h1>

      <div className="mb-6 max-w-[720px] rounded-[14px] border border-black/10 bg-[#f7f7f7] px-6 py-4 text-[15px] text-black/55">
        Cadastro de endereços estará disponível em breve.
      </div>

      <form
        className="max-w-[720px] rounded-[18px] border border-black/20 p-8 md:p-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {FIELDS.map(({ key, label }) => (
            <label key={key} className="block">
              <span className="text-[20px] text-black/55">{label}</span>
              <input
                disabled
                value={form[key] ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="mt-5 h-12 w-full rounded-full border border-black/20 bg-black/[0.03] px-5 outline-none"
              />
            </label>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            disabled
            className="h-[62px] cursor-not-allowed rounded-[16px] bg-black/40 px-12 text-[18px] font-bold uppercase text-white"
          >
            Salvar endereco
          </button>
        </div>
      </form>
    </AccountLayout>
  );
};

export default NewAddressPage;
