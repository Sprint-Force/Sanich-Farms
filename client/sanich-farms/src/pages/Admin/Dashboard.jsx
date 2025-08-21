import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiUsers, 
  FiShoppingBag, 
  FiDollarSign, 
  FiTrendingUp,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiCalendar,
  FiClock,
  FiChevronDown
} from 'react-icons/fi';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const navigate = useNavigate();

  // Live data state
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);

  // Quick action handlers
  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-product':
        navigate('/admin/products');
        break;
      case 'manage-orders':
        navigate('/admin/orders');
        break;
      case 'manage-bookings':
        navigate('/admin/bookings');
        break;
      case 'view-analytics':
        navigate('/admin/analytics');
        break;
      default:
        break;
    }
  };

  // No hardcoded mock data: use live API data; fallbacks are empty/zero values

  // Fetch live dashboard data on mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingDashboard(true);
      setDashboardError(null);
      try {
        const [{ status: oStatus, value: oVal }, { status: bStatus, value: bVal }, { status: pStatus, value: pVal }] = await Promise.allSettled([
          // lazy-import to avoid circulars
          import('../../services/api').then(m => m.ordersAPI.getAll()),
          import('../../services/api').then(m => m.bookingsAPI.getAll()),
          import('../../services/api').then(m => m.productsAPI.getAll())
        ]);

        if (!mounted) return;

        if (oStatus === 'fulfilled') {
          const list = Array.isArray(oVal) ? oVal : oVal?.orders || oVal?.data || [];
          setOrders(list);
        }

        if (bStatus === 'fulfilled') {
          const list = Array.isArray(bVal) ? bVal : bVal?.bookings || bVal?.data || [];
          setBookings(list);
        }

        if (pStatus === 'fulfilled') {
          const list = Array.isArray(pVal) ? pVal : pVal?.products || pVal?.data || [];
          setProducts(list);
        }
      } catch (e) {
        console.warn('Failed to load dashboard data', e);
        setDashboardError('Failed to load dashboard data');
      } finally {
        if (mounted) setLoadingDashboard(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  // Derived display values (use live data when available, otherwise fallback to mocks)
  const displayTotalOrders = orders.length;
  const displayTotalBookings = bookings.length;
  const displayTotalProducts = products.length;
  const displayTotalUsers = 0;
  const displayTotalRevenue = (
    (orders.length > 0 && orders.reduce((s, o) => s + (o.total || o.amount || o.totalAmount || 0), 0)) ||
    (bookings.length > 0 && bookings.reduce((s, b) => s + (b.totalCost || b.amount || 0), 0)) ||
    0
  );

  const displayPendingOrders = orders.length > 0
    ? orders.filter(o => (o.status || '').toString().toLowerCase() === 'pending').length
    : 0;

  const displayPendingBookings = bookings.length > 0
    ? bookings.filter(b => (b.status || '').toString().toLowerCase() === 'pending').length
  : 0;

  const recentOrdersDisplay = orders.length > 0 ? orders.slice(0, 4).map(o => ({
    id: o.id || o._id || o.orderNumber || 'N/A',
    customer: o.customerName || o.user?.name || o.customer || o.email || 'Customer',
    amount: o.total || o.amount || o.totalAmount || 0,
    status: o.status || 'Unknown',
    date: o.createdAt || o.date || new Date().toISOString()
  })) : [];

  const recentBookingsDisplay = bookings.length > 0 ? bookings.slice(0,4).map(b => ({
    id: b.id || b._id || b.bookingNumber || 'BKG',
    customer: b.customerName || b.user?.name || b.customer || 'Customer',
    service: b.service || b.serviceName || 'Service',
    status: b.status || 'Unknown',
    date: b.date || b.createdAt || new Date().toISOString()
  })) : [];

  const topProductsDisplay = products.length > 0 ? products.slice(0,4).map((p, i) => ({
    name: p.name || p.title || `Product ${i+1}`,
    sales: p.sold || p.unitsSold || 0,
    revenue: (p.price && (p.sold || p.unitsSold)) ? (p.price * (p.sold || p.unitsSold)) : (p.revenue || 0),
    stock: p.stock || p.quantity || p.inventory || 0
  })) : [];

  const displayOutOfStock = products.length > 0
    ? products.filter(p => (p.stock || p.quantity || p.inventory || 0) === 0).length
    : 0;

  // Helper: compute percent change between current and previous window
  const rangeDays = {
    '7days': 7,
    '30days': 30,
    '90days': 90
  };

  const computeChange = (items, valueExtractor = () => 1, dateKeyCandidates = ['createdAt', 'date', 'created_at']) => {
    const days = rangeDays[timeRange] || 7;
    const now = Date.now();
    const currentFrom = now - days * 24 * 60 * 60 * 1000;
    const prevFrom = now - 2 * days * 24 * 60 * 60 * 1000;
    const prevTo = currentFrom;

    const extractTime = (it) => {
      for (const k of dateKeyCandidates) {
        if (it && it[k]) return Date.parse(it[k]);
      }
      return NaN;
    };

    const currentItems = items.filter(i => {
      const t = extractTime(i);
      return !Number.isNaN(t) && t >= currentFrom;
    });

    const prevItems = items.filter(i => {
      const t = extractTime(i);
      return !Number.isNaN(t) && t >= prevFrom && t < prevTo;
    });

    const currentValue = currentItems.reduce((s, it) => s + (valueExtractor(it) || 0), 0);
    const prevValue = prevItems.reduce((s, it) => s + (valueExtractor(it) || 0), 0);

    if (prevValue > 0) {
      return Math.round(((currentValue - prevValue) / prevValue) * 100);
    }

    return undefined;
  };

  const ordersChange = computeChange(orders, () => 1);
  const revenueChange = computeChange(orders, o => (o.total || o.amount || o.totalAmount || 0));
  const bookingsChange = computeChange(bookings, () => 1);
  const productsChange = computeChange(products, () => 1);

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ icon: IconComponent, title, value, color, change }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-gray-500 text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 truncate">{value}</p>
          {change && (
            <p className={`text-xs sm:text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last week
            </p>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${color} flex-shrink-0 ml-3`}>
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {loadingDashboard && (
        <div className="absolute inset-0 bg-white bg-opacity-60 z-50 flex items-center justify-center">
          <div className="text-gray-700 font-medium">Loading dashboard...</div>
        </div>
      )}

      {dashboardError && (
        <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-3">
          <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 p-3 rounded">
            <p className="text-sm">{dashboardError}</p>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 relative z-10">
        <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Admin,</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">Here's what's happening with your store.</p>
          </div>
          <div className="flex-shrink-0">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
              <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 relative z-0">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={FiUsers}
            title="Total Users"
            value={displayTotalUsers.toLocaleString()}
            color="bg-blue-500"
            // no change computed for users (backend needed)
          />
          <StatCard
            icon={FiShoppingBag}
            title="Total Orders"
            value={displayTotalOrders.toLocaleString()}
            color="bg-green-500"
            change={ordersChange}
          />
          <StatCard
            icon={FiCalendar}
            title="Total Bookings"
            value={displayTotalBookings.toLocaleString()}
            color="bg-teal-500"
            change={bookingsChange}
          />
          <StatCard
            icon={FiDollarSign}
            title="Total Revenue"
            value={`GH₵${displayTotalRevenue.toLocaleString()}`}
            color="bg-purple-500"
            change={revenueChange}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={FiPackage}
            title="Total Products"
            value={displayTotalProducts.toLocaleString()}
            color="bg-orange-500"
            change={productsChange}
          />
          <StatCard
            icon={FiTrendingUp}
            title="Pending Orders"
            value={displayPendingOrders}
            color="bg-yellow-500"
          />
          <StatCard
            icon={FiClock}
            title="Pending Bookings"
            value={displayPendingBookings}
            color="bg-cyan-500"
          />
          <StatCard
            icon={FiPackage}
            title="Out of Stock"
            value={displayOutOfStock}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Orders</h3>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              {recentOrdersDisplay.length === 0 ? (
                <div className="p-6 text-center">
                  <FiPackage className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No recent orders to display.</p>
                </div>
              ) : (
                <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrdersDisplay.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-0">
                        {order.customer}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900">
                        GH₵{order.amount}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {recentOrdersDisplay.map((order) => (
                <div key={order.id} className="p-3 sm:p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1 truncate">{order.customer}</div>
                  <div className="text-sm font-medium text-gray-900">GH₵{order.amount}</div>
                </div>
              ))}
            </div>
            
            <div className="px-4 sm:px-6 py-3 border-t border-gray-200">
              <Link to="/admin/orders" className="text-green-600 hover:text-green-700 hover:underline text-sm font-medium flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                View all orders
              </Link>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Bookings</h3>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              {recentBookingsDisplay.length === 0 ? (
                <div className="p-6 text-center">
                  <FiCalendar className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No recent bookings to display.</p>
                </div>
              ) : (
                <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentBookingsDisplay.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-0">
                        {booking.customer}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-0">
                        {booking.service}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {recentBookingsDisplay.map((booking) => (
                <div key={booking.id} className="p-3 sm:p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{booking.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1 truncate">{booking.customer}</div>
                  <div className="text-sm text-gray-500 truncate">{booking.service}</div>
                </div>
              ))}
            </div>
            
            <div className="px-4 sm:px-6 py-3 border-t border-gray-200">
              <Link to="/admin/bookings" className="text-green-600 hover:text-green-700 hover:underline text-sm font-medium flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                View all bookings
              </Link>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Top Products</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {topProductsDisplay.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-semibold text-xs sm:text-sm">{index + 1}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">GH₵{product.revenue}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{product.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 sm:px-6 py-3 border-t border-gray-200">
              <Link to="/admin/products" className="text-green-600 hover:text-green-700 hover:underline text-sm font-medium flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                View all products
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            <button 
              onClick={() => handleQuickAction('add-product')}
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
            >
              Add New Product
            </button>
            <button 
              onClick={() => handleQuickAction('manage-orders')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
            >
              Manage Orders
            </button>
            <button 
              onClick={() => handleQuickAction('manage-bookings')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
            >
              Manage Bookings
            </button>
            <button 
              onClick={() => handleQuickAction('view-analytics')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;