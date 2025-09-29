import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';
import AuthOnlyLayout from './components/Layout/AuthOnlyLayout';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
// NEW: Import the new password recovery pages
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetPassword from './pages/Login/ResetPassword';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import PaymentCallbackPage from './pages/PaymentCallbackPage'; // USER SIDE FIX: Add payment callback page
import ThankYouPage from './pages/ThankYouPage'; // USER SIDE FIX: Add thank you page
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import AllServicesPage from './pages/AllServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceBookingPage from './pages/ServiceBookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import UserDashboardPage from './pages/UserDashboardPage';

// Import dashboard section components for nested routes
import DashboardOverview from './components/Dashboard/DashboardOverview';
import MyOrders from './components/Dashboard/MyOrders';
import MyBookings from './components/Dashboard/MyBookings';
import MyProfile from './components/Dashboard/MyProfile';
import TrackOrders from './components/Dashboard/TrackOrders';
// Imports for detail pages
import OrderDetailPage from './components/Dashboard/OrderDetailPage';
import BookingDetailPage from './components/Dashboard/BookingDetailPage';

import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FAQPage from './pages/FAQPage';
import TrackOrderPage from './pages/TrackOrderPage';
import RecentlyViewedPage from './pages/RecentlyViewedPage';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingProvider } from './context/LoadingContext';
import AuthProvider from './context/AuthContext';
import ScrollToTop from './components/utils/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';

import AdminLayout from './pages/Admin/AdminLayout'; // NEW: Import AdminLayout
// RoleSelection removed
import AdminLogout from './pages/Admin/AdminLogout';
import AdminProfile from './pages/Admin/AdminProfile';
import AdminProtectedRoute from './pages/Admin/AdminProtectedRoute';
import Analytic from './pages/Admin/Analytic';
import BookingMgmt from './pages/Admin/BookingMgmt';
import Dashboard from './pages/Admin/Dashboard';
import OrderMgmt from './pages/Admin/OrderMgmt';
import ProductMgmt from './pages/Admin/ProductMgmt';
import ServiceMgmt from './pages/Admin/ServiceMgmt'; // ADMIN SERVICES FIX: Import ServiceMgmt
import Settings from './pages/Admin/Settings';
import UserMgmt from './pages/Admin/UserMgmt';
import QAManagement from './pages/Admin/QAManagement';
import SimpleAnalytics from './pages/Admin/SimpleAnalytics';


function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <ScrollToTop />
              <Routes>
              <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                
                {/* Public pages */}
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/products/:productId' element={<ProductDetailPage />} />
                <Route path='/about' element={<AboutUsPage />} />
                <Route path='/contact' element={<ContactUsPage />} />
                <Route path='/services' element={<AllServicesPage />} />
                <Route path='/services/:serviceId' element={<ServiceDetailPage />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/terms' element={<TermsPage />} />
                <Route path='/privacy' element={<PrivacyPage />} />
                <Route path='/faq' element={<FAQPage />} />
                <Route path='/track-order' element={<TrackOrderPage />} />

                {/* Public cart and wishlist - accessible to both guest and authenticated users */}
                <Route path='/cart' element={<CartPage />} />
                <Route path='/wishlist' element={<WishlistPage />} />

                {/* Protected routes that require authentication */}
                <Route path='/checkout' element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                {/* USER SIDE FIX: Add payment callback routes for MoMo verification */}
                <Route path='/payment-callback' element={<PaymentCallbackPage />} />
                <Route path='/payment-success' element={<PaymentCallbackPage />} />
                {/* USER SIDE FIX: Add thank you page route */}
                <Route path='/thank-you' element={<ThankYouPage />} />
                <Route path='/order-confirmation' element={
                  <ProtectedRoute>
                    <OrderConfirmationPage />
                  </ProtectedRoute>
                } />
                <Route path='/book-service/:serviceId' element={
                  <ProtectedRoute>
                    <ServiceBookingPage />
                  </ProtectedRoute>
                } />
                <Route path='/booking-confirmation/:bookingId' element={
                  <ProtectedRoute>
                    <BookingConfirmationPage />
                  </ProtectedRoute>
                } />

                {/* User Dashboard Routes - All protected */}
                <Route path='/dashboard' element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                }>
                  <Route index element={<DashboardOverview />} />
                  <Route path='orders' element={<MyOrders />} />
                  <Route path='track-orders' element={<TrackOrders />} />
                  <Route path='bookings' element={<MyBookings />} />
                  <Route path='profile' element={<MyProfile />} />
                  <Route path='wishlist' element={<WishlistPage />} />
                  <Route path='recently-viewed' element={<RecentlyViewedPage />} />
                  <Route path='orders/:orderId' element={<OrderDetailPage />} />
                  <Route path='bookings/:bookingId' element={<BookingDetailPage />} />
                </Route>
              </Route>

              {/* Authentication routes - using AuthOnlyLayout without navbar or footer */}
              <Route element={<AuthOnlyLayout />}>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={
                  <ProtectedRoute requireAuth={false}>
                    <Signup />
                  </ProtectedRoute>
                } />
                <Route path='/forgot-password' element={
                  <ProtectedRoute requireAuth={false}>
                    <ForgotPassword />
                  </ProtectedRoute>
                } />
                <Route path='/reset-password' element={
                  <ProtectedRoute requireAuth={false}>
                    <ResetPassword />
                  </ProtectedRoute>
                } />
              </Route>

              {/* Admin Routes */}
              <Route path='/admin/logout' element={<AdminLogout />} />
              <Route path='/admin' element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path='analytics' element={<Analytic />} />
                <Route path='search-analytics' element={<SimpleAnalytics />} />
                <Route path='orders' element={<OrderMgmt />} />
                <Route path='bookings' element={<BookingMgmt />} />
                <Route path='products' element={<ProductMgmt />} />
                <Route path='services' element={<ServiceMgmt />} /> {/* ADMIN SERVICES FIX: Add services route */}
                <Route path='qa' element={<QAManagement />} />
                <Route path='users' element={<UserMgmt />} />
                <Route path='settings' element={<Settings />} />
                <Route path='profile' element={<AdminProfile />} />
              </Route>

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;

