import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <section className="w-full py-16 md:py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Our Products
          </h2>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Loading, Error, or Products Display */}
        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 text-lg">
            {error}
          </div>
        ) : featuredProducts.length > 0 ? (
          <>
            {/* Products Grid - Horizontal Scroll on Mobile */}
            <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 hide-scrollbar">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  // Adjusted width for better consistency in horizontal scroll
                  className="flex-none w-60 sm:w-64 md:w-auto snap-center" // Slightly adjusted widths
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-gray-600 text-lg">
            No products available.
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllClick}
            className="bg-white border-2 border-gray-300 text-gray-800 px-10 py-4 rounded-full font-bold text-lg shadow-md hover:bg-gray-100 hover:border-green-600 hover:text-green-700 transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
