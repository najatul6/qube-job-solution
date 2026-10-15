import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePosts from "../../hooks/usePosts";

const PostManager = () => {
    const axiosSecure = useAxiosSecure();
    const [posts, isLoading, refetch] = usePosts();

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

    if (isLoading) return <div className="p-10 text-center text-gray-500 font-bold">Loading Dashboard Data...</div>;
    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-800">Manage Content</h2>
                <Link to="/admin/create-post" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95">
                    + Create New Post
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-medium">
                    No posts managed yet. Click "Create New Post" to add one.
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
                            {posts.map((post) => (
                                <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-indigo-900">{post.title}</td>
                                    <td className="p-4"><span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{post.category}</span></td>
                                    {/* 🚀 Show Post Views */}
                                    <td className="p-4 text-center font-bold text-indigo-600 bg-indigo-50/50">
                                        {post.views || 0}
                                    </td>
                                    <td className="p-4">{new Date(post.createdAt).toLocaleDateString()}</td>
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
    )
}

export default PostManager