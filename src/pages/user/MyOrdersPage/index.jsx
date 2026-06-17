import { Link } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';

const MyOrdersPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="MyOrdersPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Meus Pedidos</h1>

      <div className="flex flex-col items-center justify-center rounded-[18px] border border-black/10 px-8 py-20 text-center">
        <Icon name="bag" className="h-16 w-16 text-black/20" />
        <p className="mt-6 text-[22px] font-bold text-black">Nenhum pedido encontrado</p>
        <p className="mt-3 max-w-sm text-[16px] text-black/45">
          Seus pedidos aparecerão aqui assim que você realizar uma compra.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-black/85"
        >
          Explorar produtos
          <Icon name="arrowRight" className="h-5 w-5" />
        </Link>
      </div>
    </AccountLayout>
  );
};

export default MyOrdersPage;
