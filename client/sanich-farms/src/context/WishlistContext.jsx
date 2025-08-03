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
      return localWishlist ? JSON.parse(localWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist items from localStorage", error);
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
        return [...prevItems, product]; // Add the new product if it doesn't exist
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
