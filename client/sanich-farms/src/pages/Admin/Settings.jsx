import React, { useState, useEffect } from 'react';
import { 
  FiUpload, 
  FiSave, 
  FiDollarSign, 
  FiCreditCard,
  FiTruck,
  FiPercent,
  FiUsers,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
  FiSettings
} from 'react-icons/fi';

import apiClient from '../../services/api';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [showApiKey, setShowApiKey] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Store Settings State (empty defaults until loaded from API)
  const [storeSettings, setStoreSettings] = useState({
    name: '',
    tagline: '',
    email: '',
    phone: '',
    address: '',
    logo: null,
    description: ''
  });

  // Payment Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    paypal: { enabled: false, clientId: '', secret: '', sandbox: true },
    stripe: { enabled: false, publishableKey: '', secretKey: '', webhookSecret: '' },
    momo: { enabled: false, merchantId: '', apiKey: '' }
  });

  // Shipping Settings State
  const [shippingRates, setShippingRates] = useState([]);

  // Tax Settings State
  const [taxSettings, setTaxSettings] = useState({ enableTax: false, defaultRate: 0, includeShipping: false, rules: [] });

  // Admin Roles State
  const [adminRoles, setAdminRoles] = useState([]);

  const [newRole, setNewRole] = useState({
    name: '',
    permissions: [],
    description: ''
  });

  // Load settings from server on mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/settings');
        if (!mounted) return;
        const data = res?.data || res || {};
        if (data.storeSettings) setStoreSettings(data.storeSettings);
        if (data.paymentSettings) setPaymentSettings(data.paymentSettings);
        if (data.shippingRates) setShippingRates(data.shippingRates);
        if (data.taxSettings) setTaxSettings(data.taxSettings);
        if (data.adminRoles) setAdminRoles(data.adminRoles);
      } catch (err) {
        console.warn('Failed to load settings from API', err?.response?.data || err.message || err);
        if (!mounted) return;
        setError('Failed to load settings from server');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Auto-clear messages
  useEffect(() => {
    if (error || success) {
      const t = setTimeout(() => { setError(null); setSuccess(null); }, 5000);
      return () => clearTimeout(t);
    }
  }, [error, success]);

  const saveAllSettings = async () => {
    setLoading(true);
    try {
      const payload = { storeSettings, paymentSettings, shippingRates, taxSettings, adminRoles };
      await apiClient.put('/settings', payload);
      setSuccess('Settings saved successfully');
    } catch (err) {
      console.warn('Failed to save settings', err?.response?.data || err.message || err);
      setError('Failed to save settings to server');
    } finally {
      setLoading(false);
    }
  };

  const allPermissions = [
    'products', 'orders', 'customers', 'analytics', 'settings', 'content', 'payments', 'shipping'
  ];

  const tabs = [
    { id: 'store', label: 'Store Settings', icon: FiSettings },
    { id: 'payment', label: 'Payment', icon: FiCreditCard },
    { id: 'shipping', label: 'Shipping', icon: FiTruck },
    { id: 'tax', label: 'Tax Rules', icon: FiPercent },
    { id: 'roles', label: 'Admin Roles', icon: FiUsers }
  ];

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStoreSettings(prev => ({ ...prev, logo: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveStoreSettings = () => {
  saveAllSettings();
  };

  const savePaymentSettings = () => {
  saveAllSettings();
  };

  const addShippingRate = () => {
    const newRate = {
      id: Date.now(),
      zone: '',
      rate: 0,
      freeShippingThreshold: 0
    };
    setShippingRates([...shippingRates, newRate]);
  };

  const updateShippingRate = (id, field, value) => {
    setShippingRates(prev =>
      prev.map(rate =>
        rate.id === id ? { ...rate, [field]: value } : rate
      )
    );
  };

  const deleteShippingRate = (id) => {
    setShippingRates(prev => prev.filter(rate => rate.id !== id));
  };

  const addTaxRule = () => {
    const newRule = {
      id: Date.now(),
      name: '',
      rate: 0,
      applicable: ''
    };
    setTaxSettings(prev => ({
      ...prev,
      rules: [...prev.rules, newRule]
    }));
  };

  const updateTaxRule = (id, field, value) => {
    setTaxSettings(prev => ({
      ...prev,
      rules: prev.rules.map(rule =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    }));
  };

  const deleteTaxRule = (id) => {
    setTaxSettings(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== id)
    }));
  };

  const addRole = () => {
    if (newRole.name && newRole.permissions.length > 0) {
      const role = {
        id: Date.now(),
        ...newRole,
        users: []
      };
  const updated = [...adminRoles, role];
  setAdminRoles(updated);
  // persist
  saveAllSettings();
      setNewRole({ name: '', permissions: [], description: '' });
      setShowAddRole(false);
    }
  };

  const deleteRole = (id) => {
  const updated = adminRoles.filter(role => role.id !== id);
  setAdminRoles(updated);
  saveAllSettings();
  };

  const togglePermission = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  // Add these functions for editing roles
  const startEditingRole = (role) => {
    setEditingRole(role.id);
    setNewRole({
      name: role.name,
      permissions: [...role.permissions],
      description: role.description
    });
  };

  const saveEditedRole = () => {
  const updated = adminRoles.map(role => role.id === editingRole ? { ...role, ...newRole } : role);
  setAdminRoles(updated);
  saveAllSettings();
  setEditingRole(null);
  setNewRole({ name: '', permissions: [], description: '' });
  };

  const cancelEditing = () => {
    setEditingRole(null);
    setNewRole({ name: '', permissions: [], description: '' });
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your store settings and preferences</p>
      </div>

      {/* Status banner */}
      {(loading || error || success) && (
        <div className={`mb-4 p-3 rounded-md ${error ? 'bg-red-50 border border-red-200 text-red-700' : success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-yellow-50 border border-yellow-200 text-yellow-700'}`}>
          {loading && <div className="text-sm">Saving settings... Please wait.</div>}
          {error && <div className="text-sm">{error}</div>}
          {success && <div className="text-sm">{success}</div>}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Store Settings Tab */}
          {activeTab === 'store' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Name
                    </label>
                    <input
                      type="text"
                      value={storeSettings.name}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={storeSettings.tagline}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, tagline: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={storeSettings.phone}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={storeSettings.address}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, address: e.target.value }))}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {storeSettings.logo ? (
                        <img
                          src={storeSettings.logo}
                          alt="Store Logo"
                          className="mx-auto h-24 w-24 object-contain mb-4"
                        />
                      ) : (
                        <div className="text-gray-400 mb-4">
                          <FiUpload className="mx-auto h-12 w-12" />
                          <p>Upload your logo</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2"
                      >
                        <FiUpload className="w-4 h-4" />
                        Upload Logo
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Description
                    </label>
                    <textarea
                      value={storeSettings.description}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, description: e.target.value }))}
                      rows="6"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={saveStoreSettings}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Payment Settings Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              {/* PayPal Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">PayPal Integration</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.paypal.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        paypal: { ...prev.paypal, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                {paymentSettings.paypal.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client ID
                      </label>
                      <input
                        type="text"
                        value={paymentSettings.paypal.clientId}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          paypal: { ...prev.paypal, clientId: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Secret
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKey ? "text" : "password"}
                          value={paymentSettings.paypal.secret}
                          onChange={(e) => setPaymentSettings(prev => ({
                            ...prev,
                            paypal: { ...prev.paypal, secret: e.target.value }
                          }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={paymentSettings.paypal.sandbox}
                          onChange={(e) => setPaymentSettings(prev => ({
                            ...prev,
                            paypal: { ...prev.paypal, sandbox: e.target.checked }
                          }))}
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Use Sandbox Mode (for testing)</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Stripe Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Stripe Integration</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.stripe.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        stripe: { ...prev.stripe, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                {paymentSettings.stripe.enabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publishable Key
                      </label>
                      <input
                        type="text"
                        value={paymentSettings.stripe.publishableKey}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          stripe: { ...prev.stripe, publishableKey: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        value={paymentSettings.stripe.secretKey}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          stripe: { ...prev.stripe, secretKey: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Money Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Mobile Money (Ghana)</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.momo.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        momo: { ...prev.momo, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                {paymentSettings.momo.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Merchant ID
                      </label>
                      <input
                        type="text"
                        value={paymentSettings.momo.merchantId}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          momo: { ...prev.momo, merchantId: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <input
                        type="password"
                        value={paymentSettings.momo.apiKey}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          momo: { ...prev.momo, apiKey: e.target.value }
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={savePaymentSettings}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Save Payment Settings
                </button>
              </div>
            </div>
          )}

          {/* Shipping Settings Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Shipping Rates by Zone</h3>
                <button
                  onClick={addShippingRate}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Zone
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate (GH₵)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Free Shipping Threshold</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {shippingRates.map((rate) => (
                      <tr key={rate.id}>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={rate.zone}
                            onChange={(e) => updateShippingRate(rate.id, 'zone', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={rate.rate}
                            onChange={(e) => updateShippingRate(rate.id, 'rate', parseFloat(e.target.value))}
                            className="w-full border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                            step="0.01"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={rate.freeShippingThreshold}
                            onChange={(e) => updateShippingRate(rate.id, 'freeShippingThreshold', parseFloat(e.target.value))}
                            className="w-full border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                            step="0.01"
                          />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteShippingRate(rate.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tax Settings Tab */}
          {activeTab === 'tax' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Tax Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={taxSettings.enableTax}
                      onChange={(e) => setTaxSettings(prev => ({ ...prev, enableTax: e.target.checked }))}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable Tax Calculation</span>
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={taxSettings.defaultRate}
                        onChange={(e) => setTaxSettings(prev => ({ ...prev, defaultRate: parseFloat(e.target.value) }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                        step="0.1"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={taxSettings.includeShipping}
                          onChange={(e) => setTaxSettings(prev => ({ ...prev, includeShipping: e.target.checked }))}
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Include shipping in tax calculation</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Tax Rules</h3>
                  <button
                    onClick={addTaxRule}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Rule
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rule Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate (%)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicable To</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {taxSettings.rules.map((rule) => (
                        <tr key={rule.id}>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={rule.name}
                              onChange={(e) => updateTaxRule(rule.id, 'name', e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={rule.rate}
                              onChange={(e) => updateTaxRule(rule.id, 'rate', parseFloat(e.target.value))}
                              className="w-full border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                              step="0.1"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={rule.applicable}
                              onChange={(e) => updateTaxRule(rule.id, 'applicable', e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => deleteTaxRule(rule.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Admin Roles Tab */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Admin Roles & Permissions</h3>
                <button
                  onClick={() => setShowAddRole(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Role
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {adminRoles.map((role) => (
                  <div 
                    key={role.id} 
                    className={`rounded-lg p-4 transition-all duration-300 ${
                      editingRole === role.id 
                        ? 'bg-gray-50 bg-opacity-50 border-2 border-green-300 shadow-lg' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{role.name}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditingRole(role)}
                          className={`p-1 transition-all duration-200 ${
                            editingRole === role.id
                              ? 'text-green-600 bg-green-100 rounded-full'
                              : 'text-blue-600 hover:text-blue-900'
                          }`}
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRole(role.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          disabled={editingRole === role.id}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.includes('all') ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            All Permissions
                          </span>
                        ) : (
                          role.permissions.map((permission) => (
                            <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {permission}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Users ({role.users.length}):</p>
                      <div className="space-y-1">
                        {role.users.map((user, index) => (
                          <p key={index} className="text-sm text-gray-600">{user}</p>
                        ))}
                      </div>
                    </div>

                    {/* Show editing indicator */}
                    {editingRole === role.id && (
                      <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium">Currently editing - Use the modal to save changes</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Edit Role Modal */}
              {editingRole && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
                  <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl my-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Edit Role</h3>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role Name
                        </label>
                        <input
                          type="text"
                          value={newRole.name}
                          onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={newRole.description}
                          onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                          rows="3"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Permissions
                        </label>
                        <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                          {allPermissions.map((permission) => (
                            <label key={permission} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={newRole.permissions.includes(permission)}
                                onChange={() => togglePermission(permission)}
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                              />
                              <span className="ml-2 text-sm text-gray-700 capitalize">{permission}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={saveEditedRole}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                      >
                        <FiCheck className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Role Modal */}
              {showAddRole && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
                  <div className="bg-white rounded-lg max-w-md w-full p-6 my-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Add New Role</h3>
                      <button
                        onClick={() => setShowAddRole(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role Name
                        </label>
                        <input
                          type="text"
                          value={newRole.name}
                          onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={newRole.description}
                          onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                          rows="3"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Permissions
                        </label>
                        <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                          {allPermissions.map((permission) => (
                            <label key={permission} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={newRole.permissions.includes(permission)}
                                onChange={() => togglePermission(permission)}
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                              />
                              <span className="ml-2 text-sm text-gray-700 capitalize">{permission}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={addRole}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                      >
                        <FiCheck className="w-4 h-4" />
                        Add Role
                      </button>
                      <button
                        onClick={() => setShowAddRole(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;