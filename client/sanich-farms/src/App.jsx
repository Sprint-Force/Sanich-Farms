import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <Routes>
      {/* Routes that use the common layout (Navbar, Footer) */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* Add any other routes that should have the Navbar/Footer here */}
        {/* Example: <Route path='/shop' element={<ShopPage />} /> */}
        {/* Example: <Route path='/products/:id' element={<ProductDetailPage />} /> */}
      </Route>

      {/* Catch-all route for undefined paths (404 Page) */}
      {/* This route is outside MainLayout if you want a different layout for 404 */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App
