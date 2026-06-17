import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker, ProductCard } from '../../../components/ui/ShioDesign';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const toCardShape = (p) => {
  const base = Number(p.base_price);
  const promo = p.promotional_price ? Number(p.promotional_price) : null;
  return {
    id: p.id,
    name: p.name,
    price: `R$ ${(promo ?? base).toFixed(2)}`,
    oldPrice: promo ? `R$ ${base.toFixed(2)}` : null,
    discount: promo ? `-${Math.round((1 - promo / base) * 100)}%` : null,
    image: p.images?.[0]?.image ?? null,
    rating: null,
  };
};

const PAGE_SIZE = 9;

// ─── Dual range slider ────────────────────────────────────────────────────────

function PriceRangeSlider({ min, max, value, onChange }) {
  const [minVal, maxVal] = value;
  const range = max - min || 1;
  const pct = (v) => ((v - min) / range) * 100;

  return (
    <div className="px-1">
      <div className="relative h-5">
        <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-[#e0e0e0]" />
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${pct(minVal)}%`, right: `${100 - pct(maxVal)}%` }}
        />
        <input
          type="range" min={min} max={max} value={minVal}
          onChange={(e) => onChange([Math.min(+e.target.value, maxVal - 1), maxVal])}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          style={{ zIndex: minVal > max - range * 0.1 ? 5 : 3 }}
        />
        <input
          type="range" min={min} max={max} value={maxVal}
          onChange={(e) => onChange([minVal, Math.max(+e.target.value, minVal + 1)])}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          style={{ zIndex: 4 }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow"
          style={{ left: `${pct(minVal)}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow"
          style={{ left: `${pct(maxVal)}%` }}
        />
      </div>
      <div className="mt-3 flex justify-between text-[14px] font-medium text-black">
        <span>R$ {minVal}</span>
        <span>R$ {maxVal}</span>
      </div>
    </div>
  );
}

// ─── Collapsible filter section ───────────────────────────────────────────────

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-black/10 py-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between"
      >
        <span className="text-[18px] font-bold text-black">{title}</span>
        <span className="text-black/55">{open ? '∧' : '∨'}</span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

// ─── CategoryPage ─────────────────────────────────────────────────────────────

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('recent');

  // Collapsible state
  const [priceOpen, setPriceOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);

  // Pending filter state (shown in UI before Apply)
  const [pendingPrice, setPendingPrice] = useState([0, 10000]);
  const [pendingSize, setPendingSize] = useState(null);

  // Applied filter state (used for actual filtering)
  const [appliedPrice, setAppliedPrice] = useState([0, 10000]);
  const [appliedSize, setAppliedSize] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/catalog/products/`)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.results ?? []);
        const active = list.filter((p) => p.is_active !== false);
        setAllProducts(active);

        if (active.length > 0) {
          const prices = active.map((p) => Number(p.base_price));
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setPendingPrice([min, max]);
          setAppliedPrice([min, max]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const priceMin = useMemo(() => {
    if (!allProducts.length) return 0;
    return Math.floor(Math.min(...allProducts.map((p) => Number(p.base_price))));
  }, [allProducts]);

  const priceMax = useMemo(() => {
    if (!allProducts.length) return 1000;
    return Math.ceil(Math.max(...allProducts.map((p) => Number(p.base_price))));
  }, [allProducts]);

  const allSizes = useMemo(() => {
    const sizes = new Set();
    allProducts.forEach((p) => p.variations?.forEach((v) => sizes.add(v.size)));
    const order = ['PP', 'P', 'M', 'G', 'GG', 'XGG', 'Único'];
    return [...sizes].sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [allProducts]);

  const q = searchParams.get('q') ?? '';

  const filtered = useMemo(() => {
    return allProducts
      .filter((p) =>
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description?.toLowerCase().includes(q.toLowerCase())
      )
      .filter((p) => {
        const price = Number(p.base_price);
        return price >= appliedPrice[0] && price <= appliedPrice[1];
      })
      .filter((p) => !appliedSize || p.variations?.some((v) => v.size === appliedSize));
  }, [allProducts, q, appliedPrice, appliedSize]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return Number(a.base_price) - Number(b.base_price);
      if (sortBy === 'price-desc') return Number(b.base_price) - Number(a.base_price);
      return 0;
    });
  }, [filtered, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleApply = () => {
    setAppliedPrice(pendingPrice);
    setAppliedSize(pendingSize);
    setPage(1);
  };

  const hasActiveFilters =
    appliedSize !== null ||
    appliedPrice[0] > priceMin ||
    appliedPrice[1] < priceMax;

  const handleClear = () => {
    setPendingPrice([priceMin, priceMax]);
    setPendingSize(null);
    setAppliedPrice([priceMin, priceMax]);
    setAppliedSize(null);
    setPage(1);
  };

  return (
    <PublicLayout>
      <PageMarker name="CategoryPage" />

      <section className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 lg:grid-cols-[295px_1fr]">

        {/* ── Filters sidebar ── */}
        <aside className="h-fit rounded-[18px] border border-black/10 px-6 pb-6">
          <div className="flex items-center justify-between border-b border-black/10 py-5">
            <h1 className="text-[20px] font-bold text-black">Filtros</h1>
            <Icon name="tag" className="h-5 w-5 text-black/45" />
          </div>

          {/* Price */}
          <FilterSection title="Preço" open={priceOpen} onToggle={() => setPriceOpen((v) => !v)}>
            {priceMin < priceMax ? (
              <PriceRangeSlider
                min={priceMin}
                max={priceMax}
                value={pendingPrice}
                onChange={setPendingPrice}
              />
            ) : (
              <p className="text-[13px] text-black/40">Carregando...</p>
            )}
          </FilterSection>

          {/* Size */}
          <FilterSection title="Tamanho" open={sizeOpen} onToggle={() => setSizeOpen((v) => !v)}>
            {allSizes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPendingSize(pendingSize === size ? null : size)}
                    className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition ${
                      pendingSize === size
                        ? 'bg-black text-white'
                        : 'border border-black/20 text-black/70 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-black/40">
                {loading ? 'Carregando...' : 'Nenhum tamanho disponível.'}
              </p>
            )}
          </FilterSection>

          {/* Apply button */}
          <button
            type="button"
            onClick={handleApply}
            className="mt-5 h-12 w-full rounded-full bg-black text-[15px] font-semibold text-white transition hover:bg-black/85"
          >
            Aplicar Filtros
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-3 h-10 w-full rounded-full border border-black/20 text-[13px] font-medium text-black/55 transition hover:border-black hover:text-black"
            >
              Limpar filtros
            </button>
          )}
        </aside>

        {/* ── Products area ── */}
        <div>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] text-black/55">
              {loading
                ? 'Carregando produtos...'
                : `${q ? `Resultados para "${q}": ` : ''}${filtered.length} produto${filtered.length !== 1 ? 's' : ''}`}
            </p>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="h-10 rounded-full border border-black/20 bg-white px-4 text-[14px] text-black outline-none focus:border-black"
            >
              <option value="recent">Mais recentes</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>

          {!loading && pageItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Icon name="search" className="h-12 w-12 text-black/20" />
              <p className="mt-4 text-[20px] font-bold text-black">Nenhum produto encontrado</p>
              <p className="mt-2 text-black/45">Tente ajustar os filtros.</p>
            </div>
          ) : (
            <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {pageItems.map(toCardShape).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-black/10 px-4 text-black disabled:opacity-40"
              >
                <Icon name="arrowLeft" className="h-4 w-4" />
                Anterior
              </button>
              <div className="hidden items-center gap-2 sm:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`rounded-[8px] px-4 py-2 ${n === currentPage ? 'bg-black text-white' : 'text-black/50 hover:bg-black/5'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-black/10 px-4 text-black disabled:opacity-40"
              >
                Próxima
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default CategoryPage;
