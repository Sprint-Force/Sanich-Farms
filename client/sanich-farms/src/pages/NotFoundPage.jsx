// NotFoundPage
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center font-poppins px-4">
      <h1 className="text-7xl sm:text-9xl font-extrabold text-gray-800 animate-bounce-once">404</h1>
      <p className="text-2xl sm:text-3xl text-gray-600 mt-4 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-500 max-w-md mb-8">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block bg-green-600 text-white 
                   px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 
                   rounded-lg sm:rounded-full font-medium sm:font-semibold 
                   text-sm sm:text-base lg:text-lg
                   hover:bg-green-700 transition duration-300 
                   shadow-md hover:shadow-lg sm:shadow-md sm:hover:shadow-lg
                   focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;