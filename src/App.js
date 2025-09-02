import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import UserProfil from './components/userProfil'; 
import ResetPassword from './components/ResetPassword';
import About from './components/About'; // ✅ PascalCase

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/personal-data" element={<UserProfil />} /> 
      </Routes>
    </Router>
  );
};

export default App;
