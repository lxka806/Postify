import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Get current logged-in user
        const user = localStorage.getItem("user");
        if (user) {
            setCurrentUser(JSON.parse(user));
        }

        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get("/post");
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!confirm("Are you sure you want to delete this post?")) {
            return;
        }

        try {
            await api.delete(`/post/${postId}`);
            // Remove post from state
            setPosts(posts.filter(post => post._id !== postId));
            alert("Post deleted successfully!");
        } catch (err) {
            console.error("Error deleting post:", err);
            alert(err.response?.data?.message || "Error deleting post");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading posts...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
                    {currentUser && (
                        <Link 
                            to="/create-post" 
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                        >
                            + New Post
                        </Link>
                    )}
                </div>

                {posts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <p className="text-gray-500">No posts yet. Be the first to create one!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => {
                            // Check if current user is the author
                            const isAuthor = currentUser && post.user?._id === currentUser._id;
                            
                            return (
                                <div key={post._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                                    {/* Author & Delete Button Row */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 font-semibold text-sm">
                                                    {post.user?.fullname?.charAt(0) || "U"}
                                                </span>
                                            </div>
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                                {post.user?.fullname || "Anonymous"}
                                            </span>
                                        </div>
                                        
                                        {/* Delete button - only visible to author */}
                                        {isAuthor && (
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="text-red-500 hover:text-red-700 transition text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>

                                    {/* Post Title */}
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {post.name}
                                    </h2>

                                    {/* Post Content */}
                                    <p className="text-gray-600 leading-relaxed">
                                        {post.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}