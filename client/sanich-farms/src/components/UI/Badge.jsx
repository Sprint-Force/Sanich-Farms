// Reusable Badge Component for various promotions and labels
import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  icon: Icon = null 
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 font-semibold rounded-full transition-all duration-200';
  
  // Size variants
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  // Color variants
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-green-100 text-green-800 border border-green-200',
    secondary: 'bg-blue-100 text-blue-800 border border-blue-200',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    sale: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg',
    hot: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg',
    new: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg',
    trending: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg',
    flash: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse'
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  return (
    <span className={classes}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default Badge;