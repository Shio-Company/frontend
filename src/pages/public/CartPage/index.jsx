import { Link } from 'react-router-dom';
import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker, QuantityControl } from '../../../components/ui/ShioDesign';
import { cartItems } from '../../../data/shioCatalog';

const CartPage = () => {
  return (
    <PublicLayout>
      <PageMarker name="CartPage" />

      <section className="mx-auto max-w-[1240px] px-6 py-16">
        <h1 className="mb-8 text-[42px] font-black uppercase leading-tight text-black">Carrinho</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_505px]">
          <div className="rounded-[20px] border border-black/10 p-6">
            <div className="divide-y divide-black/10">
              {cartItems.map((item) => (
                <article key={item.name} className="grid gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[124px_1fr_auto]">
                  <img src={item.image} alt={item.name} className="h-[124px] w-[124px] rounded-[8px] bg-[#f0efed] object-cover" />
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-[20px] font-bold text-black">{item.name}</h2>
                        <p className="mt-1 text-[14px] text-black/60">Size: {item.size}</p>
                        <p className="text-[14px] text-black/60">Color: {item.color}</p>
                      </div>
                      <button className="text-[#ff3333]" aria-label={`Remover ${item.name}`}>
                        <Icon name="trash" className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mt-5 text-[24px] font-bold text-black">{item.price}</p>
                  </div>
                  <div className="flex items-end justify-start sm:justify-end">
                    <QuantityControl />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[20px] border border-black/10 p-6">
            <h2 className="text-[24px] font-bold text-black">Order Summary</h2>
            <div className="mt-6 space-y-5 text-[20px]">
              <div className="flex justify-between text-black/60"><span>Subtotal</span><strong className="text-black">$565</strong></div>
              <div className="flex justify-between text-black/60"><span>Discount (-20%)</span><strong className="text-[#ff3333]">-$113</strong></div>
              <div className="flex justify-between border-b border-black/10 pb-5 text-black/60"><span>Delivery Fee</span><strong className="text-black">$15</strong></div>
              <div className="flex justify-between text-[24px] text-black"><span>Total</span><strong>$467</strong></div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_120px]">
              <label className="flex h-12 items-center gap-3 rounded-full bg-[#f0f0f0] px-5 text-black/40">
                <Icon name="tag" className="h-5 w-5 shrink-0" />
                <input className="w-full bg-transparent text-sm outline-none placeholder:text-black/35" placeholder="Add promo code" />
              </label>
              <button className="h-12 rounded-full bg-black text-sm font-medium text-white">Apply</button>
            </div>

            <Link
              to="/payment"
              className="mt-6 flex h-[60px] w-full items-center justify-center gap-4 rounded-full bg-black text-[16px] font-medium text-white transition hover:bg-black/85"
            >
              Finalizar compra
              <Icon name="arrowRight" className="h-5 w-5" />
            </Link>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CartPage;
