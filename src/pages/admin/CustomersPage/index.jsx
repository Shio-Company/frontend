import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const customers = [
  { name: 'Maria Silva', email: 'maria@cliente.com', orders: 6, spent: '$ 1.240,00' },
  { name: 'Joao Souza', email: 'joao@cliente.com', orders: 3, spent: '$ 690,00' },
  { name: 'Ana Costa', email: 'ana@cliente.com', orders: 9, spent: '$ 2.105,00' },
];

const CustomersPage = () => {
  return (
    <div>
      <PageMarker name="CustomersPage" />
      <AdminTitle
        title="Clientes"
        action={<BlackButton>Novo cliente</BlackButton>}
      />

      <AdminPanel className="overflow-hidden">
        <div className="p-5">
          <label className="flex h-12 max-w-[675px] items-center gap-4 rounded-full border border-black/20 px-5 text-black/45">
            <Icon name="search" className="h-5 w-5" />
            <input className="w-full bg-transparent text-[20px] outline-none placeholder:text-black/35" placeholder="Buscar clientes..." />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f0f0f0] text-[20px] text-black/55">
              <tr>
                <th className="px-10 py-6 font-normal">Cliente</th>
                <th className="px-10 py-6 font-normal">E-mail</th>
                <th className="px-10 py-6 font-normal">Pedidos</th>
                <th className="px-10 py-6 font-normal">Total gasto</th>
                <th className="px-10 py-6 text-right font-normal">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {customers.map((customer) => (
                <tr key={customer.email}>
                  <td className="px-10 py-8 text-[20px] font-semibold text-black">{customer.name}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{customer.email}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{customer.orders}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{customer.spent}</td>
                  <td className="px-10 py-8 text-right">
                    <button aria-label={`Acoes para ${customer.name}`}>
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

export default CustomersPage;
