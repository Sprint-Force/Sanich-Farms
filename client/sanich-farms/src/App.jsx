// // // import React from 'react';
// // // import { Routes, Route } from 'react-router-dom';
// // // import MainLayout from './components/Layout/MainLayout';
// // // import Home from './pages/Home';
// // // import Login from './pages/Login/Login';
// // // import Signup from './pages/Login/Signup';
// // // import ShopPage from './pages/ShopPage';
// // // import ProductDetailPage from './pages/ProductDetailPage';
// // // import CartPage from './pages/CartPage';
// // // import WishlistPage from './pages/WishlistPage';
// // // import CheckoutPage from './pages/CheckoutPage';
// // // import OrderConfirmationPage from './pages/OrderConfirmationPage';
// // // import AboutUsPage from './pages/AboutUsPage';
// // // import ContactUsPage from './pages/ContactUsPage';
// // // import AllServicesPage from './pages/AllServicesPage';
// // // import ServiceDetailPage from './pages/ServiceDetailPage';
// // // import ServiceBookingPage from './pages/ServiceBookingPage';
// // // import BookingConfirmationPage from './pages/BookingConfirmationPage';
// // // import UserDashboardPage from './pages/UserDashboardPage';
// // // import NotFoundPage from './pages/NotFoundPage';

// // // // Import dashboard section components for nested routes
// // // import DashboardOverview from './components/Dashboard/DashboardOverview';
// // // import MyOrders from './components/Dashboard/MyOrders';
// // // import MyBookings from './components/Dashboard/MyBookings';
// // // import MyProfile from './components/Dashboard/MyProfile';
// // // // NEW IMPORTS for detail pages
// // // import OrderDetailPage from './components/Dashboard/OrderDetailPage';
// // // import BookingDetailPage from './components/Dashboard/BookingDetailPage';


// // // import { CartProvider } from './context/CartContext';
// // // import { WishlistProvider } from './context/WishlistContext';

// // // function App() {
// // //   return (
// // //     <CartProvider>
// // //       <WishlistProvider>
// // //         <Routes>
// // //           <Route element={<MainLayout />}>
// // //             <Route path='/' element={<Home />} />
// // //             <Route path='/login' element={<Login />} />
// // //             <Route path='/signup' element={<Signup />} />
// // //             <Route path='/shop' element={<ShopPage />} />
// // //             <Route path='/products/:productId' element={<ProductDetailPage />} />
// // //             <Route path='/cart' element={<CartPage />} />
// // //             <Route path='/wishlist' element={<WishlistPage />} />
// // //             <Route path='/checkout' element={<CheckoutPage />} />
// // //             <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
// // //             <Route path='/about' element={<AboutUsPage />} />
// // //             <Route path='/contact' element={<ContactUsPage />} />
// // //             <Route path='/services' element={<AllServicesPage />} />
// // //             <Route path='/services/:serviceId' element={<ServiceDetailPage />} />
// // //             <Route path='/book-service/:serviceId' element={<ServiceBookingPage />} />
// // //             <Route path='/booking-confirmation' element={<BookingConfirmationPage />} />

// // //             {/* User Dashboard Routes */}
// // //             <Route path='/dashboard' element={<UserDashboardPage />}>
// // //               {/* Nested routes for dashboard sections */}
// // //               <Route index element={<DashboardOverview />} /> {/* Default child route for /dashboard */}
// // //               <Route path='orders' element={<MyOrders />} />
// // //               <Route path='bookings' element={<MyBookings />} />
// // //               <Route path='profile' element={<MyProfile />} />
// // //               <Route path='wishlist' element={<WishlistPage />} /> {/* Reusing existing WishlistPage */}
// // //               {/* NEW NESTED ROUTES for detail pages */}
// // //               <Route path='orders/:orderId' element={<OrderDetailPage />} />
// // //               <Route path='bookings/:bookingId' element={<BookingDetailPage />} />
// // //             </Route>

// // //           </Route>
// // //           <Route path='*' element={<NotFoundPage />} />
// // //         </Routes>
// // //       </WishlistProvider>
// // //     </CartProvider>
// // //   );
// // // }

// // // export default App;


// // // src/App.jsx
// // import React from 'react';
// // import { Routes, Route } from 'react-router-dom';
// // import MainLayout from './components/Layout/MainLayout';
// // import Home from './pages/Home';
// // import Login from './pages/Login/Login';
// // import Signup from './pages/Login/Signup';
// // import ShopPage from './pages/ShopPage';
// // import ProductDetailPage from './pages/ProductDetailPage';
// // import CartPage from './pages/CartPage';
// // import WishlistPage from './pages/WishlistPage';
// // import CheckoutPage from './pages/CheckoutPage';
// // import OrderConfirmationPage from './pages/OrderConfirmationPage';
// // import AboutUsPage from './pages/AboutUsPage';
// // import ContactUsPage from './pages/ContactUsPage';
// // import AllServicesPage from './pages/AllServicesPage';
// // import ServiceDetailPage from './pages/ServiceDetailPage';
// // import ServiceBookingPage from './pages/ServiceBookingPage';
// // import BookingConfirmationPage from './pages/BookingConfirmationPage';
// // import UserDashboardPage from './pages/UserDashboardPage';

// // // Import dashboard section components for nested routes
// // import DashboardOverview from './components/Dashboard/DashboardOverview';
// // import MyOrders from './components/Dashboard/MyOrders';
// // import MyBookings from './components/Dashboard/MyBookings';
// // import MyProfile from './components/Dashboard/MyProfile';
// // // Imports for detail pages
// // import OrderDetailPage from './components/Dashboard/OrderDetailPage';
// // import BookingDetailPage from './components/Dashboard/BookingDetailPage';

// // import NotFoundPage from './pages/NotFoundPage';

// // import { CartProvider } from './context/CartContext';
// // import { WishlistProvider } from './context/WishlistContext';
// // import { ToastProvider } from './context/ToastContext'; // NEW: Import ToastProvider

// // function App() {
// //   return (
// //     <ToastProvider> {/* NEW: Wrap with ToastProvider */}
// //       <CartProvider>
// //         <WishlistProvider>
// //           <Routes>
// //             <Route element={<MainLayout />}>
// //               <Route path='/' element={<Home />} />
// //               <Route path='/login' element={<Login />} />
// //               <Route path='/signup' element={<Signup />} />
// //               <Route path='/shop' element={<ShopPage />} />
// //               <Route path='/products/:productId' element={<ProductDetailPage />} />
// //               <Route path='/cart' element={<CartPage />} />
// //               <Route path='/wishlist' element={<WishlistPage />} />
// //               <Route path='/checkout' element={<CheckoutPage />} />
// //               <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
// //               <Route path='/about' element={<AboutUsPage />} />
// //               <Route path='/contact' element={<ContactUsPage />} />
// //               <Route path='/services' element={<AllServicesPage />} />
// //               <Route path='/services/:serviceId' element={<ServiceDetailPage />} />
// //               <Route path='/book-service/:serviceId' element={<ServiceBookingPage />} />
// //               <Route path='/booking-confirmation' element={<BookingConfirmationPage />} />

// //               {/* User Dashboard Routes */}
// //               <Route path='/dashboard' element={<UserDashboardPage />}>
// //                 {/* Nested routes for dashboard sections */}
// //                 <Route index element={<DashboardOverview />} /> {/* Default child route for /dashboard */}
// //                 <Route path='orders' element={<MyOrders />} />
// //                 <Route path='bookings' element={<MyBookings />} />
// //                 <Route path='profile' element={<MyProfile />} />
// //                 <Route path='wishlist' element={<WishlistPage />} /> {/* Reusing existing WishlistPage */}
// //                 {/* Nested routes for detail pages */}
// //                 <Route path='orders/:orderId' element={<OrderDetailPage />} />
// //                 <Route path='bookings/:bookingId' element={<BookingDetailPage />} />
// //               </Route>

// //             </Route>
// //             <Route path='*' element={<NotFoundPage />} />
// //           </Routes>
// //         </WishlistProvider>
// //       </CartProvider>
// //     </ToastProvider>
// //   );
// // }

// // export default App;


// // src/App.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import MainLayout from './components/Layout/MainLayout';
// import Home from './pages/Home';
// import Login from './pages/Login/Login';
// import Signup from './pages/Login/Signup';
// import ShopPage from './pages/ShopPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import WishlistPage from './pages/WishlistPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderConfirmationPage from './pages/OrderConfirmationPage';
// import AboutUsPage from './pages/AboutUsPage';
// import ContactUsPage from './pages/ContactUsPage';
// import AllServicesPage from './pages/AllServicesPage';
// import ServiceDetailPage from './pages/ServiceDetailPage';
// import ServiceBookingPage from './pages/ServiceBookingPage';
// import BookingConfirmationPage from './pages/BookingConfirmationPage';
// import UserDashboardPage from './pages/UserDashboardPage';

// // Import dashboard section components for nested routes
// import DashboardOverview from './components/Dashboard/DashboardOverview';
// import MyOrders from './components/Dashboard/MyOrders';
// import MyBookings from './components/Dashboard/MyBookings';
// import MyProfile from './components/Dashboard/MyProfile';
// // Imports for detail pages
// import OrderDetailPage from './components/Dashboard/OrderDetailPage';
// import BookingDetailPage from './components/Dashboard/BookingDetailPage';

// import NotFoundPage from './pages/NotFoundPage';

// import { CartProvider } from './context/CartContext';
// import { WishlistProvider } from './context/WishlistContext';
// import { ToastProvider } from './context/ToastContext';
// import {ScrollToTop} from './components/utils/ScrollToTop'; // NEW: Import ScrollToTop

// function App() {
//   return (
//     <ToastProvider>
//       <CartProvider>
//         <WishlistProvider>
//           {/* NEW: Place ScrollToTop directly inside BrowserRouter (or App component) */}
//           <ScrollToTop />
//           <Routes>
//             <Route element={<MainLayout />}>
//               <Route path='/' element={<Home />} />
//               <Route path='/login' element={<Login />} />
//               <Route path='/signup' element={<Signup />} />
//               <Route path='/shop' element={<ShopPage />} />
//               <Route path='/products/:productId' element={<ProductDetailPage />} />
//               <Route path='/cart' element={<CartPage />} />
//               <Route path='/wishlist' element={<WishlistPage />} />
//               <Route path='/checkout' element={<CheckoutPage />} />
//               <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
//               <Route path='/about' element={<AboutUsPage />} />
//               <Route path='/contact' element={<ContactUsPage />} />
//               <Route path='/services' element={<AllServicesPage />} />
//               <Route path='/services/:serviceId' element={<ServiceDetailPage />} />
//               <Route path='/book-service/:serviceId' element={<ServiceBookingPage />} />
//               <Route path='/booking-confirmation' element={<BookingConfirmationPage />} />

//               {/* User Dashboard Routes */}
//               <Route path='/dashboard' element={<UserDashboardPage />}>
//                 {/* Nested routes for dashboard sections */}
//                 <Route index element={<DashboardOverview />} />
//                 <Route path='orders' element={<MyOrders />} />
//                 <Route path='bookings' element={<MyBookings />} />
//                 <Route path='profile' element={<MyProfile />} />
//                 <Route path='wishlist' element={<WishlistPage />} />
//                 {/* Nested routes for detail pages */}
//                 <Route path='orders/:orderId' element={<OrderDetailPage />} />
//                 <Route path='bookings/:bookingId' element={<BookingDetailPage />} />
//               </Route>

//             </Route>
//             <Route path='*' element={<NotFoundPage />} />
//           </Routes>
//         </WishlistProvider>
//       </CartProvider>
//     </ToastProvider>
//   );
// }

// export default App;


// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Corrected path
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
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
// Imports for detail pages
import OrderDetailPage from './components/Dashboard/OrderDetailPage';
import BookingDetailPage from './components/Dashboard/BookingDetailPage';

import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage'; // NEW: Import SearchPage

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/shop' element={<ShopPage />} />
              <Route path='/products/:productId' element={<ProductDetailPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/wishlist' element={<WishlistPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
              <Route path='/about' element={<AboutUsPage />} />
              <Route path='/contact' element={<ContactUsPage />} />
              <Route path='/services' element={<AllServicesPage />} />
              <Route path='/services/:serviceId' element={<ServiceDetailPage />} />
              <Route path='/book-service/:serviceId' element={<ServiceBookingPage />} />
              <Route path='/booking-confirmation' element={<BookingConfirmationPage />} />
              <Route path='/search' element={<SearchPage />} /> {/* NEW: Search Page Route */}

              {/* User Dashboard Routes */}
              <Route path='/dashboard' element={<UserDashboardPage />}>
                <Route index element={<DashboardOverview />} />
                <Route path='orders' element={<MyOrders />} />
                <Route path='bookings' element={<MyBookings />} />
                <Route path='profile' element={<MyProfile />} />
                <Route path='wishlist' element={<WishlistPage />} />
                <Route path='orders/:orderId' element={<OrderDetailPage />} />
                <Route path='bookings/:bookingId' element={<BookingDetailPage />} />
              </Route>

            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
