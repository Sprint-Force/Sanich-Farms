import React, { useState } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "warning", // warning, danger, info
  requireReason = false,
  reasonLabel = "Reason",
  reasonPlaceholder = "Please provide a reason..."
}) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle confirm action
  const handleConfirm = async () => {
    if (requireReason && !reason.trim()) {
      return; // Don't proceed if reason is required but empty
    }

    setLoading(true);
    try {
      await onConfirm(reason.trim());
      handleClose();
    } catch {
      // Error handling is done by parent component
    } finally {
      setLoading(false);
    }
  };

  // Handle close and reset
  const handleClose = () => {
    setReason('');
    setLoading(false);
    onClose();
  };
  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case 'danger': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-yellow-500';
    }
  };

  const getConfirmButtonColor = () => {
    switch (type) {
      case 'danger': return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'warning': return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
      case 'info': return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      default: return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="min-h-screen px-4 py-6 flex items-center justify-center">
        <div 
          className="fixed inset-0 bg-white/20 transition-opacity"
          onClick={handleClose}
        />
        
        {/* Modal Container - Responsive sizing */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-sm sm:max-w-md w-full transform transition-all">
          
          {/* Header - Compact design */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${getIconColor()}`}>
                <FiAlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {title}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            >
              <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
          </div>

          {/* Content - Optimized spacing */}
          <div className="p-3 sm:p-4">
            {/* Message */}
            <div className="mb-3">
              {typeof message === 'string' ? (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {message}
                </p>
              ) : (
                <div className="text-sm text-gray-600">
                  {message}
                </div>
              )}
            </div>
            
            {/* Reason Input - Compact layout */}
            {requireReason && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  {reasonLabel} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={reasonPlaceholder}
                  rows={2}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-xs sm:text-sm"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {reason.length}/500
                  </span>
                  {requireReason && !reason.trim() && (
                    <span className="text-red-500 text-xs">Required</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions - Compact button layout */}
          <div className="flex gap-2 p-3 sm:p-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 
                       rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 
                       disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading || (requireReason && !reason.trim())}
              className={`flex-1 px-3 py-2 text-white rounded-md text-xs sm:text-sm font-medium 
                        transition-colors duration-200 focus:outline-none focus:ring-2 
                        focus:ring-offset-1 disabled:opacity-50 ${getConfirmButtonColor()}`}
            >
              {loading ? 'Processing...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;