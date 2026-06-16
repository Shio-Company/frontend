import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const drops = [
  { name: 'Drop Grace', date: '20 Jun 2026', products: 12, status: 'Ativo' },
  { name: 'Drop First Order', date: '05 Jul 2026', products: 8, status: 'Planejado' },
  { name: 'Drop Made in Brazil', date: '18 Jul 2026', products: 16, status: 'Rascunho' },
];

const DropsPage = () => {
  return (
    <div>
      <PageMarker name="DropsPage" />
      <AdminTitle
        title="Drops"
        action={(
          <BlackButton to="/admin/new-drop">
            <Icon name="plus" className="h-5 w-5" />
            Novo drop
          </BlackButton>
        )}
      />

      <AdminPanel className="overflow-hidden">
        <div className="p-5">
          <label className="flex h-12 max-w-[675px] items-center gap-4 rounded-full border border-black/20 px-5 text-black/45">
            <Icon name="search" className="h-5 w-5" />
            <input className="w-full bg-transparent text-[20px] outline-none placeholder:text-black/35" placeholder="Buscar drops..." />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f0f0f0] text-[20px] text-black/55">
              <tr>
                <th className="px-10 py-6 font-normal">Drop</th>
                <th className="px-10 py-6 font-normal">Lancamento</th>
                <th className="px-10 py-6 font-normal">Produtos</th>
                <th className="px-10 py-6 font-normal">Status</th>
                <th className="px-10 py-6 text-right font-normal">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {drops.map((drop) => (
                <tr key={drop.name}>
                  <td className="px-10 py-8 text-[20px] font-semibold text-black">
                    <a href="/admin/drops/1">{drop.name}</a>
                  </td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{drop.date}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{drop.products}</td>
                  <td className="px-10 py-8 text-[20px] text-black/55">{drop.status}</td>
                  <td className="px-10 py-8 text-right">
                    <button aria-label={`Acoes para ${drop.name}`}>
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

export default DropsPage;
