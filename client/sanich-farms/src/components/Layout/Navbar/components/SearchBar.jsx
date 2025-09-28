import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { getTypographyClasses } from '../config/typography';

/**
 * SearchBar component - Handles both mobile and desktop search functionality
 */
const SearchBar = ({ 
  isMobile = false, 
  searchQuery, 
  setSearchQuery, 
  onSearchSubmit, 
  searchInputRef = null 
}) => {
  if (isMobile) {
    return (
      <div className="lg:hidden">
        <form onSubmit={onSearchSubmit} className="relative w-full">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch size={18} />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 ${getTypographyClasses('search')}`}
              aria-label="Mobile and tablet search input"
            />
          </div>
        </form>
      </div>
    );
  }

  // Desktop search bar
  return (
    <form onSubmit={onSearchSubmit} className="hidden lg:flex flex-1 max-w-md mx-8">
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={18} />
        </span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 ${getTypographyClasses('search')}`}
          aria-label="Desktop search input"
        />
      </div>
    </form>
  );
};

export default SearchBar;
