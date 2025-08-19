import React, { useState, useEffect } from 'react';
import { FiCreditCard, FiSmartphone, FiPlus, FiTrash2, FiDollarSign, FiEye, FiEyeOff } from 'react-icons/fi';
import { paymentsAPI } from '../../services/api'; // API integration

const PaymentsWallet = () => {
  // DASHBOARD API INTEGRATION: State management
  const [showBalance, setShowBalance] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // DASHBOARD API INTEGRATION: Fetch all payment data
  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch payment methods, transactions, and wallet balance
      const [methodsResponse, transactionsResponse, balanceResponse] = await Promise.all([
        paymentsAPI.getPaymentMethods().catch(() => ({ data: [] })), // Fallback to empty array
        paymentsAPI.getTransactions().catch(() => ({ data: [] })), // Fallback to empty array
        paymentsAPI.getWalletBalance().catch(() => ({ balance: 0 })) // Fallback to 0 balance
      ]);

      // Handle different response structures
      const methodsData = Array.isArray(methodsResponse) ? methodsResponse : 
                         Array.isArray(methodsResponse?.methods) ? methodsResponse.methods : 
                         Array.isArray(methodsResponse?.data) ? methodsResponse.data : [];

      const transactionsData = Array.isArray(transactionsResponse) ? transactionsResponse : 
                              Array.isArray(transactionsResponse?.transactions) ? transactionsResponse.transactions : 
                              Array.isArray(transactionsResponse?.data) ? transactionsResponse.data : [];

      const balanceData = typeof balanceResponse?.balance === 'number' ? balanceResponse.balance : 
                         typeof balanceResponse?.data?.balance === 'number' ? balanceResponse.data.balance : 0;

      setPaymentMethods(methodsData);
      setTransactions(transactionsData);
      setWalletBalance(balanceData);
    } catch (err) {
      console.error('Failed to fetch payment data:', err);
      setError('Failed to load payment information. Please try again.');
      
      // Set fallback data if API fails
      setPaymentMethods([]);
      setTransactions([]);
      setWalletBalance(0);
    } finally {
      setLoading(false);
    }
  };

  // DASHBOARD API INTEGRATION: Load payment data on component mount
  useEffect(() => {
    fetchPaymentData();
  }, []);

  // DASHBOARD API INTEGRATION: Handle adding funds to wallet
  const handleAddFunds = async () => {
    const amount = prompt('Enter amount to add (GH₵):');
    if (amount && parseFloat(amount) > 0) {
      try {
        await paymentsAPI.addFunds(parseFloat(amount));
        fetchPaymentData(); // Refresh data
        alert('Funds added successfully!');
      } catch (error) {
        console.error('Error adding funds:', error);
        alert('Failed to add funds. Please try again.');
      }
    }
  };

  // DASHBOARD API INTEGRATION: Handle removing payment method
  const handleRemovePaymentMethod = async (methodId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      try {
        await paymentsAPI.removePaymentMethod(methodId);
        fetchPaymentData(); // Refresh data
        alert('Payment method removed successfully');
      } catch (error) {
        console.error('Error removing payment method:', error);
        alert('Failed to remove payment method. Please try again.');
      }
    }
  };

  // DASHBOARD API INTEGRATION: Loading state
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-60 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  // DASHBOARD API INTEGRATION: Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Payments & Wallet</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchPaymentData()} 
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Payments & Wallet</h1>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Wallet Balance</h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-full hover:bg-white/20 transition duration-200"
            aria-label={showBalance ? "Hide balance" : "Show balance"}
          >
            {showBalance ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">
              {showBalance ? `GH₵${walletBalance.toFixed(2)}` : 'GH₵***.**'}
            </p>
            <p className="text-green-100 text-sm">Available for purchases</p>
          </div>
          <button 
            onClick={handleAddFunds}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition duration-200"
          >
            Add Funds
          </button>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
          <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200">
            <FiPlus size={16} />
            Add Method
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${method.type === 'card' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                  {method.type === 'card' ? 
                    <FiCreditCard className={`w-6 h-6 ${method.type === 'card' ? 'text-blue-600' : 'text-yellow-600'}`} /> :
                    <FiSmartphone className="w-6 h-6 text-yellow-600" />
                  }
                </div>
                <div>
                  <p className="font-medium text-gray-800">{method.name}</p>
                  {method.number && <p className="text-sm text-gray-500">{method.number}</p>}
                  <p className="text-xs text-gray-400">Last used: {method.lastUsed}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.isDefault && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
                <button 
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition duration-200"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
        
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${transaction.type === 'payment' ? 'bg-red-100' : 'bg-green-100'}`}>
                  <FiDollarSign className={`w-5 h-5 ${transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}GH₵{Math.abs(transaction.amount).toFixed(2)}
                </p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-green-600 hover:text-green-800 font-medium">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsWallet;
