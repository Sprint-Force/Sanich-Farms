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


// // src/context/WishlistContext.jsx
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
//       // Attempt to parse. If it fails (e.g., old malformed data), return empty array.
//       const parsedWishlist = localWishlist ? JSON.parse(localWishlist) : [];

//       // Optional: Add a simple check to ensure items have a numeric currentPrice
//       // This helps clean up potentially malformed old data on load
//       return parsedWishlist.map(item => ({
//         ...item,
//         currentPrice: typeof item.currentPrice === 'number'
//                       ? item.currentPrice
//                       : parseFloat(item.price?.replace('GH₵', '') || 0) // Fallback to parsing old string 'price'
//       }));

//     } catch (error) {
//       console.error("Failed to parse wishlist items from localStorage. Clearing old data.", error);
//       // If parsing fails, clear localStorage for this key and return empty array
//       localStorage.removeItem('wishlistItems');
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
//         // Ensure currentPrice is numeric when adding to state
//         const itemToAdd = {
//           ...product,
//           currentPrice: typeof product.currentPrice === 'number' ? product.currentPrice : parseFloat(product.price?.replace('GH₵', '') || 0),
//         };
//         return [...prevItems, itemToAdd]; // Add the new product if it doesn't exist
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


import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import axios for API calls

// Create the Wishlist Context
const WishlistContext = createContext();

// Custom hook to easily use the wishlist functions
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// Define your backend API URL
const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/wishlist';

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  // State for wishlist items, loading state, and potential errors
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // You would get the user's authentication token from your AuthContext here
  // For this example, we'll use a placeholder.
  // const { token } = useAuth();
  const token = "YOUR_AUTH_TOKEN_HERE"; // Placeholder for an authenticated user

  // Function to fetch the entire wishlist from the backend
  const fetchWishlist = useCallback(async () => {
    if (!token) {
      // If there's no user token, we can't fetch a wishlist.
      setWishlistItems([]);
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
      // The API should return an array of wishlist items
      setWishlistItems(response.data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setError("Failed to load wishlist. Please log in and try again.");
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Effect to fetch the wishlist when the component mounts or the token changes
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Function to add a product to the wishlist via the API
  const addToWishlist = useCallback(async (product) => {
    if (!token) {
      setError("You must be logged in to add items to the wishlist.");
      return;
    }

    const exists = wishlistItems.some(item => item.id === product.id);
    if (exists) {
        addToast(`${product.name} is already in your wishlist!`, 'info');
        return;
    }
    
    try {
      // Send a POST request to add the item
      const response = await axios.post(BASE_URL, {
        productId: product.id,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Update the local state with the new wishlist items from the response
      setWishlistItems(response.data);
    } catch (err) {
      console.error("Failed to add item to wishlist:", err);
      setError("Failed to add item to wishlist.");
    }
  }, [token, wishlistItems]);

  // Function to remove an item from the wishlist via the API
  const removeFromWishlist = useCallback(async (productId) => {
    if (!token) {
      setError("You must be logged in to remove items.");
      return;
    }
    try {
      // Send a DELETE request to remove the item
      const response = await axios.delete(`${BASE_URL}/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Update the local state with the new wishlist items from the response
      setWishlistItems(response.data);
    } catch (err) {
      console.error("Failed to remove item from wishlist:", err);
      setError("Failed to remove item from wishlist.");
    }
  }, [token]);

  // Calculate total number of items in the wishlist
  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    loading,
    error,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
