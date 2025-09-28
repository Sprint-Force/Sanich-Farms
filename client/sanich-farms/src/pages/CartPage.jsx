import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiX, FiMinus, FiPlus, FiShoppingCart, FiTrash2, FiPackage, FiTruck, FiShield, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ConfirmationModal from '../components/UI/ConfirmationModal';

// Modern Lazy Image Component for Cart Items
const LazyCartImage = ({ src, alt, className, onError }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {!isLoaded && (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-all duration-300 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } rounded-xl object-cover shadow-sm hover:shadow-md transition-shadow duration-300`}
          onLoad={() => setIsLoaded(true)}
          onError={onError}
        />
      )}
    </div>
  );
};

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, getTotalPrice, getTotalItems } = useCart();
  const { addToast } = useToast();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveFromCart = (productId, productName) => {
    setItemToRemove({ id: productId, name: productName });
    setShowConfirmModal(true);
  };

  const confirmRemoveFromCart = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      addToast(`${itemToRemove.name} removed from cart.`, 'success');
      setShowConfirmModal(false);
      setItemToRemove(null);
    }
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
    <div className="font-poppins bg-gradient-to-br from-gray-50 via-white to-blue-50/20 min-h-screen">
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

      {/* Compact Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-md mb-2">
            <FiShoppingCart className="w-5 h-5" />
            <h1 className="text-xl sm:text-2xl font-bold">Shopping Cart</h1>
          </div>
          {cartItems.length > 0 && (
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-green-600">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span> in your cart
            </p>
          )}
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {cartItems.length === 0 ? (
          /* Compact Empty Cart State */
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-sm mx-auto">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <FiShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Discover our products and start shopping!
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FiPackage className="w-4 h-4" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            
            {/* Cart Items List - Optimized for space */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-3 sm:p-4 hover:shadow-lg transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      {/* Product Image - Smaller on mobile */}
                      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0">
                        <LazyCartImage
                          className="w-full h-full"
                          src={item.image_url || item.image || item.images?.[0] || "https://placehold.co/80x80/e5e7eb/6b7280?text=Product"}
                          alt={item.name}
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/e5e7eb/6b7280?text=Product"; }}
                        />
                      </div>
                      
                      {/* Product Info - Compact */}
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <Link 
                            to={`/products/${item.id}`} 
                            className="text-sm sm:text-base font-semibold text-gray-900 hover:text-green-600 line-clamp-2 transition-colors duration-200 pr-2"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => handleRemoveFromCart(item.id, item.name)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Compact Category and Unit Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100 to-green-100 text-gray-700 px-2 py-1 rounded text-xs w-fit">
                            <FiPackage className="w-3 h-3" />
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            GH₵{parseFloat(item.price || item.currentPrice || 0).toFixed(2)} each
                          </span>
                        </div>
                        
                        {/* Mobile: Compact Stacked Layout */}
                        <div className="flex flex-col gap-2 sm:hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Qty:</span>
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                                className="w-6 h-6 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200 text-gray-700 flex items-center justify-center"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <span className="px-2 py-1 text-sm font-bold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                                className="w-6 h-6 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200 text-gray-700 flex items-center justify-center"
                                aria-label="Increase quantity"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                            <span className="text-xs text-gray-600">Total:</span>
                            <div className="text-base font-bold text-green-600">
                              GH₵{(parseFloat(item.price || item.currentPrice || 0) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Desktop/Tablet: Horizontal Layout */}
                        <div className="hidden sm:flex items-center justify-between">
                          <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                              className="w-7 h-7 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-gray-700 flex items-center justify-center shadow-sm"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                              className="w-7 h-7 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-gray-700 flex items-center justify-center shadow-sm"
                              aria-label="Increase quantity"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div className="text-lg font-bold text-green-600">
                            GH₵{(parseFloat(item.price || item.currentPrice || 0) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Compact Cart Summary */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 h-fit sticky top-8">
              <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiCreditCard className="w-5 h-5 text-blue-600" />
                  Order Summary
                </h2>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal ({cartCount} items):</span>
                  <span className="font-semibold text-gray-900">GH₵{cartTotal}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <FiTruck className="w-3 h-3" />
                    Shipping:
                  </span>
                  <span className="text-xs font-medium text-blue-600">Calculated at checkout</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-800">Subtotal:</span>
                    <span className="text-gray-800">GH₵{cartTotal}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    *Shipping fees apply at checkout
                  </div>
                </div>
              </div>
              
              {/* Compact Trust Indicator */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <FiShield className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Secure checkout protection</span>
                </div>
              </div>
              
              {/* Compact Action Buttons */}
              <div className="space-y-2">
                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FiCreditCard className="w-4 h-4" />
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/shop"
                  className="w-full border border-gray-300 hover:border-green-400 text-gray-700 hover:text-green-700 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-green-50"
                >
                  <FiPackage className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Elements */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FiShield className="w-3 h-3 text-green-600" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiTruck className="w-3 h-3 text-blue-600" />
                    <span>3rd Party Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white lg:hidden shadow-xl border-t border-gray-200 z-50">
          <div className="p-3 pb-safe">
            <div className="flex justify-between items-center mb-2">
              <div className="flex-grow">
                <div className="text-xs text-gray-600">Subtotal ({cartCount} items)</div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">GH₵{cartTotal}</div>
                <div className="text-xs text-gray-500">+ shipping at checkout</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 ml-3">
                <FiShield className="w-3 h-3 text-green-600" />
                <span className="hidden xs:inline">Secure</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300"
            >
              <FiCreditCard className="w-4 h-4" />
              Checkout Now
            </Link>
          </div>
        </div>
      )}
      
      {/* Add bottom padding for mobile sticky summary */}
      {cartItems.length > 0 && <div className="h-28 sm:h-32 lg:hidden"></div>}
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmRemoveFromCart}
        type="warning"
        title="Remove from Cart"
        message={`Are you sure you want to remove "${itemToRemove?.name}" from your cart?`}
        confirmButtonText="Remove"
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default CartPage;