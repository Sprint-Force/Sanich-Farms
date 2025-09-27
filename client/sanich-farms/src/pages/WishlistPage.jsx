import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiX, FiShoppingCart, FiHeart, FiPackage } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    addToast(`${productName} removed from wishlist.`, 'success');
  };

  const handleAddToCartFromWishlist = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    addToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="font-poppins bg-gradient-to-br from-gray-50 via-white to-green-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Wishlist</span>
        </div>
      </div>

      {/* Modern Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-2 mb-4">
            <FiHeart className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">My Wishlist</span>
          </div>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">
            Items you want to purchase later
          </p>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div>
            {/* Skeleton Stats Card */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-24 h-4 sm:h-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md border border-gray-100 animate-pulse flex flex-col">
                  {/* Skeleton Image */}
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                  
                  {/* Skeleton Content */}
                  <div className="p-2 sm:p-3 flex flex-col flex-grow">
                    <div className="w-3/4 h-3 sm:h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="w-16 h-4 sm:h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="w-full h-8 sm:h-9 bg-gray-200 rounded-lg mt-auto animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4">
                  <FiHeart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600">Start adding products you love to keep track of them!</p>
              </div>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FiPackage className="w-5 h-5" />
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Wishlist Stats */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
                      <FiHeart className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-lg">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={item.image_url || item.image || item.images?.[0] || "https://placehold.co/300x300/cccccc/333333?text=Product"}
                      alt={item.name}
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/cccccc/333333?text=Product"; }}
                    />
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <FiX className="w-3 h-3" />
                    </button>

                    {/* Status Badge */}
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Product Info - Flex grow to push button down */}
                  <div className="p-2 sm:p-3 flex flex-col flex-grow">
                    <Link 
                      to={`/products/${item.id}`} 
                      className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-2 mb-1 block flex-grow"
                    >
                      {item.name}
                    </Link>

                    {/* Price */}
                    <div className="mb-2">
                      <span className="text-sm sm:text-lg font-bold text-green-600">
                        GH₵{parseFloat(item.price || item.currentPrice || 0).toFixed(2)}
                      </span>
                    </div>

                    {/* Add to Cart Button - Fixed at bottom */}
                    <button
                      onClick={() => handleAddToCartFromWishlist(item)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 transition-all duration-300 mt-auto"
                    >
                      <FiShoppingCart className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-1">Looking for more?</h3>
                <p className="text-xs text-gray-600 mb-3">Explore our collection</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <FiPackage className="w-3 h-3" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;