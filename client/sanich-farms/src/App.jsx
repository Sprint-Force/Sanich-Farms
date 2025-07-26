import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';

function App() {

  return (
    <>
      <Routes>
        {/* Pages Section */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
        {/* Catch-all route for undefined paths */}
        <Route path='*' element={<div className="text-center text-2xl font-bold mt-20">Page Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
