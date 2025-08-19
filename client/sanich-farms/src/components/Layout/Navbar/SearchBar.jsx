import React from 'react';
import { FiSearch } from 'react-icons/fi';


const SearchBar = ({ 
  query, 
  setQuery, 
  onSubmit, 
  placeholder = "Search for products or services...",
  className = "",
  isMobile = false 
}) => {
  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full border border-gray-300 pl-10 pr-4 ${
          isMobile 
            ? 'py-3 rounded-md focus:ring-2 focus:ring-green-500 text-base' 
            : 'py-2 rounded-full focus:ring-2 focus:ring-green-500 text-base'
        } focus:outline-none transition duration-200`}
        aria-label={isMobile ? "Mobile and tablet search input" : "Search products and services"}
      />
      <button
        type="submit"
        className={`absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 ${
          isMobile ? 'rounded-r-md' : 'rounded-r-full'
        } flex items-center justify-center hover:bg-green-700 transition duration-200`}
        aria-label={isMobile ? "Submit mobile search" : "Search button"}
      >
        <FiSearch size={20} />
      </button>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch size={20} />
      </span>
    </form>
  );
};

export default SearchBar;
