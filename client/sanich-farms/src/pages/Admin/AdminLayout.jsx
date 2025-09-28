import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingBag, 
  FiUsers, 
  FiBarChart, 
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
  FiBook,
  FiUser,
  FiTool,
  FiMessageSquare,
  FiSearch
} from 'react-icons/fi';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Products', href: '/admin/products', icon: FiPackage },
    { name: 'Services', href: '/admin/services', icon: FiTool }, // ADMIN SERVICES FIX: Add Services navigation
    { name: 'Orders', href: '/admin/orders', icon: FiShoppingBag },
    { name: 'Bookings', href: '/admin/bookings', icon: FiBook },
    { name: 'Q&A Management', href: '/admin/qa', icon: FiMessageSquare },
    { name: 'Users', href: '/admin/users', icon: FiUsers },
    { name: 'Analytics', href: '/admin/analytics', icon: FiBarChart },
    { name: 'Search Analytics', href: '/admin/search-analytics', icon: FiSearch },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-600">Sanich Farms</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-green-100 text-green-700 border-green-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200">
          <div className="p-4 space-y-2">
            <Link 
              to="/admin/profile" 
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/admin/profile')
                  ? 'bg-green-100 text-green-700 border-green-500'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiUser className="w-5 h-5 mr-3" />
              Profile
            </Link>
            <Link to="/admin/logout" className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-100 transition-colors">
              <FiLogOut className="w-5 h-5 mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 relative z-20">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            
            {/* Page title */}
            <h1 className="text-lg font-semibold text-gray-900 lg:hidden">Admin Panel</h1>
            
            {/* Desktop header content */}
            <div className="hidden lg:flex items-center justify-between w-full">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, Admin</p>
              </div>
              
              {/* Admin profile info */}
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin/profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Admin User</p>
                    <p className="text-gray-600">Administrator</p>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Mobile spacer */}
            <div className="w-6 lg:hidden"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;