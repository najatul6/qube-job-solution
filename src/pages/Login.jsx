import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/features/authSlice';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosPublic.post('/api/auth/login', {
        email,
        password
      });

      // লগিন সফল হলে টোকেন লোকাল স্টোরেজে সেভ করা
      const token = response.data.token;
      localStorage.setItem('access-token', token);

      // Redux স্টেট আপডেট করা
      dispatch(loginSuccess({ user: { email }, token }));
      toast.success('Login Successful! Welcome to Admin Panel.');
      setLoading(false);
      // লগিন শেষে অ্যাডমিন ড্যাশবোর্ডে পাঠিয়ে দেওয়া
      navigate('/admin/dashboard'); 
      
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || 'Login failed! Please check your credentials.');
      setError(err.response?.data?.message || 'Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="h-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">Sign in to manage your job portal</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white"
                placeholder="admin@qubejob.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;