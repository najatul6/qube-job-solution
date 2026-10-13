import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // মেনু আইটেমগুলো একটা অ্যারেতে রাখলে কোড ক্লিন থাকে
  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Govt Jobs', path: '/category/govt-jobs' },
    { title: 'IT/Private Jobs', path: '/category/private-jobs' },
    { title: 'Tech Notes', path: '/category/tech-notes' },
    { title: 'Study Material', path: '/category/study-material' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-700 tracking-tight">
          Qube <span className="text-gray-800">Job Solution</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium text-gray-600 items-center">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="hover:text-indigo-600 transition-colors">
              {item.title}
            </Link>
          ))}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors border" title="Toggle Dark Mode">
             🌙 
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-600 hover:text-indigo-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => setIsOpen(false)} 
            >
              {item.title}
            </Link>
          ))}
          <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
             🌙 Dark Mode
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;