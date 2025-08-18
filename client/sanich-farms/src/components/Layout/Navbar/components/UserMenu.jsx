import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { getTypographyClasses, iconSizes } from '../config/typography';

/**
 * UserMenu component - Handles user authentication display and actions
 */
const UserMenu = ({ isAuthenticated, user }) => {
  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard" 
            className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" 
            aria-label="User Dashboard"
          >
            <FiUser size={iconSizes.medium} />
          </Link>
          <div className="flex items-center gap-2">
            <span className={`${getTypographyClasses('userGreeting')} text-gray-700`}>
              Hi! {user?.name?.split(' ')[0] || 'User'}
            </span>
          </div>
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
            className="ml-3 bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Login / Signup
          </Link>
        </>
      )}
    </>
  );
};

export default UserMenu;
