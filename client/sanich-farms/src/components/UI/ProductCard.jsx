// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaHeart, FaStar } from 'react-icons/fa';
// import { FiShoppingCart } from 'react-icons/fi';
// import { useCart } from '../../context/CartContext';
// import { useWishlist } from '../../context/WishlistContext';

// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   const handleAddToCart = () => {
//     console.log(`Adding product ${product.id} (${product.name}) to cart!`);
//     addToCart(product.id, 1);
//   };

//   const handleAddToWishlist = () => {
//     console.log(`Adding product ${product.id} (${product.name}) to wishlist!`);
//     addToWishlist(product.id); // CHANGED: Pass product.id
//   };

//   if (!product) {
//     console.warn("ProductCard received null or undefined product prop.");
//     return null;
//   }

//   return (
//     <div
//       className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out
//         min-h-[380px] flex flex-col justify-between ${
//         product.isFeatured ? 'border-2 border-green-600 ring-2 ring-green-200' : ''
//       }`}
//     >
//       <div className="relative mb-4">
//         <Link to={`/products/${product.id}`}>
//           <img
//             src={product.image}
//             alt={product.imageAlt}
//             className="w-full h-48 object-cover rounded-lg"
//             onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/333333?text=Image+Error"; console.error("Image failed to load:", e.target.src); }}
//           />
//         </Link>
//         <button
//           onClick={handleAddToWishlist}
//           className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-gray-600 hover:text-red-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
//           aria-label={`Add ${product.name} to wishlist`}
//         >
//           <FaHeart className="w-5 h-5" />
//         </button>
//       </div>

//       <div>
//         <Link to={`/products/${product.id}`} className="hover:text-green-700 transition-colors duration-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
//             {product.name}
//           </h3>
//         </Link>

//         <div className="flex items-baseline gap-2 mb-2">
//           <span className="text-xl font-bold text-green-700">
//             GH₵{product.currentPrice?.toFixed(2)}
//           </span>
//           {product.oldPrice && (
//             <span className="text-sm text-gray-500 line-through">
//               GH₵{product.oldPrice?.toFixed(2)}
//             </span>
//           )}
//         </div>

//         <div className="flex items-center mb-4">
//           {[...Array(5)].map((_, i) => (
//             <FaStar
//               key={i}
//               className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
//             />
//           ))}
//           <span className="ml-2 text-sm text-gray-600">({product.rating}/5)</span>
//         </div>
//       </div>

//       <button
//         onClick={handleAddToCart}
//         className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-auto"
//         aria-label={`Add ${product.name} to cart`}
//       >
//         <FiShoppingCart className="w-5 h-5" />
//         <span className="hidden sm:inline">Add to Cart</span>
//       </button>
//     </div>
//   );
// };

// export default ProductCard;


// src/components/UI/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext'; // NEW: Import useToast


const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { addToast } = useToast(); // NEW: Use the toast hook

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`${product.name} added to cart!`, 'success'); // NEW: Success toast
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    addToast(`${product.name} added to wishlist!`, 'success'); // NEW: Success toast
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg group"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
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
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
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
          <span className="text-xl font-bold text-green-700">{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">GH₵{product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
