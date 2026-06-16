import { AdminPanel, AdminTitle, Icon, PageMarker } from '../../../components/ui/ShioDesign';
import { adminOrders } from '../../../data/shioCatalog';

const OrdersPage = () => {
  return (
    <div>
      <PageMarker name="OrdersPage" />
      <AdminTitle title="Pedidos" />

      <AdminPanel className="overflow-hidden">
        <div className="p-5">
          <label className="flex h-12 max-w-[675px] items-center gap-4 rounded-full border border-black/20 px-5 text-black/45">
            <Icon name="search" className="h-5 w-5" />
            <input className="w-full bg-transparent text-[20px] outline-none placeholder:text-black/35" placeholder="Buscar pedidos..." />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f0f0f0] text-[20px] text-black/55">
              <tr>
                <th className="px-10 py-6 font-normal">Pedido</th>
                <th className="px-10 py-6 font-normal">Cliente</th>
                <th className="px-10 py-6 font-normal">Total</th>
                <th className="px-10 py-6 font-normal">Status</th>
                <th className="px-10 py-6 text-right font-normal">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {adminOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-10 py-8 text-[20px] font-semibold text-black">{order.id}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{order.customer}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{order.total}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{order.status}</td>
                  <td className="px-10 py-8 text-right">
                    <button aria-label={`Acoes para ${order.id}`}>
                      <Icon name="more" className="h-6 w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPanel>
    </div>
  );
};

export default OrdersPage;
