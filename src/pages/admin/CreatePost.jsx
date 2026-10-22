import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '', 
    snippet: '',
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  });
  
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new_category') {
      setIsAddingNewCategory(true);
      setFormData({ ...formData, category: '' }); 
    } else {
      setFormData({ ...formData, category: value });
    }
  };

  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) return;
    setCategoryLoading(true);
    
    try {
      const { data } = await axiosSecure.post('/api/categories', { name: newCategoryName });
      
      setCategories([data.category, ...categories]); 
      setFormData({ ...formData, category: data.category.slug });
      
      setNewCategoryName('');
      setIsAddingNewCategory(false);
    } catch (error) {
      console.error("Error adding category:", error);
      alert(error.response?.data?.error || "Failed to add category");
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || content === '<p><br></p>') {
      return setMessage({ type: 'error', text: 'Post content cannot be empty!' });
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const finalData = { ...formData, content };

    try {
      await axiosSecure.post('/api/posts', finalData);
      setMessage({ type: 'success', text: 'Post created successfully!' });

      setFormData({
        title: '', category: '', snippet: '',
        metaTitle: '', metaDescription: '', keywords: ''
      });
      setContent('');

      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to create post.' });
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axiosSecure.get('/api/categories');
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Category fetch error:", error);
        setCategories([]);
      }
    };
    getCategories();
  }, [axiosSecure]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900">Create New Post</h2>
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
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white" />
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm">Category</label>
            
            {!isAddingNewCategory ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white cursor-pointer"
                required
              >
                <option value="" disabled>Select a category</option>
                {Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
                <option value="add_new_category" className="font-bold text-indigo-600 bg-indigo-50">
                  + Add New Category...
                </option>
              </select>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Govt Jobs"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-300 focus:border-indigo-500 outline-none bg-white"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  disabled={categoryLoading}
                  className="whitespace-nowrap px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50"
                >
                  {categoryLoading ? '...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNewCategory(false);
                    setNewCategoryName('');
                  }}
                  className="whitespace-nowrap px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Short Snippet</label>
          <textarea name="snippet" required rows="2" value={formData.snippet} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white"></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Content</label>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:border-indigo-500">
            <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} className="h-64" />
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-gray-100">
          <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
            🚀 SEO & Meta Data
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
              <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
              <textarea name="metaDescription" rows="2" value={formData.metaDescription} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Keywords</label>
              <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all mt-6">
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;