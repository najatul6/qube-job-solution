import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BlogPost from '../pages/BlogPost';
import Layout from '../components/Layout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/post/:id" element={<BlogPost />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;