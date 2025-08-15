import React, { useState } from 'react';
import { 
  FiTrendingUp, 
  FiDollarSign, 
  FiUsers, 
  FiShoppingCart,
  FiRefreshCw,
  FiCalendar,
  FiDownload,
  FiEye,
  FiArrowUp,
  FiArrowDown,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUserCheck,
  FiAlertCircle,
  FiBarChart,
  FiPieChart,
  FiChevronDown
} from 'react-icons/fi';

const Analytic = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [chartType, setChartType] = useState('revenue');
  const [reportType, setReportType] = useState('sales'); // New state for report type

  // Mock data - replace with real API
  const stats = {
    totalRevenue: 45678.90,
    revenueGrowth: 12.5,
    totalOrders: 856,
    ordersGrowth: 8.2,
    avgOrderValue: 53.35,
    avgOrderGrowth: 4.1,
    repeatPurchaseRate: 68.5,
    repeatPurchaseGrowth: 3.2
  };

  // Booking Statistics
  const bookingStats = {
    totalBookings: 342,
    bookingsGrowth: 18.5,
    pendingBookings: 45,
    approvedBookings: 128,
    completedBookings: 142,
    cancelledBookings: 27,
    totalBookingRevenue: 68450.90,
    bookingRevenueGrowth: 22.3,
    avgBookingValue: 200.15,
    avgBookingGrowth: 8.7,
    conversionRate: 78.5,
    conversionGrowth: 5.2
  };

  // Booking data for charts
  const bookingData = {
    daily: [
      { date: '2024-08-01', bookings: 12, revenue: 2400.50, completed: 8, cancelled: 1 },
      { date: '2024-08-02', bookings: 15, revenue: 3200.75, completed: 11, cancelled: 2 },
      { date: '2024-08-03', bookings: 8, revenue: 1680.25, completed: 6, cancelled: 0 },
      { date: '2024-08-04', bookings: 18, revenue: 3890.90, completed: 14, cancelled: 1 },
      { date: '2024-08-05', bookings: 14, revenue: 2890.40, completed: 10, cancelled: 2 },
      { date: '2024-08-06', bookings: 22, revenue: 4250.60, completed: 18, cancelled: 1 },
      { date: '2024-08-07', bookings: 19, revenue: 3680.30, completed: 15, cancelled: 2 }
    ],
    weekly: [
      { period: 'Week 1', bookings: 68, revenue: 13500.40, completed: 52, cancelled: 8 },
      { period: 'Week 2', bookings: 75, revenue: 15200.60, completed: 58, cancelled: 6 },
      { period: 'Week 3', bookings: 82, revenue: 16890.30, completed: 65, cancelled: 7 },
      { period: 'Week 4', bookings: 89, revenue: 18500.80, completed: 72, cancelled: 5 }
    ],
    monthly: [
      { period: 'Jan 2024', bookings: 245, revenue: 48500.40, completed: 198, cancelled: 25 },
      { period: 'Feb 2024', bookings: 268, revenue: 52200.60, completed: 215, cancelled: 22 },
      { period: 'Mar 2024', bookings: 289, revenue: 58890.30, completed: 235, cancelled: 28 },
      { period: 'Apr 2024', bookings: 312, revenue: 62500.80, completed: 252, cancelled: 24 },
      { period: 'May 2024', bookings: 298, revenue: 59200.30, completed: 240, cancelled: 26 },
      { period: 'Jun 2024', bookings: 325, revenue: 65600.90, completed: 268, cancelled: 23 },
      { period: 'Jul 2024', bookings: 342, revenue: 68450.90, completed: 285, cancelled: 27 }
    ]
  };

  // Service performance data
  const servicePerformance = [
    {
      service: 'Farm Consultation',
      bookings: 89,
      revenue: 13350.00,
      avgDuration: '2.5 hours',
      satisfaction: 4.8,
      growth: 15.2
    },
    {
      service: 'Equipment Installation',
      bookings: 67,
      revenue: 20100.00,
      avgDuration: '4.0 hours',
      satisfaction: 4.6,
      growth: 8.7
    },
    {
      service: 'Training Session',
      bookings: 78,
      revenue: 15600.00,
      avgDuration: '3.0 hours',
      satisfaction: 4.9,
      growth: 22.5
    },
    {
      service: 'Soil Testing',
      bookings: 56,
      revenue: 6720.00,
      avgDuration: '1.5 hours',
      satisfaction: 4.7,
      growth: 5.8
    },
    {
      service: 'Pest Control',
      bookings: 52,
      revenue: 5200.00,
      avgDuration: '1.0 hour',
      satisfaction: 4.5,
      growth: -2.1
    }
  ];

  // Peak hours data
  const peakHours = [
    { hour: '8:00 AM', bookings: 25, percentage: 12.5 },
    { hour: '9:00 AM', bookings: 32, percentage: 16.0 },
    { hour: '10:00 AM', bookings: 42, percentage: 21.0 },
    { hour: '11:00 AM', bookings: 38, percentage: 19.0 },
    { hour: '12:00 PM', bookings: 28, percentage: 14.0 },
    { hour: '1:00 PM', bookings: 22, percentage: 11.0 },
    { hour: '2:00 PM', bookings: 35, percentage: 17.5 },
    { hour: '3:00 PM', bookings: 31, percentage: 15.5 },
    { hour: '4:00 PM', bookings: 18, percentage: 9.0 },
    { hour: '5:00 PM', bookings: 12, percentage: 6.0 }
  ];

  // Staff performance data
  const staffPerformance = [
    {
      name: 'Michael Asante',
      bookings: 78,
      completed: 72,
      rating: 4.9,
      revenue: 15600.00,
      efficiency: 92.3
    },
    {
      name: 'Grace Mensah',
      bookings: 65,
      completed: 58,
      rating: 4.7,
      revenue: 11600.00,
      efficiency: 89.2
    },
    {
      name: 'Kwame Osei',
      bookings: 52,
      completed: 48,
      rating: 4.6,
      revenue: 9600.00,
      efficiency: 92.3
    },
    {
      name: 'Akosua Agyei',
      bookings: 45,
      completed: 42,
      rating: 4.8,
      revenue: 8400.00,
      efficiency: 93.3
    }
  ];

  // Revenue data for charts (existing)
  const revenueData = {
    daily: [
      { date: '2024-08-01', revenue: 1250.50, orders: 15 },
      { date: '2024-08-02', revenue: 1450.75, orders: 18 },
      { date: '2024-08-03', revenue: 1180.25, orders: 12 },
      { date: '2024-08-04', revenue: 1680.90, orders: 22 },
      { date: '2024-08-05', revenue: 1520.40, orders: 19 },
      { date: '2024-08-06', revenue: 1890.60, orders: 25 },
      { date: '2024-08-07', revenue: 2100.30, orders: 28 }
    ],
    weekly: [
      { period: 'Week 1', revenue: 8500.40, orders: 115 },
      { period: 'Week 2', revenue: 9200.60, orders: 128 },
      { period: 'Week 3', revenue: 8890.30, orders: 120 },
      { period: 'Week 4', revenue: 10500.80, orders: 142 }
    ],
    monthly: [
      { period: 'Jan 2024', revenue: 32500.40, orders: 420 },
      { period: 'Feb 2024', revenue: 35200.60, orders: 465 },
      { period: 'Mar 2024', revenue: 38890.30, orders: 510 },
      { period: 'Apr 2024', revenue: 42500.80, orders: 565 },
      { period: 'May 2024', revenue: 40200.30, orders: 535 },
      { period: 'Jun 2024', revenue: 45600.90, orders: 598 },
      { period: 'Jul 2024', revenue: 48900.40, orders: 642 }
    ]
  };

  const bestSellingProducts = [
    {
      id: 1,
      name: 'Premium Chicken Feed',
      category: 'Feed',
      unitsSold: 245,
      revenue: 3675.55,
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=100&h=100&fit=crop',
      growth: 15.2
    },
    {
      id: 2,
      name: 'Organic Egg Layers',
      category: 'Poultry',
      unitsSold: 189,
      revenue: 4817.50,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop',
      growth: 8.7
    },
    {
      id: 3,
      name: 'Farm Equipment Set',
      category: 'Equipment',
      unitsSold: 156,
      revenue: 14040.44,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=100&h=100&fit=crop',
      growth: -2.1
    },
    {
      id: 4,
      name: 'Fertilizer Plus',
      category: 'Supplies',
      unitsSold: 134,
      revenue: 2680.00,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop',
      growth: 22.5
    },
    {
      id: 5,
      name: 'Water Systems',
      category: 'Equipment',
      unitsSold: 98,
      revenue: 8820.00,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=100&h=100&fit=crop',
      growth: 5.8
    }
  ];

  const topCustomers = [
    {
      id: 1,
      name: 'John Agriculture Ltd',
      email: 'john@agriculture.com',
      totalSpent: 12450.80,
      orders: 28,
      lastOrder: '2024-08-07',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Green Farm Co.',
      email: 'info@greenfarm.com',
      totalSpent: 9870.60,
      orders: 22,
      lastOrder: '2024-08-06',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a4b8ba?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Sustainable Farms',
      email: 'contact@sustainable.com',
      totalSpent: 8540.30,
      orders: 19,
      lastOrder: '2024-08-05',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Eco Agriculture',
      email: 'hello@ecoag.com',
      totalSpent: 7230.90,
      orders: 16,
      lastOrder: '2024-08-04',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const abandonedCarts = [
    {
      id: 1,
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      items: 3,
      value: 156.80,
      lastActivity: '2024-08-07',
      daysAbandoned: 1
    },
    {
      id: 2,
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      items: 2,
      value: 89.99,
      lastActivity: '2024-08-06',
      daysAbandoned: 2
    },
    {
      id: 3,
      customer: 'David Brown',
      email: 'david@example.com',
      items: 5,
      value: 234.50,
      lastActivity: '2024-08-05',
      daysAbandoned: 3
    },
    {
      id: 4,
      customer: 'Lisa Davis',
      email: 'lisa@example.com',
      items: 1,
      value: 45.30,
      lastActivity: '2024-08-04',
      daysAbandoned: 4
    }
  ];

  const StatCard = ({ icon: IconComponent, title, value, growth, color }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {growth !== undefined && (
            <p className={`text-xs sm:text-sm mt-1 flex items-center gap-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />}
              {Math.abs(growth)}% from last period
            </p>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${color}`}>
          {IconComponent && <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
        </div>
      </div>
    </div>
  );

  const SimpleBarChart = ({ data, dataKey }) => {
    const maxValue = Math.max(...data.map(item => item[dataKey]));
    
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-20 text-xs text-gray-600 truncate">
              {item.period || item.date || `Day ${index + 1}`}
            </div>
            <div className="flex-1 relative">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(item[dataKey] / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-20 text-xs font-medium text-right">
              {dataKey === 'revenue' ? `GH₵${item[dataKey].toFixed(0)}` : item[dataKey]}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const exportData = (type) => {
    let csvContent = '';
    let filename = '';

    switch (type) {
      case 'revenue':
        csvContent = [
          ['Period', 'Revenue', 'Orders'].join(','),
          ...revenueData.daily.map(item => [item.date, item.revenue, item.orders].join(','))
        ].join('\n');
        filename = 'revenue-data.csv';
        break;
      case 'products':
        csvContent = [
          ['Product', 'Category', 'Units Sold', 'Revenue', 'Growth'].join(','),
          ...bestSellingProducts.map(product => [
            product.name, product.category, product.unitsSold, product.revenue, product.growth
          ].join(','))
        ].join('\n');
        filename = 'best-selling-products.csv';
        break;
      case 'customers':
        csvContent = [
          ['Customer', 'Email', 'Total Spent', 'Orders', 'Last Order'].join(','),
          ...topCustomers.map(customer => [
            customer.name, customer.email, customer.totalSpent, customer.orders, customer.lastOrder
          ].join(','))
        ].join('\n');
        filename = 'top-customers.csv';
        break;
      case 'bookings':
        csvContent = [
          ['Period', 'Bookings', 'Revenue', 'Completed', 'Cancelled'].join(','),
          ...bookingData.daily.map(item => [
            item.date, item.bookings, item.revenue, item.completed, item.cancelled
          ].join(','))
        ].join('\n');
        filename = 'booking-data.csv';
        break;
      case 'services':
        csvContent = [
          ['Service', 'Bookings', 'Revenue', 'Avg Duration', 'Satisfaction', 'Growth'].join(','),
          ...servicePerformance.map(service => [
            service.service, service.bookings, service.revenue, service.avgDuration, service.satisfaction, service.growth
          ].join(','))
        ].join('\n');
        filename = 'service-performance.csv';
        break;
      case 'staff':
        csvContent = [
          ['Staff', 'Bookings', 'Completed', 'Rating', 'Revenue', 'Efficiency'].join(','),
          ...staffPerformance.map(staff => [
            staff.name, staff.bookings, staff.completed, staff.rating, staff.revenue, staff.efficiency
          ].join(','))
        ].join('\n');
        filename = 'staff-performance.csv';
        break;
      default:
        return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const getCurrentData = () => {
    if (reportType === 'bookings') {
      switch (timeRange) {
        case '7days': return bookingData.daily;
        case '4weeks': return bookingData.weekly;
        case '12months': return bookingData.monthly;
        default: return bookingData.daily;
      }
    } else {
      switch (timeRange) {
        case '7days': return revenueData.daily;
        case '4weeks': return revenueData.weekly;
        case '12months': return revenueData.monthly;
        default: return revenueData.daily;
      }
    }
  };


  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <div className="relative">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              <option value="sales">Sales Reports</option>
              <option value="bookings">Booking Reports</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
          </div>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              <option value="7days">Last 7 days</option>
              <option value="4weeks">Last 4 weeks</option>
              <option value="12months">Last 12 months</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
          </div>
          <button 
            onClick={() => exportData(reportType === 'bookings' ? 'bookings' : 'revenue')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition text-sm"
          >
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      {reportType === 'sales' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={FiDollarSign}
            title="Total Revenue"
            value={`GH₵${stats.totalRevenue.toLocaleString()}`}
            growth={stats.revenueGrowth}
            color="bg-green-500"
          />
          <StatCard
            icon={FiShoppingCart}
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            growth={stats.ordersGrowth}
            color="bg-blue-500"
          />
          <StatCard
            icon={FiTrendingUp}
            title="Avg Order Value"
            value={`GH₵${stats.avgOrderValue}`}
            growth={stats.avgOrderGrowth}
            color="bg-purple-500"
          />
          <StatCard
            icon={FiRefreshCw}
            title="Repeat Purchase Rate"
            value={`${stats.repeatPurchaseRate}%`}
            growth={stats.repeatPurchaseGrowth}
            color="bg-orange-500"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={FiCalendar}
            title="Total Bookings"
            value={bookingStats.totalBookings.toLocaleString()}
            growth={bookingStats.bookingsGrowth}
            color="bg-blue-500"
          />
          <StatCard
            icon={FiDollarSign}
            title="Booking Revenue"
            value={`GH₵${bookingStats.totalBookingRevenue.toLocaleString()}`}
            growth={bookingStats.bookingRevenueGrowth}
            color="bg-green-500"
          />
          <StatCard
            icon={FiTrendingUp}
            title="Avg Booking Value"
            value={`GH₵${bookingStats.avgBookingValue}`}
            growth={bookingStats.avgBookingGrowth}
            color="bg-purple-500"
          />
          <StatCard
            icon={FiCheckCircle}
            title="Conversion Rate"
            value={`${bookingStats.conversionRate}%`}
            growth={bookingStats.conversionGrowth}
            color="bg-orange-500"
          />
        </div>
      )}

      {/* Booking Status Overview (only show for booking reports) */}
      {reportType === 'bookings' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{bookingStats.pendingBookings}</p>
              </div>
              <FiClock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Approved</p>
                <p className="text-xl font-bold text-blue-600">{bookingStats.approvedBookings}</p>
              </div>
              <FiUserCheck className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Completed</p>
                <p className="text-xl font-bold text-green-600">{bookingStats.completedBookings}</p>
              </div>
              <FiCheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Cancelled</p>
                <p className="text-xl font-bold text-red-600">{bookingStats.cancelledBookings}</p>
              </div>
              <FiXCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>
      )}

      {/* Main Chart */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
            {reportType === 'bookings' ? 'Booking Trends' : 'Revenue Trends'}
          </h3>
          <div className="flex gap-2">
            {reportType === 'bookings' ? (
              <>
                <button
                  onClick={() => setChartType('bookings')}
                  className={`px-3 py-1 rounded text-sm ${chartType === 'bookings' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setChartType('revenue')}
                  className={`px-3 py-1 rounded text-sm ${chartType === 'revenue' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setChartType('completed')}
                  className={`px-3 py-1 rounded text-sm ${chartType === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  Completed
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setChartType('revenue')}
                  className={`px-3 py-1 rounded text-sm ${chartType === 'revenue' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setChartType('orders')}
                  className={`px-3 py-1 rounded text-sm ${chartType === 'orders' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  Orders
                </button>
              </>
            )}
          </div>
        </div>
        <SimpleBarChart 
          data={getCurrentData()} 
          dataKey={chartType} 
          label={chartType === 'revenue' ? 'Revenue' : chartType} 
        />
      </div>

      {/* Conditional Content Based on Report Type */}
      {reportType === 'bookings' ? (
        <>
          {/* Service Performance & Peak Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Service Performance */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Service Performance</h3>
                <button 
                  onClick={() => exportData('services')}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                >
                  <FiDownload className="w-4 h-4" />
                  Export
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {servicePerformance.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs sm:text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{service.service}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{service.bookings} bookings</span>
                            <span>•</span>
                            <span>{service.avgDuration}</span>
                            <span>•</span>
                            <span>⭐ {service.satisfaction}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">GH₵{service.revenue.toFixed(2)}</p>
                        <div className="flex items-center gap-1 text-xs">
                          <span className={`flex items-center ${service.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {service.growth >= 0 ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />}
                            {Math.abs(service.growth)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Peak Hours */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Peak Booking Hours</h3>
                <FiBarChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {peakHours.slice(0, 6).map((hour, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-16 text-xs text-gray-600">
                        {hour.hour}
                      </div>
                      <div className="flex-1 relative">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${hour.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-xs font-medium text-right">
                        {hour.bookings}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Staff Performance */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6 sm:mb-8">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Staff Performance</h3>
              <button 
                onClick={() => exportData('staff')}
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
              >
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff Member</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staffPerformance.map((staff, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold text-xs">{staff.name.charAt(0)}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{staff.bookings}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                        <div>
                          <span>{staff.completed}</span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({((staff.completed / staff.bookings) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{staff.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">
                        GH₵{staff.revenue.toFixed(2)}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${staff.efficiency}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-900">{staff.efficiency}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Sales Reports Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Best Selling Products */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Best Selling Products</h3>
                <button 
                  onClick={() => exportData('products')}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                >
                  <FiDownload className="w-4 h-4" />
                  Export
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {bestSellingProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-xs sm:text-sm">{index + 1}</span>
                        </div>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">GH₵{product.revenue.toFixed(2)}</p>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-gray-500">{product.unitsSold} sold</span>
                          <span className={`flex items-center ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.growth >= 0 ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />}
                            {Math.abs(product.growth)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
                <button 
                  onClick={() => exportData('customers')}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                >
                  <FiDownload className="w-4 h-4" />
                  Export
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div key={customer.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs sm:text-sm">{index + 1}</span>
                        </div>
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{customer.name}</p>
                          <p className="text-xs text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">GH₵{customer.totalSpent.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{customer.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Abandoned Carts */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6 sm:mb-8">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Abandoned Carts</h3>
                <p className="text-sm text-gray-500 mt-1">Recovery opportunities</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">
                  GH₵{abandonedCarts.reduce((sum, cart) => sum + cart.value, 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Total value</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Abandoned</th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {abandonedCarts.map((cart) => (
                    <tr key={cart.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{cart.customer}</p>
                          <p className="text-xs text-gray-500">{cart.email}</p>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{cart.items}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">GH₵{cart.value.toFixed(2)}</td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          cart.daysAbandoned <= 1 ? 'bg-green-100 text-green-800' :
                          cart.daysAbandoned <= 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {cart.daysAbandoned} day{cart.daysAbandoned !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Quick Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reportType === 'bookings' ? (
          <>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                <FiCalendar className="w-8 h-8" />
                <div>
                  <p className="text-blue-100 text-sm">Booking Growth</p>
                  <p className="text-2xl font-bold">+{bookingStats.bookingsGrowth}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="w-8 h-8" />
                <div>
                  <p className="text-green-100 text-sm">Completion Rate</p>
                  <p className="text-2xl font-bold">{((bookingStats.completedBookings / bookingStats.totalBookings) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                <FiDollarSign className="w-8 h-8" />
                <div>
                  <p className="text-purple-100 text-sm">Revenue Growth</p>
                  <p className="text-2xl font-bold">+{bookingStats.bookingRevenueGrowth}%</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                <FiTrendingUp className="w-8 h-8" />
                <div>
                  <p className="text-green-100 text-sm">Revenue Growth</p>
                  <p className="text-2xl font-bold">+{stats.revenueGrowth}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                <FiUsers className="w-8 h-8" />
                <div>
                  <p className="text-blue-100 text-sm">Customer Retention</p>
                  <p className="text-2xl font-bold">{stats.repeatPurchaseRate}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                <FiShoppingCart className="w-8 h-8" />
                <div>
                  <p className="text-purple-100 text-sm">Cart Recovery Potential</p>
                  <p className="text-2xl font-bold">
                    GH₵{abandonedCarts.reduce((sum, cart) => sum + cart.value, 0).toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytic;