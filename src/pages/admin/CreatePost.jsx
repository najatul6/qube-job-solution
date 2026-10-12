import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Networking',
    snippet: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // useAxiosSecure ব্যবহার করায় টোকেন অটোমেটিক হেডারে চলে যাবে
      await axiosSecure.post('/api/posts', formData);
      
      setMessage({ type: 'success', text: 'Post created successfully!' });
      setFormData({ title: '', category: 'Networking', snippet: '', content: '' });
      
      // ২ সেকেন্ড পর ড্যাশবোর্ডে নিয়ে যাবে
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to create post.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900">Create New Note</h2>
        <p className="text-gray-500 mt-1">Write your markdown content below. It will automatically be formatted on the post details page.</p>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-xl font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="e.g. OSI Model Explained"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white"
            >
              <option value="Networking">Networking</option>
              <option value="DBMS">DBMS</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Job Circulars">Job Circulars</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Short Snippet (For Home Page)</label>
          <textarea
            name="snippet"
            required
            rows="2"
            value={formData.snippet}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="A short summary of the note..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Content (Markdown Supported)</label>
          <textarea
            name="content"
            required
            rows="12"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-gray-50 focus:bg-white font-mono text-sm"
            placeholder="Write your note here using Markdown (e.g. ## Heading, **bold**, `code`)..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
        >
          {loading ? 'Publishing...' : 'Publish Note'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;