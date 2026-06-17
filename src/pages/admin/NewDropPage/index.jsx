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
    <div className="relative">
      <PageMarker name="NewDropPage" />
      {showSuccess && (
        <div className="absolute right-0 top-0 flex h-[72px] items-center gap-4 rounded-[10px] bg-[#b6edc8] px-8 text-[18px] font-bold uppercase text-[#1da64a]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1da64a]">✓</span>
          Drop salvo com sucesso!
        </div>
      )}

      <div className="mb-8 flex items-center gap-7">
        <Link to="/admin/drops" aria-label="Voltar para drops" className="text-black transition hover:text-black/60">
          <Icon name="arrowLeft" className="h-7 w-7" />
        </Link>
        <h1 className="text-[34px] font-black uppercase leading-tight text-black md:text-[42px]">Novo Drop</h1>
      </div>

      <AdminPanel className="mx-auto max-w-[650px] p-9">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <label>
            <span className="text-[15px] uppercase text-black/55">Nome do drop</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Drop Genesis"
              required
              className="mt-3 h-12 w-full rounded-full border border-black/25 px-7 text-[16px] outline-none placeholder:text-black/45 focus:border-black"
            />
          </label>

          <label>
            <span className="text-[15px] uppercase text-black/55">Data de lançamento</span>
            <input
              type="date"
              value={launchDate}
              onChange={(e) => setLaunchDate(e.target.value)}
              className="mt-3 h-12 w-full rounded-full border border-black/25 px-7 text-[16px] outline-none focus:border-black"
            />
          </label>

          <label>
            <span className="text-[15px] uppercase text-black/55">Status</span>
            <select
              value={isActive ? 'true' : 'false'}
              onChange={(e) => setIsActive(e.target.value === 'true')}
              className="mt-3 h-12 w-full rounded-full border border-black/25 bg-white px-7 text-[16px] text-black/65 outline-none focus:border-black"
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
              className="mt-3 min-h-[135px] w-full rounded-[18px] border border-black/25 px-7 py-4 text-[16px] outline-none placeholder:text-black/45 focus:border-black"
            />
          </label>

          {error && <p className="text-center text-sm font-semibold text-red-500">{error}</p>}

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:justify-end">
            <Link
              to="/admin/drops"
              className="inline-flex h-11 min-w-[195px] items-center justify-center rounded-[8px] border border-black/25 text-[15px] font-bold uppercase text-black/55 transition hover:border-black hover:text-black"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 min-w-[220px] items-center justify-center gap-4 rounded-[8px] bg-black px-7 text-[15px] font-bold uppercase text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/45"
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
