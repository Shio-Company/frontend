import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';
import { useApi } from '../../../hooks/useApi';
import { getAccessToken } from '../../../lib/authToken';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const MyAccountPage = () => {
  const navigate = useNavigate();
  const { data: me, loading } = useApi('/api/auth/me/');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);

  useEffect(() => {
    if (!me) return;
    setName(me.name ?? '');
    setPhone(me.phone_number ?? '');
    setCpf(me.cpf ?? '');
  }, [me]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg(null);
    try {
      const token = getAccessToken();
      const res = await fetch(`${API_BASE_URL}/api/auth/me/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone_number: phone, cpf }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join(' | ') || 'Falha ao salvar.';
        throw new Error(msg);
      }
      setSaveMsg({ type: 'success', text: 'Dados salvos com sucesso!' });
    } catch (err) {
      setSaveMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 4000);
    }
  };

  return (
    <AccountLayout>
      <PageMarker name="MyAccountPage" />
      <h1 className="mb-7 text-[34px] font-black uppercase text-black">Meus Dados</h1>

      {loading ? (
        <div className="py-12 text-center text-black/40">Carregando...</div>
      ) : (
        <form
          className="rounded-[18px] border border-black/20 p-5 md:p-8 lg:p-12"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-x-20 gap-y-6 md:grid-cols-2">
            <label className="block">
              <span className="text-[14px] text-black/55 lg:text-[20px]">Nome Completo</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-3 h-11 w-full rounded-full border border-black/20 px-5 text-[14px] outline-none focus:border-black lg:mt-5 lg:h-12 lg:text-base"
              />
            </label>

            <label className="block">
              <span className="text-[14px] text-black/55 lg:text-[20px]">Telefone</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-3 h-11 w-full rounded-full border border-black/20 px-5 text-[14px] outline-none focus:border-black lg:mt-5 lg:h-12 lg:text-base"
              />
            </label>

            <label className="block">
              <span className="text-[14px] text-black/55 lg:text-[20px]">E-mail</span>
              <input
                value={me?.email ?? ''}
                readOnly
                className="mt-3 h-11 w-full rounded-full border border-black/20 bg-black/[0.03] px-5 text-[14px] outline-none lg:mt-5 lg:h-12 lg:text-base"
              />
              <span className="mt-2 block text-[12px] text-black/45">O e-mail não pode ser alterado.</span>
            </label>

            <label className="block">
              <span className="text-[14px] text-black/55 lg:text-[20px]">CPF</span>
              <input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="mt-3 h-11 w-full rounded-full border border-black/20 px-5 text-[14px] outline-none focus:border-black lg:mt-5 lg:h-12 lg:text-base"
              />
            </label>
          </div>

          {saveMsg && (
            <p className={`mt-5 text-sm font-semibold ${saveMsg.type === 'success' ? 'text-[#10a545]' : 'text-[#ff3333]'}`}>
              {saveMsg.text}
            </p>
          )}

          <div className="mt-6 space-y-3 lg:mt-10">
            <button
              type="button"
              onClick={() => navigate('/change-password')}
              className="h-12 w-full rounded-full border border-black/20 text-[13px] font-bold uppercase tracking-widest text-black transition hover:border-black lg:h-[62px] lg:rounded-[16px] lg:text-[16px]"
            >
              Alterar Senha
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-12 w-full rounded-full bg-black text-[13px] font-bold uppercase tracking-widest text-white transition hover:bg-black/85 disabled:bg-black/40 lg:h-[62px] lg:rounded-[16px] lg:text-[18px]"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      )}
    </AccountLayout>
  );
};

export default MyAccountPage;
