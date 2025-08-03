import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to the top of the window whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array: re-run effect when pathname changes

  return null; // This component doesn't render anything
}

export default ScrollToTop;
