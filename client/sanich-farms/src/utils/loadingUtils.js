import { useLoading } from '../hooks/useLoading';

/**
 * Higher-order function to wrap API calls with loading states
 * This prevents the need to manually show/hide loading for every API call
 */
export const withLoading = (apiCall, loadingText = 'Loading...') => {
  return async (showLoading, hideLoading, ...args) => {
    try {
      showLoading(loadingText);
      return await apiCall(...args);
    } finally {
      hideLoading();
    }
  };
};

/**
 * Custom hook for API calls with loading states
 */
export const useApiWithLoading = () => {
  const { showLoading, hideLoading } = useLoading();
  
  const callWithLoading = async (apiCall, loadingText = 'Loading...') => {
    try {
      showLoading(loadingText);
      return await apiCall();
    } finally {
      hideLoading();
    }
  };

  return { callWithLoading, showLoading, hideLoading };
};
