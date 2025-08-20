import React from 'react';

/**
 * Lightweight Loading Spinner Component
 * Uses pure CSS animations for optimal performance
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'green', 
  className = '',
  overlay = false,
  text = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    green: 'border-green-600',
    white: 'border-white',
    gray: 'border-gray-600',
    blue: 'border-blue-600'
  };

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center gap-2">
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-2 border-t-transparent 
          rounded-full 
          animate-spin
          ${className}
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <span className={`text-sm font-medium ${color === 'white' ? 'text-white' : 'text-gray-600'}`}>
          {text}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          {spinnerElement}
        </div>
      </div>
    );
  }

  return spinnerElement;
};

/**
 * Inline Loading Spinner for buttons and small spaces
 */
export const InlineSpinner = ({ size = 'small', color = 'white', className = '' }) => (
  <div 
    className={`
      ${size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} 
      border-2 border-t-transparent 
      ${color === 'white' ? 'border-white' : 'border-green-600'}
      rounded-full 
      animate-spin
      ${className}
    `}
    role="status"
    aria-label="Loading"
  />
);

/**
 * Page Loading Spinner
 */
export const PageSpinner = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <LoadingSpinner size="large" color="green" text={text} />
  </div>
);

/**
 * Button Loading Spinner
 */
export const ButtonSpinner = ({ className = '' }) => (
  <InlineSpinner size="small" color="white" className={className} />
);

export default LoadingSpinner;
