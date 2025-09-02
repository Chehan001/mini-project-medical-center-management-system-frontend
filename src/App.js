import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import UserProfil from './components/userProfil'; 
import ResetPassword from './components/ResetPassword';
import About from './components/About'; 
import Channel from './components/Channel'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/channel" element={<Channel />} /> {/* Add Channel route */}
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/personal-data" element={<UserProfil />} /> 
        <Route path="*" element={<div>404 Not Found</div>} /> {/* Optional: 404 fallback */}
      </Routes>
    </Router>
  );
};

export default App;
