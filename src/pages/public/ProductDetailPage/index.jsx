import PublicLayout from '../../../components/layout/public/PublicLayout';
import { PageMarker, ProductCard, QuantityControl, Rating, SectionTitle } from '../../../components/ui/ShioDesign';
import { catalogProducts, detailProduct } from '../../../data/shioCatalog';

const ProductDetailPage = () => {
  return (
    <PublicLayout>
      <PageMarker name="ProductDetailPage" />

      <section className="mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[570px_1fr]">
          <div className="grid gap-5 sm:grid-cols-[132px_1fr]">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
              {[1, 2, 3].map((thumb) => (
                <button key={thumb} className="overflow-hidden rounded-[2px] bg-[#f0efed]">
                  <img src={detailProduct.image} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="overflow-hidden bg-[#f0efed]">
              <img src={detailProduct.image} alt={detailProduct.name} className="h-full min-h-[420px] w-full object-cover" />
            </div>
          </div>

          <div>
            <h1 className="text-[36px] font-black leading-tight text-black md:text-[42px]">{detailProduct.name}</h1>
            <div className="mt-4">
              <Rating value={detailProduct.rating} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-[32px] font-bold text-black">{detailProduct.price}</span>
              <span className="text-[32px] font-bold text-black/30 line-through">{detailProduct.oldPrice}</span>
              <span className="rounded-full bg-[#ffebeb] px-4 py-2 text-sm font-medium text-[#ff3333]">{detailProduct.discount}</span>
            </div>
            <p className="mt-4 max-w-[620px] border-b border-black/10 pb-6 text-[16px] leading-7 text-black/55">
              {detailProduct.description}
            </p>

            <div className="border-b border-black/10 py-6">
              <p className="mb-3 text-[15px] text-black/55">Select Colors</p>
              <div className="flex gap-4">
                {['#4f4631', '#314f4a', '#31344f'].map((color, index) => (
                  <button
                    key={color}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${index + 1}`}
                  >
                    {index === 0 && '✓'}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-black/10 py-6">
              <p className="mb-4 text-[15px] text-black/55">Choose Size</p>
              <div className="flex flex-wrap gap-3">
                {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                  <button
                    key={size}
                    className={`min-w-[96px] rounded-full px-6 py-3 text-sm ${size === 'Large' ? 'bg-black text-white' : 'bg-[#f0f0f0] text-black/55'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-[160px_1fr]">
              <QuantityControl />
              <button className="inline-flex h-12 items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/85">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] border-t border-black/10 px-6 py-16">
        <SectionTitle>Recomendacoes para voce</SectionTitle>
        <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {catalogProducts.slice(4, 8).map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default ProductDetailPage;
