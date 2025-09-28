// HeroProductCard - Specialized for trending products in hero section
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Badge from './Badge';

const HeroProductCard = ({ 
  product, 
  className = '',
  showQuickView = true
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-3 h-3 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Calculate discount
  const hasDiscount = product.oldPrice && product.oldPrice > product.currentPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.oldPrice - product.currentPrice) / product.oldPrice) * 100)
    : 0;

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 ${className}`}
      onClick={handleViewProduct}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden rounded-t-lg aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <Badge variant="sale" size="sm">
              -{discountPercentage}%
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="new" size="sm">
              New
            </Badge>
          )}
          {product.isTrending && (
            <Badge variant="trending" size="sm">
              Hot
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-lg transition-all duration-200 ${
            isInWishlist(product.id)
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:text-red-500'
          }`}
        >
          <FiHeart className="w-3 h-3" />
        </button>

        {/* Quick Add to Cart Button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            disabled={product.availability === 'Out of Stock'}
            className={`p-1.5 rounded-full shadow-lg transition-colors duration-200 ${
              product.availability === 'Out of Stock'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <FiShoppingCart className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-base font-bold text-green-600">
            GHS {product.currentPrice}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through">
              GHS {product.oldPrice}
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.availability === 'In Stock' 
              ? 'bg-green-100 text-green-800'
              : product.availability === 'Low Stock'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.availability}
          </span>
          
          {showQuickView && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleViewProduct();
              }}
              className="text-xs text-green-600 hover:text-green-700 font-medium"
            >
              View →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroProductCard;