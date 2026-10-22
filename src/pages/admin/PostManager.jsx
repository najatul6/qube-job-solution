import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePosts from "../../hooks/usePosts";

const PostManager = () => {
    const axiosSecure = useAxiosSecure();
    const [posts, isLoading, refetch] = usePosts();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("date-desc");

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/api/posts/${id}`);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your note has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#4f46e5'
                    });
                    refetch();
                } catch (error) {
                    toast.error("Failed to delete post.");
                    console.error(error);
                }
            }
        });
    };

    const processedPosts = posts
        ?.filter((post) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                post.title?.toLowerCase().includes(searchLower) ||
                post.category?.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            if (sortOption === "date-desc") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortOption === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortOption === "views-desc") return (b.views || 0) - (a.views || 0);
            if (sortOption === "title-asc") return a.title?.localeCompare(b.title);
            return 0;
        }) || [];

    if (isLoading) return <div className="p-10 text-center text-gray-500 font-bold">Loading Dashboard Data...</div>;

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            {/* 🚀 Header, Search & Sort Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">Manage Content</h2>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-auto flex-1">
                        <svg className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors text-sm"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 bg-gray-50 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700"
                    >
                        <option value="date-desc">Newest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="views-desc">Most Views</option>
                        <option value="title-asc">Title (A-Z)</option>
                    </select>

                    <Link to="/admin/create-post" className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap">
                        + Create New Post
                    </Link>
                </div>
            </div>

            {processedPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    {searchQuery ? "No posts match your search criteria." : "No posts managed yet. Click 'Create New Post' to add one."}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                                <th className="p-4 font-semibold rounded-tl-xl">Title</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold text-center">Views</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold text-right rounded-tr-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {/* 🚀 Render Processed Posts */}
                            {processedPosts.map((post) => (
                                <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-indigo-900">{post.title}</td>
                                    <td className="p-4"><span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">{post.category}</span></td>
                                    <td className="p-4 text-center font-bold text-indigo-600 bg-indigo-50/50">
                                        {post.views || 0}
                                    </td>
                                    <td className="p-4 whitespace-nowrap">{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-right flex justify-end gap-3">
                                        <Link
                                            to={`/admin/edit-post/${post._id}`}
                                            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-bold transition-colors text-xs flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold transition-colors text-xs flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PostManager;