import { AdminPanel, AdminTitle, Icon, PageMarker } from '../../../components/ui/ShioDesign';
import { adminOrders } from '../../../data/shioCatalog';

const metrics = [
  { label: 'Receita total', value: '$ 45.231,80', change: '+12.5%', icon: '$' },
  { label: 'Pedidos', value: '156', change: '+5.2%', icon: 'bag' },
  { label: 'Clientes ativos', value: '2.405', change: '+18.1%', icon: 'users' },
  { label: 'Produtos em baixa', value: '12', change: '-2.4%', icon: 'box', negative: true },
];

const DashboardPage = () => {
  return (
    <div>
      <PageMarker name="DashboardPage" />
      <AdminTitle title="Dashboard" />

      <div className="mx-auto grid max-w-[920px] gap-10 md:grid-cols-2">
        {metrics.map((metric) => (
          <AdminPanel key={metric.label} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-7 w-7 items-center justify-center bg-[#f0f0f0] text-lg font-bold text-black">
                {metric.icon === '$' ? '$' : <Icon name={metric.icon} className="h-5 w-5" />}
              </div>
              <span className={`text-[20px] font-semibold ${metric.negative ? 'text-[#ff3333]' : 'text-[#14b85a]'}`}>
                {metric.change}
              </span>
            </div>
            <p className="mt-3 text-[20px] text-black/80">{metric.label}</p>
            <p className="mt-2 text-[26px] font-bold text-black">{metric.value}</p>
          </AdminPanel>
        ))}
      </div>

      <AdminPanel className="mx-auto mt-20 max-w-[920px] p-8">
        <h2 className="text-[20px] font-bold uppercase text-black">Visao geral de vendas</h2>
        <div className="mt-6 flex h-[260px] items-end gap-9 border-l-[8px] border-black pl-9">
          {[220, 105, 200, 145, 145].map((height, index) => (
            <div key={index} className="w-full max-w-[120px] rounded-t-[6px] bg-[#1f1f1f]" style={{ height }} />
          ))}
        </div>
      </AdminPanel>

      <AdminPanel className="mx-auto mt-14 max-w-[920px] p-8">
        <h2 className="text-[20px] font-bold uppercase text-black">Ultimos pedidos</h2>
        <div className="mt-8 divide-y divide-black/10">
          {adminOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-[20px] font-bold text-black">{order.id}</p>
                <p className="text-[16px] text-black/70">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-[20px] font-bold text-black">{order.total}</p>
                <p className="text-[16px] text-black/70">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </AdminPanel>
    </div>
  );
};

export default DashboardPage;
