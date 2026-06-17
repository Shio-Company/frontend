import { Link } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';

const OrderDetailsPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="OrderDetailsPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Detalhes do Pedido</h1>

      <div className="flex flex-col items-center justify-center rounded-[18px] border border-black/10 px-8 py-20 text-center">
        <Icon name="bag" className="h-16 w-16 text-black/20" />
        <p className="mt-6 text-[22px] font-bold text-black">Pedido não encontrado</p>
        <p className="mt-3 max-w-sm text-[16px] text-black/45">
          O acompanhamento detalhado de pedidos estará disponível em breve.
        </p>
        <Link
          to="/my-orders"
          className="mt-8 inline-flex h-12 items-center gap-3 rounded-full border border-black/20 px-8 text-sm font-medium text-black transition hover:border-black"
        >
          <Icon name="arrowLeft" className="h-5 w-5" />
          Voltar aos pedidos
        </Link>
      </div>
    </AccountLayout>
  );
};

export default OrderDetailsPage;
