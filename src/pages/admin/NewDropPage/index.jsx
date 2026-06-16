import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const NewDropPage = () => {
  return (
    <div>
      <PageMarker name="NewDropPage" />
      <AdminTitle
        title="Novo Drop"
        action={<BlackButton>Salvar drop</BlackButton>}
      />

      <AdminPanel className="max-w-[900px] p-8">
        <div className="grid gap-8">
          <label>
            <span className="text-[20px] text-black/55">Nome do drop</span>
            <input className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black" />
          </label>
          <label>
            <span className="text-[20px] text-black/55">Descricao</span>
            <textarea className="mt-4 min-h-[150px] w-full rounded-[18px] border border-black/20 px-5 py-4 text-[18px] outline-none focus:border-black" />
          </label>
          <div className="grid gap-8 md:grid-cols-2">
            <label>
              <span className="text-[20px] text-black/55">Data de lancamento</span>
              <input className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black" />
            </label>
            <label>
              <span className="text-[20px] text-black/55">Visibilidade</span>
              <select className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black">
                <option>Publica</option>
                <option>Rascunho</option>
              </select>
            </label>
          </div>
          <button className="flex h-20 items-center justify-center gap-3 rounded-[18px] border border-dashed border-black/25 text-[18px] font-semibold text-black/55">
            <Icon name="plus" className="h-5 w-5" />
            Gerenciar produtos do drop
          </button>
        </div>
      </AdminPanel>
    </div>
  );
};

export default NewDropPage;
