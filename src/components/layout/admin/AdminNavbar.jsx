import { useLocation } from 'react-router-dom';
import logo from '../../../assets/logo/logo.svg';

function getPageTitle(pathname) {
  const pathParts = pathname.split('/').filter(p => p);

  const defaultTitle = 'Painel';

  if (pathParts.length < 2 || pathParts[0] !== 'admin') {
    return defaultTitle;
  }

  const pageSlug = pathParts[1];
  const hasId = pathParts.length > 2 && !isNaN(parseInt(pathParts[2], 10));

  const titles = {
    'dashboard': 'Painel',
    'products': 'Produtos',
    'new-drop': 'Novo Drop',
    'edit-drop': 'Editar Drop',
    'drops': 'Drops',
    'customers': 'Clientes',
  };

  if (pageSlug === 'drops' && hasId) {
    return 'Detalhes do Drop';
  }

  return titles[pageSlug] || defaultTitle;
}

export default function AdminNavbar() {
  const { pathname } = useLocation();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="w-full bg-white border-b border-gray-300 flex items-stretch h-24 font-sans">
      
      {/* Área da Logo / Topo da Sidebar */}
      <div className="w-[240px] md:w-[280px] border-r border-gray-300 flex flex-col items-center justify-center shrink-0">
        
        {/* Container da Logo */}
        <div className="flex flex-col items-center cursor-pointer">
          <img src={logo} alt="Shio Logo" className="w-[100px] h-auto" />
        </div>
        
        {/* Label ADMIN */}
        <span className="mt-1 text-[11px] font-medium tracking-[0.15em] text-black uppercase">
          Admin
        </span>
      </div>

      {/* Área Principal / Breadcrumbs */}
      <div className="flex-1 flex items-center px-8 md:px-12">
        <nav className="text-[15px] flex items-center">
          {/* Item inativo/Pai */}
          <span className="text-gray-500 font-normal">Admin</span>
          
          {/* Separador */}
          <span className="text-gray-400 mx-2">/</span>
          
          {/* Item ativo/Atual */}
          <span className="text-gray-900 font-semibold">{pageTitle}</span>
        </nav>
      </div>

    </header>
  );
}