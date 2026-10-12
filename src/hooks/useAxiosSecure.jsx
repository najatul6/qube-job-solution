import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // এখানেও সেইম বেইস ইউআরএল
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Request Interceptor: API কল করার ঠিক আগে অটোমেটিক টোকেন যুক্ত করে দেবে
    axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // Response Interceptor: ব্যাকএন্ড থেকে কোনো রেসপন্স আসার পর চেক করবে
    axiosSecure.interceptors.response.use(function (response) {
      return response;
    }, async (error) => {
      const status = error.response?.status;
      // টোকেন ইনভ্যালিড বা মেয়াদ শেষ হয়ে গেলে অটো লগআউট
      if (status === 401 || status === 403) {
        dispatch(logout()); // Redux থেকে লগআউট
        localStorage.removeItem('access-token'); // স্টোরেজ ক্লিয়ার
        navigate('/login'); // লগিন পেজে পাঠিয়ে দেওয়া
      }
      return Promise.reject(error);
    });
  }, [navigate, dispatch]);

  return axiosSecure;
};

export default useAxiosSecure;