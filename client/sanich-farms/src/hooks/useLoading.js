import { useContext } from 'react';
import LoadingContext from '../context/LoadingContext';

/**
 * Hook to access loading context
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
