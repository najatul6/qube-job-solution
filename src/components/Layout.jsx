import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Main Feed Content (70%) */}
        <main className="w-full md:w-2/3">
          {children}
        </main>

        {/* Sidebar area for Ads and Job Alerts (30%) */}
        <aside className="w-full md:w-1/3">
          <Sidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;