import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'recentlyViewedProducts';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load recently viewed items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentlyViewed(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load recently viewed items from localStorage:', error);
      setRecentlyViewed([]);
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  const saveToStorage = useCallback((items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save recently viewed items to localStorage:', error);
    }
  }, []);

  // Add a product to recently viewed
  const addToRecentlyViewed = useCallback((product) => {
    if (!product || !product.id) {
      console.warn('Invalid product passed to addToRecentlyViewed');
      return;
    }

    setRecentlyViewed((prev) => {
      // Remove the product if it already exists (to avoid duplicates)
      const filtered = prev.filter(item => item.id !== product.id);
      
      // Add the product to the beginning of the array
      const updated = [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          image_url: product.image_url || product.image,
          category: product.category,
          rating: product.rating,
          reviews: product.reviews,
          is_available: product.is_available,
          viewedAt: new Date().toISOString()
        },
        ...filtered
      ].slice(0, MAX_ITEMS); // Keep only the most recent MAX_ITEMS
      
      // Save to localStorage
      saveToStorage(updated);
      
      return updated;
    });
  }, [saveToStorage]);

  // Remove a specific product from recently viewed
  const removeFromRecentlyViewed = useCallback((productId) => {
    setRecentlyViewed((prev) => {
      const updated = prev.filter(item => item.id !== productId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Clear all recently viewed items
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear recently viewed items from localStorage:', error);
    }
  }, []);

  // Get recently viewed items (with optional limit)
  const getRecentlyViewed = useCallback((limit = MAX_ITEMS) => {
    return recentlyViewed.slice(0, limit);
  }, [recentlyViewed]);

  // Check if a product is in recently viewed
  const isRecentlyViewed = useCallback((productId) => {
    return recentlyViewed.some(item => item.id === productId);
  }, [recentlyViewed]);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
    getRecentlyViewed,
    isRecentlyViewed,
    count: recentlyViewed.length
  };
};

export default useRecentlyViewed;
