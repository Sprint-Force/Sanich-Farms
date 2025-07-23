import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        {/* Pages Section */}
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
