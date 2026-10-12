import { Link } from 'react-router-dom';

const PostCard = ({ id, title, date, category, snippet }) => {
  return (
    <article className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-2">
        <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-medium">{category}</span>
        <span>• {date}</span>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition-colors">
        <Link to={`/post/${id}`}>{title}</Link>
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {snippet}
      </p>
      <Link to={`/post/${id}`} className="text-indigo-600 font-medium hover:underline inline-flex items-center">
        Read Notes 
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </Link>
    </article>
  );
};

export default PostCard;