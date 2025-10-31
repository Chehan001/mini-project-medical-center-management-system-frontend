import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// User_Components
import HomePage from "./components/HomePage";
import LoginRegister from "./components/LoginRegister";
import UserProfil from "./components/UserProfil";
import ResetPassword from "./components/ResetPassword";
import About from "./components/About";
import Channel from "./components/Channel";
import RegistrationForm from "./components/RegistrationForm";
import AppointmentBooking from "./components/AppointmentBooking";

// Admin_Components
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import HomeContent from "./admin/HomeContent";
import StudentTable from "./admin/StudentTable";
import AdminAppointmentsTable from "./admin/AdminAppointmentsTable";
import AdminEntryPanel from "./admin/AdminEntryPanel";
import DoctorDashboard from "./admin/DoctorDashboard";
import MedicineStock from "./admin/MedicineStock";
import StudentMedicine from "./admin/StudentMedicine";
import StudentMedical from "./admin/StudentMedical";

// Protected_Routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/admin-login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;
  return children;
};

const DoctorRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "doctor" && role !== "admin") return <Navigate to="/" replace />;
  return children;
};

const App = () => (
  <Router>
    <Routes>
      {/* Public_User_Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/channel" element={<Channel />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/registration-form" element={<RegistrationForm />} />
      <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
      <Route path="/appointment-booking" element={<AppointmentBooking />} />

      {/* Student_Protected_Route */}
      <Route path="/personal-data" element={ <ProtectedRoute> <UserProfil />  </ProtectedRoute> } />

      {/* Doctor & Admin Shared Routes */}
      <Route path="/doctor-dashboard" element = {  <DoctorRoute>  <DoctorDashboard /> </DoctorRoute> } />
      <Route path="/medicine-stock" element = { <DoctorRoute>  <MedicineStock /> </DoctorRoute> } />
      <Route path="/student-medicine" element = { <DoctorRoute>  <StudentMedicine /> </DoctorRoute> } />
      <Route path="/student-medical" element = { <DoctorRoute> <StudentMedical /> </DoctorRoute> } />

      {/* Admin Routes */}
      <Route path="/admin-login" element={ <AdminLogin />} />
      <Route path="/admin/dashboard" element={ <AdminRoute> <AdminDashboard /> </AdminRoute> } />
      <Route path="/admin/home-content" element={ <AdminRoute> <HomeContent /> </AdminRoute> } />
      <Route path="/admin/students" element={ <AdminRoute> <StudentTable /> </AdminRoute> }/>
      <Route path="/admin/appointments" element={ <AdminRoute> <AdminAppointmentsTable /> </AdminRoute>} />
      <Route path="/admin/entries" element={ <AdminRoute> <AdminEntryPanel /> </AdminRoute>  } />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(to bottom right, #b8f0d9, #d7faf0)",
              color: "#0a5443",
              fontFamily: "Poppins, sans-serif",
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
