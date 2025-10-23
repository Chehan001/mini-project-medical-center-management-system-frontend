import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// User Components
import HomePage from "./components/HomePage";
import LoginRegister from "./components/LoginRegister";
import UserProfil from "./components/UserProfil";
import ResetPassword from "./components/ResetPassword";
import About from "./components/About";
import Channel from "./components/Channel";
import RegistrationForm from "./components/RegistrationForm";
import AppointmentBooking from "./components/AppointmentBooking";

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import HomeContent from "./admin/HomeContent";
import StudentTable from "./admin/StudentTable";
import AdminAppointmentsTable from "./admin/AdminAppointmentsTable"; // ✅ Correct import

// Protected_Route_for_Students
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};


// Protected_Route_for_Admins
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/admin-login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;
  return children;
};

// Main Component
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/channel" element={<Channel />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/registration-form" element={<RegistrationForm />} />
      <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
      <Route path="/appointment-booking" element={<AppointmentBooking />} />

      {/* Student Protected Route */}
      <Route
        path="/personal-data"
        element={
          <ProtectedRoute>
            <UserProfil />
          </ProtectedRoute>
        }
      />

      {/*  Admin Routes */}
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

      <Route
        path="/admin/appointments"
        element={
          <AdminRoute>
            <AdminAppointmentsTable /> 
          </AdminRoute>
        }
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "linear-gradient(to bottom right, #b8f0d9, #d7faf0)",
              color: "#0a5443",
              fontFamily: "Poppins, sans-serif",
              padding: "20px",
            }}
          >
            <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
              404 - Page Not Found
            </h1>
            <p style={{ fontSize: "1.2rem" }}>
              The page you’re looking for doesn’t exist.
            </p>
          </div>
        }
      />
    </Routes>
  </Router>
);

export default App;
