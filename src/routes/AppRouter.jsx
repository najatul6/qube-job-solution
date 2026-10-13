import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/Layout';

// 🚀 Lazy Loading Imports (শুধু দরকারী পেজ লোড হবে)
const Home = React.lazy(() => import('../pages/Home'));
const BlogPost = React.lazy(() => import('../pages/BlogPost'));
const Login = React.lazy(() => import('../pages/Login'));
const Dashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const CreatePost = React.lazy(() => import('../pages/admin/CreatePost'));
const EditPost = React.lazy(() => import('../pages/admin/EditPost'));
const Category = React.lazy(() => import('../pages/Category'));

// Loading Spinner Component (পেজ লোড হওয়ার সময় দেখাবে)
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-gray-50">
    <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-indigo-600"></div>
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Suspense র‍্যাপার পেজ লোড হওয়ার সময় PageLoader দেখাবে */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/post/:id" element={<Layout><BlogPost /></Layout>} />
          <Route path="/category/:categoryName" element={<Layout><Category /></Layout>} />
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Private Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute><AdminLayout><Dashboard /></AdminLayout></PrivateRoute>}
          />
          <Route
            path="/admin/create-post"
            element={<PrivateRoute><AdminLayout><CreatePost /></AdminLayout></PrivateRoute>}
          />
          <Route
            path="/admin/edit-post/:id"
            element={<PrivateRoute><AdminLayout><EditPost /></AdminLayout></PrivateRoute>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;