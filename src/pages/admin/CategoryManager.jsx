import { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const axiosSecure = useAxiosSecure();

  const fetchCategories = async () => {
    try {
      const { data } = await axiosSecure.get('/api/categories');
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [axiosSecure]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axiosSecure.post('/api/categories', { name });
      setName('');
      fetchCategories(); 
      setMessage({ type: 'success', text: 'Category added successfully!' });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to add category' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      try {
        await axiosSecure.delete(`/api/categories/${id}`);
        fetchCategories(); 
      } catch (error) {
        alert('Error deleting category');
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900">Manage Categories</h2>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-xl font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* Category Form */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-10">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name (e.g., Tech Notes)"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-8 rounded-xl transition-all whitespace-nowrap"
        >
          {loading ? 'Adding...' : '+ Add Category'}
        </button>
      </form>

      <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 font-bold text-gray-700">Category Name</th>
              <th className="py-4 px-6 font-bold text-gray-700">URL Slug</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-8 text-center text-gray-500 font-medium">
                  No categories found. Add your first category above!
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">{cat.name}</td>
                  <td className="py-4 px-6 text-gray-500 font-mono text-sm">/{cat.slug}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(cat._id, cat.name)}
                      className="text-red-500 hover:text-white hover:bg-red-500 font-bold px-4 py-2 rounded-lg transition-colors border border-red-100 hover:border-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManager;