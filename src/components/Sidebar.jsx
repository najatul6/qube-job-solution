import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts'; 
import AdBanner from './AdBanner';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Sidebar = () => {
  const [posts, isLoading] = usePosts();
  const axiosPublic = useAxiosPublic(); 
  
  const [categories, setCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosPublic.get('/api/categories');
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsCategoryLoading(false);
      }
    };
    fetchCategories();
  }, [axiosPublic]); 

  const categoryCounts = posts?.reduce((acc, post) => {
    const catSlug = post.category;
    if (catSlug) {
      acc[catSlug] = (acc[catSlug] || 0) + 1;
    }
    return acc;
  }, {}) || {};

  const visibleCategories = categories.filter(cat => categoryCounts[cat.slug] > 0);

  return (
    <div className="space-y-6 sticky top-24">
      {/* 300x250 Adsterra Ad Placeholder */}
      <div className="w-full bg-gray-50 border border-gray-100 flex items-center justify-center rounded-2xl transition-colors duration-300">
        <AdBanner width={300} height={250} dataKey="6878e4f6deff8322987aee6bf34bb3a6" />
      </div>

      {/* Dynamic Categories Widget */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-colors duration-300">
        <h3 className="text-lg font-extrabold text-gray-900 mb-4 border-b border-gray-100 pb-3">
          Categories
        </h3>

        {isLoading || isCategoryLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
          </div>
        ) : visibleCategories.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-2">No categories found.</p>
        ) : (
          <ul className="space-y-3 text-gray-600 font-medium">
            {/* 🚀 categories.map এর বদলে visibleCategories.map ব্যবহার করা হচ্ছে */}
            {visibleCategories.map((cat) => {
              const count = categoryCounts[cat.slug]; 

              return (
                <li key={cat._id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-indigo-600 flex justify-between items-center transition-all group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                      {cat.name}
                    </span>
                    <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full text-xs font-bold">
                      {count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;