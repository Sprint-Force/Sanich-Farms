import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiSearch, 
  FiChevronDown, 
  FiEye, 
  FiMail, 
  FiX, 
  FiUser,
  FiUsers,
  FiMapPin,
  FiPhone,
  FiHome,
  FiCalendar,
  FiGrid,
  FiList,
  FiDownload,
  FiRefreshCw,
  FiAlertCircle
} from 'react-icons/fi';
import { adminUsersAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const UserMgmt = () => {
  const { addToast } = useToast();
  
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Helper functions
  const getUserName = (user) => user?.name || 'N/A';
  const getUserEmail = (user) => user?.email || 'N/A';
  const getUserPhone = (user) => user?.phone_number || user?.phone || 'N/A';
  const getUserAddress = (user) => user?.address || 'N/A';
  const getUserCompany = (user) => user?.company_name || 'N/A';

  // Load users from API
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminUsersAPI.getAll();
      const usersData = Array.isArray(response) ? response : response.users || response.data || [];
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to load users. Please try again.');
      addToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      getUserName(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserEmail(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserPhone(user).includes(searchTerm) ||
      getUserCompany(user).toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // User action handlers
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  // Export users to CSV
  const handleExportUsers = () => {
    try {
      // Prepare CSV data
      const csvHeaders = [
        'User ID',
        'Name',
        'Email',
        'Phone',
        'Address',
        'Company',
        'Registration Date'
      ];

      const csvData = filteredUsers.map(user => [
        user?.id || '',
        getUserName(user),
        getUserEmail(user),
        getUserPhone(user),
        getUserAddress(user),
        getUserCompany(user),
        user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Not Available'
      ]);

      // Create CSV content
      const csvContent = [
        csvHeaders.join(','),
        ...csvData.map(row => 
          row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `users-export-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        addToast('Users exported successfully!', 'success');
      }
    } catch (error) {
      console.error('Export failed:', error);
      addToast('Failed to export users', 'error');
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 xl:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              User Management
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base leading-relaxed">
              Manage customer accounts and information
            </p>
          </div>
          
          {/* Controls - View Toggle and Export Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 sm:p-2.5 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                title="Grid View"
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 sm:p-2.5 rounded-md transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                title="List View"
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
            
            {/* Export Button */}
            <button
              onClick={handleExportUsers}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              title="Export Users to CSV"
            >
              <FiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6">
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
            <div className="relative flex-1 sm:max-w-md lg:max-w-xl xl:max-w-2xl">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base transition-all duration-200 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> of <span className="font-medium text-gray-900">{users.length}</span> users
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-green-600"></div>
            <span className="text-sm sm:text-base text-gray-600 font-medium">Loading users...</span>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 text-center">
          <FiAlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 mx-auto mb-3 sm:mb-4" />
          <p className="text-red-800 font-medium mb-2 text-sm sm:text-base">Error Loading Users</p>
          <p className="text-red-600 text-xs sm:text-sm mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 active:bg-red-800 transition-all duration-200 text-sm sm:text-base active:scale-95"
          >
            Try Again
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <FiUsers className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 sm:mb-6" />
          <p className="text-gray-600 text-base sm:text-lg font-medium mb-2">
            {users.length === 0 
              ? 'No users found' 
              : 'No users match your current search.'}
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            {users.length === 0 
              ? 'No users have registered yet.' 
              : 'Try adjusting your search criteria.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-3 sm:p-4 lg:p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-300 hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="min-w-0 flex-1 pr-2">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight truncate mb-1">
                            {getUserName(user)}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            ID: {user.id}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <FiUser className="w-8 h-8 text-green-600 bg-green-100 rounded-full p-2" />
                        </div>
                      </div>

                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">Email:</span>
                          <span className="font-medium text-gray-900 truncate ml-2 text-right">
                            {getUserEmail(user)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">Phone:</span>
                          <span className="text-gray-900 font-medium">{getUserPhone(user)}</span>
                        </div>
                        {getUserCompany(user) !== 'N/A' && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 font-medium">Company:</span>
                            <span className="text-gray-900 font-medium truncate ml-2 text-right">{getUserCompany(user)}</span>
                          </div>
                        )}
                        {user.created_at ? (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 font-medium">Joined:</span>
                            <span className="text-gray-900 font-medium">
                              {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 font-medium">User ID:</span>
                            <span className="text-gray-900 font-medium">
                              #{user.id}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleViewUser(user)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 hover:scale-105 active:scale-95"
                      >
                        <FiEye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="group bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 lg:p-6 hover:shadow-lg hover:border-green-300 hover:bg-white transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-1 mb-3 sm:mb-0">
                            <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 group-hover:text-green-700 transition-colors duration-200">
                              {getUserName(user)}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-3">
                              <span className="font-medium">ID: {user.id}</span> • {user.created_at ? `Joined ${new Date(user.created_at).toLocaleDateString()}` : 'Member'}
                            </p>
                          </div>
                          <div className="sm:ml-6 sm:text-right">
                            <FiUser className="w-12 h-12 text-green-600 bg-green-100 rounded-full p-3 mx-auto sm:mx-0" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-4">
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                              <FiMail className="w-3 h-3" />
                              Email
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate">{getUserEmail(user)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                              <FiPhone className="w-3 h-3" />
                              Phone
                            </p>
                            <p className="text-sm font-medium text-gray-900">{getUserPhone(user)}</p>
                          </div>
                          {getUserCompany(user) !== 'N/A' && (
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                                <FiHome className="w-3 h-3" />
                                Company
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate">{getUserCompany(user)}</p>
                            </div>
                          )}
                          {getUserAddress(user) !== 'N/A' && (
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                              <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                                <FiMapPin className="w-3 h-3" />
                                Address
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate">{getUserAddress(user)}</p>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleViewUser(user)}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 hover:scale-105 active:scale-95 min-w-[140px]"
                        >
                          <FiEye className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[98vh] sm:max-h-[96vh] lg:max-h-[90vh] overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 sticky top-0 z-10">
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 truncate pr-4 leading-tight">
                User Details - {getUserName(selectedUser)}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 touch-manipulation flex-shrink-0 active:scale-90"
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(98vh-4rem)] sm:max-h-[calc(96vh-5rem)] lg:max-h-[calc(90vh-6rem)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                {/* Personal Information */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                    <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
                    Personal Information
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-xs text-blue-700 mb-1 font-medium">Full Name</p>
                      <p className="font-semibold text-blue-900 text-sm sm:text-base">{getUserName(selectedUser)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 mb-1 font-medium">Email Address</p>
                      <p className="font-semibold text-blue-900 text-sm sm:text-base break-words">{getUserEmail(selectedUser)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 mb-1 font-medium">Phone Number</p>
                      <p className="font-semibold text-blue-900 text-sm sm:text-base">{getUserPhone(selectedUser)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-700 mb-1 font-medium">User ID</p>
                      <p className="font-semibold text-blue-900 text-sm sm:text-base">{selectedUser.id}</p>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-5 border border-green-100">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
                    <FiHome className="w-5 h-5" />
                    Business Information
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-xs text-green-700 mb-1 font-medium">Company Name</p>
                      <p className="font-semibold text-green-900 text-sm sm:text-base">{getUserCompany(selectedUser)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1 font-medium">Address</p>
                      <p className="font-semibold text-green-900 text-sm sm:text-base break-words">{getUserAddress(selectedUser)}</p>
                    </div>
                    {selectedUser.created_at ? (
                      <div>
                        <p className="text-xs text-green-700 mb-1 font-medium">Registration Date</p>
                        <p className="font-semibold text-green-900 text-sm sm:text-base">
                          {new Date(selectedUser.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-green-700 mb-1 font-medium">User Status</p>
                        <p className="font-semibold text-green-900 text-sm sm:text-base">
                          Active Member
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-green-700 mb-1 font-medium">Account Role</p>
                      <p className="font-semibold text-green-900 text-sm sm:text-base capitalize">
                        {selectedUser.role || 'Customer'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Quick Actions</h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => window.open(`mailto:${getUserEmail(selectedUser)}`, '_blank')}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiMail className="w-4 h-4" />
                    Send Email
                  </button>
                  <button
                    onClick={() => window.open(`tel:${getUserPhone(selectedUser)}`, '_blank')}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiPhone className="w-4 h-4" />
                    Call User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMgmt;