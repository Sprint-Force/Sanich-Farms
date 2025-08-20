import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter,
  FiChevronDown, 
  FiEye, 
  FiMail, 
  FiX, 
  FiUser,
  FiShoppingBag,
  FiCalendar,
  FiActivity,
  FiUserX,
  FiUserCheck,
  FiDownload,
  FiMapPin,
  FiPhone
} from 'react-icons/fi';
import { ClickableEmail, ClickablePhone } from '../../utils/contactUtils';

const UserMgmt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    recipients: []
  });

  // Mock data - replace with real API
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+233 123 456 789',
      address: '123 Main St, Accra, Ghana',
      status: 'Active',
      registrationDate: '2024-01-15',
      lastActivity: '2024-08-07',
      totalOrders: 12,
      totalSpent: 1285.50,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      orderHistory: [
        { id: 'ORD001', date: '2024-08-07', amount: 125.50, status: 'Completed' },
        { id: 'ORD015', date: '2024-07-25', amount: 89.99, status: 'Completed' },
        { id: 'ORD028', date: '2024-07-10', amount: 234.75, status: 'Completed' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+233 987 654 321',
      address: '456 Oak Ave, Kumasi, Ghana',
      status: 'Active',
      registrationDate: '2024-02-20',
      lastActivity: '2024-08-06',
      totalOrders: 8,
      totalSpent: 756.30,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a4b8ba?w=100&h=100&fit=crop&crop=face',
      orderHistory: [
        { id: 'ORD002', date: '2024-08-06', amount: 89.99, status: 'Processing' },
        { id: 'ORD018', date: '2024-07-20', amount: 156.80, status: 'Completed' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+233 555 123 456',
      address: '789 Pine St, Tamale, Ghana',
      status: 'Suspended',
      registrationDate: '2024-03-10',
      lastActivity: '2024-07-15',
      totalOrders: 3,
      totalSpent: 234.75,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      orderHistory: [
        { id: 'ORD003', date: '2024-07-15', amount: 234.75, status: 'Refunded' }
      ]
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+233 777 888 999',
      address: '321 Elm St, Cape Coast, Ghana',
      status: 'Banned',
      registrationDate: '2024-04-05',
      lastActivity: '2024-06-20',
      totalOrders: 15,
      totalSpent: 2156.80,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      orderHistory: [
        { id: 'ORD045', date: '2024-06-20', amount: 145.30, status: 'Cancelled' }
      ]
    }
  ]);

  const statuses = ['all', 'Active', 'Suspended', 'Banned'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-yellow-100 text-yellow-800';
      case 'Banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <FiUserCheck className="w-4 h-4" />;
      case 'Suspended': return <FiUser className="w-4 h-4" />;
      case 'Banned': return <FiUserX className="w-4 h-4" />;
      default: return <FiUser className="w-4 h-4" />;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const updateCustomerStatus = (customerId, newStatus) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    if (selectedUser && selectedUser.id === customerId) {
      setSelectedUser(prev => ({ ...prev, status: newStatus }));
    }
  };

  const suspendCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to suspend this customer?')) {
      updateCustomerStatus(customerId, 'Suspended');
    }
  };

  const banCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to ban this customer? This action is severe.')) {
      updateCustomerStatus(customerId, 'Banned');
    }
  };

  const activateCustomer = (customerId) => {
    updateCustomerStatus(customerId, 'Active');
  };

  const viewUserDetail = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const openEmailModal = (recipients = []) => {
    setEmailData({
      subject: '',
      message: '',
      recipients: recipients.length > 0 ? recipients : []
    });
    setShowEmailModal(true);
  };

  const sendEmail = () => {
    // Email sending logic would go here
    console.log('Sending email:', emailData);
    alert(`Email sent to ${emailData.recipients.length} recipient(s)`);
    setShowEmailModal(false);
  };

  const exportCustomers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Status', 'Registration Date', 'Total Orders', 'Total Spent'].join(','),
      ...filteredCustomers.map(customer => 
        [
          customer.name,
          customer.email,
          customer.phone,
          customer.status,
          customer.registrationDate,
          customer.totalOrders,
          customer.totalSpent
        ].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
  };

  const calculateDaysSince = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage your customer database</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button 
            onClick={() => openEmailModal(filteredCustomers.map(c => c.email))}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <FiMail className="w-4 h-4" />
            Send Email
          </button>
          <button 
            onClick={exportCustomers}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {customers.filter(c => c.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Suspended</p>
          <p className="text-2xl font-bold text-yellow-600">
            {customers.filter(c => c.status === 'Suspended').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Banned</p>
          <p className="text-2xl font-bold text-red-600">
            {customers.filter(c => c.status === 'Banned').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400 w-4 h-4" />
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 appearance-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            {filteredCustomers.length} customers found
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <FiShoppingBag className="w-4 h-4 text-gray-400" />
                      {customer.totalOrders}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    GH₵{customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                      {getStatusIcon(customer.status)}
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <FiActivity className="w-4 h-4 text-gray-400" />
                      {calculateDaysSince(customer.lastActivity)} days ago
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => viewUserDetail(customer)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEmailModal([customer.email])}
                        className="text-purple-600 hover:text-purple-900 p-1"
                        title="Send Email"
                      >
                        <FiMail className="w-4 h-4" />
                      </button>
                      {customer.status === 'Active' && (
                        <button
                          onClick={() => suspendCustomer(customer.id)}
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                          title="Suspend"
                        >
                          <FiUserX className="w-4 h-4" />
                        </button>
                      )}
                      {customer.status === 'Active' && (
                        <button
                          onClick={() => banCustomer(customer.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Ban"
                        >
                          <FiUserX className="w-4 h-4" />
                        </button>
                      )}
                      {customer.status !== 'Active' && (
                        <button
                          onClick={() => activateCustomer(customer.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Activate"
                        >
                          <FiUserCheck className="w-4 h-4" />
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

      {/* User Detail Modal */}
      {showUserDetail && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                User Details - {selectedUser.name}
              </h2>
              <button
                onClick={() => setShowUserDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedUser.name}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedUser.status)}`}>
                        {getStatusIcon(selectedUser.status)}
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-gray-400" />
                      <ClickableEmail email={selectedUser.email} className="text-gray-900 hover:text-green-600" />
                    </p>
                    <p className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4 text-gray-400" />
                      <ClickablePhone phone={selectedUser.phone} className="text-gray-900 hover:text-green-600" />
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-gray-400" />
                      {selectedUser.address}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Account Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Registration Date:</span>
                      <span className="text-sm font-medium">{new Date(selectedUser.registrationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Activity:</span>
                      <span className="text-sm font-medium">{calculateDaysSince(selectedUser.lastActivity)} days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Orders:</span>
                      <span className="text-sm font-medium">{selectedUser.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Spent:</span>
                      <span className="text-sm font-medium">GH₵{selectedUser.totalSpent.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average Order:</span>
                      <span className="text-sm font-medium">
                        GH₵{selectedUser.totalOrders > 0 ? (selectedUser.totalSpent / selectedUser.totalOrders).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order History</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Order ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedUser.orderHistory.map((order, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                          <td className="px-4 py-3 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm">GH₵{order.amount.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => openEmailModal([selectedUser.email])}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Send Email
                  </button>
                  {selectedUser.status === 'Active' && (
                    <>
                      <button
                        onClick={() => suspendCustomer(selectedUser.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Suspend Customer
                      </button>
                      <button
                        onClick={() => banCustomer(selectedUser.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Ban Customer
                      </button>
                    </>
                  )}
                  {selectedUser.status !== 'Active' && (
                    <button
                      onClick={() => activateCustomer(selectedUser.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Activate Customer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Send Promotional Email</h2>
              <button 
                onClick={() => setShowEmailModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients ({emailData.recipients.length})
                </label>
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {emailData.recipients.length > 3 
                    ? `${emailData.recipients.slice(0, 3).join(', ')} and ${emailData.recipients.length - 3} more...`
                    : emailData.recipients.join(', ')
                  }
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your promotional message"
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={sendEmail}
                  disabled={!emailData.subject || !emailData.message}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Send Email
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMgmt;