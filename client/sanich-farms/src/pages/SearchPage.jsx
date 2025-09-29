import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import ProductCard from '../components/UI/ProductCard';
import ServiceCard from '../components/UI/ServiceCard';

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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        setHasSearched(true);
        setLoading(true);
        setError(null);
        try {
          // Make an API call to the backend search endpoint
          const response = await axios.get(`${BASE_URL}?query=${encodeURIComponent(searchQuery)}`);
          setProductResults(response.data.productResults || []);
          setServiceResults(response.data.serviceResults || []);
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
  }, [searchQuery]);

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
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Search Results for "{searchQuery}"
        </h1>

        {loading ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <FiSearch size={60} className="mx-auto mb-4 text-gray-400" />
            <p>Searching for "{searchQuery}"...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <p className="text-red-500">{error}</p>
          </div>
        ) : hasSearched && productResults.length === 0 && serviceResults.length === 0 ? (
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
            {productResults.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                  Products ({productResults.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {productResults.map(product => (
                    <ProductCard key={product.id} product={product} />
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
  );
};

export default SearchPage;
