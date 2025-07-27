import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

// Login Breadcrumbs
const LoginBC = () => {
  return (
    <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
          <FiHome className="w-5 h-5" />
          <span className="text-base font-medium hidden sm:inline">Home</span>
        </Link>
        <FiChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-green-400 text-base font-semibold">Log In</span>
      </div>
    </div>
  );
};

export default LoginBC;