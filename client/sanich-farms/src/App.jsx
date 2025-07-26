import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Banner from './components/Banner/Banner';

function App() {

  return (
    <>
      <Navbar />
      <Banner />
      <Routes>
        {/* Pages Section */}
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
