import Navbar from './Navbar';
import Footer from '../shared/Footer';

const PublicLayout = ({ children, showNewsletter = true }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-shio-gray">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer showNewsletter={showNewsletter} />
    </div>
  );
};

export default PublicLayout;
