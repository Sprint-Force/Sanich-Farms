import React, { useState, useEffect } from 'react';
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
  FiPackage,
  FiAlertCircle,
  FiBarChart3,
  FiPieChart,
  FiActivity
} from 'react-icons/fi';
import { analyticsAPI, ordersAPI, bookingsAPI, productsAPI } from '../../services/api';

const Analytic = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);

  // Load analytics data
  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsData, revenueData, productsData] = await Promise.all([
        analyticsAPI.getDashboardStats(timeRange),
        analyticsAPI.getRevenueData(timeRange),
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
  };

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

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
  const StatCard = ({ icon: IconComponent, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${color}`}>
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">{title}</p>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs sm:text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />}
              <span>{trend.value}% from last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Chart Component
  const SimpleChart = ({ data = [], title, dataKey = 'revenue' }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey] || 0), 1);
    
    return (
      <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm border border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiBarChart3 className="w-5 h-5 text-green-600" />
          {title}
        </h3>
        <div className="space-y-3">
          {data.slice(0, 7).map((item, index) => {
            const value = item[dataKey] || 0;
            const widthPercent = (value / maxValue) * 100;
            
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 sm:w-20 text-xs text-gray-600 truncate">
                  {new Date(item.period).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 relative">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
                <div className="w-20 text-xs font-medium text-right">
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base leading-relaxed">
              Monitor your business performance and insights
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Time Range Selector */}
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setTimeRange('7days')}
                className={`px-3 py-2 text-xs sm:text-sm rounded-md transition-all duration-200 ${
                  timeRange === '7days' 
                    ? 'bg-green-100 text-green-700 shadow-sm font-medium' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`px-3 py-2 text-xs sm:text-sm rounded-md transition-all duration-200 ${
                  timeRange === '30days' 
                    ? 'bg-green-100 text-green-700 shadow-sm font-medium' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                30 Days
              </button>
            </div>
            
            {/* Action Buttons */}
            <button
              onClick={loadAnalytics}
              className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 bg-white shadow-sm"
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
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    repeatPurchaseGrowth: 0
  };

  const bookingStats = apiBookingStats || {
    totalBookings: 0,
    bookingsGrowth: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalBookingRevenue: 0,
    bookingRevenueGrowth: 0,
    avgBookingValue: 0,
    avgBookingGrowth: 0,
    conversionRate: 0,
    conversionGrowth: 0
  };

  const bookingData = apiBookingData || { daily: [], weekly: [], monthly: [] };
  const revenueData = apiRevenueData || { daily: [], weekly: [], monthly: [] };

  // Service performance, peak hours, staff performance, best selling products, top customers and abandoned carts
  // will come from API-derived state when available; otherwise default to empty arrays
  const servicePerformance = apiBestSellingProducts ? apiBestSellingProducts.map((p, i) => ({
    service: p.name || `Item ${i+1}`,
    bookings: p.unitsSold || 0,
    revenue: p.revenue || 0,
    avgDuration: '-',
    satisfaction: 0,
    growth: p.growth || 0
  })) : [];

  const peakHours = [];
  const staffPerformance = [];
  const bestSellingProducts = apiBestSellingProducts || [];
  const topCustomers = apiTopCustomers || [];
  const abandonedCarts = apiAbandonedCarts || [];

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

  // Helper to safely handle numeric values coming from API (avoid calling .toFixed on undefined)
  const safeNum = (v, fallback = 0) => (typeof v === 'number' ? v : (Number(v) || fallback));

  const SimpleBarChart = ({ data = [], dataKey }) => {
    // Normalize numeric values and guard against missing keys or non-numeric values.
    const safeValues = data.map(item => Number(item?.[dataKey] ?? 0));
    const maxValue = safeValues.length ? Math.max(...safeValues, 0) : 0;

    return (
      <div className="space-y-3">
        {data.map((item, index) => {
          const raw = item?.[dataKey];
          const value = Number(raw ?? 0) || 0;
          const widthPercent = maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;

          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-xs text-gray-600 truncate">
                {item?.period || item?.date || `Day ${index + 1}`}
              </div>
              <div className="flex-1 relative">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              </div>
              <div className="w-20 text-xs font-medium text-right">
                {dataKey === 'revenue' ? `GH\u20b5${safeNum(value).toFixed(0)}` : String(value)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ---------- API integration: fetch data and compute simple aggregates ----------
  useEffect(() => {
    let mounted = true;

    const getNumber = (v) => (typeof v === 'number' ? v : (Number(v) || 0));

    const getOrderTotal = (order) => {
      const keys = ['total', 'totalAmount', 'amount', 'grandTotal', 'totalPrice', 'price'];
      for (const k of keys) {
        if (order && Object.prototype.hasOwnProperty.call(order, k) && typeof order[k] === 'number') {
          return order[k];
        }
      }
      // try nested amount
      if (order && order.payment && typeof order.payment.amount === 'number') return order.payment.amount;
      return 0;
    };

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ordersResp, bookingsResp, productsResp, transactionsResp] = await Promise.all([
          ordersAPI.getAll().catch((err) => { console.warn('ordersAPI failed', err); return null; }),
          bookingsAPI.getAll().catch((err) => { console.warn('bookingsAPI failed', err); return null; }),
          productsAPI.getAll().catch((err) => { console.warn('productsAPI failed', err); return null; }),
          paymentsAPI.getTransactions().catch((err) => { console.warn('paymentsAPI failed', err); return null; }),
        ]);

        if (!mounted) return;

        const orders = ordersResp ? (Array.isArray(ordersResp) ? ordersResp : (ordersResp.orders || ordersResp.data || [])) : [];
        const bookings = bookingsResp ? (Array.isArray(bookingsResp) ? bookingsResp : (bookingsResp.bookings || bookingsResp.data || [])) : [];
        const products = productsResp ? (Array.isArray(productsResp) ? productsResp : (productsResp.products || productsResp.data || [])) : [];
  // transactions may be available from paymentsAPI but not used directly here; keep as a defensive parse
  const _transactions = transactionsResp ? (Array.isArray(transactionsResp) ? transactionsResp : (transactionsResp.transactions || transactionsResp.data || [])) : [];

        // Orders-derived stats
        const totalRevenue = orders.reduce((sum, o) => sum + getNumber(getOrderTotal(o)), 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

        // repeat purchase rate: simple heuristic using customer/user id or email
        const customerKey = (o) => o.userId || o.customerId || o.user?.id || o.userId || o.email || o.customerEmail || o.buyerEmail || o.buyer?.email;
        const custCounts = orders.reduce((map, o) => {
          const k = customerKey(o) || (o.customer && o.customer.email) || 'unknown';
          map[k] = (map[k] || 0) + 1;
          return map;
        }, {});
        const customers = Object.keys(custCounts).filter(k => k && k !== 'unknown');
        const repeaters = customers.filter(k => custCounts[k] > 1).length;
        const repeatPurchaseRate = customers.length ? (repeaters / customers.length) * 100 : 0;

        setApiStats({ totalRevenue, totalOrders, avgOrderValue, repeatPurchaseRate, revenueGrowth: null, ordersGrowth: null, avgOrderGrowth: null, repeatPurchaseGrowth: null });

        // Bookings-derived stats
        const totalBookingRevenue = bookings.reduce((s, b) => s + getNumber(b.revenue || b.total || b.amount || 0), 0);
        const totalBookings = bookings.length;
        const bookingPending = bookings.filter(b => b.status === 'pending' || b.status === 'PENDING').length;
        const bookingApproved = bookings.filter(b => b.status === 'approved' || b.status === 'APPROVED').length;
        const bookingCompleted = bookings.filter(b => b.status === 'completed' || b.status === 'COMPLETED' || b.status === 'done').length;
        const bookingCancelled = bookings.filter(b => b.status === 'cancelled' || b.status === 'CANCELLED').length;

        setApiBookingStats({ totalBookingRevenue, totalBookings, pendingBookings: bookingPending, approvedBookings: bookingApproved, completedBookings: bookingCompleted, cancelledBookings: bookingCancelled, bookingRevenueGrowth: null, avgBookingValue: totalBookings ? totalBookingRevenue / totalBookings : 0 });

        // Aggregate orders/bookings into time-series for charts (last 7 days, last 4 weeks, last 12 months)
        const toDateObj = (item) => {
          const d = item?.createdAt || item?.created_at || item?.date || item?.dateString || item?.date;
          const parsed = d ? new Date(d) : null;
          return (parsed && !isNaN(parsed)) ? parsed : null;
        };

        const startOfDay = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());

        const formatDay = (dt) => {
          const y = dt.getFullYear();
          const m = String(dt.getMonth() + 1).padStart(2, '0');
          const d = String(dt.getDate()).padStart(2, '0');
          return `${y}-${m}-${d}`;
        };

        const getWeekRangeKey = (dt) => {
          // ISO week-year week number approximation using year-week label
          const copy = new Date(dt);
          // Set to Thursday in current week to get ISO week-year
          copy.setDate(copy.getDate() + 3 - ((copy.getDay() + 6) % 7));
          const weekYear = copy.getFullYear();
          const firstJan = new Date(weekYear, 0, 1);
          const weekNum = Math.floor(1 + Math.round(((copy - firstJan) / 86400000 - 3 + ((firstJan.getDay() + 6) % 7)) / 7));
          return `${weekYear}-W${String(weekNum).padStart(2, '0')}`;
        };

        const formatMonth = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2,'0')}`;

        const sumByKey = (items, keyFn, valueFn) => {
          const map = Object.create(null);
          for (const it of items) {
            const key = keyFn(it);
            if (!key) continue;
            map[key] = (map[key] || 0) + (Number(valueFn(it)) || 0);
          }
          return map;
        };

        // Build last N day/week/month buckets
        const buildDaily = (items, getValue, days = 7) => {
          const today = startOfDay(new Date());
          const buckets = [];
          const map = sumByKey(items, (it) => {
            const d = toDateObj(it);
            return d ? formatDay(startOfDay(d)) : null;
          }, getValue);
          for (let i = days - 1; i >= 0; i--) {
            const dt = new Date(today);
            dt.setDate(today.getDate() - i);
            const key = formatDay(dt);
            buckets.push({ date: key, revenue: map[key] || 0, orders: 0 });
          }
          // compute orders count per day
          const orderCounts = sumByKey(items, (it) => {
            const d = toDateObj(it);
            return d ? formatDay(startOfDay(d)) : null;
          }, () => 1);
          for (const b of buckets) {
            b.orders = orderCounts[b.date] || 0;
          }
          return buckets;
        };

        const buildWeekly = (items, getValue, weeks = 4) => {
          const today = new Date();
          const weeksArr = [];
          // collect sums by week key
          const revByWeek = sumByKey(items, (it) => {
            const d = toDateObj(it);
            return d ? getWeekRangeKey(d) : null;
          }, getValue);
          for (let i = weeks - 1; i >= 0; i--) {
            const dt = new Date(today);
            dt.setDate(today.getDate() - i * 7);
            const key = getWeekRangeKey(dt);
            weeksArr.push({ period: key, revenue: revByWeek[key] || 0, orders: 0 });
          }
          const orderCounts = sumByKey(items, (it) => {
            const d = toDateObj(it);
            return d ? getWeekRangeKey(d) : null;
          }, () => 1);
          for (const w of weeksArr) w.orders = orderCounts[w.period] || 0;
          return weeksArr;
        };

        const buildMonthly = (items, getValue, months = 12) => {
          const today = new Date();
          const monthsArr = [];
          const revByMonth = sumByKey(items, (it) => {
            const d = toDateObj(it);
            return d ? formatMonth(d) : null;
          }, getValue);
          for (let i = months - 1; i >= 0; i--) {
            const dt = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const key = formatMonth(dt);
            monthsArr.push({ period: key, revenue: revByMonth[key] || 0, orders: 0 });
          }
          const orderCounts = sumByKey(items, (it) => {
            const d = toDateObj(it);
            return d ? formatMonth(d) : null;
          }, () => 1);
          for (const m of monthsArr) m.orders = orderCounts[m.period] || 0;
          return monthsArr;
        };

        const revenueDaily = buildDaily(orders, (o) => getNumber(getOrderTotal(o)), 7);
        const revenueWeekly = buildWeekly(orders, (o) => getNumber(getOrderTotal(o)), 4);
        const revenueMonthly = buildMonthly(orders, (o) => getNumber(getOrderTotal(o)), 12);

        const bookingDaily = buildDaily(bookings, (b) => getNumber(b.revenue || b.total || b.amount || 0), 7).map(d => ({ date: d.date, bookings: d.orders, revenue: d.revenue, completed: 0 }));
        const bookingWeekly = buildWeekly(bookings, (b) => getNumber(b.revenue || b.total || b.amount || 0), 4).map(w => ({ period: w.period, bookings: w.orders, revenue: w.revenue, completed: 0 }));
        const bookingMonthly = buildMonthly(bookings, (b) => getNumber(b.revenue || b.total || b.amount || 0), 12).map(m => ({ period: m.period, bookings: m.orders, revenue: m.revenue, completed: 0 }));

        setApiRevenueData({ daily: revenueDaily, weekly: revenueWeekly, monthly: revenueMonthly });
        setApiBookingData({ daily: bookingDaily, weekly: bookingWeekly, monthly: bookingMonthly });

        // Best selling products: if products provide unitsSold, use it; otherwise aggregate from orders (if items exist)
        let bestProducts = [];
        if (products && products.length && products[0].unitsSold) {
          bestProducts = [...products].sort((a,b) => (b.unitsSold || 0) - (a.unitsSold || 0)).slice(0,5).map(p => ({ id: p.id, name: p.name, category: p.category, unitsSold: p.unitsSold, revenue: p.revenue || 0, image: p.image, growth: p.growth || 0 }));
        } else if (orders && orders.length) {
          const counts = {};
          for (const o of orders) {
            const items = o.items || o.orderItems || o.products || [];
            for (const it of items) {
              const pid = it.productId || it.product_id || (it.product && it.product.id) || it.id;
              const qty = it.quantity || it.qty || 1;
              counts[pid] = (counts[pid] || 0) + qty;
            }
          }
          bestProducts = Object.entries(counts).map(([pid, unitsSold]) => {
            const p = products.find(x => String(x.id) === String(pid)) || {};
            return { id: pid, name: p.name || `Product ${pid}`, category: p.category || 'Unknown', unitsSold, revenue: (p.price || 0) * unitsSold, image: p.image || '', growth: 0 };
          }).sort((a,b) => b.unitsSold - a.unitsSold).slice(0,5);
        }
        setApiBestSellingProducts(bestProducts);

        // Top customers (aggregate by customer key)
        const topCustomersList = Object.entries(custCounts).map(([k,v]) => ({ id: k, name: k, email: k.includes('@') ? k : '', totalSpent: 0, orders: v, lastOrder: '' })).slice(0,5);
        setApiTopCustomers(topCustomersList);

        // Abandoned carts: no standard admin endpoint available here, leave null or derive from transactions if possible
        setApiAbandonedCarts(null);

      } catch (err) {
        console.warn('Failed to load analytics data', err);
        if (mounted) setError('Failed to load analytics from server. Showing sample data.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => { mounted = false; };
  }, []);

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
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4 sm:mb-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Analytics & Reports</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">Track your business performance and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 sm:pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              <option value="sales">Sales Reports</option>
              <option value="bookings">Booking Reports</option>
            </select>
            <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
          </div>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 sm:pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              <option value="7days">Last 7 days</option>
              <option value="4weeks">Last 4 weeks</option>
              <option value="12months">Last 12 months</option>
            </select>
            <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
          </div>
          <button 
            onClick={() => exportData(reportType === 'bookings' ? 'bookings' : 'revenue')}
            className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition text-sm"
          >
            <FiDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
  {reportType === 'sales' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <StatCard
            icon={FiDollarSign}
    title="Total Revenue"
    value={`GH₵${(apiStats ? apiStats.totalRevenue : stats.totalRevenue).toLocaleString()}`}
    growth={apiStats ? apiStats.revenueGrowth ?? stats.revenueGrowth : stats.revenueGrowth}
            color="bg-green-500"
          />
          <StatCard
            icon={FiShoppingCart}
    title="Total Orders"
    value={(apiStats ? apiStats.totalOrders : stats.totalOrders).toLocaleString()}
    growth={apiStats ? apiStats.ordersGrowth ?? stats.ordersGrowth : stats.ordersGrowth}
            color="bg-blue-500"
          />
          <StatCard
            icon={FiTrendingUp}
    title="Avg Order Value"
  value={`GH₵${safeNum(apiStats ? apiStats.avgOrderValue : stats.avgOrderValue).toFixed(2)}`}
    growth={apiStats ? apiStats.avgOrderGrowth ?? stats.avgOrderGrowth : stats.avgOrderGrowth}
            color="bg-purple-500"
          />
          <StatCard
            icon={FiRefreshCw}
    title="Repeat Purchase Rate"
  value={`${safeNum(apiStats ? apiStats.repeatPurchaseRate : stats.repeatPurchaseRate).toFixed(1)}%`}
    growth={apiStats ? apiStats.repeatPurchaseGrowth ?? stats.repeatPurchaseGrowth : stats.repeatPurchaseGrowth}
            color="bg-orange-500"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={FiCalendar}
    title="Total Bookings"
    value={(apiBookingStats ? apiBookingStats.totalBookings : bookingStats.totalBookings).toLocaleString()}
    growth={apiBookingStats ? apiBookingStats.bookingsGrowth ?? bookingStats.bookingsGrowth : bookingStats.bookingsGrowth}
            color="bg-blue-500"
          />
          <StatCard
            icon={FiDollarSign}
    title="Booking Revenue"
    value={`GH₵${(apiBookingStats ? apiBookingStats.totalBookingRevenue : bookingStats.totalBookingRevenue).toLocaleString()}`}
    growth={apiBookingStats ? apiBookingStats.bookingRevenueGrowth ?? bookingStats.bookingRevenueGrowth : bookingStats.bookingRevenueGrowth}
            color="bg-green-500"
          />
          <StatCard
            icon={FiTrendingUp}
    title="Avg Booking Value"
  value={`GH₵${safeNum(apiBookingStats ? apiBookingStats.avgBookingValue : bookingStats.avgBookingValue).toFixed(2)}`}
  growth={apiBookingStats ? apiBookingStats.avgBookingGrowth ?? bookingStats.avgBookingGrowth : bookingStats.avgBookingGrowth}
            color="bg-purple-500"
          />
          <StatCard
            icon={FiCheckCircle}
    title="Conversion Rate"
  value={`${safeNum(apiBookingStats ? apiBookingStats.conversionRate : bookingStats.conversionRate).toFixed(1)}%`}
  growth={apiBookingStats ? apiBookingStats.conversionGrowth ?? bookingStats.conversionGrowth : bookingStats.conversionGrowth}
            color="bg-orange-500"
          />
        </div>
      )}

      {/* small loading / error banners */}
      {loading && (
        <div className="mb-4 p-2 bg-yellow-50 text-yellow-800 rounded text-sm">Loading analytics...</div>
      )}
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-800 rounded text-sm">{error}</div>
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
          data={(reportType === 'bookings' ? (apiBookingData ? apiBookingData.daily : getCurrentData()) : (apiRevenueData ? apiRevenueData.daily : getCurrentData()))} 
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
                  {(apiBestSellingProducts ? apiBestSellingProducts : servicePerformance).map((service, index) => (
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
                        <p className="font-semibold text-gray-900 text-sm">GH₵{safeNum(service.revenue).toFixed(2)}</p>
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
                            ({safeNum(((staff.completed || 0) / (staff.bookings || 1)) * 100).toFixed(1)}%)
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
                        GH₵{safeNum(staff.revenue).toFixed(2)}
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
                        <p className="font-semibold text-gray-900 text-sm">GH₵{safeNum(product.revenue).toFixed(2)}</p>
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
                  {(apiTopCustomers || topCustomers).map((customer, index) => (
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
                          <ClickableEmail 
                            email={customer.email} 
                            className="text-xs text-gray-500 hover:text-green-600" 
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">GH₵{safeNum(customer.totalSpent).toFixed(2)}</p>
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
                  GH₵{abandonedCarts.reduce((sum, cart) => sum + safeNum(cart.value), 0).toFixed(2)}
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
                  {(apiAbandonedCarts || abandonedCarts).map((cart) => (
                    <tr key={cart.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{cart.customer}</p>
                          <ClickableEmail 
                            email={cart.email} 
                            className="text-xs text-gray-500 hover:text-green-600" 
                          />
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{cart.items}</td>
                      <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">GH₵{safeNum(cart.value).toFixed(2)}</td>
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
                  <p className="text-2xl font-bold">{safeNum(((bookingStats.completedBookings || 0) / (bookingStats.totalBookings || 1)) * 100).toFixed(1)}%</p>
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
                    GH₵{abandonedCarts.reduce((sum, cart) => sum + safeNum(cart.value), 0).toFixed(0)}
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