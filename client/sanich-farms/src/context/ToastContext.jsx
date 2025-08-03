// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs for toasts

// Create the Toast Context
const ToastContext = createContext();

// Custom hook to easily use the toast functions
export const useToast = () => {
  return useContext(ToastContext);
};

// Toast Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to add a new toast
  const addToast = useCallback((message, type = 'success', duration = 5000) => {
    const id = uuidv4(); // Generate a unique ID for each toast
    const newToast = { id, message, type, duration };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Automatically remove the toast after its duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  // Function to remove a toast by its ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container to render all active toasts */}
      <div className="fixed top-4 right-4 z-[9999] space-y-3 w-full max-w-xs sm:max-w-sm">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// --- Toast Component (moved here for simplicity, or can be in its own file) ---
// src/components/UI/Toast.jsx (if you prefer a separate file)
const Toast = ({ id, message, type, onDismiss }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? '✅' : '❌'; // Simple emoji icons

  return (
    <div
      className={`${bgColor} text-white px-5 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 transition-all duration-300 transform
                 ${type === 'success' ? 'animate-slide-in-right' : 'animate-fade-in'} `} // Basic animation
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="text-lg">{icon}</span>
      <p className="flex-grow text-sm sm:text-base font-medium">{message}</p>
      <button
        onClick={onDismiss}
        className="text-white opacity-80 hover:opacity-100 transition-opacity duration-200 p-1"
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};
