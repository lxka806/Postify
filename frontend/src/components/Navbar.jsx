import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">
                            PostliFy
                        </Link>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                            Home
                        </Link>
                        <Link to="/create-post" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                            Create Post
                        </Link>
                        
                        {
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
                                    Sign Up
                                </Link>
                            </>
                        }
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden">
                        <button className="text-gray-500 hover:text-gray-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}