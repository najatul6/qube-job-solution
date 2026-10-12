import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout'; // আপনার লেআউটের পাথ অনুযায়ী ঠিক করে নেবেন
import Home from '../pages/Home';
import BlogPost from '../pages/BlogPost';

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