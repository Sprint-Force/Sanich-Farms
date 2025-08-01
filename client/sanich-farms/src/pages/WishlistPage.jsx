import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiShoppingCart, FiX } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext'; // Import useWishlist context
import { useCart } from '../context/CartContext'; // Import useCart context to add from wishlist to cart

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeWishlistItem, clearWishlist } = useWishlist();
  const { addToCart } = useCart(); // Get addToCart from CartContext

  const handleAddToCartFromWishlist = (productId, quantity = 1) => {
    addToCart(productId, quantity); // Add to cart using CartContext function
    removeWishlistItem(productId); // Optionally remove from wishlist after adding to cart
    console.log(`Product ${productId} moved from wishlist to cart.`);
    // You might want to show a success message here
  };

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
          <span className="text-green-400 text-base font-semibold">Wishlist</span>
        </div>
      </div>

      {/* Main Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 md:mb-12 text-center">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-md text-gray-600 text-lg">
            Your wishlist is empty. <Link to="/shop" className="text-green-600 hover:underline">Start adding products!</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            {/* Table Header (Desktop Only) */}
            <div className="hidden sm:grid grid-cols-[1.5fr_0.5fr_0.5fr_0.7fr_auto] gap-4 py-3 px-3 bg-gray-50 rounded-t-lg text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>Product</div>
              <div className="text-left">Price</div>
              <div className="text-left">Stock Status</div>
              <div className="text-left"><span className="sr-only">Add to Cart</span></div>
              <div className="text-right"><span className="sr-only">Remove</span></div>
            </div>

            {/* Wishlist Items List */}
            <div className="divide-y divide-gray-200">
              {wishlistItems.map((item) => (
                <div key={item.id} className="py-4 px-3 grid grid-cols-1 sm:grid-cols-[1.5fr_0.5fr_0.5fr_0.7fr_auto] gap-4 sm:gap-3 items-center">
                  {/* Product Info */}
                  <div className="flex items-center col-span-1 sm:col-span-1">
                    <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden border border-gray-200">
                      <img className="h-full w-full object-cover" src={item.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/333333?text=Item"; }} />
                    </div>
                    <div className="ml-4">
                      <Link to={`/products/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600 transition duration-200">
                        {item.name}
                      </Link>
                      <p className="text-xs text-gray-500 sm:hidden mt-1">Price: GH₵{item.price.toFixed(2)}</p> {/* Show price on mobile */}
                    </div>
                  </div>

                  {/* Price (Desktop Only) */}
                  <div className="text-sm text-gray-600 hidden sm:block">
                    GH₵{item.price.toFixed(2)}
                    {item.oldPrice && (
                      <span className="ml-2 text-xs text-gray-400 line-through">GH₵{item.oldPrice.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between sm:justify-start col-span-1 sm:col-span-1">
                    <span className="text-xs font-medium text-gray-500 uppercase sm:hidden">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="col-span-1 sm:col-span-1">
                    <button
                      onClick={() => handleAddToCartFromWishlist(item.id)}
                      className={`w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 shadow-md ${!item.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!item.inStock}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <FiShoppingCart size={16} />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </button>
                  </div>

                  {/* Remove Button */}
                  <div className="text-right col-span-1 sm:col-span-1">
                    <button
                      onClick={() => removeWishlistItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition duration-200 p-2 rounded-full hover:bg-gray-100"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
              <Link
                to="/shop"
                className="w-full sm:w-auto text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
              >
                Return to shop
              </Link>
              <button
                onClick={clearWishlist}
                className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition duration-300 shadow-md"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
