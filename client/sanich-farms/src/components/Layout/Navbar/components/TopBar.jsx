import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { getTypographyClasses } from '../config/typography';

/**
 * TopBar component - Displays location and language/currency info
 * Only visible on desktop (md and above)
 */
const TopBar = () => {
  return (
    <div className="hidden md:flex justify-between items-center px-3 md:px-6 lg:px-10 py-1 border-b border-gray-100 text-xs text-gray-500 bg-gray-50/30">
      <div className="flex items-center gap-1 md:gap-1.5">
        <FiMapPin className="text-green-600 text-xs" />
        <p className={`${getTypographyClasses('topBar')} text-gray-600 truncate max-w-xs md:max-w-md lg:max-w-none`}>
          Ejisu, Okese Avenue Fillet street, Kumasi Ghana
        </p>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1 text-gray-600">
          <span className="text-sm">🇬🇧</span>
          <span className={`${getTypographyClasses('topBar')} font-medium hidden md:inline`}>ENG</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <span className={`${getTypographyClasses('topBar')} font-medium`}>GHS</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
