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

  // Effect to set initial category from URL query parameters and fetch products
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromQuery = searchParams.get('category');
    
    if (categoryFromQuery) {
      const formattedCategory = categoryFromQuery.charAt(0).toUpperCase() + categoryFromQuery.slice(1);
      const availableCategories = ['All Categories', 'Chicks', 'Feeds', 'Eggs', 'Vitamins', 'Equipment'];
      if (availableCategories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      } else {
        setSelectedCategory('All Categories');
      }
    } else {
      // Also check path-based routing for backward compatibility
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
    }
  }, [location.search, location.pathname]); // Depend on both search params and pathname

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

  // Function to clear all filters
  const clearAllFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedPriceRange('All Prices');
    setSelectedRating('All Ratings');
    setSortBy('latest');
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Modern Breadcrumbs - Clean & Responsive */}
      <div className="w-full breadcrumb-modern">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 xs:gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link flex items-center gap-1 text-slate-600 hover:text-green-600" aria-label="Go to Home page">
              <FiHome className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 breadcrumb-separator" />
            <span className="breadcrumb-current text-sm xs:text-base font-semibold">Shop</span>
          </nav>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-16">
        
        {/* Mobile Horizontal Scrollable Filter Bar */}
        <div className="md:hidden mb-4">
          <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100">
            {/* Mobile Filter Controls - Horizontal Scrollable */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-1 min-w-max">
                {/* Category Filter */}
                <div className="relative min-w-[120px]">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-6 text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Chicks">Chicks</option>
                    <option value="Feeds">Feeds</option>
                    <option value="Eggs">Eggs</option>
                    <option value="Vitamins">Vitamins</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-3 h-3" />
                </div>

                {/* Price Filter */}
                <div className="relative min-w-[110px]">
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-6 text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="All Prices">All Prices</option>
                    <option value="0-10">₵0-₵10</option>
                    <option value="10-20">₵10-₵20</option>
                    <option value="20-50">₵20-₵50</option>
                    <option value="50-100">₵50-₵100</option>
                    <option value="100-500">₵100-₵500</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-3 h-3" />
                </div>

                {/* Rating Filter */}
                <div className="relative min-w-[100px]">
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-6 text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="All Ratings">All Ratings</option>
                    <option value="5 Stars">5 Stars</option>
                    <option value="4 Stars">4+ Stars</option>
                    <option value="3 Stars">3+ Stars</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-3 h-3" />
                </div>

                {/* Sort By */}
                <div className="relative min-w-[120px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-6 text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="latest">Latest</option>
                    <option value="price-asc">Price: Low-High</option>
                    <option value="price-desc">Price: High-Low</option>
                    <option value="name-asc">Name: A-Z</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-3 h-3" />
                </div>

                {/* Show Count */}
                <div className="relative min-w-[85px]">
                  <select
                    value={showCount}
                    onChange={(e) => setShowCount(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-6 text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="12">Show 12</option>
                    <option value="24">Show 24</option>
                    <option value="48">Show 48</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Mobile Active Filters & Clear All - Horizontal Layout */}
            {activeFilters.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  <FiGrid className="w-3 h-3 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-600 font-medium text-[10px] flex-shrink-0">Filters:</span>
                  <div className="flex gap-1 min-w-max">
                    {activeFilters.map((filter, index) => (
                      <span key={index} className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-[9px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-green-200 flex-shrink-0">
                        <FiTag className="w-2 h-2" />
                        {filter}
                      </span>
                    ))}
                    <button
                      onClick={clearAllFilters}
                      className="bg-red-100 text-red-600 text-[9px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-red-200 hover:bg-red-200 transition-colors duration-200 flex-shrink-0"
                    >
                      <FiX className="w-2 h-2" />
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Results Count - Compact */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium text-xs flex items-center gap-1.5">
                  <FiPackage className="w-3 h-3" />
                  {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
                </span>
                <div className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                  Swipe →
                </div>
              </div>
            </div>
          </div>
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
