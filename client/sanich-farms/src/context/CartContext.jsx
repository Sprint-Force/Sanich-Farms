import React, { createContext, useState, useContext, useEffect } from 'react';
import { productsData } from '../data/productsData'; // Import productsData to get full product info

// Create the Context
export const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
  // Initialize cartItems from localStorage or an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return [];
    }
  });

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate cartCount based on items in the cart
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Function to add item to cart or update quantity if it exists
  const addToCart = (productId, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productId);

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Item does not exist, add new item
        const productToAdd = productsData.find(p => p.id === productId);
        if (productToAdd) {
          return [...prevItems, {
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.currentPrice,
            image: productToAdd.image, // Store image path for cart display
            quantity: quantity,
          }];
        }
        console.warn(`Product with ID ${productId} not found for adding to cart.`);
        return prevItems;
      }
    });
  };

  // Function to update quantity of an existing item
  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId); // Remove if quantity is 0 or less
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Function to remove an item completely
  const removeCartItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateCartItemQuantity, removeCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easy consumption
export const useCart = () => {
  return useContext(CartContext);
};
