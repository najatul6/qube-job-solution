import { Link, useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError(); 

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-10 left-10 md:top-20 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-40 right-10 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto w-full">
        {/* Bouncing 404 Text */}
        <div className="animate-bounce mb-8">
          <h1 className="text-9xl md:text-[160px] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 drop-shadow-xl tracking-tighter">
            404
          </h1>
        </div>
        
        {/* Error Content Box */}
        <div className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Oops! Page Not Found 🚀
          </h2>
          <p className="text-gray-500 font-medium text-base md:text-lg mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-indigo-600 font-bold rounded-xl border-2 border-indigo-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Go Back
            </button>
            
            {/* Back to Home Button */}
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Back to Home
            </Link>
          </div>

        
          {/* 
          {error && (
            <div className="mt-10 p-5 bg-red-50/80 backdrop-blur-sm rounded-2xl border border-red-200 text-left overflow-auto max-w-full text-sm">
              <p className="text-red-700 font-extrabold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Developer Error Log:
              </p>
              <p className="text-red-600 font-mono font-bold">
                Status: {error.status || 'N/A'} - {error.statusText || error.message || 'Unknown Error'}
              </p>
              {error.data && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <pre className="text-red-500 font-mono text-xs whitespace-pre-wrap">
                    {typeof error.data === 'string' ? error.data : JSON.stringify(error.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
          */}

        </div>
      </div>
    </div>
  );
};

export default ErrorPage;