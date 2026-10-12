import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { logout } from '../../redux/features/authSlice';
import usePosts from '../../hooks/usePosts';
import useAxiosSecure from '../../hooks/useAxiosSecure';

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

  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <h3 className="text-lg font-semibold opacity-90">Total Posts</h3>
          <p className="text-4xl font-extrabold mt-2">{posts.length}</p>
        </div>

        {/* 🚀 Total Views Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Total Views</h3>
            <p className="text-4xl font-extrabold text-indigo-600 mt-2">{totalViews}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Categories</h3>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">{uniqueCategories}</p>
          </div>
        </div>

        {/* 🚀 Adsterra Earnings Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-500">Ad Earnings</h3>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Adsterra</span>
          </div>
          <a
            href="https://beta.publishers.adsterra.com/stats"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full text-center bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Check Revenue
          </a>
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
                  <th className="p-4 font-semibold text-center">Views</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {posts.map((post) => (
                  <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-indigo-900">{post.title}</td>
                    <td className="p-4"><span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{post.category}</span></td>
                    {/* 🚀 Show Post Views */}
                    <td className="p-4 text-center font-bold text-indigo-600 bg-indigo-50/50">
                      {post.views || 0}
                    </td>
                    <td className="p-4">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <Link
                        to={`/admin/edit-post/${post._id}`}
                        className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Delete
                      </button>
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