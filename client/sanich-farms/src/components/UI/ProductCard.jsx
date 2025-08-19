import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlistItems } = useWishlist();
  const { addToast } = useToast();

  // WISHLIST VISUAL FEEDBACK: Check if product is in wishlist
  const isWishlisted = isInWishlist(product.id);
  
  // DEBUG: Log wishlist status
  console.log('Product ID:', product.id, 'Type:', typeof product.id);
  console.log('Is Wishlisted:', isWishlisted);
  console.log('Wishlist Items:', wishlistItems);

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl group flex flex-col h-full">
      {/* Product Image and Wishlist button */}
      <div className="relative w-full pb-[100%] overflow-hidden">
        {/* pb-[100%] creates a perfect square aspect ratio for the image container */}
        <Link to={`/products/${product.id}`} className="absolute inset-0">
          <img
            src={product.image || product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/cccccc/333333?text=Product+Image"; }}
          />
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
                className={`w-3 h-3 ${i < product.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </Link>

          {/* Price and Add to Cart Button */}
          <div className="mt-auto flex items-end justify-between gap-2">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-base font-bold text-green-700 leading-none sm:text-lg">GH₵{product.price}</span>
              {product.oldPrice && (
                <span className="text-xs text-gray-500 line-through">GH₵{product.oldPrice.toFixed(2)}</span>
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