import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { getTypographyClasses, iconSizes } from '../config/typography';

/**
 * UserMenu component - Handles user authentication display and actions
 */
const UserMenu = ({ isAuthenticated, user, onLogout }) => {
  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-2 lg:gap-4">
          <Link 
            to="/dashboard" 
            className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" 
            aria-label="User Dashboard"
          >
            <FiUser size={iconSizes.medium} />
          </Link>
          <div className="flex items-center gap-2">
            <span className={`${getTypographyClasses('userGreeting')} text-gray-700 hidden xl:inline`}>
              Hi! {user?.name?.split(' ')[0] || 'User'}
            </span>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="ml-2 bg-red-600 text-white px-3 lg:px-4 py-2 rounded-full text-sm lg:text-base font-medium hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg flex items-center gap-1 lg:gap-2"
            >
              <FiLogOut size={16} className="lg:w-4 lg:h-4" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          )}
        </div>
      ) : (
        <>
          <Link 
            to="/dashboard" 
            className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" 
            aria-label="User Dashboard"
          >
            <FiUser size={iconSizes.medium} />
          </Link>
          <Link
            to="/login"
            className="ml-2 lg:ml-3 bg-green-600 text-white px-3 lg:px-4 xl:px-5 py-2 rounded-full text-sm lg:text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <span className="hidden lg:inline">Login / Signup</span>
            <span className="lg:hidden">Login</span>
          </Link>
        </>
      )}
    </>
  );
};

export default UserMenu;
