import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // অ্যাকটিভ এবং ইন-অ্যাকটিভ লিংকের ডিজাইন
  const navClass = ({ isActive }) => 
    `block p-3 rounded-xl transition-all font-bold ${
      isActive 
        ? 'bg-indigo-700 text-white shadow-inner' 
        : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
    }`;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 font-sans text-gray-800">
      
      <aside className="w-64 flex-shrink-0 bg-indigo-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-extrabold border-b border-indigo-800 tracking-wider">
          Qube<span className="text-indigo-400">Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto mt-2">
          <NavLink end to="/admin/dashboard" className={navClass}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/create-post" className={navClass}>
            ✍️ Create Post
          </NavLink>
          
          {/* ওয়েবসাইটের লিংকে NavLink দরকার নেই কারণ এটি অন্য ট্যাবে ওপেন হবে */}
          <Link to="/" target="_blank" className="block p-3 rounded-xl text-indigo-200 hover:bg-indigo-800 hover:text-white transition-all font-bold mt-8 border border-indigo-800">
            🌐 View Website
          </Link>
        </nav>
        
        <div className="p-4 border-t border-indigo-800">
          <button 
            onClick={handleLogout} 
            className="w-full bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white p-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            Logout
          </button>
        </div>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;