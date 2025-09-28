/**
 * Social Sharing Utilities
 * Provides functions to generate share URLs for various social platforms
 */

/**
 * Generates sharing URLs for different social platforms
 * @param {string} url - The URL to share
 * @param {string} title - The title/text to share
 * @param {string} description - Optional description for some platforms
 * @returns {Object} Object containing URLs for different platforms
 */
export const generateShareUrls = (url, title, description = '') => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0D%0A${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`
  };
};

/**
 * Opens a share URL in a popup window
 * @param {string} url - The sharing URL to open
 * @param {string} platform - The platform name for window naming
 */
export const openShareWindow = (url, platform) => {
  const width = 600;
  const height = 400;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  
  window.open(
    url,
    `share-${platform}`,
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
};

/**
 * Copies text to clipboard with fallback support
 * @param {string} text - Text to copy to clipboard
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    // Modern browsers with Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    return false;
  }
};

/**
 * Generates default sharing content for the current page
 * @returns {Object} Object with url, title, and description
 */
export const getCurrentPageShareData = () => {
  return {
    url: window.location.href,
    title: document.title || 'Sanich Farms - Quality Poultry Products',
    description: document.querySelector('meta[name="description"]')?.content || 
                'Discover quality poultry products and services at Sanich Farms. Fresh eggs, healthy chicks, premium feed and more.'
  };
};

/**
 * Generates product-specific sharing data
 * @param {Object} product - Product object
 * @returns {Object} Object with url, title, and description
 */
export const getProductShareData = (product) => {
  const baseUrl = window.location.origin;
  return {
    url: `${baseUrl}/products/${product.id}`,
    title: `${product.name} - Sanich Farms`,
    description: product.description || `Check out this quality ${product.name} from Sanich Farms - your trusted poultry partner.`
  };
};

/**
 * Formats share count for display
 * @param {number} count - The share count
 * @returns {string} Formatted count string
 */
export const formatShareCount = (count) => {
  if (count < 1000) return count.toString();
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
  return `${(count / 1000000).toFixed(1)}M`;
};
