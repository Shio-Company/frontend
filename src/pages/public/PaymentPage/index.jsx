import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';
import { getAccessToken } from '../../../lib/authToken';
import { useCart } from '../../../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// ─── Icons ───────────────────────────────────────────────────────────────────

const PixLogo = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
    <path d="M17.5 6.5L24 0L30.5 6.5L24 13L17.5 6.5Z" fill="black"/>
    <path d="M41.5 17.5L48 24L41.5 30.5L35 24L41.5 17.5Z" fill="black"/>
    <path d="M30.5 41.5L24 48L17.5 41.5L24 35L30.5 41.5Z" fill="black"/>
    <path d="M6.5 30.5L0 24L6.5 17.5L13 24L6.5 30.5Z" fill="black"/>
    <path d="M24 13L35 24L24 35L13 24L24 13Z" fill="black" opacity="0.15"/>
    <path d="M24 17L31 24L24 31L17 24L24 17Z" fill="black"/>
  </svg>
);

const CreditCardIcon = () => (
  <svg viewBox="0 0 56 40" className="h-11 w-14" fill="none">
    <rect width="56" height="40" rx="5" fill="black"/>
    <rect y="11" width="56" height="11" fill="#222"/>
    <rect x="6" y="27" width="14" height="7" rx="2" fill="#444"/>
    <circle cx="44" cy="30" r="4" fill="#555"/>
    <circle cx="50" cy="30" r="4" fill="#333"/>
  </svg>
);

// ─── Step badge ───────────────────────────────────────────────────────────────

function StepCard({ number, title, active, onClick, children }) {
  return (
    <div className="rounded-[16px] border border-black/10">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${
          active ? 'bg-black text-white' : 'bg-black/10 text-black/40'
        }`}>
          {number}
        </span>
        <h2 className={`text-[18px] font-black uppercase tracking-widest ${
          active ? 'text-black' : 'text-black/30'
        }`}>
          {title}
        </h2>
      </button>
      {active && (
        <div className="border-t border-black/10 px-5 pb-6 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── PaymentPage ──────────────────────────────────────────────────────────────

const PaymentPage = () => {
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  const [activeStep, setActiveStep] = useState(0); // 0=entrega 1=pagamento 2=revisão
  const [paymentMethod, setPaymentMethod] = useState('pix');

  // Cart
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [productImages, setProductImages] = useState({});

  // CEP
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState(null);
  const [addressNumber, setAddressNumber] = useState('');

  // Checkout
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const fetchCart = useCallback(async () => {
    const token = getAccessToken();
    try {
      const r = await fetch(`${API_BASE_URL}/api/orders/cart/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!r.ok) return;
      const data = await r.json();
      setCart(data);
      const ids = [...new Set((data?.items ?? []).map((i) => i.product_id).filter(Boolean))];
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`${API_BASE_URL}/api/catalog/products/${id}/`)
            .then((res) => res.ok ? res.json() : null)
            .catch(() => null)
        )
      );
      const map = {};
      results.forEach((p) => { if (p?.id && p.images?.[0]?.image) map[p.id] = p.images[0].image; });
      setProductImages(map);
    } catch {}
  }, []);

  useEffect(() => {
    fetchCart().finally(() => setCartLoading(false));
  }, [fetchCart]);

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

  const handleCepChange = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 8);
    setCep(v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v);
  };

  const handleQtyChange = async (itemId, newQty) => {
    if (newQty < 1) { handleRemove(itemId); return; }
    const token = getAccessToken();
    await fetch(`${API_BASE_URL}/api/orders/cart/items/${itemId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ quantity: newQty }),
    }).catch(() => {});
    fetchCart();
    refreshCart();
  };

  const handleRemove = async (itemId) => {
    const token = getAccessToken();
    await fetch(`${API_BASE_URL}/api/orders/cart/items/${itemId}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
    fetchCart();
    refreshCart();
  };

  const handleCheckout = async () => {
    setCheckoutError(null);
    setSubmitting(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error('Você precisa estar logado.');
      const res = await fetch(`${API_BASE_URL}/api/orders/checkout/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ shipping_cost: 0, payment_method: paymentMethod }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Falha ao processar o pedido.');
      refreshCart();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        navigate('/pix', {
          state: {
            orderNumber: data.order_nsu ?? data.id ?? 'SH-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
            total: subtotal + FRETE - (paymentMethod === 'pix' ? pixDiscount : 0),
            paymentMethod,
          },
        });
      }
    } catch (e) {
      setCheckoutError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const items = cart?.items ?? [];
  const subtotal = parseFloat(cart?.subtotal ?? 0);
  const FRETE = 0; // CEP service unavailable
  const pixDiscount = paymentMethod === 'pix' ? +(subtotal * 0.05).toFixed(2) : 0;
  const total = subtotal + FRETE - pixDiscount;

  return (
    <PublicLayout>
      <PageMarker name="PaymentPage" />

      <section className="mx-auto max-w-[480px] px-4 py-10 lg:max-w-[1120px] lg:px-6 lg:py-16">
        <h1 className="mb-8 text-[28px] font-black uppercase tracking-wider text-black lg:text-[36px]">
          Pagamento
        </h1>

        <div className="space-y-4">

          {/* ── Step 1: ENTREGA ── */}
          <StepCard number={1} title="Entrega" active={activeStep === 0} onClick={() => setActiveStep(0)}>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[13px] text-black/55">CEP</label>
                  <input
                    value={cep}
                    onChange={handleCepChange}
                    onBlur={lookupCep}
                    placeholder="00000-000"
                    className="mt-1.5 h-11 w-full rounded-full border border-black/20 px-5 text-[14px] outline-none focus:border-black"
                  />
                </div>
                <button type="button" onClick={lookupCep} disabled={cepLoading}
                  className="mt-6 h-11 self-end rounded-full bg-black px-5 text-[14px] font-medium text-white disabled:bg-black/40">
                  {cepLoading ? '...' : 'Buscar'}
                </button>
              </div>

              {cepError && <p className="text-[13px] text-[#ff3333]">{cepError}</p>}

              {cepData && (
                <div className="rounded-[12px] border border-black/10 p-4">
                  <label className="flex cursor-pointer items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-black">
                      <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    </span>
                    <span className="text-[14px] font-medium text-black">
                      {cepData.logradouro}{addressNumber ? `, ${addressNumber}` : ''}{cepData.bairro ? ` — ${cepData.bairro}` : ''}
                    </span>
                  </label>
                  <input
                    value={addressNumber}
                    onChange={(e) => setAddressNumber(e.target.value)}
                    placeholder="Número"
                    className="mt-3 h-10 w-full rounded-full border border-black/20 px-4 text-[14px] outline-none focus:border-black"
                  />
                </div>
              )}

              <p className="text-[12px] text-black/35">Cadastro completo de endereços estará disponível em breve.</p>

              <button type="button" onClick={() => setActiveStep(1)}
                className="h-12 w-full rounded-full bg-black text-[14px] font-bold uppercase tracking-widest text-white transition hover:bg-black/85">
                Confirmar Pagamento
              </button>
            </div>
          </StepCard>

          {/* ── Step 2: PAGAMENTO ── */}
          <StepCard number={2} title="Pagamento" active={activeStep === 1} onClick={() => setActiveStep(1)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* PIX */}
                <button type="button" onClick={() => setPaymentMethod('pix')}
                  className={`flex flex-col items-center gap-2 rounded-[14px] border-2 py-6 transition ${
                    paymentMethod === 'pix' ? 'border-black' : 'border-black/10 hover:border-black/30'
                  }`}>
                  <PixLogo />
                  <span className="text-[15px] font-bold text-black">PIX</span>
                  <span className="text-[12px] font-semibold text-[#c8970a]">5% OFF</span>
                </button>

                {/* Card */}
                <button type="button" onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 rounded-[14px] border-2 py-6 transition ${
                    paymentMethod === 'card' ? 'border-black' : 'border-black/10 hover:border-black/30'
                  }`}>
                  <CreditCardIcon />
                  <span className="text-[15px] font-bold text-black">Cartão</span>
                  <span className="text-[12px] text-black/45">ATÉ 12X</span>
                </button>
              </div>

              <button type="button" onClick={() => setActiveStep(2)}
                className="h-12 w-full rounded-full bg-black text-[14px] font-bold uppercase tracking-widest text-white transition hover:bg-black/85">
                Revisar Pedido
              </button>
            </div>
          </StepCard>

          {/* ── Step 3: REVISÃO ── */}
          <StepCard number={3} title="Revisão" active={activeStep === 2} onClick={() => setActiveStep(2)}>
            {cartLoading ? (
              <p className="py-4 text-center text-[14px] text-black/40">Carregando...</p>
            ) : (
              <div className="space-y-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
                  Resumo da compra
                </p>

                {/* Items */}
                <div className="rounded-[12px] bg-[#f7f7f7] p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.variation_id ?? item.id} className="flex gap-3">
                      {/* Image */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[8px] bg-[#e8e8e8]">
                        {productImages[item.product_id] && (
                          <img src={productImages[item.product_id]} alt={item.product_name}
                            className="h-full w-full object-cover" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-[14px] font-bold text-black">{item.product_name}</p>
                          <button onClick={() => handleRemove(item.variation_id ?? item.id)}
                            className="shrink-0 text-[#cc0000] transition hover:text-[#990000]">
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        </div>
                        {item.size && <p className="text-[12px] text-black/50">Tamanho: {item.size}</p>}
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-[15px] font-bold text-black">
                            R$ {Number(item.unit_price).toFixed(2)}
                          </p>
                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleQtyChange(item.variation_id ?? item.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 text-black hover:bg-black/5">
                              <Icon name="minus" className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-[14px] font-medium text-black">{item.quantity}</span>
                            <button onClick={() => handleQtyChange(item.variation_id ?? item.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 text-black hover:bg-black/5">
                              <Icon name="plus" className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-[14px]">
                  <div className="flex justify-between text-black/55">
                    <span>Subtotal</span>
                    <span className="font-medium text-black">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-black/55">
                    <span>Frete</span>
                    <span className="font-medium text-black">
                      {FRETE === 0 ? 'Grátis' : `R$ ${FRETE.toFixed(2)}`}
                    </span>
                  </div>
                  {paymentMethod === 'pix' && (
                    <div className="flex justify-between text-[#c8970a]">
                      <span className="font-semibold">Desconto PIX (5%)</span>
                      <span className="font-semibold">- R$ {pixDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-black/10 pt-3 text-[17px] font-black text-black">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutError && (
                  <p className="rounded-[10px] bg-red-50 px-4 py-3 text-[13px] text-[#cc0000]">
                    {checkoutError}
                  </p>
                )}

                <button type="button" onClick={handleCheckout}
                  disabled={submitting || items.length === 0}
                  className="h-12 w-full rounded-full bg-black text-[14px] font-bold uppercase tracking-widest text-white transition hover:bg-black/85 disabled:bg-black/40">
                  {submitting ? 'Processando...' : 'Revisar Pedido'}
                </button>
              </div>
            )}
          </StepCard>

        </div>
      </section>
    </PublicLayout>
  );
};

export default PaymentPage;
