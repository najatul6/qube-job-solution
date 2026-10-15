import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const axiosPublic = useAxiosPublic(); // 🚀 হুক ইনিশিয়ালাইজ করা হলো
  
  const [categories, setCategories] = useState([]);

  // 🚀 ডাটাবেজ থেকে ক্যাটাগরি ফেচ করা (পাবলিক API দিয়ে)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosPublic.get('/api/categories');
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories for navbar:", error);
      }
    };
    fetchCategories();
  }, [axiosPublic]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-700 tracking-tight">
            Qube <span className="text-gray-800">Job Solution</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium text-gray-600 items-center">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            
            {/* Dynamic Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors focus:outline-none pb-1">
                Categories
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Box */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 z-50">
                {categories.length === 0 ? (
                  <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
                ) : (
                  categories.map((cat) => (
                    <Link 
                      key={cat._id} 
                      to={`/category/${cat.slug}`} 
                      className="block px-5 py-2.5 text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))
                )}
              </div>
            </div>

            <Link to="/about" className="hover:text-indigo-600 transition-colors">
              About Us
            </Link>
            <Link to="/privacy-policy" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-1"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================
          Animated Mobile Sidebar (Off-canvas)
          ========================================= */}

      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <span className="text-xl font-bold text-indigo-700 tracking-tight">
            Qube <span className="text-gray-800">Job</span>
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
          <Link
            to="/"
            className="block px-4 py-3 rounded-xl text-base font-bold text-gray-800 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Home
          </Link>
          
          {/* Mobile Categories Section */}
          <div className="pt-3 pb-1">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              All Categories
            </p>
            <div className="space-y-1 pl-3 border-l-2 border-indigo-100 ml-4">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className="block px-4 py-3 rounded-xl text-base font-bold text-gray-800 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;