// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { productsData } from '../data/productsData'; // Import productsData to get full product info

// // Create the Context
// export const CartContext = createContext();

// // Create a Provider component
// export const CartProvider = ({ children }) => {
//   // Initialize cartItems from localStorage or an empty array
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const savedCart = localStorage.getItem('cartItems');
//       return savedCart ? JSON.parse(savedCart) : [];
//     } catch (error) {
//       console.error("Failed to parse cart items from localStorage", error);
//       return [];
//     }
//   });

//   // Update localStorage whenever cartItems changes
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Calculate cartCount based on items in the cart
//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   // Function to add item to cart or update quantity if it exists
//   const addToCart = (productId, quantity = 1) => {
//     setCartItems(prevItems => {
//       const existingItemIndex = prevItems.findIndex(item => item.id === productId);

//       if (existingItemIndex > -1) {
//         // Item exists, update quantity
//         const updatedItems = [...prevItems];
//         updatedItems[existingItemIndex].quantity += quantity;
//         return updatedItems;
//       } else {
//         // Item does not exist, add new item
//         const productToAdd = productsData.find(p => p.id === productId);
//         if (productToAdd) {
//           return [...prevItems, {
//             id: productToAdd.id,
//             name: productToAdd.name,
//             price: productToAdd.currentPrice,
//             image: productToAdd.image, // Store image path for cart display
//             quantity: quantity,
//           }];
//         }
//         console.warn(`Product with ID ${productId} not found for adding to cart.`);
//         return prevItems;
//       }
//     });
//   };

//   // Function to update quantity of an existing item
//   const updateCartItemQuantity = (productId, newQuantity) => {
//     setCartItems(prevItems => {
//       if (newQuantity <= 0) {
//         return prevItems.filter(item => item.id !== productId); // Remove if quantity is 0 or less
//       }
//       return prevItems.map(item =>
//         item.id === productId ? { ...item, quantity: newQuantity } : item
//       );
//     });
//   };

//   // Function to remove an item completely
//   const removeCartItem = (productId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
//   };

//   // Function to clear the entire cart
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateCartItemQuantity, removeCartItem, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook for easy consumption
// export const useCart = () => {
//   return useContext(CartContext);
// };

// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Custom hook to easily use the cart functions
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage or an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return [];
    }
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  // Function to add an item to the cart
  // product: the full product object
  // quantity: number of items to add
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // If item already exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // If item does not exist, add it as a new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  // Function to update the quantity of an item
  const updateQuantity = useCallback((productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  // Calculate total number of items in the cart (sum of quantities)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of items in the cart
  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.currentPrice || item.price?.replace('GH₵', '') || 0);
    return total + (price * item.quantity);
  }, 0).toFixed(2); // Format to 2 decimal places

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

