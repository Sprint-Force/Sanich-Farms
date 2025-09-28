import React, { useState, useEffect } from 'react';
import { 
  FiBarChart, 
  FiSearch, 
  FiTrendingUp, 
  FiAlertTriangle,
  FiFilter,
  FiDownload,
  FiRefreshCw
} from 'react-icons/fi';
import searchAnalytics from '../../utils/searchAnalytics';

const SimpleAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    setLoading(true);
    try {
      const data = searchAnalytics.getAnalytics();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const data = searchAnalytics.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data?')) {
      searchAnalytics.clearData();
      loadAnalytics();
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FiBarChart className="w-8 h-8 text-blue-600" />
            Search Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Basic search behavior insights from user activity
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={loadAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
          
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            Export
          </button>

          <button
            onClick={clearData}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Clear Data
          </button>
        </div>
      </div>

      {analyticsData ? (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Searches</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalSearches}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <FiSearch className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Unique Queries</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.uniqueQueries}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <FiTrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">No Results</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.noResultsSearches.length}</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <FiAlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Searches */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiTrendingUp className="w-5 h-5" />
                  Top Search Terms
                </h3>
              </div>
              <div className="p-6">
                {analyticsData.topQueries.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.topQueries.slice(0, 8).map((query, index) => (
                      <div key={query.query} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-gray-500 w-6">
                            #{index + 1}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            "{query.query}"
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ 
                                width: `${(query.count / analyticsData.topQueries[0].count) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600 w-8">
                            {query.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No search data yet</p>
                )}
              </div>
            </div>

            {/* Popular Filters */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiFilter className="w-5 h-5" />
                  Popular Filters
                </h3>
              </div>
              <div className="p-6">
                {analyticsData.popularFilters.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.popularFilters.slice(0, 8).map((filter, index) => (
                      <div key={filter.filter} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-gray-500 w-6">
                            #{index + 1}
                          </span>
                          <span className="text-sm text-gray-900">
                            {filter.filter.replace(':', ': ')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          {filter.count} uses
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No filter usage yet</p>
                )}
              </div>
            </div>
          </div>

          {/* No Results Analysis */}
          {analyticsData.noResultsSearches.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiAlertTriangle className="w-5 h-5 text-orange-600" />
                  Searches With No Results
                  <span className="text-sm font-normal text-gray-500">
                    (Product Gap Analysis)
                  </span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {analyticsData.noResultsSearches.map(([query, count]) => (
                    <div key={query} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-900">"{query}"</span>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          count >= 5 ? 'bg-red-100 text-red-800' :
                          count >= 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {count >= 5 ? 'High Priority' : count >= 3 ? 'Medium' : 'Low'}
                        </span>
                        <span className="text-sm text-gray-600">{count} attempts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Trends */}
          {analyticsData.searchTrends.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiBarChart className="w-5 h-5" />
                  Search Volume (Last 7 Days)
                </h3>
              </div>
              <div className="p-6">
                <div className="h-40 flex items-end justify-center space-x-2">
                  {analyticsData.searchTrends.map((trend) => {
                    const maxCount = Math.max(...analyticsData.searchTrends.map(t => t.count), 1);
                    const height = Math.max((trend.count / maxCount) * 100, 5);
                    
                    return (
                      <div key={trend.date} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors cursor-pointer min-h-[5px]"
                          style={{ height: `${height}%` }}
                          title={`${trend.date}: ${trend.count} searches`}
                        />
                        <span className="text-xs text-gray-500 mt-2 text-center">
                          {new Date(trend.date).toLocaleDateString('en-US', { 
                            weekday: 'short'
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <FiBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analytics Data</h3>
          <p className="text-gray-600">
            Start using the search functionality to see analytics data here.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleAnalytics;
