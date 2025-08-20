import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { cartAPI } from '../services/api';

// Create the Cart Context
const CartContext = createContext();

// Custom hook to easily use the cart functions
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { isAuthenticated, user } = useAuthContext();

  // Initialize cart items from localStorage for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const localCart = localStorage.getItem('guestCartItems');
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        }
      } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
        setCartItems([]);
      }
    } else {
      // For authenticated users, also try to load from localStorage as backup
      try {
        const userCart = localStorage.getItem('userCartItems');
        if (userCart) {
          setCartItems(JSON.parse(userCart));
        }
      } catch (error) {
        console.error("Failed to parse user cart items from localStorage", error);
        setCartItems([]);
      }
    }
  }, [isAuthenticated]);

  // Fetch cart from API for authenticated users
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await cartAPI.getCart();
      
      // Handle the API response structure: {status: 'success', cart: Array}
      const cartData = response.cart || response.data || response || [];
      
      // Transform backend cart data to frontend format
      const transformedCart = Array.isArray(cartData) ? cartData.map(item => ({
        id: item.Product?.id || item.product_id,
        name: item.Product?.name || item.name,
        price: item.Product?.price || item.price,
        image: item.Product?.image_url || item.image_url || item.image,
        category: item.Product?.category || item.category,
        description: item.Product?.description || item.description,
        quantity: item.cart_quantity || item.quantity || 1
      })) : [];
      
      setCartItems(transformedCart);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load cart");
      // Fallback to localStorage for authenticated users if API fails
      try {
        const localCart = localStorage.getItem('userCartItems');
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        } else {
          setCartItems([]);
        }
      } catch (localError) {
        console.error("Failed to load local cart:", localError);
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  // Save to localStorage for guest users
  const saveGuestCart = useCallback((items) => {
    if (!isAuthenticated) {
      try {
        localStorage.setItem('guestCartItems', JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save cart items to localStorage", error);
      }
    }
  }, [isAuthenticated]);

  // Function to add an item to the cart
  const addToCart = useCallback(async (product, quantity = 1) => {
    if (isAuthenticated) {
      // For authenticated users, try API first, fallback to localStorage
      setLoading(true);
      setError(null);
      try {
        const response = await cartAPI.addToCart({
          productId: product.id,
          quantity: quantity
        });
        
        // Handle the response and update cart
        if (response.cart) {
          // Transform and set the updated cart from response
          const transformedCart = response.cart.map(item => ({
            id: item.Product?.id || item.product_id,
            name: item.Product?.name || item.name,
            price: item.Product?.price || item.price,
            image: item.Product?.image_url || item.image_url || item.image,
            category: item.Product?.category || item.category,
            description: item.Product?.description || item.description,
            quantity: item.cart_quantity || item.quantity || 1
          }));
          setCartItems(transformedCart);
        } else {
          // Refresh cart from server if no cart in response
          await fetchCart();
        }
      } catch (err) {
        console.error("Failed to add to cart via API:", err);
        setError("Failed to add item to cart. Please try again.");
        
        // Fallback to localStorage for authenticated users
        setCartItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
          let updatedItems;

          if (existingItemIndex > -1) {
            updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
          } else {
            updatedItems = [...prevItems, { ...product, quantity }];
          }

          // Save to localStorage as backup for authenticated users
          try {
            localStorage.setItem('userCartItems', JSON.stringify(updatedItems));
          } catch (localError) {
            console.error("Failed to save to localStorage:", localError);
          }
          
          return updatedItems;
        });
      } finally {
        setLoading(false);
      }
    } else {
      // For guest users, use localStorage
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
        let updatedItems;

        if (existingItemIndex > -1) {
          // If item already exists, update its quantity
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
        } else {
          // If item does not exist, add it as a new item
          updatedItems = [...prevItems, { ...product, quantity }];
        }

        saveGuestCart(updatedItems);
        return updatedItems;
      });
    }
  }, [isAuthenticated, fetchCart, saveGuestCart]);

  // Function to remove an item from the cart
  const removeFromCart = useCallback(async (productId) => {
    if (isAuthenticated) {
      // For authenticated users, use API
      setLoading(true);
      setError(null);
      try {
        const response = await cartAPI.removeFromCart(productId);
        
        // Handle the response and update cart
        if (response.cart) {
          // Transform and set the updated cart from response
          const transformedCart = response.cart.map(item => ({
            id: item.Product?.id || item.product_id,
            name: item.Product?.name || item.name,
            price: item.Product?.price || item.price,
            image: item.Product?.image_url || item.image_url || item.image,
            category: item.Product?.category || item.category,
            description: item.Product?.description || item.description,
            quantity: item.cart_quantity || item.quantity || 1
          }));
          setCartItems(transformedCart);
        } else {
          // Refresh cart from server if no cart in response
          await fetchCart();
        }
      } catch (err) {
        console.error("Failed to remove from cart:", err);
        setError("Failed to remove item from cart. Please try again.");
        
        // Fallback to local removal for authenticated users
        setCartItems((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== productId);
          try {
            localStorage.setItem('userCartItems', JSON.stringify(updatedItems));
          } catch (localError) {
            console.error("Failed to save to localStorage:", localError);
          }
          return updatedItems;
        });
      } finally {
        setLoading(false);
      }
    } else {
      // For guest users, use localStorage
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== productId);
        saveGuestCart(updatedItems);
        return updatedItems;
      });
    }
  }, [isAuthenticated, fetchCart, saveGuestCart]);

  // Function to update the quantity of an item in the cart
  const updateCartItemQuantity = useCallback(async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      // For authenticated users, use API
      setLoading(true);
      setError(null);
      try {
        const response = await cartAPI.updateCartItem(productId, { quantity: newQuantity });
        
        // Handle the response and update cart
        if (response.cart) {
          // Transform and set the updated cart from response
          const transformedCart = response.cart.map(item => ({
            id: item.Product?.id || item.product_id,
            name: item.Product?.name || item.name,
            price: item.Product?.price || item.price,
            image: item.Product?.image_url || item.image_url || item.image,
            category: item.Product?.category || item.category,
            description: item.Product?.description || item.description,
            quantity: item.cart_quantity || item.quantity || 1
          }));
          setCartItems(transformedCart);
        } else {
          // Refresh cart from server if no cart in response
          await fetchCart();
        }
      } catch (err) {
        console.error("Failed to update cart item:", err);
        setError("Failed to update item quantity. Please try again.");
        
        // Fallback to local update for authenticated users
        setCartItems((prevItems) => {
          const updatedItems = prevItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          );
          try {
            localStorage.setItem('userCartItems', JSON.stringify(updatedItems));
          } catch (localError) {
            console.error("Failed to save to localStorage:", localError);
          }
          return updatedItems;
        });
      } finally {
        setLoading(false);
      }
    } else {
      // For guest users, use localStorage
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        saveGuestCart(updatedItems);
        return updatedItems;
      });
    }
  }, [isAuthenticated, removeFromCart, fetchCart, saveGuestCart]);

  // Function to clear the entire cart
  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      // For authenticated users, use API
      setLoading(true);
      setError(null);
      try {
        await cartAPI.clearCart();
        setCartItems([]);
        // Also clear localStorage backup
        localStorage.removeItem('userCartItems');
      } catch (err) {
        console.error("Failed to clear cart:", err);
        setError("Failed to clear cart. Please try again.");
        
        // Fallback to local clear for authenticated users
        setCartItems([]);
        localStorage.removeItem('userCartItems');
      } finally {
        setLoading(false);
      }
    } else {
      // For guest users, clear localStorage
      setCartItems([]);
      localStorage.removeItem('guestCartItems');
    }
  }, [isAuthenticated]);

  // Migrate guest cart to authenticated user when they log in
  const migrateGuestCart = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const guestCart = localStorage.getItem('guestCartItems');
      if (guestCart) {
        const guestItems = JSON.parse(guestCart);
        
        // Add each guest cart item to the authenticated user's cart
        for (const item of guestItems) {
          await cartAPI.addToCart({
            productId: item.id,
            quantity: item.quantity
          });
        }

        // Clear guest cart and fetch updated cart
        localStorage.removeItem('guestCartItems');
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to migrate guest cart:", error);
    }
  }, [isAuthenticated, fetchCart]);

  // Migrate guest cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      migrateGuestCart();
    }
  }, [isAuthenticated, user, migrateGuestCart]);

  // Calculate total price of items in cart
  const getTotalPrice = useCallback(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  }, [cartItems]);

  // Get total number of items in cart
  const getTotalItems = useCallback(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
      return total + (parseInt(item.quantity) || 0);
    }, 0);
  }, [cartItems]);

  // Check if a product is in the cart
  const isInCart = useCallback((productId) => {
    return cartItems.some((item) => item.id === productId);
  }, [cartItems]);

  // Get quantity of a specific product in cart
  const getItemQuantity = useCallback((productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart,
    getItemQuantity,
    fetchCart,
    // Aliases for backward compatibility
    cartCount: getTotalItems(),
    cartTotal: getTotalPrice()
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
