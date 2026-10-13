import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import usePost from '../hooks/usePost';

const BlogPost = () => {
  const { id } = useParams(); 
  const [post, isLoading] = usePost(id);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading full note...</p>
      </div>
    );
  }

  if (!post || !post.title) {
    return (
      <div className="w-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Note Not Found</h2>
        <p className="text-gray-500 mb-6">The post you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 🚀 Dynamic SEO Meta Tags for Google Ranking */}
      <Helmet>
        <title>{post.metaTitle || post.title} | Qube Job Solution</title>
        <meta name="description" content={post.metaDescription || post.snippet} />
        <meta name="keywords" content={post.keywords || post.category} />
      </Helmet>

      {/* Top Navigation / Breadcrumb */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to feed
        </Link>
      </div>

      {/* Main Post Container */}
      <article className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

        {/* Post Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6 mt-2">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
            {post.category}
          </span>
          <span className="text-gray-400 font-medium text-sm flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-gray-400 font-medium text-sm flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            {post.views || 0} Views
          </span>
        </div>

        {/* Post Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>

        {/* 🚀 Dynamic HTML Content from React-Quill */}
        <div 
          className="prose prose-lg prose-indigo max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-xl text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Bottom Ad Placement */}
      <div className="w-full h-22.5 bg-gray-100 border border-gray-200 flex items-center justify-center mt-10 text-gray-400 rounded-xl shadow-inner text-sm">
        <span className="bg-white px-4 py-2 rounded-lg shadow-sm font-medium">Article Bottom Ad (728x90)</span>
      </div>
    </div>
  );
};

export default BlogPost;