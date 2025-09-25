import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product, skeleton = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageInView, setImageInView] = useState(false);
  const imgRef = useRef();
  const cardRef = useRef();
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  // WISHLIST VISUAL FEEDBACK: Check if product is in wishlist
  const isWishlisted = isInWishlist(product?.id);

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

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  // WISHLIST VISUAL FEEDBACK: Toggle wishlist with proper feedback
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
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group flex flex-col h-full animate-pulse opacity-0"
      style={{ animation: 'fadeIn 0.6s ease-out forwards' }}
    >
      {/* Product Image and Wishlist button */}
      <div ref={imgRef} className="relative w-full pb-[100%] overflow-hidden bg-gray-200">
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
      <div className="flex-grow flex flex-col p-3 sm:p-4">
        <Link to={`/products/${product.id}`} className="flex-grow">
          {/* Product Name - Line-clamp for two lines */}
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
          
          {/* Category */}
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center text-xs mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${i < (product.rating || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-gray-500 ml-1">({product.reviews || 0})</span>
          </div>
        </Link>

          {/* Price and Add to Cart Button */}
          <div className="mt-auto flex items-end justify-between gap-2">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-base font-bold text-green-700 leading-none sm:text-lg">GH₵{parseFloat(product.price || 0).toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xs text-gray-500 line-through">GH₵{parseFloat(product.oldPrice || 0).toFixed(2)}</span>
              )}
            </div>
            
            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className="flex-shrink-0 bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition duration-200"
              aria-label="Add to cart"
            >
              <FiShoppingCart size={18} />
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;