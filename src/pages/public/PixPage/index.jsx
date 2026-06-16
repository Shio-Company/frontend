import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';

const PixPage = () => {
  return (
    <PublicLayout>
      <PageMarker name="PixPage" />

      <section className="mx-auto max-w-[980px] px-6 py-16">
        <div className="rounded-[20px] border border-black/10 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-black/45">Confirmacao de pagamento pix</p>
          <h1 className="mt-4 text-[34px] font-black uppercase leading-tight text-black md:text-[42px]">
            Revisao do pedido PIX
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-black/55">
            Escaneie o QR Code ou copie a chave abaixo. O pedido sera confirmado assim que o pagamento for identificado.
          </p>

          <div className="mx-auto mt-8 grid max-w-[760px] gap-8 md:grid-cols-[280px_1fr] md:text-left">
            <div className="grid aspect-square place-items-center rounded-[18px] border border-black/10 bg-[#f7f7f7] p-8">
              <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-2">
                {Array.from({ length: 25 }).map((_, index) => (
                  <span key={index} className={`${index % 3 === 0 || index % 7 === 0 ? 'bg-black' : 'bg-transparent'} rounded-sm`} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[14px] bg-[#f0f0f0] p-5">
                <p className="text-sm text-black/50">Chave PIX</p>
                <p className="mt-2 font-semibold text-black">vendas@shio.com.br</p>
              </div>
              <div className="rounded-[14px] bg-[#f0f0f0] p-5">
                <p className="text-sm text-black/50">Valor</p>
                <p className="mt-2 text-[28px] font-bold text-black">$467</p>
              </div>
              <button className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-medium text-white">
                Copiar codigo PIX
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PixPage;
