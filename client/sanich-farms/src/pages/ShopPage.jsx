import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight, FiFilter, FiChevronDown, FiX, FiShoppingBag, FiGrid, FiStar, FiTrendingUp, FiPackage, FiTag } from 'react-icons/fi';
import ProductCard from '../components/UI/ProductCard';
import { PageSpinner } from '../components/UI/LoadingSpinner';
import { productsAPI } from '../services/api';

const ShopPage = () => {
  const location = useLocation();

  // State for products, loading, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  // State for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [sortBy, setSortBy] = useState('latest');
  const [showCount, setShowCount] = useState('12');

  // State for active filters (to display below the filter bar)
  const [activeFilters, setActiveFilters] = useState([]);

  // State for mobile filter menu visibility
  const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] = useState(false);

  // Effect to set initial category from URL and fetch products
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const categoryFromUrl = pathParts[pathParts.length - 1];
    if (categoryFromUrl && categoryFromUrl !== 'shop' && categoryFromUrl !== '') {
      const formattedCategory = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      const availableCategories = ['All Categories', 'Chicks', 'Feeds', 'Eggs', 'Vitamins', 'Equipment'];
      if (availableCategories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      } else {
        setSelectedCategory('All Categories');
      }
    } else {
      setSelectedCategory('All Categories');
    }
  }, [location.pathname]); // Only depend on location.pathname

  // Effect to trigger product fetch whenever filters or sort options change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (selectedCategory !== 'All Categories') params.category = selectedCategory.toLowerCase();
        if (selectedPriceRange !== 'All Prices') {
          const [min, max] = selectedPriceRange.split('-').map(Number);
          params.minPrice = min;
          params.maxPrice = max;
        }
        if (selectedRating !== 'All Ratings') {
          params.rating = parseInt(selectedRating.split(' ')[0]);
        }
        
        // Map sortBy values to what backend expects
        const sortMapping = {
          'latest': 'latest',
          'price-asc': 'price_asc', 
          'price-desc': 'price_desc',
          'name-asc': 'name_asc'
        };
        params.sortBy = sortMapping[sortBy] || 'latest';
        params.limit = showCount;

        const response = await productsAPI.getAll(params);
        // response may be an array or an object with { products, totalCount }
        const productsData = Array.isArray(response) ? response : (response?.products || response?.data || []);
        setProducts(productsData);
        setTotalProducts(response?.totalCount || productsData.length || 0);
        // Update the fetch timestamp for cache invalidation tracking
        localStorage.setItem('productsFetchedAt', Date.now().toString());
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedPriceRange, selectedRating, sortBy, showCount]); // Direct dependencies instead of fetchProducts

  // Effect to update active filters for display
  useEffect(() => {
    const filters = [];
    if (selectedCategory !== 'All Categories') filters.push(`Category: ${selectedCategory}`);
    if (selectedPriceRange !== 'All Prices') filters.push(`Price: GH₵${selectedPriceRange.replace('-', ' - GH₵')}`);
    if (selectedRating !== 'All Ratings') filters.push(`Rating: ${selectedRating}`);
    if (sortBy !== 'latest') {
      const sortLabels = {
        'price-asc': 'Price: Low to High',
        'price-desc': 'Price: High to Low', 
        'name-asc': 'Name: A to Z',
        'latest': 'Latest'
      };
      filters.push(`Sort: ${sortLabels[sortBy] || sortBy}`);
    }
    setActiveFilters(filters);
  }, [selectedCategory, selectedPriceRange, selectedRating, sortBy]);

  // Effect to check for cache invalidation from admin changes
  useEffect(() => {
    const checkCacheInvalidation = () => {
      const lastInvalidated = localStorage.getItem('productCacheInvalidated');
      const lastFetched = localStorage.getItem('productsFetchedAt');
      
      if (lastInvalidated && (!lastFetched || parseInt(lastInvalidated) > parseInt(lastFetched))) {
        // Cache was invalidated after last fetch, refresh products
        localStorage.setItem('productsFetchedAt', Date.now().toString());
        // Trigger a re-fetch by updating a dependency
        setSelectedCategory(prev => prev);
      }
    };

    // Check on mount
    checkCacheInvalidation();

    // Also check when window gets focus (user comes back from admin)
    const handleFocus = () => checkCacheInvalidation();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Function to remove an active filter
  const removeFilter = (filterText) => {
    if (filterText.includes('Category:')) setSelectedCategory('All Categories');
    if (filterText.includes('Price:')) setSelectedPriceRange('All Prices');
    if (filterText.includes('Rating:')) setSelectedRating('All Ratings');
    if (filterText.includes('Sort:')) setSortBy('latest');
  };

  // Toggle mobile filter menu
  const toggleMobileFilterMenu = () => {
    setIsMobileFilterMenuOpen(!isMobileFilterMenuOpen);
  };

  // Close mobile filter menu on apply/clear
  const closeMobileFilterMenu = () => {
    setIsMobileFilterMenuOpen(false);
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs - Remains the same, already responsive */}
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

      {/* Clean Shop Heading Section */}
      <div className="bg-white py-6 sm:py-8 md:py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-md">
                <FiShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Our Products
              </h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Discover premium poultry products, feeds, and farming supplies for your agricultural needs
            </p>
          </div>
        </div>
      </div>

      {/* Main Shop Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Enhanced Mobile Filter Toggle Button */}
        <div className="md:hidden flex justify-end mb-6">
          <button
            type="button"
            onClick={toggleMobileFilterMenu}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-3 rounded-full shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium"
          >
            <FiFilter className="w-5 h-5" />
            <span>Filters & Sort</span>
          </button>
        </div>

        {/* Enhanced Filter and Sort Bar (Desktop View) */}
        <div className="hidden md:block bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 lg:gap-6 flex-1">
              {/* Category Filter */}
              <div className="relative flex-1 min-w-[160px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Chicks">Chicks</option>
                  <option value="Feeds">Feeds</option>
                  <option value="Eggs">Eggs</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Equipment">Equipment</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>

              {/* Price Filter */}
              <div className="relative flex-1 min-w-[160px]">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="All Prices">All Prices</option>
                  <option value="0-10">GH₵0 - GH₵10</option>
                  <option value="10-20">GH₵10 - GH₵20</option>
                  <option value="20-50">GH₵20 - GH₵50</option>
                  <option value="50-100">GH₵50 - GH₵100</option>
                  <option value="100-500">GH₵100 - GH₵500</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>

              {/* Rating Filter */}
              <div className="relative flex-1 min-w-[160px]">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="All Ratings">All Ratings</option>
                  <option value="5 Stars">5 Stars</option>
                  <option value="4 Stars">4 Stars & Up</option>
                  <option value="3 Stars">3 Stars & Up</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* Sort By and Show Count */}
            <div className="flex flex-wrap gap-4 lg:gap-6 lg:justify-end">
              {/* Sort By */}
              <div className="relative flex-1 min-w-[140px] lg:flex-none lg:w-52">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="latest">Sort by: Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>

              {/* Show Count */}
              <div className="relative flex-1 min-w-[120px] lg:flex-none lg:w-36">
                <select
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="12">Show: 12</option>
                  <option value="24">Show: 24</option>
                  <option value="48">Show: 48</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Enhanced Active Filters and Results Count */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mt-6 pt-6 border-t border-gray-100 gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-700 font-medium text-base flex items-center gap-2">
                <FiGrid className="w-4 h-4" />
                Active Filters:
              </span>
              {activeFilters.length > 0 ? (
                <>
                  {activeFilters.map((filter, index) => (
                    <span key={index} className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <FiTag className="w-3 h-3" />
                      {filter}
                      <button type="button" onClick={() => removeFilter(filter)} className="text-green-600 hover:text-green-800 hover:bg-green-300 rounded-full p-0.5 transition-all duration-200" aria-label={`Remove filter ${filter}`}>
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedCategory('All Categories');
                      setSelectedPriceRange('All Prices');
                      setSelectedRating('All Ratings');
                      setSortBy('latest');
                    }}
                    className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-red-200 shadow-sm hover:shadow-md hover:from-red-200 hover:to-red-300 transition-all duration-200"
                  >
                    <FiX className="w-4 h-4" />
                    Clear All
                  </button>
                </>
              ) : (
                <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">None</span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-xl border border-blue-200">
              <FiPackage className="w-4 h-4 text-blue-600" />
              <p className="text-blue-700 font-semibold text-sm">
                {products.length} Results found (out of {totalProducts} total)
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Filter Sidebar (Off-Canvas Menu) */}
        <div
          className={`fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl border-r border-gray-200
            ${isMobileFilterMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <div className="flex items-center gap-3">
              <FiFilter className="w-6 h-6" />
              <h3 className="text-xl font-bold">Filters & Sort</h3>
            </div>
            <button 
              type="button" 
              onClick={toggleMobileFilterMenu} 
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200" 
              aria-label="Close filters"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-120px)]">
            {/* Category Filter */}
            <div>
              <label htmlFor="mobile-category" className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-lg">
                <FiGrid className="w-5 h-5 text-green-600" />
                Category
              </label>
              <div className="relative">
                <select
                  id="mobile-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Chicks">Chicks</option>
                  <option value="Feeds">Feeds</option>
                  <option value="Eggs">Eggs</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Equipment">Equipment</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label htmlFor="mobile-price" className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-lg">
                <FiTag className="w-5 h-5 text-blue-600" />
                Price Range
              </label>
              <div className="relative">
                <select
                  id="mobile-price"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="All Prices">All Prices</option>
                  <option value="0-10">GH₵0 - GH₵10</option>
                  <option value="10-20">GH₵10 - GH₵20</option>
                  <option value="20-50">GH₵20 - GH₵50</option>
                  <option value="50-100">GH₵50 - GH₵100</option>
                  <option value="100-500">GH₵100 - GH₵500</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label htmlFor="mobile-rating" className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-lg">
                <FiStar className="w-5 h-5 text-yellow-600" />
                Rating
              </label>
              <div className="relative">
                <select
                  id="mobile-rating"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="All Ratings">All Ratings</option>
                  <option value="5 Stars">5 Stars</option>
                  <option value="4 Stars">4 Stars & Up</option>
                  <option value="3 Stars">3 Stars & Up</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="mobile-sort" className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-lg">
                <FiTrendingUp className="w-5 h-5 text-purple-600" />
                Sort By
              </label>
              <div className="relative">
                <select
                  id="mobile-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="latest">Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* Show Count */}
            <div>
              <label htmlFor="mobile-show-count" className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-lg">
                <FiPackage className="w-5 h-5 text-indigo-600" />
                Show
              </label>
              <div className="relative">
                <select
                  id="mobile-show-count"
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white pr-10 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-400"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Sticky Apply Button */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
            <button
              type="button"
              onClick={closeMobileFilterMenu}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <FiPackage className="w-5 h-5" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mobile Filter Menu Backdrop */}
        {isMobileFilterMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileFilterMenu}
          ></div>
        )}

        {/* Enhanced Product Grid and Loading/Error States */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[...Array(parseInt(showCount))].map((_, i) => (
              <ProductCard key={`skeleton-${i}`} skeleton={true} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <FiX className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 text-center">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600 text-base sm:text-lg text-center mb-6 max-w-md">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-red-700 transition-colors duration-200 text-base sm:text-lg"
            >
              Try Again
            </button>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="opacity-0 animate-fadeIn"
                  style={{ 
                    animationDelay: `${Math.min(index * 0.1, 1)}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            {/* Enhanced Load More Button */}
            <div className="flex justify-center mt-12 lg:mt-16">
              <button 
                type="button" 
                className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg flex items-center gap-3"
              >
                <FiPackage className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Load More Products
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <FiPackage className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 text-center">
              No products found
            </h3>
            <p className="text-yellow-600 text-base sm:text-lg text-center mb-6 max-w-md">
              Try adjusting your filters or check back later for new products.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedPriceRange('All Prices');
                setSelectedRating('All Ratings');
                setSortBy('latest');
              }}
              className="bg-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-yellow-700 transition-colors duration-200 text-base sm:text-lg flex items-center gap-2"
            >
              <FiX className="w-5 h-5" />
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
