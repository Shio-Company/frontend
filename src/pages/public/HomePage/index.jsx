import PublicLayout from '../../../components/layout/public/PublicLayout';
import { PageMarker, ProductCard, SectionTitle, ViewAllButton } from '../../../components/ui/ShioDesign';
import { catalogProducts } from '../../../data/shioCatalog';

const launches = catalogProducts.slice(0, 4);
const bestSellers = catalogProducts.slice(4, 8);

const HomePage = () => {
  return (
    <PublicLayout>
      <PageMarker name="HomePage" />

      <section className="relative overflow-hidden bg-black">
        <img
          src="/images/shio/hero-carousel.jpg"
          alt="Pre-venda do novo drop Shio"
          className="h-[300px] w-full object-cover md:h-[480px]"
        />
        <button className="absolute left-5 top-1/2 flex h-10 w-8 -translate-y-1/2 items-center justify-center text-white/90" aria-label="Slide anterior">
          ‹
        </button>
        <button className="absolute right-5 top-1/2 flex h-10 w-8 -translate-y-1/2 items-center justify-center text-white/90" aria-label="Proximo slide">
          ›
        </button>
      </section>

      <section className="bg-black py-8 text-center">
        <p className="text-[26px] font-black uppercase leading-tight text-white md:text-[34px]">
          Deus primeiro. Negocios depois.
        </p>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
        <SectionTitle>Lancamentos</SectionTitle>
        <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {launches.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        <ViewAllButton />
      </section>

      <section className="mx-auto max-w-[1240px] border-t border-black/10 px-6 py-16 md:py-20">
        <SectionTitle>Mais vendidos</SectionTitle>
        <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        <ViewAllButton />
      </section>
    </PublicLayout>
  );
};

export default HomePage;
