import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import logo from '../../../../assets/logo.png';
import { getTypographyClasses, iconSizes } from '../config/typography';

/**
 * MobileNavbar component - Mobile-specific navbar layout
 */
const MobileNavbar = ({ 
  isMobileMenuOpen, 
  toggleMobileMenu, 
  cartCount, 
  wishlistCount,
  isCompact = false
}) => {
  return (
    <div className={`flex items-center justify-between lg:hidden transition-all duration-300 ${isCompact ? 'mb-1' : 'mb-2'}`}>
      {/* Logo on the left */}
      <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <img 
          src={logo} 
          alt="Sanich Farms Logo" 
          className={`transition-all duration-300 ${isCompact ? 'h-8 md:h-10' : 'h-10 md:h-12'}`}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; 
          }}
        />
        <span className={`${getTypographyClasses('logo')} text-[#00B207] whitespace-nowrap ml-2 transition-all duration-300 ${
          isCompact ? 'text-base md:text-lg' : ''
        }`}>
          Sanich Farms
        </span>
      </Link>
      
      {/* Icons on the right */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link 
          to="/wishlist" 
          className="relative hidden lg:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-200" 
          aria-label="Wishlist"
        >
          <FiHeart size={iconSizes.large} />
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
          <FiShoppingCart size={iconSizes.large} />
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
          <FiUser size={iconSizes.large} />
        </Link>

        {/* Hamburger Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100 relative overflow-hidden focus-visible:outline-2 focus-visible:outline-green-400 focus-visible:outline-offset-2" 
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : 'closed'}`}>
            {isMobileMenuOpen ? (
              <FiX 
                size={iconSizes.xlarge} 
                className="icon-bounce"
              />
            ) : (
              <FiMenu 
                size={iconSizes.xlarge}
                className="icon-bounce" 
              />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;
