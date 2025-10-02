import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { searchAPI } from '../../../services/api';


const SearchBar = ({ 
  query, 
  setQuery, 
  onSubmit, 
  placeholder = "Search for products or services...",
  className = "",
  isMobile = false 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  // Fetch autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const response = await searchAPI.autocomplete(query.trim());
        setSuggestions(response.suggestions || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Autocomplete error:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    // Trigger search with suggestion
    const event = { preventDefault: () => {} };
    onSubmit(event);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
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

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 ${
          isMobile ? 'rounded-md mt-1' : 'rounded-lg mt-2'
        } max-h-60 overflow-y-auto`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <FiSearch className="text-gray-400 mr-2" size={14} />
                <span className="text-gray-800">{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {loading && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 p-3 z-50">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
            <span className="ml-2 text-sm text-gray-600">Searching...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
