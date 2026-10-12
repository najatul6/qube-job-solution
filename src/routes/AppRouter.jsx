import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        
        {/* পাবলিক রাউটস (যেগুলো সবাই দেখবে) */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        
        {/* অ্যাডমিন লগিন পেজ (লগিন পেজে সাইডবার বা লেআউট দরকার নেই) */}
        <Route path="/login" element={<Login />} />

        {/* প্রাইভেট/অ্যাডমিন রাউটস (শুধু অ্যাডমিন দেখবে) */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
};

export default AppRouter;