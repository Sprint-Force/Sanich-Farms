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

  // Check if product is new (created within last 7 days)
  const isNewProduct = product?.created_at && 
    new Date(product.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

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

  // Early return if product is null/undefined (after hooks)
  if (!product && !skeleton) {
    return null;
  }

  // If showing skeleton
  if (skeleton) {
    return (
      <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse h-full flex flex-col">
        {/* Image skeleton - Optimized aspect ratio for mobile */}
        <div className="aspect-[4/3] xs:aspect-square bg-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
        </div>
        
        {/* Content skeleton - Better mobile spacing */}
        <div className="p-2 xs:p-3 sm:p-4 space-y-2 xs:space-y-3 flex-1 flex flex-col">
          <div className="h-2 xs:h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 xs:h-4 sm:h-5 bg-gray-200 rounded w-4/5"></div>
          <div className="flex items-center justify-between">
            <div className="h-3 xs:h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="flex gap-1 xs:gap-2 pt-2 mt-auto">
            <div className="flex-1 h-6 xs:h-8 sm:h-9 bg-gray-200 rounded-lg"></div>
            <div className="w-6 h-6 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-lg"></div>
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
      className={`bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group flex flex-col h-full ${
        compact ? 'shadow-md hover:shadow-lg' : ''
      }`}
    >
      {/* Product Image and Wishlist button */}
      <div ref={imgRef} className={`relative w-full overflow-hidden bg-gray-100 ${
        compact ? 'aspect-[4/3] xs:aspect-square' : 'aspect-[4/3] xs:aspect-square'
      }`}>
        {/* NEW Badge */}
        {isNewProduct && !compact && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold z-20">
            NEW
          </div>
        )}
        
        {/* Out of Stock Badge */}
        {product.stock_quantity === 0 && (
          <div className="absolute top-2 right-12 bg-gray-800 text-white text-xs px-2 py-1 rounded-md font-semibold z-20">
            OUT OF STOCK
          </div>
        )}
        
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
          className={`absolute top-1 xs:top-2 sm:top-3 right-1 xs:right-2 sm:right-3 p-1 xs:p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200 z-10 ${
            isWishlisted 
              ? 'bg-green-100 text-green-600 hover:bg-green-200 scale-110' 
              : 'bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FaHeart className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
          ) : (
            <FiHeart className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
       
      {/* Product Details and Add to Cart button */}
      <div className={`flex-1 flex flex-col ${compact ? 'p-2 xs:p-3' : 'p-2 xs:p-3 sm:p-4'}`}>
        <Link to={`/products/${product.id}`} className="flex-1 flex flex-col">
          {/* Product Name - Better mobile typography */}
          <h3 className={`font-semibold text-gray-800 mb-1 line-clamp-2 leading-tight ${
            compact ? 'text-xs xs:text-sm' : 'text-xs xs:text-sm sm:text-base'
          }`}>
            {product.name}
          </h3>
          
          {/* Category - Hidden in compact mode */}
          {!compact && (
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 mb-1 truncate">{product.category}</p>
          )}

          {/* Rating - Mobile optimized */}
          <div className={`flex items-center mb-2 ${compact ? 'text-xs' : 'text-xs xs:text-sm'}`}>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`${compact ? 'w-2.5 h-2.5' : 'w-3 h-3 xs:w-4 xs:h-4'} ${
                    i < Math.floor(product.rating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {!compact && product.reviews !== undefined && (
              <span className="text-gray-500 ml-1 xs:ml-2 text-[10px] xs:text-xs">
                ({product.reviews})
              </span>
            )}
          </div>
        </Link>

          {/* Price Section - Better mobile layout for long prices */}
          <div className="mt-auto">
            {/* Stock and Availability Info */}
            {!compact && (
              <div className="mb-1 text-xs">
                {product.stock_quantity !== undefined && (
                  <span className={`${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                  </span>
                )}
                {product.is_available === false && (
                  <span className="text-red-500 ml-2">• Unavailable</span>
                )}
              </div>
            )}
            
            {/* Price Display - Full width since button is now below */}
            <div className={`mb-2 ${compact ? 'mb-1' : 'mb-2'}`}>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className={`font-bold text-green-700 leading-tight ${
                    compact 
                      ? 'text-xs xs:text-sm' 
                      : 'text-sm xs:text-base sm:text-lg'
                  }`}>
                    GH₵{parseFloat(product.price || 0).toFixed(2)}
                  </span>
                  {product.unit_of_measure && (
                    <span className={`text-gray-500 font-normal ${
                      compact ? 'text-xs' : 'text-xs'
                    }`}>
                      / {product.unit_of_measure}
                    </span>
                  )}
                </div>
                {product.oldPrice && !compact && (
                  <span className="text-xs text-gray-500 line-through mt-0.5">
                    GH₵{parseFloat(product.oldPrice || 0).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
              
            {/* Add to Cart Button - Full width like wishlist */}
            {!isInCartAlready && (
              <button
                onClick={handleAddToCart}
                className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 
                  text-white rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 
                  transition-all duration-300 mt-auto
                  ${compact 
                    ? 'h-7 xs:h-8' 
                    : 'h-8 xs:h-9'
                  }`}
                aria-label="Add to cart"
              >
                <FiShoppingCart className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">Add to Cart</span>
              </button>
            )}

            {/* Quantity Selector - Compact for mobile */}
            {isInCartAlready && (
              <div className={`flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md shadow-md
                transition-all duration-300 ease-in-out overflow-hidden w-full
                ${compact 
                  ? 'h-7 xs:h-8 text-xs' 
                  : 'h-8 xs:h-9 sm:h-10 text-xs xs:text-sm'
                }`}>
                
                {/* Decrease Button */}
                <button
                  onClick={handleDecreaseQuantity}
                  className={`flex items-center justify-center hover:bg-green-700 active:bg-green-800 
                    transition-all duration-200 touch-manipulation flex-shrink-0
                    ${compact 
                      ? 'w-7 h-7 xs:w-8 xs:h-8' 
                      : 'w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10'
                    }`}
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-3 h-3" />
                </button>
                
                {/* Quantity Display */}
                <div className="font-bold text-center flex-1 px-1">
                  {cartQuantity}
                </div>
                
                {/* Increase Button */}
                <button
                  onClick={handleIncreaseQuantity}
                  className={`flex items-center justify-center hover:bg-green-700 active:bg-green-800 
                    transition-all duration-200 touch-manipulation flex-shrink-0
                    ${compact 
                      ? 'w-7 h-7 xs:w-8 xs:h-8' 
                      : 'w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10'
                    }`}
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default ProductCard;