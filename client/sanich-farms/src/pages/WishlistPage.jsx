import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiX, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
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

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <p className="mb-4">Your wishlist is empty.</p>
            <Link to="/shop" className="text-green-600 hover:underline font-semibold">
              Start adding products!
            </Link>
          </div>
        ) : (
          <div>
            {/* --- Mobile Wishlist Items List --- */}
            <div className="lg:hidden">
              <div className="flex flex-col gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 relative flex flex-col">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 h-20 w-20">
                        <img
                          className="h-full w-full rounded-md object-cover"
                          src={item.image || item.images?.[0]}
                          alt={item.name}
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/333333?text=Item"; }}
                        />
                      </div>
                      <div className="flex-grow">
                        <Link to={`/products/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600 line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500">{item.category}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          GH₵{(item.currentPrice || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status and Rating */}
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.availability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.availability || 'N/A'}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 mt-4">
                      <button
                        onClick={() => handleAddToCartFromWishlist(item)}
                        className="flex-grow flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-full font-semibold text-sm hover:bg-green-700 transition duration-300 shadow-sm"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <FiShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Desktop Wishlist Items List --- */}
            <div className="hidden lg:block bg-white rounded-xl shadow-md border border-gray-100 p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Rating</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wishlistItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 rounded-md object-cover"
                              src={item.image || item.images?.[0]}
                              alt={item.name}
                              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/cccccc/333333?text=Item"; }}
                            />
                          </div>
                          <div className="ml-4">
                            <Link to={`/products/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600 line-clamp-2">
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        GH₵{(item.currentPrice || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.availability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.availability || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => handleAddToCartFromWishlist(item)}
                          className="text-green-600 hover:text-green-900 mx-1 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <FiShoppingCart size={18} />
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                          className="text-red-600 hover:text-red-900 mx-1 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <FiX size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;