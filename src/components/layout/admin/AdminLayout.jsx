import React from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../shared/Footer';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="flex-grow p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
