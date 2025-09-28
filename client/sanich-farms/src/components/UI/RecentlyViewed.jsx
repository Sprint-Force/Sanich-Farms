import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiX, FiEye, FiArrowRight } from 'react-icons/fi';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';

const RecentlyViewed = ({ 
  limit = 8, 
  showTitle = true, 
  showClearButton = true,
  compact = false,
  className = "" 
}) => {
  const { recentlyViewed, clearRecentlyViewed, removeFromRecentlyViewed } = useRecentlyViewed();
  const displayItems = recentlyViewed.slice(0, limit);

  if (!recentlyViewed.length) {
    return null; // Don't render if no recently viewed items
  }

  const formatPrice = (price, originalPrice) => {
    if (!price) return 'Price not available';
    
    const formattedPrice = `₵${Number(price).toFixed(2)}`;
    
    if (originalPrice && Number(originalPrice) > Number(price)) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-green-600">{formattedPrice}</span>
          <span className="text-sm text-gray-500 line-through">₵{Number(originalPrice).toFixed(2)}</span>
        </div>
      );
    }
    
    return <span className="font-semibold text-green-600">{formattedPrice}</span>;
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const viewedAt = new Date(dateString);
    const diffInMinutes = Math.floor((now - viewedAt) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 ${className}`}>
      {/* Header */}
      {showTitle && (
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <FiClock className="text-green-600 w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Recently Viewed
            </h2>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
              {recentlyViewed.length}
            </span>
          </div>
          {showClearButton && (
            <button
              onClick={clearRecentlyViewed}
              className="text-gray-500 hover:text-red-500 transition-colors text-sm font-medium flex items-center gap-1"
              title="Clear all recently viewed items"
            >
              <FiX className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      )}

      {compact ? (
        /* Compact horizontal scroll view */
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {displayItems.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-48 relative group">
              <Link 
                to={`/products/${product.id}`}
                className="block bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all duration-200"
              >
                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromRecentlyViewed(product.id);
                  }}
                  className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50 hover:text-red-500"
                >
                  <FiX className="w-3 h-3" />
                </button>

                {/* Product Image */}
                <div className="aspect-square mb-2 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image_url || "https://placehold.co/200x200/e5e7eb/6b7280?text=Product"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/200x200/e5e7eb/6b7280?text=Product"; 
                    }}
                  />
                </div>

                {/* Product Info */}
                <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <div className="text-xs text-green-600 mb-1">
                  {formatPrice(product.price, product.originalPrice)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTimeAgo(product.viewedAt)}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayItems.map((product) => (
            <div key={product.id} className="relative group">
              <Link 
                to={`/products/${product.id}`}
                className="block bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromRecentlyViewed(product.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50 hover:text-red-500"
                >
                  <FiX className="w-4 h-4" />
                </button>

                {/* Product Image */}
                <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image_url || "https://placehold.co/200x200/e5e7eb/6b7280?text=Product"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/200x200/e5e7eb/6b7280?text=Product"; 
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {formatPrice(product.price, product.originalPrice)}
                    </div>
                    {product.category && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiEye className="w-3 h-3" />
                      Viewed {formatTimeAgo(product.viewedAt)}
                    </span>
                    {product.rating && (
                      <span className="flex items-center gap-1">
                        ⭐ {product.rating}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Show more link if there are more items */}
      {recentlyViewed.length > limit && (
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <Link 
            to="/dashboard/recently-viewed" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
          >
            View All {recentlyViewed.length} Items
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
