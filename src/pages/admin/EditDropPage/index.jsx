import { AdminPanel, AdminTitle, BlackButton, Icon, PageMarker } from '../../../components/ui/ShioDesign';

const EditDropPage = () => {
  return (
    <div>
      <PageMarker name="EditDropPage" />
      <AdminTitle
        title="Editar Drop"
        action={<BlackButton>Atualizar</BlackButton>}
      />

      <AdminPanel className="max-w-[900px] p-8">
        <div className="grid gap-8">
          <label>
            <span className="text-[20px] text-black/55">Nome do drop</span>
            <input defaultValue="Drop Grace" className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black" />
          </label>
          <label>
            <span className="text-[20px] text-black/55">Descricao</span>
            <textarea defaultValue="Lancamento exclusivo com edicao limitada de pecas Shio." className="mt-4 min-h-[150px] w-full rounded-[18px] border border-black/20 px-5 py-4 text-[18px] outline-none focus:border-black" />
          </label>
          <div className="grid gap-8 md:grid-cols-2">
            <label>
              <span className="text-[20px] text-black/55">Data de lancamento</span>
              <input defaultValue="20 Jun 2026" className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black" />
            </label>
            <label>
              <span className="text-[20px] text-black/55">Visibilidade</span>
              <select defaultValue="Publica" className="mt-4 h-12 w-full rounded-full border border-black/20 px-5 text-[18px] outline-none focus:border-black">
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

export default EditDropPage;
