import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BlogPost from '../pages/BlogPost';
import Layout from '../components/Layout';
import Login from '../pages/Login';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/post/:id" element={<BlogPost />} />

          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;