import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Compact footer specifically for authentication pages (Login, Signup, etc.)
 * Inspired by Amazon's minimal authentication page design
 */
const AuthFooter = () => {
  return (
    <footer className="mt-8 pt-6 border-t border-gray-200">
      {/* Links Section */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-blue-600 mb-4">
        <Link to="/terms" className="hover:text-orange-600 hover:underline">
          Terms & Conditions
        </Link>
        <Link to="/privacy" className="hover:text-orange-600 hover:underline">
          Privacy Policy
        </Link>
        <Link to="/contact" className="hover:text-orange-600 hover:underline">
          Help
        </Link>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-xs text-gray-600">
        © 2025 Sanich Farms. All rights reserved.
      </div>
    </footer>
  );
};

export default AuthFooter;
