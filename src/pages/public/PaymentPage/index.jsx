import { Link } from 'react-router-dom';
import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';
import { cartItems } from '../../../data/shioCatalog';

const steps = ['Entrega', 'Forma de pagamento', 'Revisao'];

const PaymentPage = () => {
  return (
    <PublicLayout>
      <PageMarker name="PaymentPage" />

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${index === 1 ? 'bg-black text-white' : 'bg-[#f0f0f0] text-black/55'}`}>
                {index + 1}
              </span>
              <span className={index === 1 ? 'font-semibold text-black' : 'text-black/50'}>{step}</span>
              {index < steps.length - 1 && <span className="h-px w-10 bg-black/10" />}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[20px] border border-black/10 p-8">
            <h1 className="text-[34px] font-black uppercase text-black">Forma de pagamento</h1>
            <p className="mt-3 text-black/55">Escolha como deseja finalizar o pedido.</p>

            <div className="mt-8 grid gap-4">
              <label className="flex items-center justify-between rounded-[14px] border border-black p-5">
                <span>
                  <strong className="block text-[18px] text-black">Cartao de credito</strong>
                  <span className="mt-1 block text-sm text-black/55">Visa, Mastercard, Apple Pay e Google Pay</span>
                </span>
                <input type="radio" name="payment" defaultChecked />
              </label>
              <label className="flex items-center justify-between rounded-[14px] border border-black/10 p-5">
                <span>
                  <strong className="block text-[18px] text-black">PIX</strong>
                  <span className="mt-1 block text-sm text-black/55">Confirmacao rapida por QR Code</span>
                </span>
                <input type="radio" name="payment" />
              </label>
            </div>

            <div className="mt-8 grid gap-4">
              <input className="h-12 rounded-full border border-black/10 px-5 outline-none focus:border-black" placeholder="Nome no cartao" />
              <input className="h-12 rounded-full border border-black/10 px-5 outline-none focus:border-black" placeholder="Numero do cartao" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="h-12 rounded-full border border-black/10 px-5 outline-none focus:border-black" placeholder="Validade" />
                <input className="h-12 rounded-full border border-black/10 px-5 outline-none focus:border-black" placeholder="CVC" />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link to="/cart" className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 px-6 text-sm text-black">
                <Icon name="arrowLeft" className="h-4 w-4" />
                Voltar
              </Link>
              <Link to="/pix" className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-black px-8 text-sm font-medium text-white">
                Revisar pedido
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="rounded-[20px] border border-black/10 p-6">
            <h2 className="text-[24px] font-bold text-black">Resumo</h2>
            <div className="mt-6 space-y-4">
              {cartItems.slice(0, 2).map((item) => (
                <div key={item.name} className="flex gap-3">
                  <img src={item.image} alt="" className="h-16 w-16 rounded-[8px] object-cover" />
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-black/55">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-black/10 pt-5 text-sm">
              <div className="flex justify-between text-black/55"><span>Subtotal</span><strong className="text-black">$565</strong></div>
              <div className="mt-3 flex justify-between text-black/55"><span>Desconto</span><strong className="text-[#ff3333]">-$113</strong></div>
              <div className="mt-3 flex justify-between text-black/55"><span>Frete</span><strong className="text-black">$15</strong></div>
              <div className="mt-5 flex justify-between text-[22px] font-bold text-black"><span>Total</span><span>$467</span></div>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PaymentPage;
