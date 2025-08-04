// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// // Create the Cart Context
// const CartContext = createContext();

// // Custom hook to easily use the cart functions
// export const useCart = () => {
//   return useContext(CartContext);
// };

// // Cart Provider component
// export const CartProvider = ({ children }) => {
//   // Initialize cart items from localStorage or an empty array
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const localCart = localStorage.getItem('cartItems');
//       return localCart ? JSON.parse(localCart) : [];
//     } catch (error) {
//       console.error("Failed to parse cart items from localStorage", error);
//       return [];
//     }
//   });

//   // Update localStorage whenever cartItems change
//   useEffect(() => {
//     try {
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     } catch (error) {
//       console.error("Failed to save cart items to localStorage", error);
//     }
//   }, [cartItems]);

//   // Function to add an item to the cart
//   // product: the full product object
//   // quantity: number of items to add
//   const addToCart = useCallback((product, quantity = 1) => {
//     setCartItems((prevItems) => {
//       const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

//       if (existingItemIndex > -1) {
//         // If item already exists, update its quantity
//         const updatedItems = [...prevItems];
//         updatedItems[existingItemIndex] = {
//           ...updatedItems[existingItemIndex],
//           quantity: updatedItems[existingItemIndex].quantity + quantity,
//         };
//         return updatedItems;
//       } else {
//         // If item does not exist, add it as a new item
//         return [...prevItems, { ...product, quantity }];
//       }
//     });
//   }, []);

//   // Function to remove an item from the cart
//   const removeFromCart = useCallback((productId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
//   }, []);

//   // Function to update the quantity of an item
//   const updateQuantity = useCallback((productId, newQuantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === productId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   }, []);

//   // Calculate total number of items in the cart (sum of quantities)
//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   // Calculate total price of items in the cart
//   const cartTotal = cartItems.reduce((total, item) => {
//     const price = parseFloat(item.currentPrice || item.price?.replace('GH₵', '') || 0);
//     return total + (price * item.quantity);
//   }, 0).toFixed(2); // Format to 2 decimal places

//   const value = {
//     cartItems,
//     cartCount,
//     cartTotal,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
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
      // Attempt to parse. If it fails (e.g., old malformed data), return empty array.
      const parsedCart = localCart ? JSON.parse(localCart) : [];

      // Optional: Add a simple check to ensure items have a numeric currentPrice
      // This helps clean up potentially malformed old data on load
      return parsedCart.map(item => ({
        ...item,
        currentPrice: typeof item.currentPrice === 'number'
                      ? item.currentPrice
                      : parseFloat(item.price?.replace('GH₵', '') || 0) // Fallback to parsing old string 'price'
      }));

    } catch (error) {
      console.error("Failed to parse cart items from localStorage. Clearing old data.", error);
      // If parsing fails, clear localStorage for this key and return empty array
      localStorage.removeItem('cartItems');
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
        // Ensure currentPrice is numeric when adding to state
        const itemToAdd = {
          ...product,
          currentPrice: typeof product.currentPrice === 'number' ? product.currentPrice : parseFloat(product.price?.replace('GH₵', '') || 0),
          quantity
        };
        return [...prevItems, itemToAdd];
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
    // Rely on item.currentPrice which is ensured to be numeric on load/add
    const priceForCalculation = item.currentPrice || 0;
    return total + (priceForCalculation * item.quantity);
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

