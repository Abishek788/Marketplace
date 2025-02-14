import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './components/Navbar';
import BrowseCarsPage from './components/browse-cars';
import FindMechanicsPage from './components/find-mechanics';
import SellCarPage from './assests/SellCarPage';
import JoinMechanicPage from './assests/JoinMechanicPage';

import './App.css'; 


const App = () => {
  return (
    <div className="app-container">
      <Navbar /> {/* Navbar Component */}
      
      
      <Routes>
        <Route path='/' element={<Home />} /> {/* Home Route */}
        <Route path="/browse-cars" element={<BrowseCarsPage />} />
        <Route path="/find-mechanics" element={<FindMechanicsPage />} />
        <Route path="/SellCarPage" element={<SellCarPage />} />
        <Route path="/JoinMechanicPage" element={<JoinMechanicPage />} />
        

      </Routes>
    </div>
  );
};

export default App;

