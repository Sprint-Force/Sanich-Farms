import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiX, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, getTotalPrice, getTotalItems } = useCart();
  const { addToast } = useToast();

  const handleRemoveFromCart = (productId, productName) => {
    removeFromCart(productId);
    addToast(`${productName} removed from cart.`, 'success');
  };

  const handleUpdateQuantity = (productId, newQuantity, productName) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId, productName);
      return;
    }
    updateCartItemQuantity(productId, newQuantity);
    addToast(`Quantity for ${productName} updated to ${newQuantity}.`, 'success');
  };

  // Calculate totals
  const cartTotal = getTotalPrice();
  const cartCount = getTotalItems();

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
            
            {/* --- Mobile Cart Items List --- */}
            <div className="lg:hidden">
              <div className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 relative">
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 h-20 w-20">
                        <img
                          className="h-full w-full rounded-md object-cover"
                          src={item.image || item.images?.[0]}
                          alt={item.name}
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/333333?text=Item"; }}
                        />
                      </div>
                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-center pr-6">
                        <Link to={`/products/${item.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600 line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    
                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-24 h-8">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                          className="w-8 h-full hover:bg-gray-100 transition duration-200 text-gray-700 flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-800 flex-grow text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                          className="w-8 h-full hover:bg-gray-100 transition duration-200 text-gray-700 flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      {/* Subtotal */}
                      <span className="text-sm font-semibold text-gray-900">
                        GH₵{((item.currentPrice || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromCart(item.id, item.name)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Desktop Cart Items List --- */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 hidden lg:block">
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
                      <td className="px-4 py-4">
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
                      <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                        GH₵{((item.currentPrice || 0) * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium">
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

            {/* Cart Summary (Desktop) */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8 h-fit hidden lg:block">
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
                  <span className="font-semibold text-gray-900">GH₵0.00</span>
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

      {/* Sticky Summary for Mobile */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white lg:hidden shadow-lg border-t border-gray-100 z-50">
          <div className="p-4 flex flex-col items-center">
            <div className="flex justify-between w-full mb-3 text-lg font-bold">
              <span>Subtotal ({cartCount} items):</span>
              <span className="text-green-700">GH₵{cartTotal}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;