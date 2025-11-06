import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

// Navigation Icons Component
const NavIcons = ({ 
  cartCount, 
  wishlistCount, 
  isAuthenticated, 
  user, 
  onLogout,
  isMobile = false 
}) => {
  if (isMobile) {
    return (
      <div className="flex items-center gap-2 md:gap-4">
        <Link 
          to="/wishlist" 
          className="relative hidden lg:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-200" 
          aria-label="Wishlist"
        >
          <FiHeart size={24} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link 
          to="/cart" 
          className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" 
          aria-label="Shopping Cart"
        >
          <FiShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link 
          to="/dashboard" 
          className="hidden md:block hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" 
          aria-label="User Dashboard"
        >
          <FiUser size={24} />
        </Link>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="flex items-center gap-6 text-gray-700 text-lg flex-shrink-0">
      <Link 
        to="/wishlist" 
        className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" 
        aria-label="Wishlist"
      >
        <FiHeart size={22} />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
            {wishlistCount}
          </span>
        )}
      </Link>
      <Link 
        to="/cart" 
        className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-200" 
        aria-label="Shopping Cart"
      >
        <FiShoppingCart size={22} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
            {cartCount}
          </span>
        )}
      </Link>
      
      {isAuthenticated ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link 
            to="/dashboard" 
            className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" 
            aria-label="User Dashboard"
          >
            <FiUser size={22} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-bold hidden lg:inline">
              Hi! {user?.name?.split(' ')[0] || 'User'}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="ml-2 sm:ml-3 bg-red-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2"
          >
            <FiLogOut size={16} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      ) : (
        <>
          <Link 
            to="/dashboard" 
            className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" 
            aria-label="User Dashboard"
          >
            <FiUser size={22} />
          </Link>
          <Link
            to="/login"
            className="ml-2 sm:ml-3 bg-green-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <span className="hidden sm:inline">Login / Signup</span>
            <span className="sm:hidden">Login</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavIcons;
