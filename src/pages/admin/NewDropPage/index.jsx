import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../lib/authToken';
import { AdminPanel, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const NewDropPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = getAccessToken();
      if (!token) throw new Error('Token de autenticação não encontrado.');

      const response = await fetch(`${API_BASE_URL}/api/catalog/drops/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name,
          description,
          launch_date: launchDate ? new Date(launchDate).toISOString() : null,
          is_active: isActive,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || 'Falha ao criar o drop.');
      }

      const newDrop = await response.json();
      setShowSuccess(true);
      setTimeout(() => navigate(`/admin/drops/${newDrop.id}`), 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageMarker name="NewDropPage" />

      {showSuccess && (
        <div className="mb-4 flex h-12 w-full items-center justify-center gap-3 rounded-[12px] bg-[#b6edc8] text-[14px] font-bold uppercase text-[#1da64a] md:text-[16px]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#1da64a]">✓</span>
          Drop salvo com sucesso!
        </div>
      )}

      <div className="mb-6 flex items-center gap-4">
        <Link to="/admin/drops" aria-label="Voltar para drops" className="text-black transition hover:text-black/60">
          <Icon name="arrowLeft" className="h-6 w-6 md:h-7 md:w-7" />
        </Link>
        <h1 className="text-[26px] font-black uppercase leading-tight text-black md:text-[42px]">Novo Drop</h1>
      </div>

      <AdminPanel className="mx-auto max-w-[650px] p-5 md:p-9">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <label>
            <span className="text-[15px] uppercase text-black/55">Nome do drop</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Drop Genesis"
              required
              className="mt-3 h-11 w-full rounded-full border border-black/25 px-7 text-[14px] outline-none placeholder:text-black/45 focus:border-black md:h-12 md:text-[16px]"
            />
          </label>

          <label>
            <span className="text-[15px] uppercase text-black/55">Data de lançamento</span>
            <input
              type="date"
              value={launchDate}
              onChange={(e) => setLaunchDate(e.target.value)}
              className="mt-3 h-11 w-full rounded-full border border-black/25 px-7 text-[14px] outline-none focus:border-black md:h-12 md:text-[16px]"
            />
          </label>

          <label>
            <span className="text-[15px] uppercase text-black/55">Status</span>
            <select
              value={isActive ? 'true' : 'false'}
              onChange={(e) => setIsActive(e.target.value === 'true')}
              className="mt-3 h-11 w-full rounded-full border border-black/25 bg-white px-7 text-[14px] text-black/65 outline-none focus:border-black md:h-12 md:text-[16px]"
            >
              <option value="false">Rascunho</option>
              <option value="true">Ativo</option>
            </select>
          </label>

          <label>
            <span className="text-[15px] uppercase text-black/55">Descrição (Opcional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do conceito do drop"
              className="mt-3 min-h-[135px] w-full rounded-[18px] border border-black/25 px-7 py-4 text-[14px] outline-none placeholder:text-black/45 focus:border-black md:text-[16px]"
            />
          </label>

          {error && <p className="text-center text-sm font-semibold text-red-500">{error}</p>}

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:justify-end">
            <Link
              to="/admin/drops"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/25 text-[15px] font-bold uppercase text-black/55 transition hover:border-black hover:text-black sm:w-auto sm:min-w-[195px] md:rounded-[8px]"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center gap-4 rounded-full bg-black px-7 text-[15px] font-bold uppercase text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/45 sm:w-auto sm:min-w-[220px] md:rounded-[8px]"
            >
              <Icon name="save" className="h-5 w-5" />
              {isSubmitting ? 'Salvando...' : 'Salvar drop'}
            </button>
          </div>
        </form>
      </AdminPanel>
    </div>
  );
};

export default NewDropPage;
