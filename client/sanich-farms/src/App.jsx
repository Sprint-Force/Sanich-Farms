import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage'; // NEW: Import ContactUsPage
import NotFoundPage from './pages/NotFoundPage';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/products/:productId' element={<ProductDetailPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/wishlist' element={<WishlistPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/contact' element={<ContactUsPage />} /> {/* NEW: Contact Us Page Route */}
            {/* Add any other routes that should have the Navbar/Footer here */}
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;