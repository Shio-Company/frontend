import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { getAccessToken } from '../../../lib/authToken';
import { ActionMenu, AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const DropsPage = () => {
  const { data: apiResponse, loading, error, refetch } = useApi('/api/catalog/drops/');
  const [search, setSearch] = useState('');
  const [actionError, setActionError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusLabel = (isActive) => {
    const text = isActive ? 'Ativo' : 'Rascunho';
    const color = isActive ? 'text-[#00a651]' : 'text-black/45';
    return <span className={`text-[18px] font-semibold ${color}`}>{text}</span>;
  };

  const handleDelete = async (dropId) => {
    if (!window.confirm('Excluir este drop? Os produtos associados ficarão sem drop.')) return;
    setActionError(null);
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/api/catalog/drops/${dropId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Falha ao excluir o drop.');
      refetch();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDuplicate = async (drop) => {
    setActionError(null);
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/api/catalog/drops/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: `${drop.name} (cópia)`,
          description: drop.description || '',
          launch_date: drop.launch_date,
          end_date: drop.end_date,
          max_quantity: drop.max_quantity,
          is_active: false,
          is_public: drop.is_public ?? true,
        }),
      });
      if (!response.ok) throw new Error('Falha ao duplicar o drop.');
      refetch();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const renderContent = () => {
    if (loading) return <div className="p-10 text-center text-black/55">Carregando drops...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Erro ao carregar drops. Tente novamente.</div>;

    const allDrops = apiResponse ? (Array.isArray(apiResponse) ? apiResponse : apiResponse.results ?? []) : [];
    const drops = search.trim()
      ? allDrops.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
      : allDrops;

    if (drops.length === 0) return <div className="p-10 text-center text-black/55">Nenhum drop encontrado.</div>;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[#f0f0f0] text-[20px] text-black/55">
            <tr>
              <th className="px-10 py-6 font-normal">Drop</th>
              <th className="px-10 py-6 font-normal">Lançamento</th>
              <th className="px-10 py-6 font-normal">Produtos</th>
              <th className="px-10 py-6 font-normal">Status</th>
              <th className="px-10 py-6 text-right font-normal">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {drops.map((drop) => (
              <tr key={drop.id}>
                <td className="px-10 py-8 text-[20px] font-semibold text-black">
                  <Link to={`/admin/drops/${drop.id}`} className="hover:underline">{drop.name}</Link>
                </td>
                <td className="px-10 py-8 text-[20px] text-black/55">{formatDate(drop.launch_date)}</td>
                <td className="px-10 py-8 text-[20px] text-black/55">{drop.products?.length ?? 0}</td>
                <td className="px-10 py-8">{getStatusLabel(drop.is_active)}</td>
                <td className="px-10 py-8 text-right">
                  <ActionMenu
                    label={`Ações para ${drop.name}`}
                    items={[
                      { label: 'Ver detalhes', to: `/admin/drops/${drop.id}` },
                      { label: 'Editar drop', to: `/admin/edit-drop/${drop.id}` },
                      { label: 'Duplicar drop', onClick: () => handleDuplicate(drop) },
                      { label: 'Gerenciar produtos', to: `/admin/drops/${drop.id}` },
                      { separator: true, key: 'sep' },
                      { label: 'Excluir drop', danger: true, icon: 'trash', onClick: () => handleDelete(drop.id) },
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
      <PageMarker name="DropsPage" />
      <AdminTitle
        title="Drops"
        action={(
          <BlackButton as={Link} to="/admin/new-drop">
            <Icon name="plus" className="h-5 w-5" />
            Novo drop
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
              placeholder="Buscar drops..."
            />
          </label>
        </div>
        {renderContent()}
      </AdminPanel>
    </div>
  );
};

export default DropsPage;
