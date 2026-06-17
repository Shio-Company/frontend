import { useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { getAccessToken } from '../../../lib/authToken';
import { ActionMenu, AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ─── Product Detail Drawer ────────────────────────────────────────────────────

function ProductDetailDrawer({ id }) {
  const navigate = useNavigate();
  const { data: product, loading } = useApi(`/api/catalog/products/${id}/`);

  const totalStock = product?.variations?.reduce((s, v) => s + (v.stock_quantity || 0), 0) ?? 0;
  const firstImage = product?.images?.[0]?.image ?? null;

  return (
    <aside className="fixed inset-y-0 right-0 z-30 flex w-[360px] flex-col border-l border-black/10 bg-white shadow-2xl">
      <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-7 py-5">
        <h2 className="text-[18px] font-black uppercase tracking-wide">Detalhes do Produto</h2>
        <button onClick={() => navigate('/admin/products')} aria-label="Fechar" className="rounded-full p-1 transition hover:bg-black/5">
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center text-black/40">Carregando...</div>
      ) : product ? (
        <>
          <div className="flex-1 overflow-y-auto">
            <div className="aspect-square w-full bg-[#f0f0f0]">
              {firstImage && <img src={firstImage} alt={product.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
            </div>

            <div className="px-7 py-6">
              <span className={`inline-block rounded-full px-3 py-1 text-[13px] font-semibold ${product.is_active ? 'bg-[#d4f7e2] text-[#1da64a]' : 'bg-[#f0f0f0] text-black/55'}`}>
                {product.is_active ? 'Ativo' : 'Rascunho'}
              </span>
              <h3 className="mt-3 text-[22px] font-black leading-tight text-black">{product.name}</h3>

              <div className="mt-5 space-y-3 text-[15px]">
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Drop</span>
                  <span className="text-right font-medium">{product.drop?.name ?? '—'}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">SKU</span>
                  <span className="text-right font-medium">{product.variations?.[0]?.sku ?? '—'}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Preço</span>
                  <span className="text-right font-medium">R$ {Number(product.base_price).toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Estoque</span>
                  <span className={`text-right font-semibold ${totalStock > 0 ? 'text-[#00a651]' : 'text-[#ff3333]'}`}>{totalStock} un.</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Categoria</span>
                  <span className="text-right font-medium">{product.category?.name ?? '—'}</span>
                </div>
              </div>

              {product.description && (
                <div className="mt-6">
                  <p className="text-[13px] font-semibold uppercase text-black/45">Descrição:</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/70">{product.description}</p>
                </div>
              )}

              {product.variations?.length > 0 && (
                <div className="mt-6">
                  <p className="text-[13px] font-semibold uppercase text-black/45">Variações:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variations.map((v) => (
                      <span key={v.id} className="flex h-9 min-w-[36px] items-center justify-center rounded-full border border-black/20 px-3 text-[14px] font-medium text-black">
                        {v.size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 gap-3 border-t border-black/10 p-5">
            <button onClick={() => navigate('/admin/products')} className="flex h-11 flex-1 items-center justify-center rounded-[8px] border border-black/25 text-[13px] font-bold uppercase text-black/55 transition hover:border-black hover:text-black">
              Fechar
            </button>
            <button onClick={() => navigate(`/admin/edit-product/${id}`)} className="flex h-11 flex-1 items-center justify-center rounded-[8px] bg-black text-[13px] font-bold uppercase text-white transition hover:bg-black/85">
              Editar Produto
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-black/40">Produto não encontrado.</div>
      )}
    </aside>
  );
}

// ─── Product Edit Drawer ──────────────────────────────────────────────────────

function ProductEditDrawer({ id, refetchList }) {
  const navigate = useNavigate();
  const { data: product, loading } = useApi(`/api/catalog/products/${id}/`);
  const { data: dropsData } = useApi('/api/catalog/drops/');
  const { data: catsData } = useApi('/api/catalog/categories/');

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  if (!loading && product && !form) {
    setForm({
      name: product.name || '',
      description: product.description || '',
      base_price: product.base_price || '',
      drop: product.drop?.id ?? '',
      category: product.category?.id ?? '',
      is_active: product.is_active,
    });
  }

  const drops = Array.isArray(dropsData) ? dropsData : dropsData?.results ?? [];
  const categories = Array.isArray(catsData) ? catsData : catsData?.results ?? [];

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const token = getAccessToken();
      const price = parseFloat(form.base_price);
      const res = await fetch(`${API_BASE_URL}/api/catalog/products/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name,
          description: form.description || '',
          base_price: isNaN(price) ? product.base_price : price,
          drop: form.drop || null,
          category: form.category || null,
          is_active: form.is_active,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join(' | ') || 'Falha ao salvar.';
        throw new Error(msg);
      }
      refetchList?.();
      navigate(`/admin/products/${id}`);
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-30 flex w-[360px] flex-col border-l border-black/10 bg-white shadow-2xl">
      <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-7 py-5">
        <h2 className="text-[18px] font-black uppercase tracking-wide">Editar Produto</h2>
        <button onClick={() => navigate(`/admin/products/${id}`)} aria-label="Fechar" className="rounded-full p-1 transition hover:bg-black/5">
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      {loading || !form ? (
        <div className="flex flex-1 items-center justify-center text-black/40">Carregando...</div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {product?.images?.[0]?.image && (
              <div className="aspect-square w-full bg-[#f0f0f0]">
                <img src={product.images[0].image} alt={product.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
            )}

            <div className="px-7 py-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-black">Status</span>
                <div className="flex items-center gap-3">
                  <span className={`text-[14px] font-semibold ${form.is_active ? 'text-[#1da64a]' : 'text-black/45'}`}>
                    {form.is_active ? 'Ativo' : 'Rascunho'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
                    className={`relative h-6 w-11 rounded-full transition-colors ${form.is_active ? 'bg-[#1da64a]' : 'bg-black/20'}`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>

              <label className="block">
                <span className="text-[13px] font-semibold uppercase text-black/45">Nome do produto</span>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-2 h-11 w-full rounded-[8px] border border-black/20 px-4 text-[15px] outline-none focus:border-black" />
              </label>

              <label className="block">
                <span className="text-[13px] font-semibold uppercase text-black/45">Drop</span>
                <select value={form.drop} onChange={(e) => setForm((f) => ({ ...f, drop: e.target.value }))}
                  className="mt-2 h-11 w-full rounded-[8px] border border-black/20 bg-white px-4 text-[15px] outline-none focus:border-black">
                  <option value="">Sem drop</option>
                  {drops.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-[13px] font-semibold uppercase text-black/45">Preço</span>
                <input type="number" step="0.01" value={form.base_price} onChange={(e) => setForm((f) => ({ ...f, base_price: e.target.value }))}
                  className="mt-2 h-11 w-full rounded-[8px] border border-black/20 px-4 text-[15px] outline-none focus:border-black" />
              </label>

              <label className="block">
                <span className="text-[13px] font-semibold uppercase text-black/45">Categoria</span>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="mt-2 h-11 w-full rounded-[8px] border border-black/20 bg-white px-4 text-[15px] outline-none focus:border-black">
                  <option value="">Sem categoria</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-[13px] font-semibold uppercase text-black/45">Descrição</span>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4}
                  className="mt-2 w-full rounded-[8px] border border-black/20 px-4 py-3 text-[15px] outline-none focus:border-black resize-none" />
              </label>

              {product?.variations?.length > 0 && (
                <div>
                  <span className="text-[13px] font-semibold uppercase text-black/45">Variações</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variations.map((v) => (
                      <span key={v.id} className="flex h-9 min-w-[36px] items-center justify-center rounded-full border border-black/20 px-3 text-[14px] font-medium">
                        {v.size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {saveError && <p className="text-sm font-semibold text-red-500">{saveError}</p>}
            </div>
          </div>

          <div className="flex shrink-0 gap-3 border-t border-black/10 p-5">
            <button onClick={() => navigate(`/admin/products/${id}`)} className="flex h-11 flex-1 items-center justify-center rounded-[8px] border border-black/25 text-[13px] font-bold uppercase text-black/55 transition hover:border-black hover:text-black">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={saving} className="flex h-11 flex-1 items-center justify-center rounded-[8px] bg-black text-[13px] font-bold uppercase text-white transition hover:bg-black/85 disabled:bg-black/40">
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

// ─── Stock Management Drawer ──────────────────────────────────────────────────

const REASON_LABELS = {
  COMPRA: 'Compra', DEVOLUCAO: 'Devolução', AJUSTE: 'Ajuste',
  PERDA: 'Perda/Avaria', VENDA: 'Venda', OUTRO: 'Outro',
};

function StockManagementDrawer({ id, refetchList }) {
  const navigate = useNavigate();
  const { data: product, loading, refetch: refetchProduct } = useApi(`/api/catalog/products/${id}/`);

  const [selectedVarId, setSelectedVarId] = useState(null);
  const [kind, setKind] = useState('ENTRADA');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('COMPRA');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [movements, setMovements] = useState([]);
  const [movementsLoading, setMovementsLoading] = useState(false);
  const [refreshMovements, setRefreshMovements] = useState(0);
  const [creatingVariation, setCreatingVariation] = useState(false);

  useEffect(() => {
    if (!product) return;
    if (product.variations?.length > 0) {
      if (!selectedVarId) setSelectedVarId(product.variations[0].id);
      return;
    }
    // Produto sem variações — cria "Único" automaticamente
    const token = getAccessToken();
    const sku = `UNICO-${id.replace(/-/g, '').substring(0, 12).toUpperCase()}`;
    setCreatingVariation(true);
    fetch(`${API_BASE_URL}/api/catalog/products/${id}/variations/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ size: 'Único', sku, stock_quantity: 0 }),
    })
      .then((r) => r.ok ? refetchProduct() : Promise.reject())
      .catch(() => {})
      .finally(() => setCreatingVariation(false));
  }, [product]);

  useEffect(() => {
    setReason(kind === 'ENTRADA' ? 'COMPRA' : 'VENDA');
  }, [kind]);

  useEffect(() => {
    const varId = selectedVarId ?? product?.variations?.[0]?.id ?? null;
    if (!varId) return;
    setMovementsLoading(true);
    const token = getAccessToken();
    fetch(`${API_BASE_URL}/api/catalog/variations/${varId}/stock-movements/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.resolve([]))
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results ?? []);
        setMovements(list.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setMovementsLoading(false));
  }, [selectedVarId, refreshMovements, product]);

  const handleSave = async () => {
    const varId = selectedVarId ?? product?.variations?.[0]?.id ?? null;
    const qty = parseInt(quantity, 10);
    if (!varId) {
      setError('Este produto não possui variações cadastradas. Adicione variações antes de gerenciar o estoque.');
      return;
    }
    if (!qty || qty <= 0) {
      setError('Informe uma quantidade válida.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const token = getAccessToken();
      const res = await fetch(`${API_BASE_URL}/api/catalog/variations/${varId}/stock-movements/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind, reason, quantity: qty }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join(' | ') || 'Falha ao salvar estoque.';
        throw new Error(msg);
      }
      setQuantity('');
      setRefreshMovements((n) => n + 1);
      refetchProduct();
      refetchList?.();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const totalStock = product?.variations?.reduce((s, v) => s + (v.stock_quantity || 0), 0) ?? 0;
  const firstImage = product?.images?.[0]?.image ?? null;
  const selectedVariation = product?.variations?.find((v) => v.id === selectedVarId);
  const entryReasons = ['COMPRA', 'DEVOLUCAO', 'AJUSTE', 'OUTRO'];
  const exitReasons = ['VENDA', 'PERDA', 'AJUSTE', 'OUTRO'];
  const reasons = kind === 'ENTRADA' ? entryReasons : exitReasons;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

  return (
    <aside className="fixed inset-y-0 right-0 z-30 flex w-[380px] flex-col border-l border-black/10 bg-white shadow-2xl">
      <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-7 py-5">
        <h2 className="text-[18px] font-black uppercase tracking-wide">Gerenciar Estoque</h2>
        <button onClick={() => navigate('/admin/products')} aria-label="Fechar" className="rounded-full p-1 transition hover:bg-black/5">
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      {loading || creatingVariation ? (
        <div className="flex flex-1 items-center justify-center text-black/40">
          {creatingVariation ? 'Configurando produto...' : 'Carregando...'}
        </div>
      ) : product ? (
        <>
          <div className="flex-1 overflow-y-auto">
            {/* Product info */}
            <div className="flex items-center gap-4 border-b border-black/10 px-7 py-5">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[8px] bg-[#f0f0f0]">
                {firstImage && (
                  <img src={firstImage} alt={product.name} className="h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-black">{product.name}</p>
                {product.variations?.[0]?.sku && (
                  <p className="text-[13px] text-black/45">{product.variations[0].sku}</p>
                )}
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${product.is_active ? 'bg-[#d4f7e2] text-[#1da64a]' : 'bg-[#f0f0f0] text-black/45'}`}>
                {product.is_active ? 'Ativo' : 'Rascunho'}
              </span>
            </div>

            {/* Total stock */}
            <div className="flex items-center justify-between border-b border-black/10 px-7 py-4">
              <span className="text-[14px] text-black/55">Estoque total</span>
              <span className={`text-[22px] font-black ${totalStock > 0 ? 'text-black' : 'text-[#ff3333]'}`}>
                {totalStock} <span className="text-[14px] font-semibold text-black/45">un.</span>
              </span>
            </div>

            {/* New movement form */}
            <div className="space-y-4 border-b border-black/10 px-7 py-5">
              <p className="text-[13px] font-bold uppercase text-black/45">Nova movimentação</p>

              {product.variations?.length > 1 && (
                <label className="block">
                  <span className="text-[13px] font-semibold uppercase text-black/45">Variação</span>
                  <select value={selectedVarId ?? product.variations[0].id} onChange={(e) => setSelectedVarId(e.target.value)}
                    className="mt-2 h-11 w-full rounded-[8px] border border-black/20 bg-white px-4 text-[15px] outline-none focus:border-black">
                    {product.variations.map((v) => (
                      <option key={v.id} value={v.id}>{v.size} — {v.stock_quantity ?? 0} un.</option>
                    ))}
                  </select>
                </label>
              )}
              {product.variations?.length === 1 && (
                <div className="flex items-center justify-between rounded-[8px] bg-[#f9f9f9] px-4 py-3 text-[14px]">
                  <span className="text-black/55">Variação</span>
                  <span className="font-semibold">{product.variations[0].size} — {product.variations[0].stock_quantity ?? 0} un. em estoque</span>
                </div>
              )}

              {/* ENTRADA / SAÍDA toggle */}
              <div>
                <span className="text-[13px] font-semibold uppercase text-black/45">Tipo</span>
                <div className="mt-2 flex overflow-hidden rounded-[8px] border border-black/20">
                  <button type="button" onClick={() => setKind('ENTRADA')}
                    className={`flex h-10 flex-1 items-center justify-center text-[14px] font-bold uppercase transition ${kind === 'ENTRADA' ? 'bg-[#1da64a] text-white' : 'bg-white text-black/55 hover:bg-[#f0f0f0]'}`}>
                    + Entrada
                  </button>
                  <button type="button" onClick={() => setKind('SAIDA')}
                    className={`flex h-10 flex-1 items-center justify-center text-[14px] font-bold uppercase transition ${kind === 'SAIDA' ? 'bg-[#ff3333] text-white' : 'bg-white text-black/55 hover:bg-[#f0f0f0]'}`}>
                    − Saída
                  </button>
                </div>
              </div>

              <label className="block">
                <span className="text-[13px] font-semibold uppercase text-black/45">Quantidade</span>
                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="mt-2 h-11 w-full rounded-[8px] border border-black/20 px-4 text-[15px] outline-none focus:border-black" />
              </label>

              <label className="block">
                <span className="text-[13px] font-semibold uppercase text-black/45">Motivo</span>
                <select value={reason} onChange={(e) => setReason(e.target.value)}
                  className="mt-2 h-11 w-full rounded-[8px] border border-black/20 bg-white px-4 text-[15px] outline-none focus:border-black">
                  {reasons.map((r) => <option key={r} value={r}>{REASON_LABELS[r]}</option>)}
                </select>
              </label>

              {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
            </div>

            {/* Per-variation stock table */}
            {product.variations?.length > 1 && (
              <div className="border-b border-black/10 px-7 py-5">
                <p className="mb-3 text-[13px] font-bold uppercase text-black/45">Estoque por variação</p>
                <div className="overflow-hidden rounded-[8px] border border-black/10">
                  <table className="min-w-full text-[14px]">
                    <thead className="bg-[#f0f0f0]">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-black/55">Variação</th>
                        <th className="px-4 py-2 text-right font-semibold text-black/55">Estoque</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                      {product.variations.map((v) => (
                        <tr key={v.id} className={v.id === selectedVarId ? 'bg-[#f9f9f9]' : ''}>
                          <td className="px-4 py-2.5 font-medium text-black">{v.size}</td>
                          <td className={`px-4 py-2.5 text-right font-semibold ${(v.stock_quantity || 0) > 0 ? 'text-[#00a651]' : 'text-[#ff3333]'}`}>
                            {v.stock_quantity ?? 0} un.
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recent movements */}
            <div className="px-7 py-5">
              <p className="mb-3 text-[13px] font-bold uppercase text-black/45">Histórico recente</p>
              {movementsLoading ? (
                <p className="text-[13px] text-black/40">Carregando...</p>
              ) : movements.length > 0 ? (
                <div className="space-y-2">
                  {movements.map((m) => (
                    <div key={m.id} className="flex items-center justify-between rounded-[8px] border border-black/10 px-4 py-3 text-[13px]">
                      <div>
                        <span className={`font-bold ${m.kind === 'ENTRADA' ? 'text-[#1da64a]' : 'text-[#ff3333]'}`}>
                          {m.kind === 'ENTRADA' ? '+' : '−'}{m.quantity} un.
                        </span>
                        <span className="ml-2 text-black/45">{REASON_LABELS[m.reason] ?? m.reason}</span>
                      </div>
                      <span className="text-black/35">{formatDate(m.created_at)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-black/40">Nenhuma movimentação registrada.</p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 gap-3 border-t border-black/10 p-5">
            <button onClick={() => navigate('/admin/products')}
              className="flex h-11 flex-1 items-center justify-center rounded-[8px] border border-black/25 text-[13px] font-bold uppercase text-black/55 transition hover:border-black hover:text-black">
              Cancelar
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex h-11 flex-1 items-center justify-center rounded-[8px] bg-black text-[13px] font-bold uppercase text-white transition hover:bg-black/85 disabled:bg-black/40">
              {saving ? 'Salvando...' : 'Salvar Estoque'}
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-black/40">Produto não encontrado.</div>
      )}
    </aside>
  );
}

// ─── ProductsPage ─────────────────────────────────────────────────────────────

const ProductsPage = () => {
  const { data: apiResponse, loading, error, refetch } = useApi('/api/catalog/products/');
  const [search, setSearch] = useState('');
  const [actionError, setActionError] = useState(null);

  const detailMatch = useMatch('/admin/products/:id');
  const editMatch = useMatch('/admin/edit-product/:id');
  const stockMatch = useMatch('/admin/stock/:id');
  const selectedId = detailMatch?.params?.id ?? editMatch?.params?.id ?? stockMatch?.params?.id ?? null;
  const drawerMode = editMatch ? 'edit' : stockMatch ? 'stock' : 'detail';

  const formatPrice = (product) =>
    `R$ ${Number(product.base_price ?? product.price ?? 0).toFixed(2)}`;

  const getStock = (product) => {
    if (Array.isArray(product.variations)) {
      return product.variations.reduce((total, v) => total + (v.stock_quantity || 0), 0);
    }
    return product.stock ?? 0;
  };

  const getProductImage = (product) => {
    if (product.first_image_url) return product.first_image_url;
    if (Array.isArray(product.images) && product.images.length > 0) return product.images[0].image;
    return null;
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Excluir este produto? Variações e imagens também serão removidas.')) return;
    setActionError(null);
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/api/catalog/products/${productId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Falha ao excluir o produto.');
      refetch();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDuplicate = async (product) => {
    setActionError(null);
    try {
      const token = getAccessToken();

      // Busca o detalhe completo para obter description, drop.id e category.id
      const detailRes = await fetch(`${API_BASE_URL}/api/catalog/products/${product.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!detailRes.ok) throw new Error('Falha ao buscar detalhes do produto.');
      const detail = await detailRes.json();

      const response = await fetch(`${API_BASE_URL}/api/catalog/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: `${detail.name} (cópia)`,
          description: detail.description ?? '',
          base_price: detail.base_price,
          drop: detail.drop?.id ?? null,
          category: detail.category?.id ?? null,
          is_active: false,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = Object.entries(errorData)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join(' | ') || 'Falha ao duplicar o produto.';
        throw new Error(msg);
      }
      const newProduct = await response.json();

      // Copia as imagens do produto original para o duplicado
      if (detail.images?.length > 0) {
        for (const img of detail.images) {
          try {
            const imgRes = await fetch(img.image);
            const imgBlob = await imgRes.blob();
            const ext = img.image.split('.').pop().split('?')[0] || 'jpg';
            const formData = new FormData();
            formData.append('image', imgBlob, `image-copy.${ext}`);
            await fetch(`${API_BASE_URL}/api/catalog/products/${newProduct.id}/images/`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            });
          } catch {
            // Imagem individual falhou — continua sem bloquear
          }
        }
      }

      refetch();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const renderContent = () => {
    if (loading) return <div className="p-10 text-center text-black/55">Carregando produtos...</div>;
    if (error) return (
      <div className="p-10 text-center text-red-500">
        <p className="font-semibold">Erro ao carregar produtos.</p>
        <p className="mt-1 text-sm text-red-400">{error?.message}</p>
        <button onClick={refetch} className="mt-3 text-sm underline">Tentar novamente</button>
      </div>
    );

    const allProducts = apiResponse
      ? Array.isArray(apiResponse) ? apiResponse : apiResponse.results ?? []
      : [];
    const products = search.trim()
      ? allProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      : allProducts;

    if (products.length === 0) return <div className="p-10 text-center text-black/55">Nenhum produto encontrado.</div>;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[#f0f0f0] text-[20px] text-black/55">
            <tr>
              <th className="px-10 py-6 font-normal">Produto</th>
              <th className="px-10 py-6 font-normal">Drop</th>
              <th className="px-10 py-6 font-normal">Preço</th>
              <th className="px-10 py-6 font-normal">Estoque</th>
              <th className="px-10 py-6 text-right font-normal">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {products.map((product) => (
              <tr key={product.id} className={selectedId === product.id ? 'bg-[#f9f9f9]' : ''}>
                <td className="px-5 py-7">
                  <div className="flex items-center gap-5">
                    {getProductImage(product) ? (
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="h-[86px] w-[86px] shrink-0 rounded-[6px] object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }}
                      />
                    ) : null}
                    <div className={`h-[86px] w-[86px] shrink-0 rounded-[6px] bg-[#f0f0f0] ${getProductImage(product) ? 'hidden' : 'block'}`} />
                    <span className="text-[20px] font-semibold text-black">{product.name}</span>
                  </div>
                </td>
                <td className="px-10 py-7 text-[20px] text-black/55">
                  {product.drop?.name ?? 'Sem drop'}
                </td>
                <td className="px-10 py-7 text-[20px] text-black/55">{formatPrice(product)}</td>
                <td className={`px-10 py-7 text-[20px] font-semibold ${getStock(product) > 0 ? 'text-[#00a651]' : 'text-[#ff3333]'}`}>
                  {getStock(product)} UN.
                </td>
                <td className="px-10 py-7 text-right">
                  <ActionMenu
                    label={`Ações para ${product.name}`}
                    items={[
                      { label: 'Ver detalhes', to: `/admin/products/${product.id}` },
                      { label: 'Editar produto', to: `/admin/edit-product/${product.id}` },
                      { label: 'Duplicar produto', onClick: () => handleDuplicate(product) },
                      { label: 'Gerenciar estoque', to: `/admin/stock/${product.id}` },
                      { separator: true, key: 'sep' },
                      { label: 'Excluir produto', danger: true, icon: 'trash', onClick: () => handleDelete(product.id) },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <PageMarker name="ProductsPage" />
      <AdminTitle
        title="Produtos"
        action={(
          <BlackButton as={Link} to="/admin/new-product">
            <Icon name="plus" className="h-5 w-5" />
            Novo produto
          </BlackButton>
        )}
      />

      {actionError && (
        <div className="mb-4 rounded-[10px] bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
          {actionError}
          <button type="button" className="ml-3 underline" onClick={() => setActionError(null)}>Fechar</button>
        </div>
      )}

      <AdminPanel className="overflow-hidden">
        <div className="p-5">
          <label className="flex h-12 max-w-[675px] items-center gap-4 rounded-full border border-black/20 px-5 text-black/45">
            <Icon name="search" className="h-5 w-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-[20px] outline-none placeholder:text-black/35"
              placeholder="Buscar produtos..."
            />
          </label>
        </div>
        {renderContent()}
      </AdminPanel>

      {selectedId && drawerMode === 'detail' && <ProductDetailDrawer id={selectedId} />}
      {selectedId && drawerMode === 'edit' && <ProductEditDrawer id={selectedId} refetchList={refetch} />}
      {selectedId && drawerMode === 'stock' && <StockManagementDrawer id={selectedId} refetchList={refetch} />}
    </div>
  );
};

export default ProductsPage;
