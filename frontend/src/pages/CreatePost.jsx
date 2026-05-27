import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export default function CreatePost() {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name.trim() || !text.trim()) {
            alert("Please fill in both title and content");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await api.post("/post", {
                name,
                text,
            });

            alert("Post created successfully!");
            setName("");
            setText("");
            navigate("/"); // Redirect to home after success
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Error creating post");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Post</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Post Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter a catchy title..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <textarea
                                placeholder="Write something amazing..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-vertical"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Creating..." : "Create Post"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}