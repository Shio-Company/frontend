import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PublicLayout from '../../../components/layout/public/PublicLayout';
import { Icon, PageMarker } from '../../../components/ui/ShioDesign';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const PixPage = () => {
  const [searchParams] = useSearchParams();
  const orderNsu = searchParams.get('order_nsu');
  const transactionNsu = searchParams.get('transaction_nsu');
  const slug = searchParams.get('slug');

  const [status, setStatus] = useState('loading'); // loading | paid | pending | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!orderNsu || !transactionNsu || !slug) {
      setStatus('pending');
      return;
    }

    // Modo teste — pula verificação real
    if (orderNsu.startsWith('TESTE-')) {
      setStatus('pending');
      return;
    }

    fetch(`${API_BASE_URL}/api/orders/pagamento-sucesso/?order_nsu=${orderNsu}&transaction_nsu=${transactionNsu}&slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setMessage(data.message ?? '');
        if (data.message?.toLowerCase().includes('confirmado')) {
          setStatus('paid');
        } else {
          setStatus('pending');
        }
      })
      .catch(() => setStatus('pending'));
  }, [orderNsu, transactionNsu, slug]);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="py-20 text-center">
          <p className="text-[18px] text-black/45">Verificando pagamento...</p>
        </div>
      );
    }

    if (status === 'paid') {
      return (
        <div className="py-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e6f9ed]">
            <Icon name="save" className="h-10 w-10 text-[#10a545]" />
          </div>
          <h2 className="mt-6 text-[30px] font-black uppercase text-black">Pagamento confirmado!</h2>
          <p className="mx-auto mt-3 max-w-sm text-black/55">
            {message || 'Seu pedido foi confirmado com sucesso. Você receberá atualizações por e-mail.'}
          </p>
          {orderNsu && (
            <p className="mt-4 text-sm text-black/40">Pedido: {orderNsu}</p>
          )}
          <Link
            to="/my-orders"
            className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-black px-8 text-sm font-medium text-white"
          >
            Ver meus pedidos
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-black/45">
            Aguardando confirmacao
          </p>
          <h2 className="mt-4 text-[30px] font-black uppercase leading-tight text-black">
            Pagamento em processamento
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-black/55">
            {message || 'Seu pagamento está sendo processado. Assim que confirmado, você receberá um e-mail de confirmação.'}
          </p>
          {orderNsu && (
            <p className="mt-4 text-sm text-black/40">Pedido: {orderNsu}</p>
          )}
          <div className="mx-auto mt-8 flex max-w-[400px] flex-col gap-3">
            <Link
              to="/my-orders"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-black px-8 text-sm font-medium text-white"
            >
              Acompanhar pedido
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 text-sm text-black"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="py-16 text-center">
        <p className="text-[20px] font-bold text-black">Não foi possível verificar o pagamento.</p>
        <Link to="/" className="mt-6 inline-block text-sm text-black underline">Voltar à loja</Link>
      </div>
    );
  };

  return (
    <PublicLayout>
      <PageMarker name="PixPage" />
      <section className="mx-auto max-w-[980px] px-6 py-16">
        <div className="rounded-[20px] border border-black/10 p-8">
          {renderContent()}
        </div>
      </section>
    </PublicLayout>
  );
};

export default PixPage;
