import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { getTypographyClasses } from '../config/typography';

/**
 * TopBar component - Displays location and language/currency info
 * Only visible on desktop (md and above)
 */
const TopBar = () => {
  return (
    <div className="hidden md:flex justify-between items-center px-4 md:px-6 lg:px-10 py-2 border-b border-gray-100 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <FiMapPin className="text-green-700 text-lg" />
        <p className={`${getTypographyClasses('topBar')} text-gray-700`}>
          Ejisu, Okese Avenue Fillet street, Kumasi Ghana
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-gray-700">
          <span className="text-base">🇬🇧</span>
          <span className={`${getTypographyClasses('topBar')} font-medium`}>ENG</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <span className={`${getTypographyClasses('topBar')} font-medium`}>GHS</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
