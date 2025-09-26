import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiPlus, FiMinus } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product, skeleton = false, compact = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageInView, setImageInView] = useState(false);
  const imgRef = useRef();
  const cardRef = useRef();
  
  const { addToCart, removeFromCart, updateCartItemQuantity, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  // VISUAL FEEDBACK: Check if product is in wishlist or cart
  const isWishlisted = isInWishlist(product?.id);
  const cartQuantity = getItemQuantity(product?.id);
  const isInCartAlready = cartQuantity > 0;

  // Intersection Observer for lazy loading images
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // If showing skeleton
  if (skeleton) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
        {/* Image skeleton */}
        <div className="aspect-square bg-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-5 bg-gray-200 rounded w-4/5"></div>
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <div className="flex-1 h-9 bg-gray-200 rounded"></div>
            <div className="w-9 h-9 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // CART QUANTITY HANDLERS: Bottom quantity selector approach
  const handleAddToCart = () => {
    if (!isInCartAlready) {
      addToCart(product, 1);
      addToast(`${product.name} added to cart!`, 'success');
    }
  };

  const handleIncreaseQuantity = (e) => {
    e.stopPropagation();
    const newQuantity = cartQuantity + 1;
    updateCartItemQuantity(product.id, newQuantity);
  };

  const handleDecreaseQuantity = (e) => {
    e.stopPropagation();
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      updateCartItemQuantity(product.id, newQuantity);
    } else {
      // Remove from cart when quantity reaches 0
      removeFromCart(product.id);
      addToast(`${product.name} removed from cart!`, 'info');
    }
  };  // WISHLIST VISUAL FEEDBACK: Toggle wishlist with proper feedback
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      addToast(`${product.name} removed from wishlist!`, 'info');
    } else {
      addToWishlist(product);
      addToast(`${product.name} added to wishlist!`, 'success');
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group flex flex-col h-full animate-pulse opacity-0 ${
        compact ? 'shadow-sm hover:shadow-md' : ''
      }`}
      style={{ animation: 'fadeIn 0.6s ease-out forwards' }}
    >
      {/* Product Image and Wishlist button */}
      <div ref={imgRef} className={`relative w-full overflow-hidden bg-gray-200 ${
        compact ? 'pb-[100%]' : 'pb-[100%]'
      }`}>
        {/* pb-[100%] creates a perfect square aspect ratio for the image container */}
        <Link to={`/products/${product.id}`} className="absolute inset-0">
          {imageInView && (
            <>
              {/* Placeholder/Loading shimmer */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                </div>
              )}
              
              {/* Actual Image */}
              <img
                src={product.image_url || product.image || product.images?.[0] || "https://placehold.co/300x300/cccccc/333333?text=Product+Image"}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src="https://placehold.co/300x300/cccccc/333333?text=Product+Image"; 
                  setImageLoaded(true);
                }}
              />
            </>
          )}
        </Link>
        {/* WISHLIST VISUAL FEEDBACK: Wishlist button with dynamic styling */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition duration-200 z-10 ${
            isWishlisted 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : 'bg-white/80 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FaHeart size={16} />
          ) : (
            <FiHeart size={16} />
          )}
        </button>
      </div>
       {/* Product Details and Add to Cart button */}
      <div className={`flex-grow flex flex-col ${compact ? 'p-2' : 'p-3 sm:p-4'}`}>
        <Link to={`/products/${product.id}`} className="flex-grow">
          {/* Product Name - Line-clamp for two lines */}
          <h3 className={`font-semibold text-gray-800 mb-1 line-clamp-2 ${
            compact ? 'text-xs' : 'text-sm'
          }`}>
            {product.name}
          </h3>
          
          {/* Category - Hidden in compact mode */}
          {!compact && (
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          )}

          {/* Rating - Simplified in compact mode */}
          <div className={`flex items-center mb-2 ${compact ? 'text-xs' : 'text-xs'}`}>
            {[...Array(compact ? 3 : 5)].map((_, i) => (
              <FiStar
                key={i}
                className={`${compact ? 'w-2.5 h-2.5' : 'w-3 h-3'} ${
                  i < (product.rating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            {!compact && (
              <span className="text-gray-500 ml-1">({product.reviews || 0})</span>
            )}
          </div>
        </Link>

          {/* Price Section - Clean Layout */}
          <div className="mt-auto">
            {/* Price Display */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex flex-col flex-grow">
                <span className={`font-bold text-green-700 leading-none ${
                  compact ? 'text-sm' : 'text-base sm:text-lg'
                }`}>
                  GH₵{parseFloat(product.price || 0).toFixed(2)}
                </span>
                {product.oldPrice && !compact && (
                  <span className="text-xs text-gray-500 line-through mt-0.5">
                    GH₵{parseFloat(product.oldPrice || 0).toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Add to Cart Button - Only show when not in cart */}
              {!isInCartAlready && (
                <button
                  onClick={handleAddToCart}
                  className={`flex-shrink-0 bg-green-600 hover:bg-green-700 active:bg-green-800 
                    text-white rounded-full shadow-md transition-all duration-200 
                    flex items-center justify-center touch-manipulation font-medium
                    ${compact 
                      ? 'w-10 h-10 min-w-[40px] min-h-[40px] text-xs' 
                      : 'w-12 h-12 min-w-[48px] min-h-[48px] sm:w-14 sm:h-14 sm:min-w-[56px] sm:min-h-[56px] text-sm'
                    }`}
                  aria-label="Add to cart"
                >
                  <FiShoppingCart size={compact ? 16 : 20} />
                </button>
              )}
            </div>

            {/* Quantity Selector - Below price when item is in cart */}
            {isInCartAlready && (
              <div className={`flex items-center bg-green-600 text-white rounded-lg shadow-md
                quantity-selector-slide transition-all duration-300 ease-in-out
                ${compact 
                  ? 'h-10 min-h-[40px] text-sm' 
                  : 'h-12 min-h-[48px] sm:h-14 sm:min-h-[56px] text-base'
                }`}>
                
                {/* Decrease Button */}
                <button
                  onClick={handleDecreaseQuantity}
                  className={`flex items-center justify-center hover:bg-green-700 active:bg-green-800 
                    transition-all duration-200 touch-manipulation rounded-l-lg flex-shrink-0
                    ${compact 
                      ? 'w-10 h-10 min-w-[40px] min-h-[40px]' 
                      : 'w-12 h-12 min-w-[48px] min-h-[48px] sm:w-14 sm:h-14 sm:min-w-[56px] sm:min-h-[56px]'
                    }`}
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={compact ? 14 : 18} />
                </button>
                
                {/* Quantity Display */}
                <div className={`font-bold text-center flex-grow
                  ${compact 
                    ? 'text-sm px-2' 
                    : 'text-base sm:text-lg px-3'
                  }`}>
                  {cartQuantity}
                </div>
                
                {/* Increase Button */}
                <button
                  onClick={handleIncreaseQuantity}
                  className={`flex items-center justify-center hover:bg-green-700 active:bg-green-800 
                    transition-all duration-200 touch-manipulation rounded-r-lg flex-shrink-0
                    ${compact 
                      ? 'w-10 h-10 min-w-[40px] min-h-[40px]' 
                      : 'w-12 h-12 min-w-[48px] min-h-[48px] sm:w-14 sm:h-14 sm:min-w-[56px] sm:min-h-[56px]'
                    }`}
                  aria-label="Increase quantity"
                >
                  <FiPlus size={compact ? 14 : 18} />
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default ProductCard;