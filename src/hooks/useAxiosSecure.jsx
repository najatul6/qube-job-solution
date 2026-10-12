import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Request Interceptor
    axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // Response Interceptor
    axiosSecure.interceptors.response.use(function (response) {
      return response;
    }, async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        dispatch(logout()); 
        localStorage.removeItem('access-token');
        navigate('/login'); 
      }
      return Promise.reject(error);
    });
  }, [navigate, dispatch]);

  return axiosSecure;
};

export default useAxiosSecure;