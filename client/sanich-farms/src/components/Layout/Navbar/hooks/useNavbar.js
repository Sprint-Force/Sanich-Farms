import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../../../context/ToastContext';
import { useAuthContext } from '../../../../hooks/useAuthContext';

/**
 * Custom hook for managing navbar state and behavior
 * Centralizes all navbar-related logic for better maintainability
 */
export const useNavbar = () => {
  // Mobile menu and search states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // Search queries
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [desktopSearchQuery, setDesktopSearchQuery] = useState('');
  
  // Navbar visibility and compact states for scroll behavior
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isNavbarCompact, setIsNavbarCompact] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarAnimationClass, setNavbarAnimationClass] = useState('');
  
  // Initialize scroll position on mount
  useEffect(() => {
    setLastScrollY(window.scrollY);
  }, []);
  
  // Refs
  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Hooks
  const { logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location]);

  // Handle scroll behavior for navbar visibility and compactness
  useEffect(() => {
    let timeoutId = null;
    
    const handleScroll = () => {
      const scrollY = Math.max(0, window.scrollY || window.pageYOffset || document.documentElement.scrollTop);

      // Don't hide navbar if mobile menu is open
      if (isMobileMenuOpen) {
        setIsNavbarHidden(false);
        return;
      }

      // Compact navbar when scrolling down past 50px
      const compactThreshold = 50;
      setIsNavbarCompact(scrollY > compactThreshold);

      // Simplified responsive threshold - lower for all screen sizes
      const scrollThreshold = 150; // Increased threshold to account for compact state
      
      // Minimum movement to register (prevent tiny movements)
      const scrollDiff = Math.abs(scrollY - lastScrollY);
      if (scrollDiff < 15) return;

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Simple logic: hide when scrolling down past threshold, show when scrolling up
      if (scrollY > scrollThreshold && scrollY > lastScrollY) {
        // Scrolling down past threshold - hide navbar
        if (!isNavbarHidden) {
          setIsNavbarHidden(true);
          setNavbarAnimationClass('navbar-slide-up');
        }
      } else if (scrollY < lastScrollY || scrollY <= 50) {
        // Scrolling up or near top - show navbar
        if (isNavbarHidden) {
          setIsNavbarHidden(false);
          setNavbarAnimationClass('navbar-slide-down');
        }
      }

      // Debounce scroll position update
      timeoutId = setTimeout(() => {
        setLastScrollY(scrollY);
      }, 10);
    };

    // Simpler event handling - focus on scroll event
    const options = { passive: true };
    
    // Primary scroll event
    window.addEventListener('scroll', handleScroll, options);
    
    // Secondary events for mobile
    window.addEventListener('touchmove', handleScroll, options);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY, isMobileMenuOpen, isNavbarHidden]);



  // Handle escape key for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeMobileMenu();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Control body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        // Restore body scroll and position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  // Focus management for mobile search
  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  // Menu control functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setMobileSearchQuery('');
  };

  const handleShopDropdownToggle = () => {
    setShowShopDropdown(prev => !prev);
  };

  // Search handlers
  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(mobileSearchQuery.trim())}`);
      closeMobileSearch();
    } else {
      addToast("Please enter a search term.", "error");
    }
  };

  const handleDesktopSearchSubmit = (e) => {
    e.preventDefault();
    if (desktopSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(desktopSearchQuery.trim())}`);
      setDesktopSearchQuery('');
    } else {
      addToast("Please enter a search term.", "error");
    }
  };

  // User logout handler
  const handleLogout = () => {
    logout();
    addToast('You have been logged out successfully.', 'success');
    navigate('/');
    closeMobileMenu();
  };

  return {
    // State
    isMobileMenuOpen,
    showShopDropdown,
    isMobileSearchOpen,
    mobileSearchQuery,
    desktopSearchQuery,
    isNavbarHidden,
    isNavbarCompact,
    navbarAnimationClass,
    
    // Refs
    navbarRef,
    searchInputRef,
    
    // State setters
    setMobileSearchQuery,
    setDesktopSearchQuery,
    setShowShopDropdown,
    
    // Actions
    toggleMobileMenu,
    closeMobileMenu,
    closeMobileSearch,
    handleShopDropdownToggle,
    handleMobileSearchSubmit,
    handleDesktopSearchSubmit,
    handleLogout,
  };
};
