import { Link } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';

const AddressesPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="AddressesPage" />
      <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[34px] font-black uppercase text-black">Meus Endereços</h1>
        <Link
          to="/new-address"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-[10px] bg-black px-7 text-[18px] font-bold uppercase text-white"
        >
          <Icon name="plus" className="h-5 w-5" />
          Novo endereco
        </Link>
      </div>

      <div className="mb-6 rounded-[14px] border border-black/10 bg-[#f7f7f7] px-6 py-4 text-[15px] text-black/55">
        Gerenciamento de endereços estará disponível em breve.
      </div>

      <div className="flex flex-col items-center justify-center rounded-[18px] border border-black/10 px-8 py-20 text-center">
        <Icon name="tag" className="h-16 w-16 text-black/20" />
        <p className="mt-6 text-[22px] font-bold text-black">Nenhum endereço cadastrado</p>
        <p className="mt-3 max-w-sm text-[16px] text-black/45">
          Seus endereços de entrega aparecerão aqui assim que o recurso estiver disponível.
        </p>
      </div>
    </AccountLayout>
  );
};

export default AddressesPage;
