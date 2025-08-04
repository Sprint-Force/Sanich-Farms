// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// // Create the Wishlist Context
// const WishlistContext = createContext();

// // Custom hook to easily use the wishlist functions
// export const useWishlist = () => {
//   return useContext(WishlistContext);
// };

// // Wishlist Provider component
// export const WishlistProvider = ({ children }) => {
//   // Initialize wishlist items from localStorage or an empty array
//   const [wishlistItems, setWishlistItems] = useState(() => {
//     try {
//       const localWishlist = localStorage.getItem('wishlistItems');
//       return localWishlist ? JSON.parse(localWishlist) : [];
//     } catch (error) {
//       console.error("Failed to parse wishlist items from localStorage", error);
//       return [];
//     }
//   });

//   // Update localStorage whenever wishlistItems change
//   useEffect(() => {
//     try {
//       localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
//     } catch (error) {
//       console.error("Failed to save wishlist items to localStorage", error);
//     }
//   }, [wishlistItems]);

//   // Function to add an item to the wishlist
//   // product: the full product object
//   const addToWishlist = useCallback((product) => {
//     setWishlistItems((prevItems) => {
//       // Check if the item already exists in the wishlist to prevent duplicates
//       const exists = prevItems.some((item) => item.id === product.id);
//       if (!exists) {
//         return [...prevItems, product]; // Add the new product if it doesn't exist
//       }
//       return prevItems; // Return current items if product already exists
//     });
//   }, []);

//   // Function to remove an item from the wishlist
//   const removeFromWishlist = useCallback((productId) => {
//     setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
//   }, []);

//   // Calculate total number of items in the wishlist
//   const wishlistCount = wishlistItems.length;

//   const value = {
//     wishlistItems,
//     wishlistCount,
//     addToWishlist,
//     removeFromWishlist,
//   };

//   return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
// };


// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the Wishlist Context
const WishlistContext = createContext();

// Custom hook to easily use the wishlist functions
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  // Initialize wishlist items from localStorage or an empty array
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const localWishlist = localStorage.getItem('wishlistItems');
      // Attempt to parse. If it fails (e.g., old malformed data), return empty array.
      const parsedWishlist = localWishlist ? JSON.parse(localWishlist) : [];

      // Optional: Add a simple check to ensure items have a numeric currentPrice
      // This helps clean up potentially malformed old data on load
      return parsedWishlist.map(item => ({
        ...item,
        currentPrice: typeof item.currentPrice === 'number'
                      ? item.currentPrice
                      : parseFloat(item.price?.replace('GH₵', '') || 0) // Fallback to parsing old string 'price'
      }));

    } catch (error) {
      console.error("Failed to parse wishlist items from localStorage. Clearing old data.", error);
      // If parsing fails, clear localStorage for this key and return empty array
      localStorage.removeItem('wishlistItems');
      return [];
    }
  });

  // Update localStorage whenever wishlistItems change
  useEffect(() => {
    try {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to save wishlist items to localStorage", error);
    }
  }, [wishlistItems]);

  // Function to add an item to the wishlist
  // product: the full product object
  const addToWishlist = useCallback((product) => {
    setWishlistItems((prevItems) => {
      // Check if the item already exists in the wishlist to prevent duplicates
      const exists = prevItems.some((item) => item.id === product.id);
      if (!exists) {
        // Ensure currentPrice is numeric when adding to state
        const itemToAdd = {
          ...product,
          currentPrice: typeof product.currentPrice === 'number' ? product.currentPrice : parseFloat(product.price?.replace('GH₵', '') || 0),
        };
        return [...prevItems, itemToAdd]; // Add the new product if it doesn't exist
      }
      return prevItems; // Return current items if product already exists
    });
  }, []);

  // Function to remove an item from the wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  // Calculate total number of items in the wishlist
  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
