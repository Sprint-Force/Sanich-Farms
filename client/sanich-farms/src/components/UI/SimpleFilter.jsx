import React, { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SimpleFilter = ({ 
  products = [], 
  onFiltersChange,
  className = '' 
}) => {
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRange: null
  });
  
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true
  });

  // Extract unique categories from products
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  
  // Predefined price ranges
  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100+', min: 100, max: Infinity }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category, checked) => {
    const newCategories = checked 
      ? [...activeFilters.categories, category]
      : activeFilters.categories.filter(c => c !== category);
    
    const newFilters = {
      ...activeFilters,
      categories: newCategories
    };
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (priceRange) => {
    const newFilters = {
      ...activeFilters,
      priceRange: activeFilters.priceRange?.min === priceRange.min ? null : priceRange
    };
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = { categories: [], priceRange: null };
    setActiveFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFilterCount = () => {
    return activeFilters.categories.length + (activeFilters.priceRange ? 1 : 0);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 h-fit sticky top-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiFilter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-medium text-gray-800">Categories</h4>
          {expandedSections.category ? (
            <FiChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeFilters.categories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700 capitalize">{category}</span>
                <span className="text-xs text-gray-400 ml-auto">
                  ({products.filter(p => p.category === category).length})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-medium text-gray-800">Price Range</h4>
          {expandedSections.price ? (
            <FiChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={`${range.min}-${range.max}`} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="radio"
                  name="priceRange"
                  checked={activeFilters.priceRange?.min === range.min}
                  onChange={() => handlePriceChange(range)}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Active Filters</span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-green-600 hover:text-green-700"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {/* Category filters */}
            {activeFilters.categories.map(category => (
              <span
                key={category}
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {category}
                <button
                  onClick={() => handleCategoryChange(category, false)}
                  className="hover:text-green-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}
            
            {/* Price range filter */}
            {activeFilters.priceRange && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {activeFilters.priceRange.label}
                <button
                  onClick={() => handlePriceChange(activeFilters.priceRange)}
                  className="hover:text-green-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleFilter;
