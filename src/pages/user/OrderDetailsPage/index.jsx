import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';
import { cartItems } from '../../../data/shioCatalog';

const OrderDetailsPage = () => {
  return (
    <AccountLayout>
      <PageMarker name="OrderDetailsPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Detalhes do Pedido</h1>

      <div className="rounded-[18px] border border-black/20 p-8">
        <div className="grid gap-5 border-b border-black/10 pb-8 md:grid-cols-4">
          <div>
            <p className="text-black/45">Pedido</p>
            <p className="mt-2 text-[22px] text-black/70">SH-00042</p>
          </div>
          <div>
            <p className="text-black/45">Data</p>
            <p className="mt-2 text-[22px] text-black/70">06 Abr 2026</p>
          </div>
          <div>
            <p className="text-black/45">Total</p>
            <p className="mt-2 text-[22px] text-black/70">$ 539,80</p>
          </div>
          <div>
            <p className="text-black/45">Status</p>
            <p className="mt-2 text-[18px] text-[#7c2cff]">Em transporte</p>
          </div>
        </div>

        <div className="mt-8 divide-y divide-black/10">
          {cartItems.slice(0, 3).map((item) => (
            <article key={item.name} className="grid gap-4 py-5 first:pt-0 sm:grid-cols-[96px_1fr_auto] sm:items-center">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-[8px] object-cover" />
              <div>
                <h2 className="text-[20px] font-bold text-black">{item.name}</h2>
                <p className="text-black/50">Size: {item.size} · Color: {item.color}</p>
              </div>
              <p className="text-[20px] font-bold text-black">{item.price}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-[14px] bg-[#f7f7f7] p-6 md:grid-cols-2">
          <div>
            <h2 className="text-[20px] font-bold text-black">Endereco de entrega</h2>
            <p className="mt-3 text-black/55">Rua das Flores, 123, Centro, Sao Paulo - SP, CEP 01234-567</p>
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-black">Resumo</h2>
            <div className="mt-3 space-y-2 text-black/55">
              <div className="flex justify-between"><span>Subtotal</span><span>$565</span></div>
              <div className="flex justify-between"><span>Desconto</span><span>-$113</span></div>
              <div className="flex justify-between font-bold text-black"><span>Total</span><span>$467</span></div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default OrderDetailsPage;
