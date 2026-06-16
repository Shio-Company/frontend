import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';
import { adminProducts } from '../../../data/shioCatalog';

const DropDetailsPage = () => {
  return (
    <div>
      <PageMarker name="DropDetailsPage" />
      <AdminTitle
        title="Detalhes do Drop"
        action={<BlackButton to="/admin/edit-drop/1">Editar drop</BlackButton>}
      />

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <AdminPanel className="p-8">
          <h2 className="text-[24px] font-bold text-black">Drop Grace</h2>
          <p className="mt-4 max-w-2xl text-[18px] leading-7 text-black/55">
            Lancamento exclusivo com edicao limitada de camisetas, camisas e jeans para a nova temporada Shio.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {['20 Jun 2026', '12 produtos', 'Publica'].map((item) => (
              <div key={item} className="rounded-[14px] bg-[#f0f0f0] p-5 text-[18px] font-semibold text-black">
                {item}
              </div>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel className="p-8">
          <h2 className="text-[24px] font-bold text-black">Acoes</h2>
          <div className="mt-6 grid gap-3">
            <a href="/admin/edit-drop/1" className="flex h-12 items-center justify-center rounded-[10px] border border-black/20 font-semibold text-black">
              Editar drop
            </a>
            <button className="flex h-12 items-center justify-center rounded-[10px] border border-black/20 font-semibold text-black">
              Duplicar drop
            </button>
            <button className="flex h-12 items-center justify-center rounded-[10px] bg-[#ff3333] font-semibold text-white">
              Excluir drop
            </button>
          </div>
        </AdminPanel>
      </div>

      <AdminPanel className="mt-10 overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-[24px] font-bold text-black">Produtos do drop</h2>
          <button className="inline-flex items-center gap-2 text-[16px] font-semibold text-black">
            <Icon name="plus" className="h-5 w-5" />
            Gerenciar produtos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f0f0f0] text-[18px] text-black/55">
              <tr>
                <th className="px-8 py-5 font-normal">Produto</th>
                <th className="px-8 py-5 font-normal">Preco</th>
                <th className="px-8 py-5 font-normal">Estoque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {adminProducts.map((product) => (
                <tr key={product.name}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <img src={product.image} alt="" className="h-20 w-20 rounded-[6px] object-cover" />
                      <span className="text-[18px] font-semibold text-black">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[18px] text-black/55">$ 349,90</td>
                  <td className={`px-8 py-5 text-[18px] ${product.status === 'empty' ? 'text-[#ff3333]' : 'text-[#14a84a]'}`}>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPanel>
    </div>
  );
};

export default DropDetailsPage;
