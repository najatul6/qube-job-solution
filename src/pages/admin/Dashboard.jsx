import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/authSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 font-medium">Welcome back, <span className="text-indigo-600">{user?.email || 'Admin'}</span></p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-linear-to from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-semibold opacity-90">Total Posts</h3>
            <p className="text-4xl font-extrabold mt-2">12</p>
          </div>
          <svg className="absolute -right-5 -bottom-5 w-32 h-32 text-white opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Categories</h3>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">4</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Total Views</h3>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">1.2k</p>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-800">Manage Content</h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95">
            + Create New Post
          </button>
        </div>
        
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <p className="text-gray-500 font-medium">No posts managed yet. Click "Create New Post" to add one.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;