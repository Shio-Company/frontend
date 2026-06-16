import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';
import { adminProducts } from '../../../data/shioCatalog';

const ProductsPage = () => {
  return (
    <div>
      <PageMarker name="ProductsPage" />
      <AdminTitle
        title="Produtos"
        action={(
          <BlackButton>
            <Icon name="plus" className="h-5 w-5" />
            Novo produto
          </BlackButton>
        )}
      />

      <AdminPanel className="overflow-hidden">
        <div className="p-5">
          <label className="flex h-12 max-w-[675px] items-center gap-4 rounded-full border border-black/20 px-5 text-black/45">
            <Icon name="search" className="h-5 w-5" />
            <input className="w-full bg-transparent text-[20px] outline-none placeholder:text-black/35" placeholder="Buscar produtos..." />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f0f0f0] text-[20px] text-black/55">
              <tr>
                <th className="px-10 py-6 font-normal">Produto</th>
                <th className="px-10 py-6 font-normal">Drop</th>
                <th className="px-10 py-6 font-normal">Preco</th>
                <th className="px-10 py-6 font-normal">Estoque</th>
                <th className="px-10 py-6 text-right font-normal">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {adminProducts.map((product) => (
                <tr key={product.name}>
                  <td className="px-5 py-7">
                    <div className="flex items-center gap-7">
                      <img src={product.image} alt={product.name} className="h-[124px] w-[124px] rounded-[6px] object-cover" />
                      <span className="sr-only">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-7 text-[20px] text-black/55">{product.drop}</td>
                  <td className="px-10 py-7 text-[20px] text-black/55">$ 349,90</td>
                  <td className={`px-10 py-7 text-[20px] ${product.status === 'empty' ? 'text-[#ff3333]' : 'text-[#14a84a]'}`}>{product.stock}</td>
                  <td className="px-10 py-7 text-right">
                    <button aria-label={`Acoes para ${product.name}`}>
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

export default ProductsPage;
