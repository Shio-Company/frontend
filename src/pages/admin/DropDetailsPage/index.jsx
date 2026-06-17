import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { getAccessToken } from '../../../lib/authToken';
import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const DropDetailsPage = () => {
  const { id: dropId } = useParams();
  const navigate = useNavigate();
  const { data: drop, loading, error } = useApi(`/api/catalog/drops/${dropId}/`);
  const { data: productsResponse, loading: loadingProducts } = useApi('/api/catalog/products/');
  const [managedDrop, setManagedDrop] = useState(null);
  const [isManagingProducts, setIsManagingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [managerError, setManagerError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm('Excluir este drop? Os produtos associados ficarão sem drop.')) return;
    setActionError(null);
    try {
      const token = getAccessToken();
      const res = await fetch(`${API_BASE_URL}/api/catalog/drops/${dropId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Falha ao excluir o drop.');
      navigate('/admin/drops');
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDuplicate = async () => {
    setActionError(null);
    const src = managedDrop || drop;
    try {
      const token = getAccessToken();
      const res = await fetch(`${API_BASE_URL}/api/catalog/drops/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: `${src.name} (cópia)`,
          description: src.description || '',
          launch_date: src.launch_date,
          end_date: src.end_date,
          max_quantity: src.max_quantity,
          is_active: false,
          is_public: src.is_public ?? true,
        }),
      });
      if (!res.ok) throw new Error('Falha ao duplicar o drop.');
      const newDrop = await res.json();
      navigate(`/admin/drops/${newDrop.id}`);
    } catch (err) {
      setActionError(err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const formatPrice = (product) => {
    const price = product.base_price ?? product.price ?? 0;
    return `R$ ${Number(price).toFixed(2)}`;
  };

  const getStock = (product) => {
    if (Array.isArray(product.variations)) {
      return product.variations.reduce((total, variation) => total + (variation.stock_quantity || 0), 0);
    }
    return product.stock_quantity ?? product.stock ?? '-';
  };

  const getProductImage = (product) => {
    if (product.first_image_url) return product.first_image_url;
    if (Array.isArray(product.images) && product.images.length > 0) return product.images[0].image;
    return null;
  };

  const allProducts = useMemo(() => {
    const products = productsResponse ? (Array.isArray(productsResponse) ? productsResponse : productsResponse.results) : [];
    const normalizedSearch = productSearch.trim().toLowerCase();
    if (!normalizedSearch) return products;
    return products.filter((product) => product.name.toLowerCase().includes(normalizedSearch));
  }, [productsResponse, productSearch]);

  const handleProductLink = async (product, shouldAttach) => {
    setUpdatingProductId(product.id);
    setManagerError(null);

    try {
      const token = getAccessToken();
      if (!token) throw new Error('Token de autenticação não encontrado.');

      const response = await fetch(`${API_BASE_URL}/api/catalog/drops/${dropId}/products/${product.id}/`, {
        method: shouldAttach ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.detail || 'Não foi possível atualizar os produtos do drop.');
      }

      if (shouldAttach) {
        const updatedDrop = await response.json();
        setManagedDrop(updatedDrop);
      } else {
        setManagedDrop((previousDrop) => ({
          ...(previousDrop || drop),
          products: ((previousDrop || drop)?.products || []).filter((dropProduct) => dropProduct.id !== product.id),
        }));
      }
    } catch (err) {
      setManagerError(err.message);
    } finally {
      setUpdatingProductId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando detalhes do drop...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Erro ao carregar o drop. Verifique se o ID é válido.</div>;
  }

  const currentDrop = managedDrop || drop;

  if (!currentDrop) {
    return <div className="p-8 text-center">Drop não encontrado.</div>;
  }

  const products = currentDrop.products || [];
  const linkedProductIds = new Set(products.map((product) => product.id));

  return (
    <div>
      <PageMarker name="DropDetailsPage" />
      <AdminTitle
        title="Detalhes do Drop"
        action={<BlackButton as={Link} to={`/admin/edit-drop/${dropId}`}>Editar drop</BlackButton>}
      />

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <AdminPanel className="p-8">
          <h2 className="text-[24px] font-bold text-black">{currentDrop.name}</h2>
          <p className="mt-4 max-w-2xl text-[18px] leading-7 text-black/55">
            {currentDrop.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[14px] bg-[#f0f0f0] p-5 text-[18px] font-semibold text-black">
              Lançamento: {formatDate(currentDrop.launch_date)}
            </div>
            <div className="rounded-[14px] bg-[#f0f0f0] p-5 text-[18px] font-semibold text-black">
              {products.length} produtos
            </div>
            <div className="rounded-[14px] bg-[#f0f0f0] p-5 text-[18px] font-semibold text-black">
              Status: {currentDrop.is_active ? 'Ativo' : 'Rascunho'}
            </div>
          </div>
        </AdminPanel>

        <AdminPanel className="p-8">
          <h2 className="text-[24px] font-bold text-black">Ações</h2>
          {actionError && (
            <p className="mt-4 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{actionError}</p>
          )}
          <div className="mt-6 grid gap-3">
            <Link to={`/admin/edit-drop/${dropId}`} className="flex h-12 items-center justify-center rounded-[10px] border border-black/20 font-semibold text-black hover:bg-black/5 transition">
              Editar drop
            </Link>
            <button onClick={handleDuplicate} className="flex h-12 items-center justify-center rounded-[10px] border border-black/20 font-semibold text-black hover:bg-black/5 transition">
              Duplicar drop
            </button>
            <button onClick={handleDelete} className="flex h-12 items-center justify-center rounded-[10px] bg-[#ff3333] font-semibold text-white hover:bg-[#cc0000] transition">
              Excluir drop
            </button>
          </div>
        </AdminPanel>
      </div>

      <AdminPanel className="mt-10 overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-[24px] font-bold text-black">Produtos do drop</h2>
          <button
            type="button"
            onClick={() => setIsManagingProducts((isOpen) => !isOpen)}
            className="inline-flex items-center gap-2 text-[16px] font-semibold text-black"
          >
            <Icon name="plus" className="h-5 w-5" />
            {isManagingProducts ? 'Fechar gerenciamento' : 'Gerenciar produtos'}
          </button>
        </div>
        {isManagingProducts && (
          <div className="border-t border-black/10 p-6">
            <label className="flex h-12 max-w-[675px] items-center gap-4 rounded-full border border-black/20 px-5 text-black/45">
              <Icon name="search" className="h-5 w-5" />
              <input
                value={productSearch}
                onChange={(event) => setProductSearch(event.target.value)}
                className="w-full bg-transparent text-[18px] outline-none placeholder:text-black/35"
                placeholder="Buscar produto para vincular..."
              />
            </label>
            {managerError && <p className="mt-4 text-sm font-semibold text-red-500">{managerError}</p>}
            <div className="mt-5 grid gap-3">
              {loadingProducts ? (
                <div className="rounded-[10px] bg-[#f0f0f0] p-5 text-center text-black/55">Carregando produtos...</div>
              ) : allProducts.length > 0 ? allProducts.map((product) => {
                const isLinked = linkedProductIds.has(product.id);
                return (
                  <div key={product.id} className="flex flex-col gap-4 rounded-[10px] border border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[18px] font-semibold text-black">{product.name}</p>
                      <p className="mt-1 text-sm text-black/55">{formatPrice(product)} - Estoque: {getStock(product)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleProductLink(product, !isLinked)}
                      disabled={updatingProductId === product.id}
                      className={`h-11 rounded-[10px] px-5 text-sm font-bold uppercase transition disabled:cursor-not-allowed disabled:opacity-60 ${isLinked ? 'border border-black/20 text-black hover:border-black' : 'bg-black text-white hover:bg-black/85'}`}
                    >
                      {updatingProductId === product.id ? 'Salvando...' : isLinked ? 'Remover' : 'Adicionar'}
                    </button>
                  </div>
                );
              }) : (
                <div className="rounded-[10px] bg-[#f0f0f0] p-5 text-center text-black/55">Nenhum produto encontrado.</div>
              )}
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f0f0f0] text-[18px] text-black/55">
              <tr>
                <th className="px-8 py-5 font-normal">Produto</th>
                <th className="px-8 py-5 font-normal">Preço</th>
                <th className="px-8 py-5 font-normal">Estoque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {products.length > 0 ? products.map((product) => (
                <tr key={product.id}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      {getProductImage(product) ? (
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          className="h-20 w-20 shrink-0 rounded-[6px] object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }}
                        />
                      ) : null}
                      <div className={`h-20 w-20 shrink-0 rounded-[6px] bg-[#f0f0f0] ${getProductImage(product) ? 'hidden' : 'block'}`} />
                      <span className="text-[18px] font-semibold text-black">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[18px] text-black/55">{formatPrice(product)}</td>
                  <td className="px-8 py-5 text-[18px] text-black/55">{getStock(product)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-black/55">Nenhum produto associado a este drop.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminPanel>
    </div>
  );
};

export default DropDetailsPage;
