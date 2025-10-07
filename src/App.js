import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import UserProfil from './components/UserProfil';
import ResetPassword from './components/ResetPassword';
import About from './components/About';
import Channel from './components/Channel';
import NavBar from './components/NavBar';

// Admin components
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import HomeContent from './admin/HomeContent';

// Protected route for logged-in users (students)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// Admin-only route
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token || role !== 'admin') return <Navigate to="/admin/login" replace />;
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />

        {/* Student protected route */}
        <Route
          path="/personal-data"
          element={
            <ProtectedRoute>
              <UserProfil />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protect all admin pages */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/home-content"
          element={
            <AdminRoute>
              <HomeContent />
            </AdminRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<div style={{ padding: 40 }}>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
