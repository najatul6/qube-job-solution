import { useState, useEffect } from 'react';
import axios from 'axios'; // Base URL কনফিগার করা থাকলে শুধু '/api/categories' কল করবেন

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // সব ক্যাটাগরি ফেচ করা
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // নতুন ক্যাটাগরি তৈরি করা
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/categories', { name });
      setName(''); // ইনপুট ক্লিয়ার
      fetchCategories(); // লিস্ট আপডেট
      alert('Category added successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ক্যাটাগরি ডিলিট করা
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category', error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

      {/* Add Category Form */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name (e.g., Govt Jobs)"
          className="flex-1 p-2 border rounded focus:outline-none focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="flex justify-between items-center p-4 border rounded bg-gray-50">
            <div>
              <p className="font-semibold">{cat.name}</p>
              <p className="text-xs text-gray-500">/{cat.slug}</p>
            </div>
            <button
              onClick={() => handleDelete(cat._id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;