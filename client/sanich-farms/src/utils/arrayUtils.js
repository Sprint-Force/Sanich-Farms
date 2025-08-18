/**
 * Utility functions for safe array operations
 */

/**
 * Safely slice an array-like object
 * @param {any} arrayLike - The array or array-like object to slice
 * @param {number} start - The start index (default: 0)
 * @param {number} end - The end index (optional)
 * @returns {Array} - A new array with the sliced elements
 */
export const safeSlice = (arrayLike, start = 0, end = undefined) => {
  // Check if it's already an array
  if (Array.isArray(arrayLike)) {
    return arrayLike.slice(start, end);
  }
  
  // Check if it's null or undefined
  if (arrayLike == null) {
    console.warn('safeSlice: Attempted to slice null or undefined value, returning empty array');
    return [];
  }
  
  // Check if it has a slice method (string, array-like objects)
  if (typeof arrayLike.slice === 'function') {
    return arrayLike.slice(start, end);
  }
  
  // Try to convert to array first
  try {
    const converted = Array.from(arrayLike);
    return converted.slice(start, end);
  } catch (error) {
    console.warn('safeSlice: Could not convert to array:', arrayLike, error);
    return [];
  }
};

/**
 * Safely map over an array-like object
 * @param {any} arrayLike - The array or array-like object to map
 * @param {Function} callback - The mapping function
 * @returns {Array} - A new array with the mapped elements
 */
export const safeMap = (arrayLike, callback) => {
  if (Array.isArray(arrayLike)) {
    return arrayLike.map(callback);
  }
  
  if (arrayLike == null) {
    console.warn('safeMap: Attempted to map over null or undefined value, returning empty array');
    return [];
  }
  
  try {
    const converted = Array.from(arrayLike);
    return converted.map(callback);
  } catch (error) {
    console.warn('safeMap: Could not convert to array:', arrayLike, error);
    return [];
  }
};

/**
 * Safely filter an array-like object
 * @param {any} arrayLike - The array or array-like object to filter
 * @param {Function} callback - The filter function
 * @returns {Array} - A new array with the filtered elements
 */
export const safeFilter = (arrayLike, callback) => {
  if (Array.isArray(arrayLike)) {
    return arrayLike.filter(callback);
  }
  
  if (arrayLike == null) {
    console.warn('safeFilter: Attempted to filter null or undefined value, returning empty array');
    return [];
  }
  
  try {
    const converted = Array.from(arrayLike);
    return converted.filter(callback);
  } catch (error) {
    console.warn('safeFilter: Could not convert to array:', arrayLike, error);
    return [];
  }
};

/**
 * Ensure a value is an array
 * @param {any} value - The value to ensure is an array
 * @returns {Array} - The value as an array, or empty array if conversion fails
 */
export const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  
  if (value == null) {
    return [];
  }
  
  try {
    return Array.from(value);
  } catch (error) {
    console.warn('ensureArray: Could not convert to array:', value, error);
    return [];
  }
};
