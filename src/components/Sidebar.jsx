import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts'; // 🚀 আমাদের বানানো হুক ইমপোর্ট

const Sidebar = () => {
  // 🚀 মাত্র এক লাইনে সব ডেটা এবং লোডিং স্টেট পেয়ে যাচ্ছি
  const [posts, isLoading] = usePosts();

  // কোন ক্যাটাগরিতে কয়টা পোস্ট আছে তা কাউন্ট করা হচ্ছে
  const categoryCounts = posts?.reduce((acc, post) => {
    const cat = post.category;
    if (cat) {
      acc[cat] = (acc[cat] || 0) + 1;
    }
    return acc;
  }, {}) || {};

  // ক্যাটাগরির নামকে URL স্লাগে কনভার্ট করার ফাংশন
  const createSlug = (name) => name.toLowerCase().replace(/ /g, '-');

  return (
    <div className="space-y-6 sticky top-24">
      {/* 300x250 Adsterra Ad Placeholder */}
      <div className="w-full h-[250px] bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 rounded-2xl transition-colors duration-300">
        Ad Space (300x250)
      </div>

      {/* Dynamic Categories Widget */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-colors duration-300">
        <h3 className="text-lg font-extrabold text-gray-900 mb-4 border-b border-gray-100 pb-3">
          Categories
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
          </div>
        ) : Object.keys(categoryCounts).length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-2">No categories found.</p>
        ) : (
          <ul className="space-y-3 text-gray-600 font-medium">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <li key={category}>
                <Link 
                  to={`/category/${createSlug(category)}`} 
                  className="hover:text-indigo-600 flex justify-between items-center transition-all group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                    {category}
                  </span> 
                  <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full text-xs font-bold">
                    {count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;