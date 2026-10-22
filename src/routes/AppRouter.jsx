import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/Layout';
import ErrorPage from '../pages/ErrorPage';

const Home = React.lazy(() => import('../pages/Home'));
const BlogPost = React.lazy(() => import('../pages/BlogPost'));
const Login = React.lazy(() => import('../pages/Login'));
const Dashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const CreatePost = React.lazy(() => import('../pages/admin/CreatePost'));
const CategoryManager = React.lazy(() => import('../pages/admin/CategoryManager'));
const PostManager = React.lazy(() => import('../pages/admin/PostManager'));
const EditPost = React.lazy(() => import('../pages/admin/EditPost'));
const Category = React.lazy(() => import('../pages/Category'));
const Contact = React.lazy(() => import('../pages/Contact'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));
const About = React.lazy(() => import('../pages/About'));
const Terms = React.lazy(() => import('../pages/Terms'));
const Disclaimer = React.lazy(() => import('../pages/Disclaimer'));

const PageLoader = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
    
    {/* Animated Qube Logo */}
    <div className="relative flex h-24 w-24 items-center justify-center">
      {/* Outer rotating border */}
      <div className="absolute h-full w-full animate-[spin_3s_linear_infinite] rounded-2xl border-4 border-indigo-200/50"></div>
      
      {/* Inner reverse rotating solid cube */}
      <div className="absolute h-14 w-14 animate-[spin_2s_linear_infinite_reverse] rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-200"></div>
      
      {/* Center  Logo*/}
      <span className="z-10 text-3xl font-extrabold text-white">Q</span>
    </div>
    
    {/* Brand Name & Loading Text */}
    <div className="mt-10 flex flex-col items-center space-y-3">
      <h2 className="text-xl md:text-2xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 animate-pulse">
        QUBE JOB
      </h2>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
    
  </div>
);


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/post/:id" element={<Layout><BlogPost /></Layout>} />
          <Route path="/category/:categoryName" element={<Layout><Category /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/terms-conditions" element={<Layout><Terms /></Layout>} />
          <Route path="/disclaimer" element={<Layout><Disclaimer /></Layout>} />


          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Private Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute><AdminLayout><Dashboard /></AdminLayout></PrivateRoute>}
          />
          <Route
            path="/admin/categories"
            element={<PrivateRoute><AdminLayout><CategoryManager /></AdminLayout></PrivateRoute>}
          />
          <Route
            path="/admin/create-post"
            element={<PrivateRoute><AdminLayout><CreatePost /></AdminLayout></PrivateRoute>}
          />
          <Route
            path="/admin/posts"
            element={<PrivateRoute><AdminLayout><PostManager /></AdminLayout></PrivateRoute>}
          />
          <Route
            path="/admin/edit-post/:id"
            element={<PrivateRoute><AdminLayout><EditPost /></AdminLayout></PrivateRoute>}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;