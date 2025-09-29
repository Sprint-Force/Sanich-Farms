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

  // Keep max 4 visible toasts for good UX
  const MAX_TOASTS = 4;

  // Function to remove a toast by its ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Function to add a new toast
  const addToast = useCallback((message, type = 'success', duration) => {
    const id = uuidv4(); // Generate a unique ID for each toast
    // choose sensible default duration: shorter on small screens (mobile-like behavior)
    let effectiveDuration = duration;
    if (typeof effectiveDuration === 'undefined') {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        effectiveDuration = 2500; // compact & quick on mobile like Jumia
      } else {
        effectiveDuration = 4000; // desktop default
      }
    }

    const newToast = { id, message, type, duration: effectiveDuration };

    setToasts((prevToasts) => {
      const next = [...prevToasts, newToast];
      // If too many, drop the oldest
      return next.slice(-MAX_TOASTS);
    });

    // Automatically remove the toast after its duration
    const timer = setTimeout(() => {
      removeToast(id);
    }, effectiveDuration);

    // Return cleanup function in case it's needed by callers
    return () => clearTimeout(timer);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container: desktop top-right, mobile bottom-center. Kept breadcrumb unchanged elsewhere. */}
      <div
        className="fixed z-[9999] pointer-events-none w-full flex items-end justify-center sm:items-start sm:justify-end"
        style={{ top: 16, left: 0, right: 0, bottom: 'auto', padding: '0 12px' }}
      >
        <div className="w-full max-w-xs sm:max-w-sm space-y-3 pointer-events-auto">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

// --- Toast Component (moved here for simplicity, or can be in its own file) ---
// src/components/UI/Toast.jsx (if you prefer a separate file)
const Toast = ({ message, type = 'success', duration = 4000, onDismiss }) => {
  // Color accents based on type; base card remains white for a modern clean design
  const accent =
    type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : type === 'warning' ? 'bg-yellow-400' : 'bg-red-500';

  const icon =
    type === 'success' ? (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.414 0l-3.182-3.182a1 1 0 011.414-1.414L9 11.586l6.363-6.363a1 1 0 011.344-.93z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 7h2v5H9V7zm0 6h2v2H9v-2z" />
      </svg>
    );

  // Local state for hover/pause and swipe gestures
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  React.useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [paused, duration, onDismiss]);

  // Handlers for touch swipe to dismiss (mobile)
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const delta = e.touches[0].clientX - touchStartX;
    setTranslateX(delta);
  };

  const handleTouchEnd = () => {
    if (Math.abs(translateX) > 60) {
      // dismiss
      onDismiss();
    } else {
      // reset
      setTranslateX(0);
    }
    setTouchStartX(null);
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full bg-white rounded-full sm:rounded-xl shadow-lg flex items-center gap-3 p-2 sm:p-4 border border-transparent overflow-hidden max-w-md mx-auto"
      style={{
        transform: `translateX(${translateX}px)`,
        transition: translateX === 0 ? 'transform 300ms ease' : 'none',
      }}
    >
      {/* On desktop: left accent bar. On mobile: small colored dot. We'll render both but hide based on screen size via utility classes */}
      <div className={`hidden sm:block w-1 rounded-l-xl ${accent}`} style={{ minHeight: 40 }} aria-hidden />

      <div className="flex items-center gap-3 flex-1">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${accent} sm:hidden`} aria-hidden>
          {icon}
        </div>
        <div className="flex-1 flex items-center gap-3">
          <div className="hidden sm:flex flex-shrink-0">{icon}</div>
          <p className="text-gray-800 text-sm sm:text-base font-medium leading-tight truncate">{message}</p>
        </div>
      </div>

      {/* Dismiss button: smaller on mobile */}
      <button
        onClick={onDismiss}
        className="ml-2 text-gray-400 hover:text-gray-700 p-1 sm:p-2 rounded-md transition-colors"
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      {/* Progress bar (visible on desktop only) */}
      <div className="hidden sm:block absolute left-0 right-0 bottom-0 px-4 pb-3">
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${accent}`}
            style={{
              width: paused ? '100%' : '0%',
              animation: paused ? 'none' : `toast-progress ${duration}ms linear forwards`,
              transformOrigin: 'left',
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Inline styles for simple keyframes (Tailwind doesn't ship custom keyframes here) */}
      <style>
        {`@keyframes toast-progress { from { width: 100%; } to { width: 0%; } }
           @media (max-width: 639px) {
             /* Mobile: make it pill-like and smaller */
             .toast-mobile { padding: 8px 12px; }
           }
        `}
      </style>
    </div>
  );
};
