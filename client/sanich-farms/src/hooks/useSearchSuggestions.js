import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

// Navigation
export const useSearchSuggestions = (query, debounceMs = 300) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // Search suggestions API call
        const response = await productsAPI.getAll({ 
          search: query, 
          limit: 5 
        });
        setSuggestions(response.products || []);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  return { suggestions, loading };
};
