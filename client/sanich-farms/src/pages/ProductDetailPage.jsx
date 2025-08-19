import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiStar, FiMinus, FiPlus, FiShoppingCart, FiHeart, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/UI/ProductCard';
// We will no longer need this import after we implement the API call
// import { productsData } from '../data/productsData';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  // Define your backend API URL
  const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/products';

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BASE_URL}/${productId}`);
        const fetchedProduct = response.data.product; // Extract product from response
        if (!fetchedProduct) {
          setError("Product not found.");
          addToast("Product not found.", "error");
        } else {
          setProduct(fetchedProduct);
          setMainImage(fetchedProduct.image_url || fetchedProduct.image || fetchedProduct.images?.[0] || '');
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. Please try again later.");
        addToast("Failed to load product details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, addToast]);

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      addToast("Error: Product details are not available.", "error");
      return;
    }
    addToCart(product, quantity);
    addToast(`${quantity} x ${product.name} added to cart!`, 'success');
  };

  // WISHLIST VISUAL FEEDBACK: Check if product is in wishlist
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // WISHLIST VISUAL FEEDBACK: Toggle wishlist with proper feedback
  const handleToggleWishlist = () => {
    if (!product) {
      addToast("Error: Product details are not available.", "error");
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      addToast(`${product.name} removed from wishlist!`, 'info');
    } else {
      addToWishlist(product);
      addToast(`${product.name} added to wishlist!`, 'success');
    }
  };

  // Note: For a real app, related products would also be fetched from an API,
  // possibly in a separate call or with the main product data.
  // For now, we'll keep the mock data for this section.
  const relatedProducts = [].slice(0, 4); // Dummy related products

    // Handle image thumbnails
  const productThumbnails = product?.image_url ? [product.image_url] : 
                           product?.images && product?.images.length > 0 ? product.images : 
                           product?.image ? [product.image] : [];

  // Conditional rendering for loading, error, and main content
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 font-poppins text-gray-700 text-xl col-span-full">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 font-poppins text-gray-700 text-xl col-span-full">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/shop" className="text-green-600 hover:underline">Back to Shop</Link>
      </div>
    );
  }

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
          <Link to="/shop" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Shop page">
            <span className="text-base font-medium">Shop</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      {/* Main Product Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pt-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="flex flex-col md:flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="flex-grow relative overflow-hidden rounded-xl shadow-lg border border-gray-100 aspect-square">
              <img
                src={mainImage || "https://placehold.co/600x600/cccccc/333333?text=Product+Image"}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x600/cccccc/333333?text=Product+Image+Error"; }}
              />
              {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  Only {product.stock_quantity} left!
                </span>
              )}
            </div>
            {/* Thumbnail Gallery */}
            {productThumbnails.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar flex-shrink-0">
                {productThumbnails.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 flex-shrink-0
                      ${mainImage === img ? 'border-green-600 shadow-md' : 'border-gray-200 hover:border-green-400'}`}
                    onClick={() => setMainImage(img)}
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/333333?text=Thumb"; }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">{product.name}</h1>
              <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                {product.is_available ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${i < (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">(0 Reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-green-700">
                GH₵{parseFloat(product.price || 0).toFixed(2)}
              </span>
              {product.unit_of_measure && (
                <span className="text-sm text-gray-500">
                  per {product.unit_of_measure}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed text-base">
              {product.description || 'No description available.'}
            </p>

            {/* Key Features/Benefits */}
            <div className="mb-4 space-y-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2"><span className="text-green-500"><FiCheckCircle /></span> High Quality & Fresh</p>
              <p className="flex items-center gap-2"><span className="text-green-500"><FiCheckCircle /></span> Fast & Secure Delivery</p>
              <p className="flex items-center gap-2"><span className="text-green-500"><FiCheckCircle /></span> Expert Support</p>
              {product.category && (
                <p className="flex items-center gap-2"><span className="text-green-500"><FiCheckCircle /></span> Category: {product.category}</p>
              )}
              {product.stock_quantity && (
                <p className="flex items-center gap-2"><span className="text-green-500"><FiCheckCircle /></span> Stock: {product.stock_quantity} units available</p>
              )}
            </div>
            
            {/* Action Buttons for Tablet & Desktop - Visible on medium screens and up */}
            <div className="hidden md:flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-3 hover:bg-gray-100 transition duration-200 text-gray-700"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={18} />
                </button>
                <span className="px-4 text-lg font-semibold text-gray-800">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="p-3 hover:bg-gray-100 transition duration-200 text-gray-700"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-green-600 text-white py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500"
                aria-label="Add to cart"
              >
                <FiShoppingCart size={20} />
                <span className="md:hidden lg:inline">Add to Cart</span>
              </button>
              {/* WISHLIST VISUAL FEEDBACK: Wishlist button with dynamic styling */}
              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-full border transition duration-300 shadow-md focus:outline-none focus:ring-2 ${
                  isWishlisted 
                    ? 'border-green-500 bg-green-100 text-green-600 hover:bg-green-200 focus:ring-green-300' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-red-500 focus:ring-gray-300'
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FiHeart size={20} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-semibold text-gray-800">Category:</span> {product.category || 'N/A'}</p>
              <p><span className="font-semibold text-gray-800">Tags:</span> {product.tags?.join(', ') || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-8 md:mt-12 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex border-b border-gray-200 mb-4 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex-shrink-0 px-4 py-2 text-base font-semibold transition-colors duration-200 ${
                activeTab === 'description' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Descriptions
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`flex-shrink-0 px-4 py-2 text-base font-semibold transition-colors duration-200 ${
                activeTab === 'additional' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-shrink-0 px-4 py-2 text-base font-semibold transition-colors duration-200 ${
                activeTab === 'reviews' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Customer Feedback
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="text-gray-700 leading-relaxed text-base space-y-4">
              <p>{product.fullDescription || product.description}</p>
              {product.benefits && product.benefits.length > 0 && (
                <ul className="list-none space-y-2 mt-4">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-green-700 font-medium">
                      <FiCheckCircle /> {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'additional' && (
            <div className="text-gray-700 leading-relaxed text-base overflow-x-auto hide-scrollbar">
              {/* FIX: Additional Info Section - Comprehensive product details */}
              <table className="w-full text-left border-collapse min-w-[300px]">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold text-gray-800">Category:</th>
                    <td className="py-2">{product.category || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold text-gray-800">Stock Available:</th>
                    <td className="py-2">{product.stock_quantity || 'N/A'} units</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold text-gray-800">Unit of Measure:</th>
                    <td className="py-2">{product.unit_of_measure || 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold text-gray-800">Availability:</th>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.is_available ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold text-gray-800">Product Rating:</th>
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${i < (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm">({product.rating || 0}/5)</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold text-gray-800">Storage Instructions:</th>
                    <td className="py-2">Store in a cool, dry place away from direct sunlight</td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-4 font-semibold text-gray-800">Origin:</th>
                    <td className="py-2">Ghana</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviewsData && product.reviewsData.length > 0 ? (
                product.reviewsData.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-gray-600">{review.author} - {review.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base">
                      "{review.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-600 text-lg">
                  No customer reviews yet. Be the first to review!
                </div>
              )}
              <div className="text-center mt-6">
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300">
                  Load More Reviews
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
            Related Products
          </h2>
          {/* Note: This section will need to be updated to fetch related products from your API based on category or tags. */}
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600 text-lg col-span-full">
              No related products found.
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile - Visible on small screens, hidden on medium and larger */}
      <div className="fixed bottom-0 left-0 w-full bg-white md:hidden shadow-lg border-t border-gray-100 z-50">
          <div className="flex flex-col items-center p-4">
              <div className="flex flex-col items-center mb-3">
                  <span className="text-xl font-bold text-green-700">
                      {/* FIX: Mobile Sticky Bar Price - Always display actual product price */}
                      GH₵{parseFloat(product?.price || 0).toFixed(2)}
                  </span>
                  {product?.unit_of_measure && (
                      <span className="text-sm text-gray-500">
                          per {product.unit_of_measure}
                      </span>
                  )}
              </div>
              
              {/* Updated Button Container */}
              <div className="flex items-center justify-center gap-3 w-full">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                      <button
                          onClick={() => handleQuantityChange('decrease')}
                          className="p-2 hover:bg-gray-100 transition text-gray-700 flex-shrink-0"
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                      >
                          <FiMinus size={16} />
                      </button>
                      <span className="px-3 text-base font-semibold text-gray-800 flex-shrink-0">{quantity}</span>
                      <button
                          onClick={() => handleQuantityChange('increase')}
                          className="p-2 hover:bg-gray-100 transition text-gray-700 flex-shrink-0"
                          aria-label="Increase quantity"
                      >
                          <FiPlus size={16} />
                      </button>
                  </div>

                  <button
                      onClick={handleAddToCart}
                      className="flex-grow bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-base flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 flex-shrink-0"
                      aria-label="Add to cart"
                  >
                      <FiShoppingCart size={18} />
                  </button>

                  {/* WISHLIST VISUAL FEEDBACK: Mobile wishlist button with dynamic styling */}
                  <button
                      onClick={handleToggleWishlist}
                      className={`p-3 rounded-full border transition shadow-md focus:outline-none focus:ring-2 flex-shrink-0 ${
                        isWishlisted 
                          ? 'border-green-500 bg-green-100 text-green-600 hover:bg-green-200 focus:ring-green-300' 
                          : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-red-500 focus:ring-gray-300'
                      }`}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                      <FiHeart size={18} className={isWishlisted ? 'fill-current' : ''} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
