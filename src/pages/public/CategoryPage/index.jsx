import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker, ProductCard } from '../../../components/ui/ShioDesign';
import { catalogProducts } from '../../../data/shioCatalog';

const colors = ['#00c12b', '#f50606', '#f5dd06', '#f57906', '#06b6d4', '#2563eb', '#7c3aed', '#ec1594', '#ffffff', '#000000'];
const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];

const CategoryPage = () => {
  return (
    <PublicLayout>
      <PageMarker name="CategoryPage" />

      <section className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 lg:grid-cols-[295px_1fr]">
        <aside className="rounded-[18px] border border-black/10 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[22px] font-bold text-black">Filters</h1>
            <Icon name="tag" className="h-5 w-5 text-black/45" />
          </div>

          <div className="mt-7 border-b border-black/10 pb-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-black">Price</h2>
              <span className="text-xl">⌃</span>
            </div>
            <div className="relative h-8">
              <div className="absolute left-2 right-2 top-3 h-1 rounded-full bg-black/10" />
              <div className="absolute left-10 right-10 top-3 h-1 rounded-full bg-black" />
              <span className="absolute left-9 top-1 h-5 w-5 rounded-full bg-black" />
              <span className="absolute right-9 top-1 h-5 w-5 rounded-full bg-black" />
            </div>
            <div className="flex justify-between px-8 text-sm font-medium text-black">
              <span>$50</span>
              <span>$200</span>
            </div>
          </div>

          <div className="border-b border-black/10 py-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-black">Colors</h2>
              <span className="text-xl">⌃</span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className="h-9 w-9 rounded-full border border-black/10"
                  style={{ backgroundColor: color }}
                  aria-label={`Cor ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="py-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-black">Size</h2>
              <span className="text-xl">⌃</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`rounded-full px-5 py-3 text-sm ${size === 'Large' ? 'bg-black text-white' : 'bg-[#f0f0f0] text-black/60'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="mt-1 h-12 w-full rounded-full bg-black text-sm font-medium text-white">
            Apply Filter
          </button>
        </aside>

        <div>
          <div className="mb-8 flex flex-col gap-4 text-black/55 sm:flex-row sm:items-center sm:justify-end">
            <p>Showing 1-10 of 100 Products</p>
            <p>
              Sort by: <span className="font-semibold text-black">Most Popular</span>⌄
            </p>
          </div>

          <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {catalogProducts.slice(0, 9).map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6 text-sm">
            <button className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-black/10 px-4 text-black">
              <Icon name="arrowLeft" className="h-4 w-4" />
              Button CTA
            </button>
            <div className="hidden items-center gap-4 text-black/50 sm:flex">
              <span className="rounded-[8px] bg-black/5 px-4 py-3 text-black">1</span>
              <span>1</span>
              <span>1</span>
              <span>1</span>
              <span>1</span>
              <span>1</span>
            </div>
            <button className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-black/10 px-4 text-black">
              Button CTA
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CategoryPage;
