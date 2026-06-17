import AdminNavbar from './AdminNavbar';
import Footer from '../shared/Footer';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white font-inter text-black">
      <AdminNavbar />
      <div className="lg:pl-[290px]">
        <main className="min-h-[900px] border-b border-black/10 px-4 py-6 md:px-14 md:py-12">
          {children}
        </main>
        <Footer showNewsletter={false} />
      </div>
    </div>
  );
};

export default AdminLayout;
