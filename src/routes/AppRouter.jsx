import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BlogPost from '../pages/BlogPost';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import AdminLayout from '../components/AdminLayout';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/admin/Dashboard';

const AppRouter = () => {
  return (
      <BrowserRouter>
      <Routes>
        {/* Public Routes (With Ads & Standard Navbar/Sidebar) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/post/:id" element={<Layout><BlogPost /></Layout>} />
        
        {/* 🚀 Standalone Login Route (Layout ছাড়া সম্পূর্ণ ক্লিন) */}
        <Route path="/login" element={<Login />} />
        
        {/* Private Admin Routes (Ad-Free, Clean Workspace) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;