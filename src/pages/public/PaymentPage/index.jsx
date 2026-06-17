import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';
import { getAccessToken } from '../../../lib/authToken';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const steps = ['Entrega', 'Forma de pagamento', 'Revisao'];

const PaymentPage = () => {
  const navigate = useNavigate();

  // Cart
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [productImages, setProductImages] = useState({});

  // Address / CEP
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState(null);
  const [addressNumber, setAddressNumber] = useState('');
  const [addressComplement, setAddressComplement] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Checkout
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    const token = getAccessToken();
    fetch(`${API_BASE_URL}/api/orders/cart/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.ok ? r.json() : null)
      .then(async (data) => {
        setCart(data);
        const ids = [...new Set((data?.items ?? []).map((i) => i.product_id).filter(Boolean))];
        const results = await Promise.all(
          ids.map((id) =>
            fetch(`${API_BASE_URL}/api/catalog/products/${id}/`)
              .then((r) => r.ok ? r.json() : null)
              .catch(() => null)
          )
        );
        const map = {};
        results.forEach((p) => {
          if (p?.id && p.images?.[0]?.image) map[p.id] = p.images[0].image;
        });
        setProductImages(map);
      })
      .catch(() => {})
      .finally(() => setCartLoading(false));
  }, []);

  const lookupCep = useCallback(async () => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) return;
    setCepLoading(true);
    setCepError(null);
    setCepData(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/correios/cep/${clean}/`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'CEP não encontrado.');
      setCepData(data);
    } catch (e) {
      setCepError(e.message);
    } finally {
      setCepLoading(false);
    }
  }, [cep]);

  const handleCepBlur = () => lookupCep();

  const handleCepChange = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v;
    setCep(formatted);
  };

const handleCheckout = async (e) => {
    e.preventDefault();
    setCheckoutError(null);

    setSubmitting(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error('Você precisa estar logado para finalizar a compra.');

      const res = await fetch(`${API_BASE_URL}/api/orders/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shipping_cost: 0 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Falha ao processar o pedido.');
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        navigate('/my-orders');
      }
    } catch (e) {
      setCheckoutError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const items = cart?.items ?? [];
  const subtotal = parseFloat(cart?.subtotal ?? 0);

  return (
    <PublicLayout>
      <PageMarker name="PaymentPage" />

      <section className="mx-auto max-w-[1120px] px-6 py-16">
        {/* Step indicator */}
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

        <form onSubmit={handleCheckout}>
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Main form */}
            <div className="space-y-6">
              {/* Delivery address */}
              <div className="rounded-[20px] border border-black/10 p-8">
                <h2 className="text-[24px] font-black uppercase text-black">Endereço de entrega</h2>
                <p className="mt-2 text-sm text-black/50">
                  Informe o CEP para calcular o frete.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
                  <label className="block">
                    <span className="text-sm text-black/55">CEP</span>
                    <input
                      value={cep}
                      onChange={handleCepChange}
                      onBlur={handleCepBlur}
                      placeholder="00000-000"
                      className="mt-2 h-12 w-full rounded-full border border-black/20 px-5 outline-none focus:border-black"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={lookupCep}
                    disabled={cepLoading}
                    className="mt-6 h-12 self-end rounded-full bg-black px-6 text-sm font-medium text-white disabled:bg-black/40"
                  >
                    {cepLoading ? '...' : 'Buscar'}
                  </button>
                </div>

                {cepError && (
                  <p className="mt-3 text-sm text-[#ff3333]">{cepError}</p>
                )}

                {cepData && (
                  <div className="mt-4 grid gap-4 rounded-[14px] bg-[#f7f7f7] p-5">
                    <p className="font-semibold text-black">
                      {cepData.logradouro || ''}{cepData.bairro ? `, ${cepData.bairro}` : ''}<br />
                      {cepData.cidade || ''} — {cepData.uf || ''}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-sm text-black/55">Número</span>
                        <input
                          value={addressNumber}
                          onChange={(e) => setAddressNumber(e.target.value)}
                          placeholder="123"
                          className="mt-2 h-10 w-full rounded-full border border-black/20 px-4 text-sm outline-none focus:border-black"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm text-black/55">Complemento</span>
                        <input
                          value={addressComplement}
                          onChange={(e) => setAddressComplement(e.target.value)}
                          placeholder="Apto, bloco..."
                          className="mt-2 h-10 w-full rounded-full border border-black/20 px-4 text-sm outline-none focus:border-black"
                        />
                      </label>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-black/40">
                  Cadastro completo de endereços estará disponível em breve.
                </p>
              </div>

              {/* Payment method */}
              <div className="rounded-[20px] border border-black/10 p-8">
                <h2 className="text-[24px] font-black uppercase text-black">Forma de pagamento</h2>
                <p className="mt-2 text-sm text-black/50">O pagamento será processado com segurança pela InfinitePay.</p>

                <div className="mt-6 grid gap-4">
                  <label className={`flex cursor-pointer items-center justify-between rounded-[14px] border p-5 transition ${paymentMethod === 'card' ? 'border-black' : 'border-black/10'}`}>
                    <span>
                      <strong className="block text-[18px] text-black">Cartão de crédito</strong>
                      <span className="mt-1 block text-sm text-black/55">Visa, Mastercard, Apple Pay e Google Pay</span>
                    </span>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  </label>
                  <label className={`flex cursor-pointer items-center justify-between rounded-[14px] border p-5 transition ${paymentMethod === 'pix' ? 'border-black' : 'border-black/10'}`}>
                    <span>
                      <strong className="block text-[18px] text-black">PIX</strong>
                      <span className="mt-1 block text-sm text-black/55">Confirmação rápida por QR Code</span>
                    </span>
                    <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} />
                  </label>
                </div>
              </div>

              {checkoutError && (
                <div className="rounded-[14px] border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-[#cc0000]">
                  {checkoutError}
                </div>
              )}

<div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Link to="/cart" className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 px-6 text-sm text-black">
                  <Icon name="arrowLeft" className="h-4 w-4" />
                  Voltar ao carrinho
                </Link>
                <button
                  type="submit"
                  disabled={submitting || items.length === 0}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-black px-8 text-sm font-medium text-white disabled:bg-black/40"
                >
                  {submitting ? 'Processando...' : 'Finalizar compra'}
                  {!submitting && <Icon name="arrowRight" className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Order summary */}
            <aside className="rounded-[20px] border border-black/10 p-6">
              <h2 className="text-[24px] font-bold text-black">Resumo</h2>

              {cartLoading ? (
                <p className="mt-4 text-sm text-black/40">Carregando...</p>
              ) : (
                <>
                  <div className="mt-6 space-y-4">
                    {items.map((item) => (
                      <div key={item.variation_id} className="flex gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[8px] bg-[#f0efed]">
                          {productImages[item.product_id] && (
                            <img
                              src={productImages[item.product_id]}
                              alt={item.product_name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-black">{item.product_name}</p>
                          <p className="text-sm text-black/55">Tam: {item.size} · Qtd: {item.quantity}</p>
                          <p className="text-sm font-bold text-black">R$ {Number(item.unit_price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-black/10 pt-5 text-sm">
                    <div className="flex justify-between text-black/55">
                      <span>Subtotal</span>
                      <strong className="text-black">R$ {subtotal.toFixed(2)}</strong>
                    </div>
                    <div className="mt-3 flex justify-between text-black/55">
                      <span>Frete</span>
                      <strong className="text-black">{cepData ? 'A calcular' : '—'}</strong>
                    </div>
                    <div className="mt-5 flex justify-between text-[22px] font-bold text-black">
                      <span>Total</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </aside>
          </div>
        </form>
      </section>
    </PublicLayout>
  );
};

export default PaymentPage;
