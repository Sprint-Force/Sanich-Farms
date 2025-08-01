import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiFilter, FiSliders, FiChevronDown, FiGrid, FiList, FiX, FiArrowLeft } from 'react-icons/fi'; // Added FiArrowLeft for back button in mobile filter
import ProductCard from '../components/UI/ProductCard';
import { productsData } from '../data/productsData';

const ShopPage = () => {
  const navigate = useNavigate();

  // State for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [sortBy, setSortBy] = useState('latest');
  const [showCount, setShowCount] = useState('12');

  // State for active filters (to display below the filter bar)
  const [activeFilters, setActiveFilters] = useState([]);

  // NEW: State for mobile filter menu visibility
  const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] = useState(false);

  // Simulate applying filters (for demonstration purposes)
  useEffect(() => {
    const filters = [];
    if (selectedCategory !== 'All Categories') filters.push(`Category: ${selectedCategory}`);
    if (selectedPriceRange !== 'All Prices') filters.push(`Price: ${selectedPriceRange}`);
    if (selectedRating !== 'All Ratings') filters.push(`Rating: ${selectedRating}`);
    setActiveFilters(filters);
  }, [selectedCategory, selectedPriceRange, selectedRating]);

  // Filter and sort products (simplified client-side logic)
  const getFilteredAndSortedProducts = () => {
    let filteredProducts = [...productsData];

    if (selectedCategory !== 'All Categories') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === selectedCategory
      );
    }

    if (selectedPriceRange !== 'All Prices') {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product =>
        product.currentPrice >= min && product.currentPrice <= max
      );
    }

    if (selectedRating !== 'All Ratings') {
      const minRating = parseInt(selectedRating.split(' ')[0]);
      filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
    }

    filteredProducts.sort((a, b) => {
      if (sortBy === 'latest') {
        return b.id - a.id;
      } else if (sortBy === 'price-asc') {
        return a.currentPrice - b.currentPrice;
      } else if (sortBy === 'price-desc') {
        return b.currentPrice - a.currentPrice;
      } else if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return filteredProducts.slice(0, parseInt(showCount));
  };

  const displayedProducts = getFilteredAndSortedProducts();

  // Function to remove an active filter
  const removeFilter = (filterText) => {
    if (filterText.includes('Category:')) setSelectedCategory('All Categories');
    if (filterText.includes('Price:')) setSelectedPriceRange('All Prices');
    if (filterText.includes('Rating:')) setSelectedRating('All Ratings');
  };

  // NEW: Toggle mobile filter menu
  const toggleMobileFilterMenu = () => {
    setIsMobileFilterMenuOpen(!isMobileFilterMenuOpen);
  };

  // NEW: Close mobile filter menu on apply/clear
  const closeMobileFilterMenu = () => {
    setIsMobileFilterMenuOpen(false);
  };


  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Shop</span>
        </div>
      </div>

      {/* Shop Banner/Hero */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src="https://placehold.co/1920x400/4CAF50/FFFFFF?text=Shop+Our+Products" // Placeholder for shop banner
          alt="Shop Banner"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x400/cccccc/333333?text=Shop+Image+Error"; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
            Our Products
          </h1>
        </div>
      </div>

      {/* Main Shop Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden flex justify-end mb-6">
          <button
            onClick={toggleMobileFilterMenu}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <FiFilter size={20} />
            Filters
          </button>
        </div>

        {/* Filter and Sort Bar (Desktop View) */}
        <div className="hidden md:block bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 md:gap-4 flex-grow">
              {/* Category Filter */}
              <div className="relative flex-1 min-w-[150px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="All Categories">Select Category</option>
                  <option value="Chicks">Chicks</option>
                  <option value="Feeds">Feeds</option>
                  <option value="Eggs">Eggs</option>
                  <option value="Vitamins">Vitamins</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative flex-1 min-w-[150px]">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="All Prices">Select Price</option>
                  <option value="0-10">GH₵0 - GH₵10</option>
                  <option value="10-20">GH₵10 - GH₵20</option>
                  <option value="20-50">GH₵20 - GH₵50</option>
                  <option value="50-100">GH₵50 - GH₵100</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Rating Filter */}
              <div className="relative flex-1 min-w-[150px]">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="All Ratings">Select Rating</option>
                  <option value="5 Stars">5 Stars</option>
                  <option value="4 Stars">4 Stars & Up</option>
                  <option value="3 Stars">3 Stars & Up</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Sort By and Show Count */}
            <div className="flex flex-wrap gap-3 md:gap-4 md:justify-end">
              {/* Sort By */}
              <div className="relative flex-1 min-w-[120px] md:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="latest">Sort by: Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Show Count */}
              <div className="relative flex-1 min-w-[100px] md:flex-none">
                <select
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="12">Show: 12</option>
                  <option value="24">Show: 24</option>
                  <option value="48">Show: 48</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters and Results Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium">Active Filters:</span>
              {activeFilters.length > 0 ? (
                activeFilters.map((filter, index) => (
                  <span key={index} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    {filter}
                    <button onClick={() => removeFilter(filter)} className="ml-1 text-green-600 hover:text-green-800" aria-label={`Remove filter ${filter}`}>
                      <FiX size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">None</span>
              )}
            </div>
            <p className="text-gray-700 font-medium text-sm">
              {displayedProducts.length} Results found (out of {productsData.length} total)
            </p>
          </div>
        </div>

        {/* Mobile Filter Sidebar (Off-Canvas Menu) */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
            ${isMobileFilterMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Filters</h3>
            <button onClick={toggleMobileFilterMenu} className="text-gray-600 hover:text-gray-800" aria-label="Close filters">
              <FiX size={24} />
            </button>
          </div>
          <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-120px)]"> {/* Adjust height based on header/footer */}
            {/* Category Filter */}
            <div>
              <label htmlFor="mobile-category" className="block text-gray-700 font-semibold mb-2">Category</label>
              <div className="relative">
                <select
                  id="mobile-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Chicks">Chicks</option>
                  <option value="Feeds">Feeds</option>
                  <option value="Eggs">Eggs</option>
                  <option value="Vitamins">Vitamins</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label htmlFor="mobile-price" className="block text-gray-700 font-semibold mb-2">Price Range</label>
              <div className="relative">
                <select
                  id="mobile-price"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All Prices">All Prices</option>
                  <option value="0-10">GH₵0 - GH₵10</option>
                  <option value="10-20">GH₵10 - GH₵20</option>
                  <option value="20-50">GH₵20 - GH₵50</option>
                  <option value="50-100">GH₵50 - GH₵100</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label htmlFor="mobile-rating" className="block text-gray-700 font-semibold mb-2">Rating</label>
              <div className="relative">
                <select
                  id="mobile-rating"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All Ratings">All Ratings</option>
                  <option value="5 Stars">5 Stars</option>
                  <option value="4 Stars">4 Stars & Up</option>
                  <option value="3 Stars">3 Stars & Up</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="mobile-sort" className="block text-gray-700 font-semibold mb-2">Sort By</label>
              <div className="relative">
                <select
                  id="mobile-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="latest">Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Show Count */}
            <div>
              <label htmlFor="mobile-show-count" className="block text-gray-700 font-semibold mb-2">Show</label>
              <div className="relative">
                <select
                  id="mobile-show-count"
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Apply Filters Button (Optional, can just apply on change) */}
            <button
              onClick={closeMobileFilterMenu}
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mobile Filter Menu Backdrop */}
        {isMobileFilterMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileFilterMenu} // Close when clicking backdrop
          ></div>
        )}


        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"> {/* Changed grid-cols-1 to grid-cols-2 for mobile */}
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 text-lg">
            No products match your current filters.
          </div>
        )}

        {/* Pagination (Placeholder) */}
        <div className="flex justify-center mt-12">
          <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition duration-300">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
