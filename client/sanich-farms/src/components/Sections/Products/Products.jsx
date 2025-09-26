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

  const handleViewAllClick = () => {
    navigate('/shop');
  };

  // Show first 6 products for homepage
  const featuredProducts = Array.isArray(products) ? products.slice(0, 6) : [];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-white font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title - Clean and Modern */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-green-600">Products</span>
          </h2>
          {/* <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Quality poultry products trusted by thousands
          </p> */}
          <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Products Grid - Clean and Responsive */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="w-full"
              >
                <ProductCard skeleton={true} />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-lg">
            {error}
          </div>
        ) : featuredProducts.length > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 mb-12">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fadeIn w-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📦</div>
            <p className="text-gray-600 text-lg mb-6">No products available at the moment</p>
            <button 
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center justify-center gap-2
                         bg-blue-600 hover:bg-blue-700 text-white 
                         px-6 py-3 rounded-lg
                         font-semibold text-base
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                         transition-all duration-200 ease-out
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         active:transform active:scale-95"
            >
              <span>Contact Us</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        )}

        {/* Call-to-Action Section - Clean and Modern */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Explore Our Full Collection
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Discover all our quality products including chicks, feeds, eggs, and poultry supplies
            </p>
            <button
              onClick={handleViewAllClick}
              className="group inline-flex items-center justify-center gap-2
                         bg-green-600 hover:bg-green-700 text-white 
                         px-8 py-4 sm:px-10 sm:py-5 rounded-lg
                         font-semibold text-base sm:text-lg
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                         transition-all duration-200 ease-out
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                         active:transform active:scale-95"
            >
              <span>Shop All Products</span>
              <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
