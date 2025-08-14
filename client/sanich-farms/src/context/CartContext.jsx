// // import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// // // Create the Cart Context
// // const CartContext = createContext();

// // // Custom hook to easily use the cart functions
// // export const useCart = () => {
// //   return useContext(CartContext);
// // };

// // // Cart Provider component
// // export const CartProvider = ({ children }) => {
// //   // Initialize cart items from localStorage or an empty array
// //   const [cartItems, setCartItems] = useState(() => {
// //     try {
// //       const localCart = localStorage.getItem('cartItems');
// //       return localCart ? JSON.parse(localCart) : [];
// //     } catch (error) {
// //       console.error("Failed to parse cart items from localStorage", error);
// //       return [];
// //     }
// //   });

// //   // Update localStorage whenever cartItems change
// //   useEffect(() => {
// //     try {
// //       localStorage.setItem('cartItems', JSON.stringify(cartItems));
// //     } catch (error) {
// //       console.error("Failed to save cart items to localStorage", error);
// //     }
// //   }, [cartItems]);

// //   // Function to add an item to the cart
// //   // product: the full product object
// //   // quantity: number of items to add
// //   const addToCart = useCallback((product, quantity = 1) => {
// //     setCartItems((prevItems) => {
// //       const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

// //       if (existingItemIndex > -1) {
// //         // If item already exists, update its quantity
// //         const updatedItems = [...prevItems];
// //         updatedItems[existingItemIndex] = {
// //           ...updatedItems[existingItemIndex],
// //           quantity: updatedItems[existingItemIndex].quantity + quantity,
// //         };
// //         return updatedItems;
// //       } else {
// //         // If item does not exist, add it as a new item
// //         return [...prevItems, { ...product, quantity }];
// //       }
// //     });
// //   }, []);

// //   // Function to remove an item from the cart
// //   const removeFromCart = useCallback((productId) => {
// //     setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
// //   }, []);

// //   // Function to update the quantity of an item
// //   const updateQuantity = useCallback((productId, newQuantity) => {
// //     setCartItems((prevItems) =>
// //       prevItems.map((item) =>
// //         item.id === productId ? { ...item, quantity: newQuantity } : item
// //       )
// //     );
// //   }, []);

// //   // Calculate total number of items in the cart (sum of quantities)
// //   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

// //   // Calculate total price of items in the cart
// //   const cartTotal = cartItems.reduce((total, item) => {
// //     const price = parseFloat(item.currentPrice || item.price?.replace('GH₵', '') || 0);
// //     return total + (price * item.quantity);
// //   }, 0).toFixed(2); // Format to 2 decimal places

// //   const value = {
// //     cartItems,
// //     cartCount,
// //     cartTotal,
// //     addToCart,
// //     removeFromCart,
// //     updateQuantity,
// //   };

// //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // };


// // src/context/CartContext.jsx
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
//       // Attempt to parse. If it fails (e.g., old malformed data), return empty array.
//       const parsedCart = localCart ? JSON.parse(localCart) : [];

//       // Optional: Add a simple check to ensure items have a numeric currentPrice
//       // This helps clean up potentially malformed old data on load
//       return parsedCart.map(item => ({
//         ...item,
//         currentPrice: typeof item.currentPrice === 'number'
//                       ? item.currentPrice
//                       : parseFloat(item.price?.replace('GH₵', '') || 0) // Fallback to parsing old string 'price'
//       }));

//     } catch (error) {
//       console.error("Failed to parse cart items from localStorage. Clearing old data.", error);
//       // If parsing fails, clear localStorage for this key and return empty array
//       localStorage.removeItem('cartItems');
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
//         // Ensure currentPrice is numeric when adding to state
//         const itemToAdd = {
//           ...product,
//           currentPrice: typeof product.currentPrice === 'number' ? product.currentPrice : parseFloat(product.price?.replace('GH₵', '') || 0),
//           quantity
//         };
//         return [...prevItems, itemToAdd];
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
//     // Rely on item.currentPrice which is ensured to be numeric on load/add
//     const priceForCalculation = item.currentPrice || 0;
//     return total + (priceForCalculation * item.quantity);
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

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import axios for API calls

// Create the Cart Context
const CartContext = createContext();

// Custom hook to easily use the cart functions
export const useCart = () => {
  return useContext(CartContext);
};

// Define your backend API URL
const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/cart';

export const CartProvider = ({ children }) => {
  // We'll use state to manage cart data, loading state, and potential errors
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // You would get the user's authentication token from your AuthContext here
  // For this example, we'll use a placeholder.
  // const { token } = useAuth();
  const token = "YOUR_AUTH_TOKEN_HERE"; // Placeholder for an authenticated user

  // Function to fetch the entire cart from the backend
  const fetchCart = useCallback(async () => {
    if (!token) {
      // If there's no user token, we can't fetch a cart.
      // We'll just reset to an empty cart.
      setCartItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}` // Pass the auth token in the headers
        }
      });
      // The API should return an array of cart items
      setCartItems(response.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load cart. Please log in and try again.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Effect to fetch the cart when the component mounts or the token changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Function to add a product to the cart via the API
  const addToCart = useCallback(async (product, quantity = 1) => {
    if (!token) {
      setError("You must be logged in to add items to the cart.");
      return;
    }
    try {
      // Send a POST request to add the item
      const response = await axios.post(BASE_URL, {
        productId: product.id,
        quantity: quantity
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Update the local state with the new cart items from the response
      setCartItems(response.data);
      return true;
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      setError("Failed to add item to cart.");
      return false;
    }
  }, [token]);

  // Function to remove an item from the cart via the API
  const removeFromCart = useCallback(async (productId) => {
    if (!token) {
      setError("You must be logged in to remove items.");
      return;
    }
    try {
      // Send a DELETE request to remove the item
      const response = await axios.delete(`${BASE_URL}/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Update the local state with the new cart items from the response
      setCartItems(response.data);
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
      setError("Failed to remove item from cart.");
    }
  }, [token]);

  // Function to update the quantity of an item via the API
  const updateQuantity = useCallback(async (productId, newQuantity) => {
    if (!token) {
      setError("You must be logged in to update your cart.");
      return;
    }
    try {
      // Send a PATCH request to update the quantity
      const response = await axios.patch(`${BASE_URL}/${productId}`, {
        quantity: newQuantity
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Update the local state with the new cart items from the response
      setCartItems(response.data);
    } catch (err) {
      console.error("Failed to update item quantity:", err);
      setError("Failed to update item quantity.");
    }
  }, [token]);

  // Calculate total number of items in the cart (sum of quantities)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of items in the cart
  const cartTotal = cartItems.reduce((total, item) => {
    const priceForCalculation = item.currentPrice || 0;
    return total + (priceForCalculation * item.quantity);
  }, 0).toFixed(2);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    loading,
    error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
