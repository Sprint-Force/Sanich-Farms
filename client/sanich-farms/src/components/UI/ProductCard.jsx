import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';


const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    addToast(`${product.name} added to wishlist!`, 'success');
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg group"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden"> {/* Consistent image height */}
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/cccccc/333333?text=Product+Image"; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-white text-green-600 p-3 rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-200"
              aria-label="Add to cart"
            >
              <FiShoppingCart size={20} />
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-white text-red-500 p-3 rounded-full shadow-md hover:bg-red-500 hover:text-white transition duration-200"
              aria-label="Add to wishlist"
            >
              <FiHeart size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 truncate">{product.name}</h3> {/* Adjusted font size */}
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-4 h-4 ${i < product.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-bold text-green-700">{product.price}</span> {/* Adjusted font size */}
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">GH₵{product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
