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
  
  // Navbar visibility for scroll behavior
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
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

  // Handle scroll behavior for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

      if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
        setIsNavbarHidden(true);
      } else {
        isMobileMenuOpen ? setIsNavbarHidden(true) : setIsNavbarHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isMobileMenuOpen]);

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
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
