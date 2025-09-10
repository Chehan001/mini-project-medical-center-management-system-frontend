import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import UserProfil from './components/UserProfil';
import ResetPassword from './components/ResetPassword';
import About from './components/About';
import Channel from './components/Channel';
import AdminDashboard from './components/admin/AdminDashboard'; // Admin panel

// Protected route for logged-in users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// Admin-only route
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // save role on login
  if (!token || role !== 'admin') return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />

        {/* Protected User Route */}
        <Route
          path="/personal-data"
          element={
            <ProtectedRoute>
              <UserProfil />
            </ProtectedRoute>
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
