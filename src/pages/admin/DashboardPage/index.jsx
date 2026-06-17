import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthTokens, getAccessToken } from '../../../lib/authToken';
import { AdminPanel, AdminTitle, PageMarker } from '../../../components/ui/ShioDesign';
import MetricCard from '../../../components/ui/MetricCard';


const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const token = getAccessToken();
        
        if (!token) {
          navigate('/admin/login');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/orders/dashboard/summary/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else if (response.status === 401 || response.status === 403) {
          // Redireciona caso o token seja inválido, expirado ou não tenha permissão de Admin
          console.error('Sessão expirada ou não autorizado. Redirecionando...');
          clearAuthTokens();
          navigate('/admin/login');
        } else {
          console.error('Falha ao buscar resumo do dashboard');
        }
      } catch (error) {
        console.error('Erro de conexão ao buscar dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <div>
        <PageMarker name="DashboardPage" />
        <AdminTitle title="Dashboard" />
        <p className="mt-10 text-center text-lg text-black/60">Carregando dados...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <PageMarker name="DashboardPage" />
        <AdminTitle title="Dashboard" />
        <p className="mt-10 text-center text-lg text-[#ff3333]">Erro ao carregar o dashboard.</p>
      </div>
    );
  }

  const { sales_summary, customers_summary, recent_orders, low_stock_alerts } = data;

  const metrics = [
    { 
      label: 'Receita total', 
      value: `R$ ${parseFloat(sales_summary?.total_revenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
      icon: '$' 
    },
    { 
      label: 'Pedidos (30d)', 
      value: sales_summary?.total_orders || 0, 
      icon: 'bag' 
    },
    { 
      label: 'Clientes ativos', 
      value: customers_summary?.total_registered || 0, 
      change: `+${customers_summary?.new_in_period || 0} no período`, 
      icon: 'users',
      negative: false
    },
    { 
      label: 'Produtos em baixa', 
      value: low_stock_alerts?.length || 0, 
      icon: 'box', 
      negative: (low_stock_alerts?.length || 0) > 0 
    },
  ];

  return (
    <div>
      <PageMarker name="DashboardPage" />
      <AdminTitle title="Dashboard" />

      <div className="mx-auto grid max-w-[920px] gap-4 md:grid-cols-2 md:gap-10">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {low_stock_alerts && low_stock_alerts.length > 0 && (
        <AdminPanel className="mx-auto mt-6 max-w-[920px] border border-[#ff3333]/20 p-5 md:mt-14 md:p-8">
          <h2 className="text-[16px] font-bold uppercase text-[#ff3333] md:text-[20px]">Alertas de Estoque Baixo</h2>
          <div className="mt-4 space-y-3">
            {low_stock_alerts.map((alert) => (
              <div key={alert.id} className="flex justify-between border-b border-black/10 pb-2 text-[14px] last:border-0 last:pb-0 md:text-base">
                <span className="text-black/80">{alert.product_name} — {alert.variation_size}</span>
                <span className="font-bold text-[#ff3333]">{alert.stock_quantity} un.</span>
              </div>
            ))}
          </div>
        </AdminPanel>
      )}

      {/* Chart */}
      <AdminPanel className="mx-auto mt-6 max-w-[920px] p-5 md:mt-20 md:p-8">
        <h2 className="text-[14px] font-bold uppercase tracking-widest text-black md:text-[20px]">
          Visão Geral de Vendas
        </h2>
        <div className="mt-4 flex h-[180px] items-end gap-3 border-l-[4px] border-black pl-4 md:h-[260px] md:gap-9 md:border-l-[8px] md:pl-9">
          {[220, 105, 200, 145, 145].map((height, i) => (
            <div key={i} className="w-full rounded-t-[4px] bg-[#1f1f1f]"
              style={{ height: `${(height / 220) * 100}%` }} />
          ))}
        </div>
      </AdminPanel>

      <AdminPanel className="mx-auto mt-6 max-w-[920px] p-5 md:mt-14 md:p-8">
        <h2 className="text-[14px] font-bold uppercase tracking-widest text-black md:text-[20px]">
          Últimos Pedidos
        </h2>
        {recent_orders && recent_orders.length > 0 ? (
          <div className="mt-4 divide-y divide-black/10 md:mt-8">
            {recent_orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-[14px] font-bold text-black md:text-[20px]">
                    SH-{String(order.id).split('-')[0].toUpperCase()}
                  </p>
                  <p className="text-[12px] text-black/55 md:text-[16px]">
                    {order.customer_name || 'Cliente Anônimo'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-bold text-black md:text-[20px]">
                    R$ {parseFloat(order.total_amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[12px] text-black/55 md:text-[16px]">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-[14px] text-black/60">Nenhum pedido recente encontrado.</p>
        )}
      </AdminPanel>
    </div>
  );
};

export default DashboardPage;
