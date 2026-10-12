import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import usePost from '../../hooks/usePost';

const EditPost = () => {
  const { id } = useParams();
  const [post, isLoading] = usePost(id); 
  const [formData, setFormData] = useState({ title: '', category: '', snippet: '', content: '' });
  const [saving, setSaving] = useState(false);
  
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // যখন post ডেটা আসবে, তখন ফর্মে সেট করবে
  useEffect(() => {
    if (post && post.title) {
      setFormData({
        title: post.title,
        category: post.category,
        snippet: post.snippet,
        content: post.content
      });
    }
  }, [post]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 🚀 আপডেট করার API (backend-এ বানাতে হবে)
      await axiosSecure.put(`/api/posts/${id}`, formData);
      toast.success('Post updated successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update post.');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center font-bold">Loading Post Data...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900">Edit Note</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 outline-none transition-all">
              <option value="Networking">Networking</option>
              <option value="DBMS">DBMS</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Job Circulars">Job Circulars</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Short Snippet</label>
          <textarea name="snippet" required rows="2" value={formData.snippet} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 outline-none transition-all"></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Content</label>
          <textarea name="content" required rows="12" value={formData.content} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 outline-none transition-all font-mono text-sm"></textarea>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md">
            {saving ? 'Saving Changes...' : 'Update Note'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 px-8 rounded-xl transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;