import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import UserProfil from './components/UserProfil';
import ResetPassword from './components/ResetPassword';
import About from './components/About';
import Channel from './components/Channel';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import HomeContent from './admin/HomeContent';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token) return <Navigate to="/admin-login" replace />;
  if (role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/channel" element={<Channel />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
      <Route
        path="/personal-data"
        element={<ProtectedRoute><UserProfil /></ProtectedRoute>}
      />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={<AdminRoute><AdminDashboard /></AdminRoute>}
      />
      <Route
        path="/admin/home-content"
        element={<AdminRoute><HomeContent /></AdminRoute>}
      />

      <Route path="*" element={<div style={{ padding: 40 }}>404 Not Found</div>} />
    </Routes>
  </Router>
);

export default App;
