import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import axios from 'axios';
import ProductCard from '../components/UI/ProductCard';
import ServiceCard from '../components/UI/ServiceCard';
import SimpleFilter from '../components/UI/SimpleFilter';

const SearchPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  // Define your backend API URL
  const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/search';

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
          const response = await axios.get(`${BASE_URL}?query=${encodeURIComponent(searchQuery)}`);
          const products = response.data.productResults || [];
          const services = response.data.serviceResults || [];
          
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
            <span className="breadcrumb-current text-sm xs:text-base font-semibold">Search Results</span>
          </nav>
        </div>
      </div>

      {/* Search Results Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            Search Results for "{searchQuery}"
          </h1>
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FiFilter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Search Controls */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SimpleFilter
              products={productResults}
              onFiltersChange={handleFiltersChange}
              className="mb-6"
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Info & Sort */}
            {hasSearched && (productResults.length > 0 || serviceResults.length > 0) && (
              <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {filteredProducts.length + serviceResults.length} results
                  {filteredProducts.length !== productResults.length && (
                    <span className="text-green-600 ml-1">(filtered)</span>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex rounded border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${
                        viewMode === 'grid'
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FiGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${
                        viewMode === 'list'
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FiList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

        {loading ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <FiSearch size={60} className="mx-auto mb-4 text-gray-400" />
            <p>Searching for "{searchQuery}"...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <p className="text-red-500">{error}</p>
          </div>
        ) : hasSearched && filteredProducts.length === 0 && serviceResults.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <FiSearch size={60} className="mx-auto mb-4 text-gray-400" />
            <p className="mb-2">No products or services found matching your search.</p>
            <p>Please try a different keyword or browse our categories.</p>
            <Link to="/shop" className="text-green-600 hover:underline font-semibold mt-4 block">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                  Products ({filteredProducts.length})
                  {filteredProducts.length !== productResults.length && (
                    <span className="text-sm font-normal text-green-600 ml-2">
                      (filtered from {productResults.length})
                    </span>
                  )}
                </h2>
                <div className={`
                  ${viewMode === 'grid' 
                    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'
                    : 'space-y-4'
                  }
                `}>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </div>
            )}

            {serviceResults.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                  Services ({serviceResults.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {serviceResults.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
