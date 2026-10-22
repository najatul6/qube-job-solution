import { Link } from 'react-router-dom';

const PostCard = ({ id, title, date, category, snippet, views }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 group flex flex-col md:flex-row gap-6">
      
      {/* Left Content Area */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            {category}
          </span>
          <span className="text-gray-400 text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {date}
          </span>
        </div>

        <Link to={`/post/${id}`}>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {snippet}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <Link 
            to={`/post/${id}`} 
            className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1"
          >
            Read Full Note 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>

          <span className="text-gray-400 text-xs font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            {views || 0} Views
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default PostCard;