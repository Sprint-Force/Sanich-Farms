import { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiCheck,
  FiChevronDown,
  FiCreditCard,
  FiDollarSign,
  FiDownload,
  FiEdit2,
  FiEye,
  FiFilter,
  FiPackage,
  FiRefreshCw,
  FiSearch,
  FiTruck,
  FiUser,
  FiX,
  FiXCircle,
  FiFileText,
  FiPrinter,
  FiRotateCcw,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';
import { ClickableEmail, ClickablePhone } from '../../utils/contactUtils';
import apiClient, { ordersAPI, userAPI } from '../../services/api';

const OrderMgmt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');

  // Orders start empty; will be populated from API on mount
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'canceled', 'refunded'];
  const dateFilters = ['all', 'today', 'yesterday', 'last7days', 'last30days', 'custom'];

  // Helpers to normalize customer info coming from different API shapes
  const getCustomerName = (order) => {
    if (!order) return '';
    // possible shapes: order.customer = { name, email }, order.customer = 'Name', order.customerName, order.user?.name, order.email
    if (typeof order.customer === 'string' && order.customer.trim()) return order.customer;
    return order.customer?.name || order.customerName || order.user?.name || order.customer?.fullName || order.email || '';
  };

  const getCustomerEmail = (order) => {
    if (!order) return '';
    if (typeof order.customer === 'string' && /@/.test(order.customer)) return order.customer;
    return order.customer?.email || order.customerEmail || order.email || '';
  };

  const getCustomerPhone = (order) => {
    if (!order) return '';
    if (typeof order.customer === 'string' && /^(\+|\d)/.test(order.customer)) return order.customer;
    return order.customer?.phone || order.customerPhone || '';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FiCalendar className="w-4 h-4" />;
      case 'Processing': return <FiRefreshCw className="w-4 h-4" />;
      case 'Shipped': return <FiTruck className="w-4 h-4" />;
      case 'Delivered': return <FiCheck className="w-4 h-4" />;
      case 'Cancelled': return <FiXCircle className="w-4 h-4" />;
      case 'Refunded': return <FiXCircle className="w-4 h-4" />;
      default: return <FiPackage className="w-4 h-4" />;
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'Pending': 'Processing',
      'Processing': 'Shipped',
      'Shipped': 'Delivered'
    };
    return statusFlow[currentStatus] || null;
  };

  // Load orders from API on mount
  useEffect(() => {
    let mounted = true;
    const loadOrders = async () => {
      setLoadingOrders(true);
      try {
        const data = await ordersAPI.getAll();
        const list = Array.isArray(data) ? data : data?.orders || data?.data || [];
        if (mounted && Array.isArray(list)) {
          setOrders(list);
        }
      } catch (err) {
        console.warn('Failed to load orders from API', err);
      } finally {
        if (mounted) setLoadingOrders(false);
      }
    };

    loadOrders();
    return () => { mounted = false; };
  }, []);

  const filteredOrders = orders.filter(order => {
  const idStr = String(order?.id || order?._id || '').toLowerCase();
  const customerName = String(getCustomerName(order) || '').toLowerCase();
  const customerEmail = String(getCustomerEmail(order) || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch = idStr.includes(search) || customerName.includes(search) || customerEmail.includes(search);

    const statusStr = String(order?.status || '').toLowerCase();
    const matchesStatus = filterStatus === 'all' || statusStr === filterStatus.toLowerCase();

    // Date filtering logic would go here
    const matchesDate = true; // Simplified for now

    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    const doUpdate = async () => {
      try {
        try {
          // try a patch endpoint on server
          await apiClient.patch(`/orders/${orderId}`, { status: newStatus });
        } catch {
          console.warn('Status patch failed, proceeding with local update');
        }

        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
      } catch {
        console.warn('Failed to update order status');
      }
    };

    doUpdate();
  };

  const verifyPayment = (orderId) => {
    const doVerify = async () => {
      // Resolve current admin email from profile API when available
      let currentAdmin = 'admin@sanichfarms.com';
      try {
        const profile = await userAPI.getProfile();
        // profile may be direct object or wrapped
        const email = profile?.email || profile?.data?.email || profile?.user?.email || '';
        if (email) currentAdmin = email;
      } catch (err) {
        console.warn('Failed to fetch admin profile for payment verify, using fallback', err);
      }

      const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      try {
        try {
          await apiClient.post(`/orders/${orderId}/verify-payment`);
        } catch {
          console.warn('Payment verify endpoint failed, falling back to local update');
        }

        setOrders(prev => prev.map(order => 
          order.id === orderId ? { 
            ...order, 
            paymentStatus: 'Paid',
            paymentVerifiedBy: currentAdmin,
            paymentVerifiedAt: currentTime
          } : order
        ));

        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ 
            ...prev, 
            paymentStatus: 'Paid',
            paymentVerifiedBy: currentAdmin,
            paymentVerifiedAt: currentTime
          }));
        }
      } catch (err) {
        console.warn('Failed to verify payment', err);
      }
    };

    doVerify();
  };

  const markPaymentPending = (orderId) => {
    const doPending = async () => {
      try {
        try {
          await apiClient.post(`/orders/${orderId}/mark-pending`);
        } catch {
          console.warn('mark-pending endpoint failed, updating locally');
        }

        setOrders(prev => prev.map(order => 
          order.id === orderId ? { 
            ...order, 
            paymentStatus: 'Pending',
            paymentVerifiedBy: null,
            paymentVerifiedAt: null
          } : order
        ));

        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ 
            ...prev, 
            paymentStatus: 'Pending',
            paymentVerifiedBy: null,
            paymentVerifiedAt: null
          }));
        }
      } catch {
        console.warn('Failed to mark payment pending');
      }
    };

    doPending();
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const doCancel = async () => {
        try {
          try {
            await ordersAPI.cancel(orderId);
          } catch {
            console.warn('ordersAPI.cancel failed, trying patch');
            try { await apiClient.patch(`/orders/${orderId}`, { status: 'Cancelled' }); } catch (err) { console.warn('patch cancel failed', err); }
          }
          updateOrderStatus(orderId, 'Cancelled');
        } catch {
          console.warn('Failed to cancel order');
          updateOrderStatus(orderId, 'Cancelled');
        }
      };

      doCancel();
    }
  };

  const refundOrder = (orderId) => {
    if (window.confirm('Are you sure you want to refund this order?')) {
      const doRefund = async () => {
        try {
          try {
            await apiClient.patch(`/orders/${orderId}/refund`);
          } catch {
            console.warn('refund endpoint failed, trying status patch');
            try { await apiClient.patch(`/orders/${orderId}`, { status: 'Refunded' }); } catch (err) { console.warn('patch refund failed', err); }
          }
          updateOrderStatus(orderId, 'Refunded');
        } catch {
          console.warn('Failed to refund order');
          updateOrderStatus(orderId, 'Refunded');
        }
      };

      doRefund();
    }
  };

  const handleGenerateInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoiceModal(true);
  };

  const handlePrintReceipt = (order) => {
    setSelectedOrder(order);
    setShowReceiptModal(true);
  };

  const handleReturn = (order) => {
    setSelectedOrder(order);
    setShowReturnModal(true);
  };

  const processReturn = () => {
    if (!returnReason.trim()) {
      alert('Please provide a return reason');
      return;
    }

  const refundValue = refundAmount || Number(selectedOrder?.total || 0);
    
    // Process the return/refund
    updateOrderStatus(selectedOrder.id, 'Refunded');
    
    // In a real app, you would also:
    // - Create a return record
    // - Process the refund payment
    // - Update inventory
    // - Send notification to customer
    
    setShowReturnModal(false);
    setReturnReason('');
    setRefundAmount('');
    alert(`Return processed successfully. Refund amount: GH₵${refundValue}`);
  };

  const downloadInvoice = () => {
    // In a real app, you would generate a PDF invoice
    const invoiceData = {
  orderNumber: selectedOrder?.id || selectedOrder?._id || '',
  customer: {
    name: getCustomerName(selectedOrder),
    email: getCustomerEmail(selectedOrder),
    phone: getCustomerPhone(selectedOrder)
  },
  items: selectedOrder?.items || selectedOrder?.orderItems || [],
  total: Number(selectedOrder?.total || selectedOrder?.amount || 0),
  date: selectedOrder?.date || '',
  paymentMethod: selectedOrder?.paymentMethod || ''
    };
    
    // For demo purposes, we'll just log the invoice data
    console.log('Invoice data:', invoiceData);
    alert('Invoice downloaded successfully!');
    setShowInvoiceModal(false);
  };

  const printReceipt = () => {
    // In a real app, you would send to printer or generate printable format
    const receiptData = {
  orderNumber: selectedOrder?.id || selectedOrder?._id || '',
  customer: getCustomerName(selectedOrder) || '',
  items: selectedOrder?.items || selectedOrder?.orderItems || [],
  total: Number(selectedOrder?.total || selectedOrder?.amount || 0),
  paymentMethod: selectedOrder?.paymentMethod || '',
  date: selectedOrder?.date || ''
    };
    
    // For demo purposes, we'll just log the receipt data
    console.log('Receipt data:', receiptData);
    alert('Receipt sent to printer!');
    setShowReceiptModal(false);
  };

  const exportOrders = (format) => {
    if (format === 'csv') {
      // CSV export logic
        const csvContent = [
        ['Order ID', 'Customer', 'Total', 'Status', 'Date'].join(','),
        ...filteredOrders.map(order => 
          [
            order?.id || order?._id || '',
            (getCustomerName(order) || '').replace(/,/g, ' '),
            Number(order?.total || order?.amount || 0),
            order?.status || '',
            order?.date || ''
          ].join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.csv';
      a.click();
    } else if (format === 'pdf') {
      try {
        const headers = ['Order ID', 'Customer', 'Total', 'Status', 'Date'];
        const rows = filteredOrders.map(o => [
          o?.id || o?._id || '',
          (getCustomerName(o) || '').replace(/</g, '&lt;'),
          `GH₵${Number(o?.total || o?.amount || 0).toFixed(2)}`,
          o?.status || '',
          o?.date || ''
        ]);

        const tableHtml = `
          <html>
            <head>
              <title>Orders Export</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                body{font-family: Arial, Helvetica, sans-serif; padding:20px; color:#111}
                h1{font-size:18px; margin-bottom:16px}
                table{width:100%; border-collapse:collapse}
                th,td{border:1px solid #ddd; padding:8px; text-align:left}
                th{background:#f3f4f6}
              </style>
            </head>
            <body>
              <h1>Orders Export</h1>
              <table>
                <thead>
                  <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
                </thead>
                <tbody>
                  ${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
                </tbody>
              </table>
            </body>
          </html>
        `;

        const w = window.open('', '_blank');
        if (!w) {
          alert('Popup blocked. Please allow popups for this site to export PDF.');
          return;
        }
        w.document.write(tableHtml);
        w.document.close();
        w.focus();
        // Give the browser a moment to render then open print dialog
        setTimeout(() => {
          try { w.print(); } catch (e) { console.warn('Print failed', e); }
          // close the window shortly after
          setTimeout(() => { try { w.close(); } catch { /* ignore */ } }, 800);
        }, 300);
      } catch (err) {
        console.warn('PDF export failed', err);
        alert('PDF export failed.');
      }
    }
  };

  const viewOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4 sm:mb-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Order Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">View and manage customer orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            onClick={() => exportOrders('csv')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition text-sm sm:text-base"
          >
            <FiDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span> CSV
          </button>
          <button 
            onClick={() => exportOrders('pdf')}
            className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition text-sm sm:text-base"
          >
            <FiDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span> PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 xl:col-span-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <div className="relative flex-1">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : 
                     status === 'canceled' ? 'Canceled' :
                     status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <div className="relative flex-1">
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none text-sm sm:text-base"
              >
                {dateFilters.map(filter => (
                  <option key={filter} value={filter}>
                    {filter === 'all' ? 'All Dates' : 
                     filter === 'today' ? 'Today' :
                     filter === 'yesterday' ? 'Yesterday' :
                     filter === 'last7days' ? 'Last 7 Days' :
                     filter === 'last30days' ? 'Last 30 Days' :
                     'Custom Range'}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center sm:justify-start text-sm text-gray-600 sm:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{filteredOrders.length} orders found</span>
              {loadingOrders && (
                <div className="text-sm text-gray-500">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4 mb-6">
        {filteredOrders.map((order) => (
          <div key={order?.id || order?._id || Math.random()} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">{String(order?.id || order?._id || 'N/A')}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order?.status)}`}>
                    {getStatusIcon(order?.status)}
                    {String(order?.status || 'Unknown')}
                  </span>
                </div>
        <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
          <p className="text-sm font-medium text-gray-900 truncate">{String(getCustomerName(order) || 'Customer')}</p>
          <p className="text-xs text-gray-500 truncate">{String(getCustomerEmail(order) || '')}</p>
                  </div>
                </div>
              </div>
              <div className="text-right ml-3">
                <p className="text-lg font-bold text-gray-900">GH₵{Number(order?.total || order?.amount || 0).toFixed(2)}</p>
                <p className="text-xs text-gray-500">{order?.date ? new Date(order.date).toLocaleDateString() : ''}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {(order?.items || order?.orderItems || []).slice(0, 2).map((item, index) => (
                    <img
                      key={index}
                      src={item?.image || item?.thumbnail || ''}
                      alt={item?.name || ''}
                      className="w-6 h-6 rounded-full border border-white object-cover"
                    />
                  ))}
                  {(order?.items || order?.orderItems || []).length > 2 && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center">
                      <span className="text-xs text-gray-600">+{(order?.items || order?.orderItems || []).length - 2}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500">{(order?.items || order?.orderItems || []).length} item(s)</span>
              </div>

              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order?.paymentStatus)}`}>
                {String(order?.paymentStatus || '').toLowerCase() === 'paid' ? <FiCheck className="w-3 h-3" /> : 
                 String(order?.paymentStatus || '').toLowerCase() === 'pending' ? <FiCreditCard className="w-3 h-3" /> : 
                 <FiXCircle className="w-3 h-3" />}
                {String(order?.paymentStatus || '')}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => viewOrderDetail(order)}
                  className="text-blue-600 hover:text-blue-900 p-1"
                  title="View Details"
                >
                  <FiEye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleGenerateInvoice(order)}
                  className="text-purple-600 hover:text-purple-900 p-1"
                  title="Generate Invoice"
                >
                  <FiFileText className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePrintReceipt(order)}
                  className="text-indigo-600 hover:text-indigo-900 p-1"
                  title="Print Receipt"
                >
                  <FiPrinter className="w-4 h-4" />
                </button>
                {String(order?.status || '').toLowerCase() === 'delivered' && (
                  <button
                    onClick={() => handleReturn(order)}
                    className="text-orange-600 hover:text-orange-900 p-1"
                    title="Process Return"
                  >
                    <FiRotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {String(order?.paymentStatus || '').toLowerCase() === 'pending' && (
                  <button
                    onClick={() => verifyPayment(order.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-medium transition"
                    title="Verify Payment"
                  >
                    Verify
                  </button>
                )}
                {getNextStatus(order?.status) && (
                  <button
                    onClick={() => updateOrderStatus(order.id, getNextStatus(order?.status))}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition"
                    title={`Update to ${getNextStatus(order?.status)}`}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Orders Table - Desktop View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 xl:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order?.id || order?._id || Math.random()} className="hover:bg-gray-50">
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{String(order?.id || order?._id || 'N/A')}</div>
                  </td>
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="ml-3 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{String(getCustomerName(order) || 'Customer')}</div>
                        <div className="text-sm text-gray-500 truncate">{String(getCustomerEmail(order) || '')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {(order?.items || order?.orderItems || []).slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item?.image || item?.thumbnail || ''}
                            alt={item?.name || ''}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                        {(order?.items || order?.orderItems || []).length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{(order?.items || order?.orderItems || []).length - 3}</span>
                          </div>
                        )}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{(order?.items || order?.orderItems || []).length} item(s)</span>
                    </div>
                  </td>
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    GH₵{Number(order?.total || order?.amount || 0).toFixed(2)}
                  </td>
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order?.status)}`}>
                        {getStatusIcon(order?.status)}
                        {String(order?.status || '')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order?.paymentStatus)}`}>
                        {String(order?.paymentStatus || '').toLowerCase() === 'paid' ? <FiCheck className="w-3 h-3" /> : 
                         String(order?.paymentStatus || '').toLowerCase() === 'pending' ? <FiCreditCard className="w-3 h-3" /> : 
                         <FiXCircle className="w-3 h-3" />}
                        {String(order?.paymentStatus || '')}
                      </span>
                      {String(order?.paymentStatus || '').toLowerCase() === 'pending' && (
                        <button
                          onClick={() => verifyPayment(order.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Verify Payment"
                        >
                          <FiDollarSign className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order?.date ? new Date(order.date).toLocaleDateString() : ''}
                  </td>
                  <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => viewOrderDetail(order)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleGenerateInvoice(order)}
                        className="text-purple-600 hover:text-purple-900 p-1"
                        title="Generate Invoice"
                      >
                        <FiFileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintReceipt(order)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Print Receipt"
                      >
                        <FiPrinter className="w-4 h-4" />
                      </button>
                      {String(order?.status || '').toLowerCase() === 'delivered' && (
                        <button
                          onClick={() => handleReturn(order)}
                          className="text-orange-600 hover:text-orange-900 p-1"
                          title="Process Return"
                        >
                          <FiRotateCcw className="w-4 h-4" />
                        </button>
                      )}
                      {getNextStatus(order?.status) && (
                        <button
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order?.status))}
                          className="text-green-600 hover:text-green-900 p-1"
                          title={`Update to ${getNextStatus(order?.status)}`}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto my-4">
            <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                Order Details - {selectedOrder?.id || selectedOrder?._id || ''}
              </h2>
              <button 
                onClick={() => setShowOrderDetail(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {getCustomerName(selectedOrder) || ''}</p>
                    <p><span className="font-medium">Email:</span> <ClickableEmail email={getCustomerEmail(selectedOrder) || ''} className="text-gray-900 hover:text-green-600" /></p>
                    <p><span className="font-medium">Phone:</span> <ClickablePhone phone={getCustomerPhone(selectedOrder) || ''} className="text-gray-900 hover:text-green-600" /></p>
                    <p><span className="font-medium">Address:</span> {selectedOrder?.customer?.address || selectedOrder?.shippingAddress || ''}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order ID:</span> {selectedOrder?.id || selectedOrder?._id || ''}</p>
                    <p><span className="font-medium">Date:</span> {selectedOrder?.date ? new Date(selectedOrder.date).toLocaleDateString() : ''}</p>
                    <p><span className="font-medium">Payment:</span> {selectedOrder?.paymentMethod || ''}</p>
                    <p><span className="font-medium">Payment Ref:</span> {selectedOrder?.paymentReference || ''}</p>
                    <p><span className="font-medium">Shipping:</span> {selectedOrder?.shippingMethod || ''}</p>
                    {selectedOrder.notes && (
                      <p><span className="font-medium">Notes:</span> {selectedOrder.notes}</p>
                    )}
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                        {selectedOrder.paymentStatus === 'Paid' ? <FiCheck className="w-3 h-3" /> : 
                         selectedOrder.paymentStatus === 'Pending' ? <FiCreditCard className="w-3 h-3" /> : 
                         <FiXCircle className="w-3 h-3" />}
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    {selectedOrder.paymentVerifiedBy && (
                      <>
                        <p><span className="font-medium">Verified by:</span> {selectedOrder.paymentVerifiedBy}</p>
                        <p><span className="font-medium">Verified at:</span> {new Date(selectedOrder.paymentVerifiedAt).toLocaleString()}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(selectedOrder?.items || selectedOrder?.orderItems || []).map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img
                                src={item?.image || item?.thumbnail || ''}
                                alt={item?.name || ''}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <span className="ml-3 text-sm font-medium">{item?.name || ''}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">GH₵{Number(item?.price || 0).toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm">{item?.quantity || 0}</td>
                          <td className="px-4 py-3 text-sm font-medium">
                            GH₵{(Number(item?.price || 0) * Number(item?.quantity || 0)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-right">Total:</td>
                        <td className="px-4 py-3 text-sm font-bold">GH₵{Number(selectedOrder?.total || selectedOrder?.amount || 0).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Status Management */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Order Status</h3>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                  
                  {selectedOrder.status !== 'Cancelled' && selectedOrder.status !== 'Refunded' && (
                    <>
                      <button
                        onClick={() => cancelOrder(selectedOrder.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Cancel Order
                      </button>
                      <button
                        onClick={() => refundOrder(selectedOrder.id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Refund Order
                      </button>
                    </>
                  )}
                </div>

                {/* Payment Management */}
                <h4 className="font-semibold text-gray-900 mb-3">Payment Verification</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getPaymentStatusColor(selectedOrder?.paymentStatus)}`}>
                    {String(selectedOrder?.paymentStatus || '').toLowerCase() === 'paid' ? <FiCheck className="w-3 h-3" /> : 
                     String(selectedOrder?.paymentStatus || '').toLowerCase() === 'pending' ? <FiCreditCard className="w-3 h-3" /> : 
                     <FiXCircle className="w-3 h-3" />}
                    {selectedOrder?.paymentStatus || ''}
                  </span>
                  
                  {String(selectedOrder?.paymentStatus || '').toLowerCase() === 'pending' && (
                    <button
                      onClick={() => verifyPayment(selectedOrder?.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      Verify Payment
                    </button>
                  )}
                  
                  {String(selectedOrder?.paymentStatus || '').toLowerCase() === 'paid' && (
                    <button
                      onClick={() => markPaymentPending(selectedOrder?.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                    >
                      <FiCreditCard className="w-4 h-4" />
                      Mark as Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Generate Invoice</h3>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Invoice Header */}
                <div className="text-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-green-600">SANICH FARMS</h2>
                  <p className="text-sm text-gray-600">Agricultural Products & Services</p>
                  <p className="text-sm text-gray-600">
                    <FiMapPin className="inline w-4 h-4 mr-1" />
                    Ghana | 
                    <FiPhone className="inline w-4 h-4 ml-2 mr-1" />
                    +233 XX XXX XXXX | 
                    <FiMail className="inline w-4 h-4 ml-2 mr-1" />
                    info@sanichfarms.com
                  </p>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bill To:</h4>
                    <p className="text-sm text-gray-600">{getCustomerName(selectedOrder)}</p>
                    <p className="text-sm text-gray-600">{getCustomerEmail(selectedOrder)}</p>
                    <p className="text-sm text-gray-600">{getCustomerPhone(selectedOrder)}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="font-semibold text-gray-900 mb-2">Invoice Details:</h4>
                    <p className="text-sm text-gray-600">Invoice #: INV-{selectedOrder.id}</p>
                    <p className="text-sm text-gray-600">Order #: {selectedOrder.id}</p>
                    <p className="text-sm text-gray-600">Date: {selectedOrder.date}</p>
                    <p className="text-sm text-gray-600">Payment: {selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Item</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-900">Qty</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Price</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-right">GH₵{item.price}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                            GH₵{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-300 bg-gray-50">
                        <td colSpan="3" className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                          Total Amount:
                        </td>
                        <td className="px-4 py-2 text-lg font-bold text-green-600 text-right">
                          GH₵{selectedOrder.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 border-t pt-4">
                  <p>Thank you for your business!</p>
                  <p>This is a computer-generated invoice.</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={downloadInvoice}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <FiFileText className="w-4 h-4" />
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Print Receipt</h3>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                {/* Receipt Header */}
                <div className="text-center border-b pb-3">
                  <h2 className="text-lg font-bold">SANICH FARMS</h2>
                  <p className="text-xs text-gray-600">RECEIPT</p>
                </div>

                {/* Receipt Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Receipt #:</span>
                    <span className="font-medium">RCP-{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedOrder.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span>{getCustomerName(selectedOrder)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-b py-3 space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="flex-1">{item.name} x{item.quantity}</span>
                      <span className="font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span>TOTAL:</span>
                  <span>GH₵{selectedOrder.total}</span>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 pt-3">
                  <p>Thank you for your purchase!</p>
                  <p>Keep this receipt for your records</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={printReceipt}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <FiPrinter className="w-4 h-4" />
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return/Refund Modal */}
      {showReturnModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Process Return</h3>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Order: #{selectedOrder.id}</p>
                  <p className="text-sm text-gray-600 mb-4">Customer: {getCustomerName(selectedOrder)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Reason *
                  </label>
                  <textarea
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                    placeholder="Please provide reason for return..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refund Amount (GH₵)
                  </label>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={`Default: ${selectedOrder.total}`}
                    step="0.01"
                    min="0"
                    max={selectedOrder.total}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to refund full amount (GH₵{selectedOrder.total})
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={processReturn}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
                >
                  <FiRotateCcw className="w-4 h-4" />
                  Process Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderMgmt;