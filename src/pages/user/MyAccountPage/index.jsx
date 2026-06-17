import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountLayout from '../../../components/layout/user/AccountLayout';
import { PageMarker } from '../../../components/ui/ShioDesign';
import { useApi } from '../../../hooks/useApi';
import { getAccessToken } from '../../../lib/authToken';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const MyAccountPage = () => {
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
          className="rounded-[18px] border border-black/20 p-8 md:p-12"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-x-20 gap-y-8 md:grid-cols-2">
            <label className="block">
              <span className="text-[20px] text-black/55">Nome Completo</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-5 h-12 w-full rounded-full border border-black/20 px-5 outline-none focus:border-black"
              />
            </label>

            <label className="block">
              <span className="text-[20px] text-black/55">E-mail</span>
              <input
                value={me?.email ?? ''}
                readOnly
                className="mt-5 h-12 w-full rounded-full border border-black/20 bg-black/[0.03] px-5 outline-none"
              />
              <span className="mt-3 block text-sm text-black/45">O e-mail nao pode ser alterado.</span>
            </label>

            <label className="block">
              <span className="text-[20px] text-black/55">
                Telefone <span className="text-[#ff3333]">*</span>
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-5 h-12 w-full rounded-full border border-black/20 px-5 outline-none focus:border-black"
              />
            </label>

            <label className="block">
              <span className="text-[20px] text-black/55">
                CPF <span className="text-[#ff3333]">*</span>
              </span>
              <input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="mt-5 h-12 w-full rounded-full border border-black/20 px-5 outline-none focus:border-black"
              />
            </label>
          </div>

          {saveMsg && (
            <p className={`mt-6 text-sm font-semibold ${saveMsg.type === 'success' ? 'text-[#10a545]' : 'text-[#ff3333]'}`}>
              {saveMsg.text}
            </p>
          )}

          <div className="mt-10">
            <button
              type="submit"
              disabled={saving}
              className="h-[62px] w-full rounded-[16px] bg-black text-[18px] font-bold uppercase text-white disabled:bg-black/40 md:w-auto md:px-16"
            >
              {saving ? 'Salvando...' : 'Salvar alteracoes'}
            </button>
          </div>
        </form>
      )}
    </AccountLayout>
  );
};

export default MyAccountPage;
