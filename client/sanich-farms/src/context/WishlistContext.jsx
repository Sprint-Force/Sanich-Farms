import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { wishlistAPI } from '../services/api';

// Create the Wishlist Context
const WishlistContext = createContext();

// Custom hook to easily use the wishlist functions
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { isAuthenticated, user } = useAuthContext();

  // Initialize wishlist items from localStorage for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        const localWishlist = localStorage.getItem('guestWishlistItems');
        if (localWishlist) {
          setWishlistItems(JSON.parse(localWishlist));
        }
      } catch (error) {
        console.error("Failed to parse wishlist items from localStorage", error);
        setWishlistItems([]);
      }
    } else {
      // For authenticated users, also try to load from localStorage as backup
      try {
        const userWishlist = localStorage.getItem('userWishlistItems');
        if (userWishlist) {
          setWishlistItems(JSON.parse(userWishlist));
        }
      } catch (error) {
        console.error("Failed to parse user wishlist items from localStorage", error);
        setWishlistItems([]);
      }
    }
  }, [isAuthenticated]);

  // Fetch wishlist from API for authenticated users
  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await wishlistAPI.getWishlist();
      console.log("Wishlist API response:", response);
      setWishlistItems(response.data || response || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setError("Failed to load wishlist");
      // Fallback to localStorage for authenticated users if API fails
      try {
        const localWishlist = localStorage.getItem('userWishlistItems');
        if (localWishlist) {
          setWishlistItems(JSON.parse(localWishlist));
        } else {
          setWishlistItems([]);
        }
      } catch (localError) {
        console.error("Failed to load local wishlist:", localError);
        setWishlistItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);

  // Save to localStorage for guest users
  const saveGuestWishlist = useCallback((items) => {
    if (!isAuthenticated) {
      try {
        localStorage.setItem('guestWishlistItems', JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save wishlist items to localStorage", error);
      }
    }
  }, [isAuthenticated]);

  // Function to add an item to the wishlist
  const addToWishlist = useCallback(async (product) => {
    if (isAuthenticated) {
      // For authenticated users, try API first, fallback to localStorage
      setLoading(true);
      try {
        await wishlistAPI.addToWishlist({ productId: product.id });
        // Refresh wishlist from server
        await fetchWishlist();
      } catch (err) {
        console.error("Failed to add to wishlist via API:", err);
        // Fallback to localStorage for authenticated users
        setWishlistItems((prevItems) => {
          // Check if the item already exists in the wishlist to prevent duplicates
          const exists = prevItems.some((item) => item.id === product.id);
          if (!exists) {
            const updatedItems = [...prevItems, product];
            // Save to localStorage as backup for authenticated users
            try {
              localStorage.setItem('userWishlistItems', JSON.stringify(updatedItems));
            } catch (localError) {
              console.error("Failed to save to localStorage:", localError);
            }
            return updatedItems;
          }
          return prevItems; // Return current items if product already exists
        });
        setError("Added to wishlist (offline mode)");
      } finally {
        setLoading(false);
      }
    } else {
      // For guest users, use localStorage
      setWishlistItems((prevItems) => {
        // Check if the item already exists in the wishlist to prevent duplicates
        const exists = prevItems.some((item) => item.id === product.id);
        if (!exists) {
          const updatedItems = [...prevItems, product];
          saveGuestWishlist(updatedItems);
          return updatedItems;
        }
        return prevItems; // Return current items if product already exists
      });
    }
  }, [isAuthenticated, fetchWishlist, saveGuestWishlist]);

  // Function to remove an item from the wishlist
  const removeFromWishlist = useCallback(async (productId) => {
    if (isAuthenticated) {
      // For authenticated users, use API
      setLoading(true);
      try {
        await wishlistAPI.removeFromWishlist(productId);
        await fetchWishlist();
      } catch (err) {
        console.error("Failed to remove from wishlist:", err);
        setError("Failed to remove item from wishlist");
      } finally {
        setLoading(false);
      }
    } else {
      // For guest users, use localStorage
      setWishlistItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== productId);
        saveGuestWishlist(updatedItems);
        return updatedItems;
      });
    }
  }, [isAuthenticated, fetchWishlist, saveGuestWishlist]);

  // Function to clear the entire wishlist
  const clearWishlist = useCallback(async () => {
    if (isAuthenticated) {
      // For authenticated users, use API
      setLoading(true);
      try {
        await wishlistAPI.clearWishlist();
        setWishlistItems([]);
      } catch (err) {
        console.error("Failed to clear wishlist:", err);
        setError("Failed to clear wishlist");
      } finally {
        setLoading(false);
      }
    } else {
      // For guest users, clear localStorage
      setWishlistItems([]);
      localStorage.removeItem('guestWishlistItems');
    }
  }, [isAuthenticated]);

  // Migrate guest wishlist to authenticated user when they log in
  const migrateGuestWishlist = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const guestWishlist = localStorage.getItem('guestWishlistItems');
      if (guestWishlist) {
        const guestItems = JSON.parse(guestWishlist);
        
        // Add each guest wishlist item to the authenticated user's wishlist
        for (const item of guestItems) {
          await wishlistAPI.addToWishlist({ productId: item.id });
        }

        // Clear guest wishlist and fetch updated wishlist
        localStorage.removeItem('guestWishlistItems');
        await fetchWishlist();
      }
    } catch (error) {
      console.error("Failed to migrate guest wishlist:", error);
    }
  }, [isAuthenticated, fetchWishlist]);

  // Migrate guest wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      migrateGuestWishlist();
    }
  }, [isAuthenticated, user, migrateGuestWishlist]);

  // Check if a product is in the wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some((item) => item.id === productId);
  }, [wishlistItems]);

  // Toggle wishlist - add if not present, remove if present
  const toggleWishlist = useCallback(async (product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  // Get total number of items in wishlist
  const getTotalWishlistItems = useCallback(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  const value = {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    toggleWishlist,
    getTotalWishlistItems,
    fetchWishlist,
    // Alias for backward compatibility
    wishlistCount: getTotalWishlistItems()
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
