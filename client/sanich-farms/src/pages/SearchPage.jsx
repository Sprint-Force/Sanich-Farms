import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiSearch, FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi';
import ProductCard from '../components/UI/ProductCard';
import ServiceCard from '../components/UI/ServiceCard';
import SimpleFilter from '../components/UI/SimpleFilter';
import { searchAPI } from '../services/api';

const SearchPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  const [productResults, setProductResults] = useState([]);
  const [serviceResults, setServiceResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  
  // Faceted search states
  const [filters, setFilters] = useState({ categories: [], priceRange: null });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products client-side
  const filteredProducts = useMemo(() => {
    let filtered = [...productResults];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price) || 0;
        return price >= filters.priceRange.min && 
               (filters.priceRange.max === Infinity || price <= filters.priceRange.max);
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [productResults, filters, sortBy]);

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    // Track filter usage - TODO: Re-enable when analytics is implemented
    // searchAnalytics.trackSearch(searchQuery, filteredProducts.length, newFilters);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        setHasSearched(true);
        setLoading(true);
        setError(null);
        try {
          // Make an API call to the backend search endpoint
          const response = await searchAPI.search(searchQuery);
          const results = response.results || [];
          
          // Separate products and services from combined results
          const products = results.filter(item => item.type === 'product' || !item.type);
          const services = results.filter(item => item.type === 'service');
          
          setProductResults(products);
          setServiceResults(services);
          
          // Track search with analytics - TODO: Re-enable when analytics is implemented
          // searchAnalytics.trackSearch(searchQuery, products.length + services.length, filters);
        } catch (err) {
          console.error("Failed to fetch search results:", err);
          setError("Failed to load search results. Please try again.");
          setProductResults([]);
          setServiceResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setHasSearched(false);
        setProductResults([]);
        setServiceResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link 
              to="/" 
              className="flex items-center text-gray-500 hover:text-green-600 transition-colors"
            >
              <FiHome className="w-4 h-4 mr-1" />
              <span className="hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Search Results</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 break-words">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Search Results'}
              </h1>
              {hasSearched && (
                <p className="mt-2 text-sm text-gray-600">
                  Found {filteredProducts.length + serviceResults.length} results
                  {filteredProducts.length + serviceResults.length !== productResults.length + serviceResults.length && (
                    <span className="text-green-600"> (filtered)</span>
                  )}
                </p>
              )}
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:sticky lg:top-6">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <SimpleFilter
                products={productResults}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>

          {/* Results Content */}
          <div className="flex-1 min-w-0">
            
            {/* Sort and View Controls */}
            {hasSearched && (filteredProducts.length > 0 || serviceResults.length > 0) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Sort by:</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name A-Z</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">View:</span>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <FiGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <FiList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Searching...</h3>
                <p className="text-gray-600">Finding results for "{searchQuery}"</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-white rounded-lg shadow-sm border border-red-200 p-12 text-center">
                <div className="text-red-500 mb-4">
                  <FiSearch className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* No Results State */}
            {hasSearched && !loading && !error && filteredProducts.length === 0 && serviceResults.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <FiSearch className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any products or services matching "{searchQuery}". 
                  Try adjusting your search terms or browse our categories.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    Browse Products
                  </Link>
                  <Link 
                    to="/services" 
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            )}

            {/* Results */}
            {!loading && !error && hasSearched && (
              <div className="space-y-8">
                
                {/* Products Section */}
                {filteredProducts.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Products
                        <span className="ml-2 text-base font-normal text-gray-500">
                          ({filteredProducts.length})
                        </span>
                      </h2>
                    </div>
                    
                    <div className={`
                      ${viewMode === 'grid' 
                        ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8'
                        : 'space-y-4'
                      }
                    `}>
                      {filteredProducts.map(product => (
                        <ProductCard 
                          key={product.id} 
                          product={product}
                          compact={viewMode === 'list'}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Services Section */}
                {serviceResults.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Services
                        <span className="ml-2 text-base font-normal text-gray-500">
                          ({serviceResults.length})
                        </span>
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {serviceResults.map(service => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;