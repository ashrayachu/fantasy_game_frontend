import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <section className="bg-blue-800 text-white border-b border-gray-200 py-4 px-4">
            <div className="flex gap-1 max-w-5xl mx-auto">
                <Link to="/">
                    <span className={`px-6 py-2 rounded-t-lg font-medium transition-colors ${isActive("/")
                            ? "bg-white text-blue-800"
                            : "text-white hover:bg-blue-700"
                        }`}>
                        Matches
                    </span>
                </Link>
                <Link to="/teams">
                    <span className={`px-6 py-2 rounded-t-lg font-medium transition-colors ${isActive("/teams")
                            ? "bg-white text-blue-800"
                            : "text-white hover:bg-blue-700"
                        }`}>
                        Teams
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default Navbar;