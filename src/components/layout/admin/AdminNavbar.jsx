import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import logo from '../../../assets/logo/logo.svg';
import { Icon } from '../../ui/ShioDesign';

function getPageTitle(pathname) {
  if (pathname.includes('/admin/new-product')) return 'Produtos';
  if (pathname.includes('/admin/products')) return 'Produtos';
  if (pathname.includes('/admin/orders')) return 'Pedidos';
  if (pathname.includes('/admin/drops/') && !pathname.includes('/edit-drop')) return 'Detalhes do Drop';
  if (pathname.includes('/admin/new-drop')) return 'Novo Drop';
  if (pathname.includes('/admin/edit-drop')) return 'Editar Drop';
  if (pathname.includes('/admin/drops')) return 'Drops';
  if (pathname.includes('/admin/customers')) return 'Clientes';
  return 'Dashboard';
}

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: 'grid' },
  { label: 'Drops', to: '/admin/drops', icon: 'tag' },
  { label: 'Produtos', to: '/admin/products', icon: 'box' },
  { label: 'Pedidos', to: '/admin/orders', icon: 'bag' },
  { label: 'Clientes', to: '/admin/customers', icon: 'users' },
];

export default function AdminNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const pageTitle = getPageTitle(pathname);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <>
      <aside className="border-black/20 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-[290px] lg:border-r">
        <div className="flex h-[128px] flex-col items-center justify-center border-b border-black/20">
          <Link to="/admin/dashboard" className="flex flex-col items-center">
            <img src={logo} alt="Shio Logo" className="h-auto w-[92px]" />
            <span className="mt-2 text-[20px] font-medium uppercase text-black">Admin</span>
          </Link>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-5 py-6 lg:block lg:space-y-5 lg:overflow-visible">
          {navItems.map((item) => {
            const active = pathname === item.to || (item.to !== '/admin/dashboard' && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex h-14 min-w-max items-center gap-5 rounded-[16px] border px-5 text-[20px] ${active ? 'border-black/20 bg-[#f0f0f0]' : 'border-transparent hover:bg-[#f7f7f7]'}`}
              >
                <Icon name={item.icon} className={`h-5 w-5 ${active ? 'text-[#c5a100]' : 'text-black'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden px-5 lg:block lg:pt-44">
          <div className="border-t border-black/15 pt-6">
            <Link to="/" className="flex h-12 items-center gap-5 text-[18px] text-black">
              <Icon name="arrowLeft" className="h-5 w-5" />
              Voltar para Loja
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex h-12 items-center gap-5 text-[18px] text-[#ff3333]"
            >
              <Icon name="logout" className="h-5 w-5" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      <header className="border-b border-black/20 bg-white lg:ml-[290px]">
        <div className="flex h-[128px] items-center px-6 md:px-14">
          <nav className="text-[20px]">
            <span className="text-black/55">Admin</span>
            <span className="mx-2 text-black">/</span>
            <span className="font-semibold text-black">{pageTitle}</span>
          </nav>
        </div>
      </header>
    </>
  );
}
