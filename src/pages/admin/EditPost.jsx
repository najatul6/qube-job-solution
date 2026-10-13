import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Govt Jobs',
    snippet: '',
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  });
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axiosSecure.get(`/api/posts/${id}`);
        const data = res.data;
        
        setFormData({
          title: data.title || '',
          category: data.category || 'Govt Jobs',
          snippet: data.snippet || '',
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          keywords: data.keywords || ''
        });
        setContent(data.content || '');
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to fetch post details.' });
      } finally {
        setFetching(false);
      }
    };
    fetchPostData();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      await axiosSecure.put(`/api/posts/${id}`, finalData); // PUT রিকোয়েস্ট আপডেটের জন্য
      setMessage({ type: 'success', text: 'Post updated successfully!' });
      
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update post.' });
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

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900">Edit Post</h2>
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
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none">
              <option value="Govt Jobs">Govt Jobs</option>
              <option value="IT-Private Jobs">IT/Private Jobs</option>
              <option value="Tech Notes">Tech Notes</option>
              <option value="Study Material">Study Material</option>
            </select>
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
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;