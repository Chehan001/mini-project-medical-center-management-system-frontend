import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import PersonalData from './components/userProfil'; 

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/personal-data" element={<userProfile />} /> 
      </Routes>
    </Router>
  );
};

export default App;
