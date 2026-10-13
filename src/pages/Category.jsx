import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Category = () => {
    // URL থেকে categoryName ধরে নিচ্ছি
    const { categoryName } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // URL এর নামটাকে সুন্দরভাবে দেখানোর জন্য ফরম্যাট করা
    const formatCategoryName = (name) => {
        if (!name) return '';
        return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const displayCategory = formatCategoryName(categoryName);

    useEffect(() => {
        const fetchCategoryPosts = async () => {
            setLoading(true);
            try {
                const res = await axiosPublic.get('/api/posts');

                // ফ্রন্টএন্ডে ফিল্টার করছি (URL এর ক্যাটাগরির সাথে মিলিয়ে)
                const filtered = res.data.filter(post =>
                    post.category.toLowerCase().replace(/ /g, '-') === categoryName.toLowerCase()
                );

                setPosts(filtered);
            } catch (error) {
                console.error("Error fetching category posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryPosts();
    }, [categoryName, axiosPublic]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            {/* Category Header */}
            <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-gray-100 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
                    {displayCategory}
                </h1>
                <p className="text-gray-500 mt-2 font-medium">
                    Explore all the latest updates and materials for {displayCategory}
                </p>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-indigo-600"></div>
                </div>
            ) : posts.length === 0 ? (
                /* Empty State */
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-2xl text-gray-400 font-bold mb-4">No posts found!</p>
                    <p className="text-gray-500">We haven't published anything in this category yet. Check back later.</p>
                </div>
            ) : (
                /* Posts Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 group">
                            <div className="p-6">
                                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full mb-4">
                                    {post.category}
                                </span>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                    {post.snippet}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-500 font-medium">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                    <Link
                                        to={`/post/${post._id}`}
                                        className="text-indigo-600 font-bold text-sm hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;