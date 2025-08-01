import React, { createContext, useState, useContext, useEffect } from 'react';
import { productsData } from '../data/productsData'; // Import productsData to get full product info

// Create the Context
export const WishlistContext = createContext();

// Create a Provider component
export const WishlistProvider = ({ children }) => {
  // Initialize wishlistItems from localStorage or an empty array
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlistItems');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist items from localStorage", error);
      return [];
    }
  });

  // Update localStorage whenever wishlistItems changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Calculate wishlistCount based on items in the wishlist
  const wishlistCount = wishlistItems.length;

  // Function to add item to wishlist
  const addToWishlist = (productId) => {
    setWishlistItems(prevItems => {
      // Check if item already exists in wishlist
      if (prevItems.some(item => item.id === productId)) {
        console.log(`Product ${productId} is already in wishlist.`);
        return prevItems; // Don't add if already there
      }

      const productToAdd = productsData.find(p => p.id === productId);
      if (productToAdd) {
        return [...prevItems, {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.currentPrice,
          oldPrice: productToAdd.oldPrice, // Include old price for display
          image: productToAdd.image, // Store image path for wishlist display
          inStock: true, // Placeholder for stock status (you'd get this from actual product data)
        }];
      }
      console.warn(`Product with ID ${productId} not found for adding to wishlist.`);
      return prevItems;
    });
  };

  // Function to remove an item completely from wishlist
  const removeWishlistItem = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Function to clear the entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistCount, addToWishlist, removeWishlistItem, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for easy consumption
export const useWishlist = () => {
  return useContext(WishlistContext);
};
