import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiClock, FiTrash2 } from 'react-icons/fi';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import RecentlyViewed from '../components/UI/RecentlyViewed';

const RecentlyViewedPage = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm">
            <Link to="/" className="text-green-600 hover:text-green-700 flex items-center">
              <FiHome className="w-4 h-4 mr-1" />
              Home
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/dashboard" className="text-green-600 hover:text-green-700">
              Dashboard
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 font-medium">Recently Viewed</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="p-3 bg-green-100 rounded-full">
              <FiClock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Recently Viewed Products
              </h1>
              <p className="text-gray-600 mt-1">
                {recentlyViewed.length === 0 
                  ? "You haven't viewed any products yet"
                  : `${recentlyViewed.length} product${recentlyViewed.length > 1 ? 's' : ''} in your history`
                }
              </p>
            </div>
          </div>

          {recentlyViewed.length > 0 && (
            <button
              onClick={clearRecentlyViewed}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear All History
            </button>
          )}
        </div>

        {/* Content */}
        {recentlyViewed.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 sm:py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiClock className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Recently Viewed Products
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start browsing our products to see your recently viewed items here. 
              This helps you quickly find products you've looked at before.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Browse Products
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Recently Viewed Items */
          <RecentlyViewed
            limit={50} // Show more items on dedicated page
            showTitle={false} // We already have a page title
            showClearButton={false} // We have a dedicated clear button
            className="shadow-none border-0 p-0 bg-transparent" // Remove container styling
          />
        )}
      </div>
    </div>
  );
};

export default RecentlyViewedPage;
