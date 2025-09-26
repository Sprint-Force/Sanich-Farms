import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../../UI/ProductCard';
import { productsAPI } from '../../../services/api';

const Products = () => {
  const navigate = useNavigate();

  // State for products, loading, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsAPI.getAll();
      // Ensure the response is an array of product objects
      const productsData = Array.isArray(response) ? response : 
                          Array.isArray(response?.data) ? response.data : 
                          Array.isArray(response?.products) ? response.products : [];
      setProducts(productsData);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
      setProducts([]); // Clear products on error
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Show first 4 products for homepage
  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-green-600">Products</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Premium quality poultry products trusted by thousands
          </p>
        </div>

        {/* Products Container */}
        {loading ? (
          // Loading State - 4 skeleton cards
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <ProductCard key={`skeleton-${i}`} skeleton={true} />
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : featuredProducts.length > 0 ? (
          <>
            {/* Desktop Grid - 4 columns */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden mb-12">
              <div className="flex gap-4 overflow-x-auto pb-4 px-4 -mx-4 hide-scrollbar">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-48 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} compact={true} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          // No Products State
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📦</div>
            <p className="text-gray-600 text-lg mb-6">No products available at the moment</p>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Call-to-Action */}
        <div className="text-center">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center justify-center gap-2
                       bg-green-600 hover:bg-green-700 active:bg-green-800
                       text-white px-8 py-4 rounded-xl font-semibold text-lg
                       shadow-lg hover:shadow-xl transform hover:-translate-y-1
                       transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Shop All Products
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Products;
