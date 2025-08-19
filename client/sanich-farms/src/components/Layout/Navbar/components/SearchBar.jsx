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
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for products or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border border-gray-300 pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${getTypographyClasses('search')}`}
            aria-label="Mobile and tablet search input"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 rounded-r-md flex items-center justify-center hover:bg-green-700 transition duration-200"
            aria-label="Submit mobile search"
          >
            <FiSearch size={20} />
          </button>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FiSearch size={20} />
          </span>
        </form>
      </div>
    );
  }

  // Desktop search bar
  return (
    <form onSubmit={onSearchSubmit} className="hidden lg:flex flex-1 max-w-md mx-8">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search for products or services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${getTypographyClasses('search')}`}
          aria-label="Desktop search input"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-3 rounded-r-md flex items-center justify-center hover:bg-green-700 transition duration-200"
          aria-label="Submit search"
        >
          <FiSearch size={18} />
        </button>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={18} />
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
