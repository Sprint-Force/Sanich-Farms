import React, { createContext, useState } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

/**
 * Loading Context for global loading state management
 * Lightweight and performant - only renders when needed
 */
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  const showLoading = (text = 'Loading...') => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const value = {
    isLoading,
    showLoading,
    hideLoading,
    loadingText
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <LoadingSpinner 
          overlay={true} 
          size="large" 
          color="green" 
          text={loadingText}
        />
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
