import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 🚀 Dark Mode State (Local Storage থেকে চেক করবে আগে কী সেভ করা ছিল)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || false
  );

  // 🚀 ডার্ক মোড টগল হলে HTML ট্যাগে 'dark' ক্লাস অ্যাড/রিমুভ করবে
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Govt Jobs', path: '/category/govt-jobs' },
    { title: 'IT/Private Jobs', path: '/category/it-private-jobs' },
    { title: 'Tech Notes', path: '/category/tech-notes' },
    { title: 'Study Material', path: '/category/study-material' },
    { title: 'Contact', path: '/contact' }
  ];

  // রাউট চেঞ্জ হলে (অন্য পেজে গেলে) সাইডবার অটোমেটিক বন্ধ হয়ে যাবে
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // সাইডবার ওপেন থাকলে পেজের ব্যাকগ্রাউন্ড স্ক্রোল হওয়া বন্ধ করবে (Professional UX)
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
          <div className="hidden md:flex gap-6 font-medium text-gray-600 items-center">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} className="hover:text-indigo-600 transition-colors">
                {item.title}
              </Link>
            ))}
            {/* <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border dark:border-gray-700"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button> */}
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
          🚀 Animated Mobile Sidebar (Off-canvas)
          ========================================= */}

      {/* 1. Dark Overlay (পেছনের কালো শ্যাডো) */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsOpen(false)} // বাইরে ক্লিক করলে বন্ধ হবে
      ></div>

      {/* 2. Sliding Sidebar (বাম থেকে ডানে আসবে) */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
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
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Sidebar Footer / Action Area */}
        {/* <div className="p-5 border-t bg-gray-50 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl text-base font-medium text-gray-700 hover:text-indigo-600 hover:shadow-sm transition-all border border-gray-200">
            🌙 Switch to Dark Mode
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;