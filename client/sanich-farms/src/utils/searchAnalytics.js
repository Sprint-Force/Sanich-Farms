/**
 * Simple Search Analytics Tracker
 * Tracks basic search behavior in localStorage
 */

class SimpleAnalytics {
  constructor() {
    this.storageKey = 'sanich_search_analytics';
  }

  getStoredData() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {
      searches: [],
      topQueries: {},
      filterUsage: {},
      lastUpdated: Date.now()
    };
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify({
      ...data,
      lastUpdated: Date.now()
    }));
  }

  // Track search query
  trackSearch(query, resultCount = 0, filters = {}) {
    if (!query || query.trim().length === 0) return;
    
    const data = this.getStoredData();
    const normalizedQuery = query.toLowerCase().trim();

    // Add to searches
    data.searches.push({
      query: normalizedQuery,
      resultCount,
      filters,
      timestamp: Date.now()
    });

    // Keep only last 1000 searches to prevent storage bloat
    if (data.searches.length > 1000) {
      data.searches = data.searches.slice(-1000);
    }

    // Update top queries
    data.topQueries[normalizedQuery] = (data.topQueries[normalizedQuery] || 0) + 1;

    // Track filter usage
    Object.entries(filters).forEach(([filterType, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        values.forEach(value => {
          const key = `${filterType}:${value}`;
          data.filterUsage[key] = (data.filterUsage[key] || 0) + 1;
        });
      } else if (values && filterType === 'priceRange') {
        const key = `price:${values.min}-${values.max}`;
        data.filterUsage[key] = (data.filterUsage[key] || 0) + 1;
      }
    });

    this.saveData(data);
    console.log('🔍 Search tracked:', normalizedQuery, 'Results:', resultCount);
  }

  // Get analytics summary
  getAnalytics() {
    const data = this.getStoredData();
    
    // Top searches (last 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentSearches = data.searches.filter(s => s.timestamp > thirtyDaysAgo);
    
    // No results searches
    const noResultsSearches = recentSearches
      .filter(s => s.resultCount === 0)
      .reduce((acc, search) => {
        acc[search.query] = (acc[search.query] || 0) + 1;
        return acc;
      }, {});

    // Most popular filters
    const popularFilters = Object.entries(data.filterUsage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([filter, count]) => ({ filter, count }));

    // Top queries
    const topQueries = Object.entries(data.topQueries)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));

    return {
      totalSearches: recentSearches.length,
      uniqueQueries: Object.keys(data.topQueries).length,
      topQueries,
      noResultsSearches: Object.entries(noResultsSearches)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      popularFilters,
      searchTrends: this.getSearchTrends(recentSearches)
    };
  }

  // Simple search trends (daily counts for last 7 days)
  getSearchTrends(searches) {
    const trends = {};
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    searches.forEach(search => {
      if (search.timestamp > sevenDaysAgo) {
        const date = new Date(search.timestamp).toDateString();
        trends[date] = (trends[date] || 0) + 1;
      }
    });

    return Object.entries(trends)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, count]) => ({ date, count }));
  }

  // Clear all analytics data
  clearData() {
    localStorage.removeItem(this.storageKey);
  }

  // Export data
  exportData() {
    return this.getStoredData();
  }
}

// Create singleton instance
const searchAnalytics = new SimpleAnalytics();

export default searchAnalytics;
