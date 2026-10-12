import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';

const AdminLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex bg-gray-100 font-sans text-gray-800">
            {/* Admin Sidebar (No Ads Here) */}
            <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl">
                <div className="p-6 text-2xl font-extrabold border-b border-indigo-800 tracking-wider">
                    Qube<span className="text-indigo-400">Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 font-medium">
                    <Link to="/admin/dashboard" className="block p-3 rounded-xl bg-indigo-800/50 hover:bg-indigo-700 transition-colors">
                        📊 Dashboard
                    </Link>
                    <Link to="/admin/create-post" className="block p-3 rounded-xl hover:bg-indigo-800 transition-colors">
                        ✍️ Create Post
                    </Link>
                    <Link to="/" target="_blank" className="block p-3 rounded-xl hover:bg-indigo-800 transition-colors">
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

            {/* Main Admin Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;