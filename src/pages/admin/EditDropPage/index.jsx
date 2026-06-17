import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { getAccessToken } from '../../../lib/authToken';
import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getInitialDate = (dateString) => (dateString ? dateString.split('T')[0] : '');

const EditDropForm = ({ dropId, initialData }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [startDate, setStartDate] = useState(getInitialDate(initialData.launch_date));
  const [isActive, setIsActive] = useState(initialData.is_active);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const updatedData = {
      name,
      description,
      launch_date: startDate ? new Date(startDate).toISOString() : null,
      is_active: isActive,
      is_public: initialData.is_public ?? true,
      end_date: initialData.end_date ?? null,
      max_quantity: initialData.max_quantity ?? null,
    };

    try {
      const token = getAccessToken();
      if (!token) throw new Error('Token de autenticação não encontrado.');

      const response = await fetch(`${API_BASE_URL}/api/catalog/drops/${dropId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Falha ao atualizar o drop.');
      }

      navigate('/admin/drops');

    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageMarker name="EditDropPage" />
      <AdminTitle
        title="Editar Drop"
        action={
          <BlackButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Atualizando...' : 'Atualizar'}
          </BlackButton>
        }
      />

      <AdminPanel className="max-w-[900px] p-8">
        <form onSubmit={handleSubmit} className="grid gap-8">
          <label>
            <span className="text-[20px] text-black/55">Nome do drop</span>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black"
            />
          </label>
          <label>
            <span className="text-[20px] text-black/55">Descrição</span>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-4 min-h-[150px] w-full rounded-[18px] border border-black/20 px-5 py-4 text-[18px] outline-none focus:border-black"
            />
          </label>
          <div className="grid gap-8 md:grid-cols-2">
            <label>
              <span className="text-[20px] text-black/55">Data de lançamento</span>
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black"
              />
            </label>
            <label>
              <span className="text-[20px] text-black/55">Visibilidade</span>
              <select 
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === 'true')}
                className="mt-4 h-12 w-full rounded-full border border-black/20 bg-white px-5 text-[18px] outline-none focus:border-black"
              >
                <option value="true">Ativo</option>
                <option value="false">Rascunho</option>
              </select>
            </label>
          </div>
          {submitError && <p className="text-red-500 text-center">{submitError}</p>}
          <button
            type="button"
            onClick={() => navigate(`/admin/drops/${dropId}`)}
            className="flex h-20 items-center justify-center gap-3 rounded-[18px] border border-dashed border-black/25 text-[18px] font-semibold text-black/55 transition hover:border-black hover:text-black"
          >
            <Icon name="plus" className="h-5 w-5" />
            Gerenciar produtos do drop
          </button>
        </form>
      </AdminPanel>
    </div>
  );
};

const EditDropPage = () => {
  const { id: dropId } = useParams();
  const { data: initialData, loading: isLoadingData, error: fetchError } = useApi(`/api/catalog/drops/${dropId}/`);

  if (isLoadingData) return <div className="text-center p-8">Carregando dados do drop...</div>;
  if (fetchError) return <div className="text-center p-8 text-red-500">Erro ao carregar os dados. Verifique o ID e tente novamente.</div>;
  if (!initialData) return <div className="text-center p-8">Drop não encontrado.</div>;

  return <EditDropForm dropId={dropId} initialData={initialData} />;
};

export default EditDropPage;
