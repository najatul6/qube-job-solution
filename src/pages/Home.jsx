import { Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts'; // 🚀 Advanced hook import

const Home = () => {
  // Just ek line e shob data, loading state chole aslo!
  const [posts, isLoading] = usePosts();

  return (
    <div className="w-full">
      {/* 🚀 Vibrant Hero Section */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-10 text-white mb-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block backdrop-blur-sm">
            🎯 Platform for IT Professionals
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Crack Your Dream Govt Job <br className="hidden md:block" /> & Master Tech Skills
          </h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl leading-relaxed">
            Get daily byte-sized notes on Computer Technology, Networking, DBMS, and Mathematics. Perfectly tailored for Sub-Assistant Engineer & 10th-grade IT roles.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={"/category/tech-notes"} className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-gray-50 transition-all hover:scale-105 active:scale-95">
              Start Reading Today
            </Link>
            <Link to="#jobs" className="bg-indigo-800/50 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-800 transition-all border border-indigo-400 backdrop-blur-sm">
              View Job Circulars
            </Link>
          </div>
        </div>
      </div>

      {/* 728x90 Horizontal Ad Placement */}
      <div className="w-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-10 rounded-xl shadow-inner overflow-hidden">
        <AdBanner width={728} height={90} dataKey="b3b1ebd27ac92c5620d056485b4c28f5" />
      </div>

      <div className="flex justify-between items-end mb-6 border-b-2 border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Latest Notes & Updates</h2>
      </div>

      {/* Dynamic Data Mapping */}
      <div id='jobs' className="flex flex-col gap-6">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500 font-medium animate-pulse">Loading amazing content...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No posts found.</div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              title={post.title}
              date={new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              category={post.category}
              snippet={post.snippet}
              views={post.views}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;