import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import logo from '../../../../assets/logo.png';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { getTypographyClasses, iconSizes } from '../config/typography';

/**
 * DesktopNavbar component - Desktop-specific navbar layout
 */
const DesktopNavbar = ({ 
  cartCount, 
  wishlistCount, 
  isAuthenticated, 
  user,
  desktopSearchQuery,
  setDesktopSearchQuery,
  handleDesktopSearchSubmit
}) => {
  return (
    <div className="hidden lg:flex items-center justify-between">
      {/* Logo (Desktop) */}
      <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <img 
          src={logo} 
          alt="Sanich Farms Logo" 
          className="h-12" 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; 
          }}
        />
        <span className={`${getTypographyClasses('logo')} text-[#00B207] hidden sm:block`}>
          Sanich Farms
        </span>
      </Link>

      {/* Search Bar (Desktop) */}
      <SearchBar
        searchQuery={desktopSearchQuery}
        setSearchQuery={setDesktopSearchQuery}
        onSearchSubmit={handleDesktopSearchSubmit}
      />

      {/* Icons & User Info/Login (Desktop) */}
      <div className="flex items-center gap-6 text-gray-700 text-lg flex-shrink-0">
        <Link 
          to="/wishlist" 
          className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" 
          aria-label="Wishlist"
        >
          <FiHeart size={iconSizes.medium} />
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
          <FiShoppingCart size={iconSizes.medium} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
              {cartCount}
            </span>
          )}
        </Link>
        
        <UserMenu isAuthenticated={isAuthenticated} user={user} />
      </div>
    </div>
  );
};

export default DesktopNavbar;
