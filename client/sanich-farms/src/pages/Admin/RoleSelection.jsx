import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiShield, FiArrowRight } from 'react-icons/fi';
import { useAuthContext } from '../../hooks/useAuthContext';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuthContext();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    // If user already has a role defined, redirect accordingly
    if (user?.role === 'admin') {
      // Set admin auth for compatibility
      localStorage.setItem('adminAuth', JSON.stringify({
        email: user.email,
        role: 'admin',
        name: user.name,
        timestamp: Date.now()
      }));
      navigate('/admin', { replace: true });
    } else if (user?.role === 'user' || user?.role) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isAuthenticated, navigate]);

  const handleRoleSelection = async (role) => {
    if (!user) return;

    try {
      // In a real app, this would be an API call to update user role
      // For now, we'll update locally
      const updatedUser = { ...user, role };
      
      // Update user context
      if (updateUser) {
        updateUser(updatedUser);
      } else {
        // Fallback: Update localStorage directly
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      if (role === 'admin') {
        // Set admin auth for compatibility
        localStorage.setItem('adminAuth', JSON.stringify({
          email: user.email,
          role: 'admin',
          name: user.name,
          timestamp: Date.now()
        }));
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      // Handle error appropriately
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name || user?.email}!
          </h2>
          <p className="text-gray-600">
            Please select your role to continue
          </p>
        </div>

        <div className="space-y-4">
          {/* User Role */}
          <button
            onClick={() => handleRoleSelection('user')}
            className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-3 group-hover:bg-blue-200 transition-colors">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
                <p className="text-sm text-gray-600">
                  Access your orders, bookings, and account settings
                </p>
              </div>
              <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
            </div>
          </button>

          {/* Admin Role - Only show if API indicates user can be admin */}
          {user?.canBeAdmin && (
            <button
              onClick={() => handleRoleSelection('admin')}
              className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-3 group-hover:bg-green-200 transition-colors">
                  <FiShield className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">Administrator</h3>
                  <p className="text-sm text-gray-600">
                    Manage products, orders, users, and system settings
                  </p>
                </div>
                <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Not you? Sign in with a different account
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;