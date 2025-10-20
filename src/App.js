import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import UserProfil from './components/UserProfil';
import ResetPassword from './components/ResetPassword';
import About from './components/About';
import Channel from './components/Channel';
import RegistrationForm from './components/RegistrationForm';
import AppointmentBooking from './components/AppointmentBooking'; 

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import HomeContent from './admin/HomeContent';
import StudentTable from './admin/StudentTable';

// Protected route for normal users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// Protected route for admin users
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
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/channel" element={<Channel />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
      <Route path="/registration-form" element={<RegistrationForm />} />

      {/* Add Appointment Booking Route */}
      <Route path="/appointment-booking" element={<AppointmentBooking />} />

      {/* Protected student route */}
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
      <Route
        path="/admin/students"
        element={
          <AdminRoute>
            <StudentTable />
          </AdminRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<div style={{ padding: 40 }}>404 Not Found</div>} />
    </Routes>
  </Router>
);

export default App;
