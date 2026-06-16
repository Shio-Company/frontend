import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';

const NewAddressPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="NewAddressPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Novo Endereco</h1>

      <form className="rounded-[18px] border border-black/20 p-8 md:p-12">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {['Titulo do endereco', 'CEP', 'Rua e numero', 'Bairro', 'Cidade', 'Estado'].map((label) => (
            <label key={label} className="block">
              <span className="text-[20px] text-black/55">{label}</span>
              <input className="mt-5 h-12 w-full rounded-full border border-black/20 px-5 outline-none focus:border-black" />
            </label>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <button className="h-[62px] rounded-[16px] bg-black px-12 text-[18px] font-bold uppercase text-white">
            Salvar endereco
          </button>
        </div>
      </form>
    </AccountLayout>
  );
};

export default NewAddressPage;
