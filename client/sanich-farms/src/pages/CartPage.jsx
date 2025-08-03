// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiHome, FiChevronRight, FiMinus, FiPlus, FiX } from 'react-icons/fi';
// import { useCart } from '../context/CartContext'; // Import useCart context

// const CartPage = () => {
//   const navigate = useNavigate();
//   const { cartItems, updateCartItemQuantity, removeCartItem, clearCart } = useCart();

//   // Calculate subtotal
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   // Placeholder for shipping cost (you'd have logic here)
//   const shipping = subtotal > 0 ? 5.00 : 0.00; // Example: Free shipping over a certain amount, or flat rate

//   // Total calculation
//   const total = subtotal + shipping;

//   const handleUpdateCart = () => {
//     // In this client-side application, quantity changes and removals
//     // are immediately reflected via the CartContext state.
//     // This "Update Cart" button currently serves as a visual confirmation
//     // or a placeholder for future backend synchronization (e.g., saving cart to user account).
//     console.log("Cart state is already updated in real-time. 'Update Cart' button clicked for confirmation/backend sync.");
//     // You might add a temporary "Cart Updated!" message here.
//   };

//   const handleProceedToCheckout = () => {
//     if (cartItems.length > 0) {
//       console.log("Proceeding to checkout with:", cartItems);
//       navigate('/checkout'); // Navigate to a checkout page (you'd create this next)
//     } else {
//       // Using alert for simplicity, replace with MessageBox if you have one
//       alert("Your cart is empty. Please add items before checking out.");
//     }
//   };

//   return (
//     <div className="font-poppins bg-gray-50 min-h-screen">
//       {/* Breadcrumbs */}
//       <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
//           <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
//             <FiHome className="w-5 h-5" />
//             <span className="text-base font-medium hidden sm:inline">Home</span>
//           </Link>
//           <FiChevronRight className="w-4 h-4 text-gray-400" />
//           <span className="text-green-400 text-base font-semibold">Cart</span>
//         </div>
//       </div>

//       {/* Main Cart Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 md:mb-12 text-center">
//           My Shopping Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-10 bg-white rounded-xl shadow-md text-gray-600 text-lg">
//             Your cart is empty. <Link to="/shop" className="text-green-600 hover:underline">Start shopping!</Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
//             {/* Cart Items Display */}
//             <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6">
//               {/* Table Header (Desktop Only) */}
//               <div className="hidden sm:grid grid-cols-[1.5fr_0.5fr_0.7fr_0.5fr_auto] gap-4 py-3 px-3 bg-gray-50 rounded-t-lg text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <div>Product</div>
//                 <div className="text-left">Price</div>
//                 <div className="text-left">Quantity</div>
//                 <div className="text-left">Subtotal</div>
//                 <div className="text-right"><span className="sr-only">Remove</span></div>
//               </div>

//               {/* Cart Items List */}
//               <div className="divide-y divide-gray-200">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="py-4 px-3 grid grid-cols-1 sm:grid-cols-[1.5fr_0.5fr_0.7fr_0.5fr_auto] gap-4 sm:gap-3 items-center">
//                     {/* Product Info */}
//                     <div className="flex items-center col-span-1 sm:col-span-1">
//                       <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden border border-gray-200">
//                         <img className="h-full w-full object-cover" src={item.image} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/333333?text=Item"; }} />
//                       </div>
//                       <div className="ml-4">
//                         <Link to={`/products/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600 transition duration-200">
//                           {item.name}
//                         </Link>
//                         {/* Price on mobile (hidden on sm and up as it's in a column) */}
//                         <p className="text-xs text-gray-500 sm:hidden mt-1">Price: GH₵{item.price.toFixed(2)}</p>
//                       </div>
//                     </div>

//                     {/* Price (Desktop Only) */}
//                     <div className="text-sm text-gray-600 hidden sm:block">
//                       GH₵{item.price.toFixed(2)}
//                     </div>

//                     {/* Quantity */}
//                     <div className="flex items-center justify-between sm:justify-start col-span-1 sm:col-span-1">
//                       <span className="text-xs font-medium text-gray-500 uppercase sm:hidden">Qty:</span>
//                       <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-28">
//                         <button
//                           onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
//                           className="p-2 hover:bg-gray-100 transition duration-200 text-gray-700"
//                           disabled={item.quantity <= 1}
//                           aria-label={`Decrease quantity of ${item.name}`}
//                         >
//                           <FiMinus size={16} />
//                         </button>
//                         <span className="px-3 text-sm font-semibold text-gray-800">{item.quantity}</span>
//                         <button
//                           onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
//                           className="p-2 hover:bg-gray-100 transition duration-200 text-gray-700"
//                           aria-label={`Increase quantity of ${item.name}`}
//                         >
//                           <FiPlus size={16} />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Subtotal */}
//                     <div className="flex items-center justify-between sm:justify-start col-span-1 sm:col-span-1">
//                       <span className="text-xs font-medium text-gray-500 uppercase sm:hidden">Subtotal:</span>
//                       <span className="text-sm font-medium text-gray-900">
//                         GH₵{(item.price * item.quantity).toFixed(2)}
//                       </span>
//                     </div>

//                     {/* Remove Button */}
//                     <div className="text-right col-span-1 sm:col-span-1">
//                       <button
//                         onClick={() => removeCartItem(item.id)}
//                         className="text-gray-400 hover:text-red-600 transition duration-200 p-2 rounded-full hover:bg-gray-100"
//                         aria-label={`Remove ${item.name} from cart`}
//                       >
//                         <FiX size={20} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
//                 <Link
//                   to="/shop"
//                   className="w-full sm:w-auto text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
//                 >
//                   Return to shop
//                 </Link>
//                 <button
//                   onClick={handleUpdateCart}
//                   className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md"
//                 >
//                   Update Cart
//                 </button>
//               </div>
//             </div>

//             {/* Cart Total Summary */}
//             <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 sm:p-8 h-fit">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
//                 Cart Total
//               </h2>
//               <div className="space-y-4 text-gray-700 text-lg">
//                 <div className="flex justify-between items-center">
//                   <span>Subtotal:</span>
//                   <span className="font-semibold">GH₵{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Shipping:</span>
//                   <span className="font-semibold">GH₵{shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center pt-4 border-t border-gray-200 font-bold text-xl text-gray-900">
//                   <span>Total:</span>
//                   <span>GH₵{total.toFixed(2)}</span>
//                 </div>
//               </div>
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg mt-8 hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 Proceed to checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;


// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiX, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext'; // Import useToast

const CartPage = () => {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
  const { addToast } = useToast(); // Use the toast hook

  const handleRemoveFromCart = (productId, productName) => {
    removeFromCart(productId);
    addToast(`${productName} removed from cart.`, 'success');
  };

  const handleUpdateQuantity = (productId, newQuantity, productName) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId, productName);
      return;
    }
    updateQuantity(productId, newQuantity);
    addToast(`Quantity for ${productName} updated to ${newQuantity}.`, 'success');
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
          <span className="text-green-400 text-base font-semibold">Shopping Cart</span>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Shopping Cart ({cartCount})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/shop" className="text-green-600 hover:underline font-semibold">
              Start shopping now!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 overflow-x-auto hide-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
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
                            <Link to={`/products/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600">
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {/* Safely access currentPrice, fallback to 0 if undefined/null */}
                        GH₵{(item.currentPrice || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-28">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                            className="p-2 hover:bg-gray-100 transition duration-200 text-gray-700"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="px-3 text-sm font-semibold text-gray-800 flex-grow text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                            className="p-2 hover:bg-gray-100 transition duration-200 text-gray-700"
                            aria-label="Increase quantity"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                        {/* Safely calculate subtotal */}
                        GH₵{((item.currentPrice || 0) * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleRemoveFromCart(item.id, item.name)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <FiX size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 h-fit">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
                Cart Summary
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items):</span>
                  <span className="font-semibold text-gray-900">GH₵{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-gray-900">GH₵0.00</span> {/* Placeholder */}
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-green-700">GH₵{cartTotal}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-8 w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/shop"
                className="mt-4 w-full border border-gray-300 text-gray-700 py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
