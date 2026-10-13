import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // 🚀 Redux Hooks
import { toggleTheme } from '../redux/features/themeSlice'; // 🚀 Redux Action

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 🚀 Redux থেকে থিমের স্টেট এবং ডিসপ্যাচ নিয়ে আসছি
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // Redux স্টেট চেঞ্জ হলে HTML ট্যাগে dark ক্লাস অ্যাড বা রিমুভ করবে
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Govt Jobs', path: '/category/govt-jobs' },
    { title: 'IT/Private Jobs', path: '/category/private-jobs' },
    { title: 'Tech Notes', path: '/category/tech-notes' },
    { title: 'Study Material', path: '/category/study-material' },
    { title: 'Contact', path: '/contact' }
  ];

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
      <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm sticky top-0 z-40 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          
          <Link to="/" className="text-2xl font-bold text-indigo-700 dark:text-indigo-500 tracking-tight">
            Qube <span className="text-gray-800 dark:text-gray-200">Job Solution</span>
          </Link>

          <div className="hidden md:flex gap-6 font-medium text-gray-600 dark:text-gray-300 items-center">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {item.title}
              </Link>
            ))}
            
            {/* 🚀 Redux Dispatch দিয়ে ডার্ক মোড টগল করা হচ্ছে */}
            <button 
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border dark:border-gray-700" 
              title="Toggle Dark Mode"
            >
               {isDarkMode ? '☀️' : '🌙'} 
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             {/* 🚀 Mobile Dark Mode Button */}
             <button 
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
               {isDarkMode ? '☀️' : '🌙'} 
            </button>

            <button 
              onClick={() => setIsOpen(true)} 
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 focus:outline-none p-1"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[50] transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)} 
      ></div>

      {/* Sliding Sidebar */}
      <div 
        className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-800">
          <span className="text-xl font-bold text-indigo-700 dark:text-indigo-500 tracking-tight">
            Qube <span className="text-gray-800 dark:text-gray-200">Job</span>
          </span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;