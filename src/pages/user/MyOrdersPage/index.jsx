import { Link } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';

const orders = [
  { id: 'SH-00042', date: '06 Abr 2026', total: '$ 539,80', status: 'Aguardando Pagamento', color: 'text-[#b58a00]' },
  { id: 'SH-00042', date: '06 Abr 2026', total: '$ 539,80', status: 'Em transporte', color: 'text-[#7c2cff]' },
  { id: 'SH-00042', date: '06 Abr 2026', total: '$ 539,80', status: 'Entregue', color: 'text-[#10a545]' },
];

const MyOrdersPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="MyOrdersPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Meus Pedidos</h1>

      <div className="space-y-8">
        {orders.map((order, index) => (
          <article key={`${order.id}-${index}`} className="grid gap-5 rounded-[18px] border border-black/20 p-6 md:grid-cols-[1fr_1fr_1fr_1fr_220px] md:items-center">
            <div>
              <p className="text-[20px] text-black/55">Pedido</p>
              <p className="mt-3 text-[22px] text-black/60">{order.id}</p>
            </div>
            <div>
              <p className="text-[20px] text-black/55">Data</p>
              <p className="mt-3 text-[22px] text-black/60">{order.date}</p>
            </div>
            <div>
              <p className="text-[20px] text-black/55">Total</p>
              <p className="mt-3 text-[22px] text-black/60">{order.total}</p>
            </div>
            <div>
              <p className="text-[20px] text-black/55">Staus</p>
              <p className={`mt-3 text-[16px] ${order.color}`}>{order.status}</p>
            </div>
            <Link to="/my-orders/SH-00042" className="inline-flex h-[62px] items-center justify-center gap-4 rounded-[16px] border border-black/20 text-[18px] font-bold uppercase text-black">
              Ver detalhes
              <Icon name="arrowRight" className="h-5 w-5" />
            </Link>
          </article>
        ))}
      </div>
    </AccountLayout>
  );
};

export default MyOrdersPage;
