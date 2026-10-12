import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; // 🚀 SweetAlert Import
import usePosts from '../hooks/usePosts';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [posts, isLoading, refetch] = usePosts();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('You have been logged out.');
    navigate('/login');
  };

  // 🚀 SweetAlert 
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5', 
      cancelButtonColor: '#ef4444', 
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/api/posts/${id}`);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your note has been deleted.',
            icon: 'success',
            confirmButtonColor: '#4f46e5'
          });
          refetch(); 
        } catch (error) {
          toast.error("Failed to delete post.");
          console.error(error);
        }
      }
    });
  };

  if (isLoading) return <div className="p-10 text-center text-gray-500 font-bold">Loading Dashboard Data...</div>;

  const uniqueCategories = [...new Set(posts.map(post => post.category))].length;

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
          Logout
        </button>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <h3 className="text-lg font-semibold opacity-90">Total Posts</h3>
          <p className="text-4xl font-extrabold mt-2">{posts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Categories</h3>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">{uniqueCategories}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-500">System Status</h3>
            <p className="text-2xl font-bold text-green-500 mt-2">Active</p>
          </div>
        </div>
      </div>

      {/* Manage Content Table */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-800">Manage Content</h2>
          <Link to="/admin/create-post" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95">
            + Create New Post
          </Link>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-medium">
            No posts managed yet. Click "Create New Post" to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                  <th className="p-4 font-semibold rounded-tl-xl">Title</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {posts.map((post) => (
                  <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-indigo-900">{post.title}</td>
                    <td className="p-4"><span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{post.category}</span></td>
                    <td className="p-4">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 font-bold transition-colors">Edit</button>
                      <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-700 font-bold transition-colors">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;