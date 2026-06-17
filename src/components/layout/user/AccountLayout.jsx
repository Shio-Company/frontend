import { Link, useLocation, useNavigate } from 'react-router-dom';
import PublicLayout from '../public/PublicLayout';
import { Icon } from '../../ui/ShioDesign';
import { clearAuthTokens } from '../../../lib/authToken';

const navItems = [
  { label: 'Meus Dados', to: '/my-account', icon: 'users' },
  { label: 'Meus pedidos', to: '/my-orders', icon: 'box' },
  { label: 'Endereços', to: '/addresses', icon: 'tag' },
];

export default function AccountLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthTokens();
    navigate('/');
  };

  return (
    <PublicLayout showNewsletter={false}>
      <section className="mx-auto grid max-w-[1240px] gap-12 px-6 py-16 lg:grid-cols-[255px_1fr]">
        <aside className="space-y-5">
          {navItems.map((item) => {
            const active = pathname === item.to || (item.to === '/my-orders' && pathname.startsWith('/my-orders'));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex h-14 items-center gap-5 rounded-[16px] border px-5 text-[20px] ${active ? 'border-black/25 bg-[#f0f0f0] text-black' : 'border-transparent text-black hover:bg-[#f7f7f7]'}`}
              >
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-56">
            <div className="border-t border-black/15 pt-6">
              <Link to="/" className="flex h-12 items-center gap-5 text-[18px] text-black">
                <Icon name="arrowLeft" className="h-5 w-5" />
                Voltar para Loja
              </Link>
              <button onClick={handleLogout} className="mt-3 flex h-12 items-center gap-5 text-[18px] text-[#ff3333]">
                <Icon name="logout" className="h-5 w-5" />
                Sair
              </button>
            </div>
          </div>
        </aside>

        <div>{children}</div>
      </section>
    </PublicLayout>
  );
}
