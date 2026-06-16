import { Link } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';

const addresses = [
  { title: 'Casa', badge: 'Padrao' },
  { title: 'Trabalho' },
];

const AddressesPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="AddressesPage" />
      <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[34px] font-black uppercase text-black">Meus Enderecos</h1>
        <Link to="/new-address" className="inline-flex h-12 items-center justify-center gap-3 rounded-[10px] bg-black px-7 text-[18px] font-bold uppercase text-white">
          <Icon name="plus" className="h-5 w-5" />
          Novo endereco
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {addresses.map((address) => (
          <article key={address.title} className="relative rounded-[18px] border border-black/20 p-8">
            {address.badge && (
              <span className="absolute right-0 top-0 rounded-bl-[8px] rounded-tr-[14px] bg-black px-9 py-3 text-[20px] font-bold text-white">
                {address.badge}
              </span>
            )}
            <h2 className="text-[22px] font-bold uppercase text-black">{address.title}</h2>
            <p className="mt-4 text-[16px] font-semibold leading-6 text-black/45">
              Rua das Flores, 123<br />
              Centro<br />
              Sao Paulo - SP<br />
              CEP: 01234-567
            </p>

            <div className="mt-5 flex gap-7 border-t border-black/20 pt-4 text-[16px] font-semibold text-black/45">
              <button className="inline-flex items-center gap-3 hover:text-black">
                <Icon name="tag" className="h-5 w-5" />
                Editar
              </button>
              <button className="inline-flex items-center gap-3 hover:text-black">
                <Icon name="trash" className="h-5 w-5" />
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </AccountLayout>
  );
};

export default AddressesPage;
