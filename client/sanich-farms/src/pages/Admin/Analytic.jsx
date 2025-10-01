import React, { useState, useEffect } from 'react';
import { 
  FiTrendingUp, 
  FiDollarSign, 
  FiShoppingCart,
  FiRefreshCw,
  FiCalendar,
  FiDownload,
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiAlertCircle,
  FiBarChart3,
  FiActivity
} from 'react-icons/fi';
import { analyticsAPI } from '../../services/api';

const Analytic = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);

  // Load analytics data
  const loadAnalytics = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsData, revenueData, productsData] = await Promise.all([
        analyticsAPI.getDashboardStats(),
        analyticsAPI.getRevenueData(),
        analyticsAPI.getTopProducts()
      ]);

      setDashboardStats(statsData);
      setRevenueData(revenueData);
      setTopProducts(productsData);
    } catch (err) {
      console.error('Failed to load analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Export analytics data
  const exportData = () => {
    const data = {
      dashboardStats,
      revenueData,
      topProducts,
      exportDate: new Date().toISOString(),
      timeRange
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Stat Card Component
  const StatCard = ({ icon, title, value, subtitle, color }) => {
    const IconComponent = icon;
    return (
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <div className={`p-2 sm:p-2.5 lg:p-3 rounded-lg ${color} group-hover:scale-105 transition-transform duration-200`}>
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-tight">{title}</p>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Chart Component
  const SimpleChart = ({ data = [], title, dataKey = 'revenue' }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey] || 0), 1);
    
    return (
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2">
          <FiBarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
          {title}
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {data.slice(0, 7).map((item, index) => {
            const value = item[dataKey] || 0;
            const widthPercent = (value / maxValue) * 100;
            
            return (
              <div key={index} className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 sm:w-16 lg:w-20 text-xs sm:text-sm text-gray-600 truncate font-medium">
                  {new Date(item.period).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 relative">
                  <div className="bg-gray-200 rounded-full h-2 sm:h-2.5 lg:h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-700 ease-out h-full"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 sm:w-20 lg:w-24 text-xs sm:text-sm lg:text-base font-semibold text-right text-gray-900">
                  {dataKey === 'revenue' ? `GH₵${value.toFixed(0)}` : value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 min-h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-green-600"></div>
            <span className="text-sm sm:text-base text-gray-600 font-medium">Loading analytics...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 text-center">
          <FiAlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 mx-auto mb-3 sm:mb-4" />
          <p className="text-red-800 font-medium mb-2 text-sm sm:text-base">Error Loading Analytics</p>
          <p className="text-red-600 text-xs sm:text-sm mb-4">{error}</p>
          <button
            onClick={loadAnalytics}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 active:bg-red-800 transition-all duration-200 text-sm sm:text-base active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 xl:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg leading-relaxed">
              Monitor your business performance and insights
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            {/* Time Range Selector */}
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setTimeRange('7days')}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                  timeRange === '7days' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                  timeRange === '30days' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                30 Days
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={loadAnalytics}
                className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 bg-white shadow-sm active:scale-95"
                title="Refresh Data"
              >
                <FiRefreshCw className="w-4 h-4" />
              </button>
              
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                title="Export Data"
              >
                <FiDownload className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 mb-6 sm:mb-8">
        <StatCard
          icon={FiDollarSign}
          title="Total Revenue"
          value={`GH₵${(dashboardStats?.totalRevenue || 0).toFixed(2)}`}
          subtitle="All time earnings"
          color="bg-green-500"
        />
        <StatCard
          icon={FiShoppingCart}
          title="Total Orders"
          value={dashboardStats?.totalOrders || 0}
          subtitle="Orders placed"
          color="bg-blue-500"
        />
        <StatCard
          icon={FiCalendar}
          title="Total Bookings"
          value={dashboardStats?.totalBookings || 0}
          subtitle="Service bookings"
          color="bg-purple-500"
        />
        <StatCard
          icon={FiPackage}
          title="Products"
          value={dashboardStats?.totalProducts || 0}
          subtitle="In catalog"
          color="bg-amber-500"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 mb-6 sm:mb-8">
        <StatCard
          icon={FiActivity}
          title="Average Order Value"
          value={`GH₵${(dashboardStats?.avgOrderValue || 0).toFixed(2)}`}
          subtitle="Per order"
          color="bg-indigo-500"
        />
        <StatCard
          icon={FiClock}
          title="Pending Bookings"
          value={dashboardStats?.pendingBookings || 0}
          subtitle="Awaiting approval"
          color="bg-orange-500"
        />
        <StatCard
          icon={FiCheckCircle}
          title="Completed Bookings"
          value={dashboardStats?.completedBookings || 0}
          subtitle="Successfully completed"
          color="bg-green-500"
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Revenue Chart */}
        {revenueData?.daily && (
          <SimpleChart
            data={revenueData.daily}
            title="Revenue Trend"
            dataKey="revenue"
          />
        )}

        {/* Top Products */}
        <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2">
            <FiTrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            Top Products
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {topProducts.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate leading-tight">{product.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{product.unitsSold || 0} sold</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="font-bold text-gray-900 text-sm sm:text-base">GH₵{(product.revenue || 0).toFixed(0)}</p>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <div className="text-center py-6 sm:py-8">
                <FiPackage className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm sm:text-base">No product data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            Recent Orders
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {(dashboardStats?.recentOrders || []).slice(0, 5).map((order, index) => (
              <div key={order.id || index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">Order #{order.id}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(order.created_at || order.order_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-3 sm:ml-4">
                  <p className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                    GH₵{(order.total_amount || 0).toFixed(2)}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status || 'pending'}
                  </span>
                </div>
              </div>
            ))}
            {(!dashboardStats?.recentOrders || dashboardStats.recentOrders.length === 0) && (
              <div className="text-center py-6 sm:py-8">
                <FiShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm sm:text-base">No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2">
            <FiCalendar className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            Recent Bookings
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {(dashboardStats?.recentBookings || []).slice(0, 5).map((booking, index) => (
              <div key={booking.id || index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base leading-tight truncate">
                    {booking.service_name || booking.serviceName || `Booking #${booking.id}`}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(booking.created_at || booking.booking_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-3 sm:ml-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status || 'pending'}
                  </span>
                </div>
              </div>
            ))}
            {(!dashboardStats?.recentBookings || dashboardStats.recentBookings.length === 0) && (
              <div className="text-center py-6 sm:py-8">
                <FiCalendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm sm:text-base">No recent bookings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytic;