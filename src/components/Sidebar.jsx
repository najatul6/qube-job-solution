const Sidebar = () => {
  return (
    <div className="space-y-6">
      {/* 300x250 Adsterra Ad Placeholder */}
      <div className="w-full h-[250px] bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 rounded-lg">
        Ad Space (300x250)
      </div>

      {/* Categories Widget */}
      <div className="bg-white p-5 rounded-lg shadow-sm border">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Categories</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="hover:text-indigo-600 cursor-pointer flex justify-between">
            <span>Networking</span> <span className="bg-gray-100 px-2 rounded text-sm">12</span>
          </li>
          <li className="hover:text-indigo-600 cursor-pointer flex justify-between">
            <span>DBMS</span> <span className="bg-gray-100 px-2 rounded text-sm">8</span>
          </li>
          <li className="hover:text-indigo-600 cursor-pointer flex justify-between">
            <span>Mathematics</span> <span className="bg-gray-100 px-2 rounded text-sm">15</span>
          </li>
          <li className="hover:text-indigo-600 cursor-pointer flex justify-between">
            <span>Job Circulars</span> <span className="bg-gray-100 px-2 rounded text-sm">5</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;