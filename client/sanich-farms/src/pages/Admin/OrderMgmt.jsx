import { useState } from 'react';
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
  FiXCircle
} from 'react-icons/fi';

const OrderMgmt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data - replace with real API
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+233 123 456 789',
        address: '123 Main St, Accra, Ghana'
      },
      items: [
        { id: 1, name: 'Premium Chicken Feed', price: 14.99, quantity: 2, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=100&q=80' },
        { id: 2, name: 'Organic Egg Layers', price: 25.50, quantity: 1, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80' }
      ],
      total: 55.48,
      status: 'Pending',
      paymentStatus: 'Pending',
      paymentVerifiedBy: null,
      paymentVerifiedAt: null,
      date: '2024-08-07',
      paymentMethod: 'Mobile Money',
      paymentReference: 'MM123456789',
      shippingMethod: 'Express Delivery',
      notes: 'Please deliver before 5 PM'
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+233 987 654 321',
        address: '456 Oak Ave, Kumasi, Ghana'
      },
      items: [
        { id: 3, name: 'Farming Equipment', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=100&q=80' }
      ],
      total: 89.99,
      status: 'Processing',
      paymentStatus: 'Paid',
      paymentVerifiedBy: 'admin@sanichfarms.com',
      paymentVerifiedAt: '2024-08-07 10:30:00',
      date: '2024-08-07',
      paymentMethod: 'Bank Transfer',
      paymentReference: 'BT987654321',
      shippingMethod: 'Standard Delivery',
      notes: ''
    },
    {
      id: 'ORD003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+233 555 123 456',
        address: '789 Pine St, Tamale, Ghana'
      },
      items: [
        { id: 1, name: 'Premium Chicken Feed', price: 14.99, quantity: 3, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=100&q=80' }
      ],
      total: 44.97,
      status: 'Shipped',
      paymentStatus: 'Paid',
      paymentVerifiedBy: 'admin@sanichfarms.com',
      paymentVerifiedAt: '2024-08-06 14:15:00',
      date: '2024-08-06',
      paymentMethod: 'Cash on Delivery',
      paymentReference: 'COD445566',
      shippingMethod: 'Express Delivery',
      notes: 'Handle with care'
    },
    {
      id: 'ORD004',
      customer: {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+233 777 888 999',
        address: '321 Elm St, Cape Coast, Ghana'
      },
      items: [
        { id: 2, name: 'Organic Egg Layers', price: 25.50, quantity: 2, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80' }
      ],
      total: 51.00,
      status: 'Delivered',
      paymentStatus: 'Paid',
      paymentVerifiedBy: 'admin@sanichfarms.com',
      paymentVerifiedAt: '2024-08-05 09:45:00',
      date: '2024-08-05',
      paymentMethod: 'Mobile Money',
      paymentReference: 'MM789123456',
      shippingMethod: 'Standard Delivery',
      notes: ''
    }
  ]);

  const statuses = ['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
  const dateFilters = ['all', 'today', 'yesterday', 'last7days', 'last30days', 'custom'];

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    // Date filtering logic would go here
    const matchesDate = true; // Simplified for now
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const verifyPayment = (orderId) => {
    const currentAdmin = 'admin@sanichfarms.com'; // In real app, get from auth context
    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
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
  };

  const markPaymentPending = (orderId) => {
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
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      updateOrderStatus(orderId, 'Cancelled');
    }
  };

  const refundOrder = (orderId) => {
    if (window.confirm('Are you sure you want to refund this order?')) {
      updateOrderStatus(orderId, 'Refunded');
    }
  };

  const exportOrders = (format) => {
    if (format === 'csv') {
      // CSV export logic
      const csvContent = [
        ['Order ID', 'Customer', 'Total', 'Status', 'Date'].join(','),
        ...filteredOrders.map(order => 
          [order.id, order.customer.name, order.total, order.status, order.date].join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.csv';
      a.click();
    } else if (format === 'pdf') {
      // PDF export would use a library like jsPDF
      alert('PDF export functionality would be implemented here');
    }
  };

  const viewOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-1">View and manage customer orders</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button 
            onClick={() => exportOrders('csv')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <FiDownload className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={() => exportOrders('pdf')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <FiDownload className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400 w-4 h-4" />
            <div className="relative flex-1">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400 w-4 h-4" />
            <div className="relative flex-1">
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
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
          <div className="flex items-center text-sm text-gray-600">
            <span>{filteredOrders.length} orders found</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{order.items.length} item(s)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    GH₵{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus === 'Paid' ? <FiCheck className="w-3 h-3" /> : 
                         order.paymentStatus === 'Pending' ? <FiCreditCard className="w-3 h-3" /> : 
                         <FiXCircle className="w-3 h-3" />}
                        {order.paymentStatus}
                      </span>
                      {order.paymentStatus === 'Pending' && (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => viewOrderDetail(order)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      {getNextStatus(order.status) && (
                        <button
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                          className="text-green-600 hover:text-green-900 p-1"
                          title={`Update to ${getNextStatus(order.status)}`}
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
      </div>

      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Order Details - {selectedOrder.id}
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
                    <p><span className="font-medium">Name:</span> {selectedOrder.customer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.customer.phone}</p>
                    <p><span className="font-medium">Address:</span> {selectedOrder.customer.address}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                    <p><span className="font-medium">Payment:</span> {selectedOrder.paymentMethod}</p>
                    <p><span className="font-medium">Payment Ref:</span> {selectedOrder.paymentReference}</p>
                    <p><span className="font-medium">Shipping:</span> {selectedOrder.shippingMethod}</p>
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
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <span className="ml-3 text-sm font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">GH₵{item.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm font-medium">
                            GH₵{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-right">Total:</td>
                        <td className="px-4 py-3 text-sm font-bold">GH₵{selectedOrder.total.toFixed(2)}</td>
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
                  
                  {getNextStatus(selectedOrder.status) && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status))}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Update to {getNextStatus(selectedOrder.status)}
                    </button>
                  )}
                  
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
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus === 'Paid' ? <FiCheck className="w-3 h-3" /> : 
                     selectedOrder.paymentStatus === 'Pending' ? <FiCreditCard className="w-3 h-3" /> : 
                     <FiXCircle className="w-3 h-3" />}
                    {selectedOrder.paymentStatus}
                  </span>
                  
                  {selectedOrder.paymentStatus === 'Pending' && (
                    <button
                      onClick={() => verifyPayment(selectedOrder.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      Verify Payment
                    </button>
                  )}
                  
                  {selectedOrder.paymentStatus === 'Paid' && (
                    <button
                      onClick={() => markPaymentPending(selectedOrder.id)}
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
    </div>
  );
};

export default OrderMgmt;