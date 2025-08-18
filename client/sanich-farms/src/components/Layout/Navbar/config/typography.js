/**
 * Typography configuration for Navbar component
 * Provides consistent responsive text sizing across all navbar elements
 */

export const navbarTypography = {
  // Logo text
  logo: {
    mobile: "text-lg font-bold",
    tablet: "md:text-xl",
    desktop: "lg:text-2xl",
    combined: "text-lg md:text-xl lg:text-2xl font-bold"
  },
  
  // Main navigation links
  navLinks: {
    mobile: "text-lg font-medium",
    desktop: "text-base font-medium",
    combined: "text-base lg:text-lg font-medium"
  },
  
  // User greeting text
  userGreeting: {
    mobile: "text-base font-bold",
    desktop: "text-sm font-bold",
    combined: "text-sm md:text-base font-bold"
  },
  
  // Top bar elements (language, currency, contact)
  topBar: {
    mobile: "text-base",
    desktop: "text-sm",
    combined: "text-sm md:text-base"
  },
  
  // Mobile menu items
  mobileMenu: {
    title: "text-xl md:text-2xl font-bold",
    links: "text-lg font-medium",
    subLinks: "text-base"
  },
  
  // Search placeholders
  search: {
    mobile: "text-base",
    desktop: "text-sm",
    combined: "text-sm md:text-base"
  },
  
  // Contact info
  contact: {
    mobile: "text-base font-semibold",
    desktop: "text-base font-semibold",
    combined: "text-base font-semibold"
  }
};

/**
 * Helper function to get responsive typography classes
 * @param {string} element - The element type (logo, navLinks, etc.)
 * @returns {string} - Combined Tailwind classes
 */
export const getTypographyClasses = (element) => {
  return navbarTypography[element]?.combined || navbarTypography[element] || "";
};

/**
 * Icon sizes for different breakpoints
 */
export const iconSizes = {
  small: 20,
  medium: 22,
  large: 24,
  xlarge: 28
};
