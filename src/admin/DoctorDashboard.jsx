import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { Heart, Activity, User, Stethoscope } from "lucide-react";
import DoctorNavBar from "./DoctorNavBar";

const DoctorDashboard = () => {
  const [regNumber, setRegNumber] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const trimmedReg = regNumber.trim().toUpperCase();

    if (!trimmedReg) {
      setError("Please enter a registration number.");
      return;
    }

    setError("");
    setLoading(true);
    setStudentData(null);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/doctor/student/${trimmedReg}`
      );

      if (res.data.success) {
        setStudentData(res.data.data);
      } else {
        setError(res.data.message || "Student not found.");
      }
    } catch (err) {
      console.error("Error fetching student:", err);
      setError(
        err.response?.data?.message ||
          "Error fetching student. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #b3f3d9, #d4f9e6, #bdf4e1, #a9e0cb)",
        backgroundSize: "400% 400%",
        animation: "gradientFlow 15s ease infinite",
        p: { xs: 2, md: 5 },
      }}
    >
      <style>
        {`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
      </style>

      <Box sx={{ mb: 4 }}>
        <DoctorNavBar />
      </Box>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={10}
          sx={{
            maxWidth: 950,
            mx: "auto",
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 15px 45px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#00695c",
                letterSpacing: 1,
                mb: 1,
              }}
            >
              Doctor Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <Stethoscope
                size={20}
                style={{
                  marginRight: 6,
                  verticalAlign: "middle",
                  color: "#009688",
                }}
              />
              Search and view student medical records
            </Typography>
          </Box>

          {/* Search Bar */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              gap={2}
              mb={4}
            >
              <TextField
                label="Enter Student Reg. Number"
                variant="outlined"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                sx={{
                  width: { xs: "100%", sm: "60%" },
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  background: "linear-gradient(135deg, #26a69a, #00796b)",
                  color: "white",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.3,
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #00796b, #004d40)",
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <Box textAlign="center" my={3}>
              <CircularProgress color="success" />
              <Typography sx={{ mt: 1, color: "text.secondary" }}>
                Fetching student data...
              </Typography>
            </Box>
          )}

          {/* Error */}
          {error && (
            <Typography
              color="error"
              textAlign="center"
              mb={2}
              sx={{ fontWeight: "bold" }}
            >
              {error}
            </Typography>
          )}

          {/* Student Info Display */}
          {studentData && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Divider sx={{ my: 3 }} />

              {/* Header Card */}
              <Box
                display="flex"
                alignItems="center"
                gap={3}
                mb={3}
                sx={{
                  flexWrap: "wrap",
                  p: 2,
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #e8fdf5, #e0f7f3)",
                }}
              >
                <Avatar
                  src={`http://localhost:8000${studentData.photo || ""}`}
                  alt={studentData.name}
                  sx={{
                    width: 85,
                    height: 85,
                    border: "4px solid #80e4be",
                    backgroundColor: "#a9e0cb",
                    color: "#004d40",
                    fontWeight: "bold",
                    fontSize: 28,
                  }}
                >
                  {studentData.name?.charAt(0) || "?"}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="#004d40">
                    {studentData.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Reg No: {studentData.regNumber}
                  </Typography>
                  <Typography color="text.secondary">
                    Faculty: {studentData.faculty || "N/A"}
                  </Typography>
                </Box>
                <Chip
                  icon={<Activity size={16} />}
                  label="Active Patient Record"
                  color="success"
                  sx={{ ml: "auto", fontWeight: 500 }}
                />
              </Box>

              {/* Personal Info */}
              <Typography
                variant="h6"
                sx={{
                  color: "#004d40",
                  fontWeight: "bold",
                  mb: 2,
                  borderLeft: "5px solid #80e4be",
                  pl: 1.5,
                }}
              >
                <User size={20} style={{ marginRight: 8 }} />
                Personal Information
              </Typography>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <b>Course:</b> {studentData.course || "N/A"}
                  </Typography>
                  <Typography>
                    <b>Date of Birth:</b> {studentData.dob || "N/A"}
                  </Typography>
                  <Typography>
                    <b>Height:</b> {studentData.height || "N/A"} cm
                  </Typography>
                  <Typography>
                    <b>Weight:</b> {studentData.weight || "N/A"} kg
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <b>Blood Group:</b> {studentData.bloodGroup || "N/A"}
                  </Typography>
                  <Typography>
                    <b>Blood Pressure:</b> {studentData.bp || "N/A"}
                  </Typography>
                  <Typography>
                    <b>Vision (R/L):</b>{" "}
                    {studentData.visionR || "N/A"}/{studentData.visionL || "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              {/* Medical Info */}
              <Typography
                variant="h6"
                sx={{
                  color: "#004d40",
                  fontWeight: "bold",
                  mb: 2,
                  borderLeft: "5px solid #80e4be",
                  pl: 1.5,
                }}
              >
                <Heart size={20} style={{ marginRight: 8 }} />
                Medical Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <b>Heart Disease:</b>{" "}
                    {studentData.heartDisease || "Not recorded"}
                  </Typography>
                  <Typography>
                    <b>Lungs History:</b>{" "}
                    {studentData.lungsHistory || "Not recorded"}
                  </Typography>
                  <Typography>
                    <b>Kidneys:</b>{" "}
                    {studentData.kidneysPalpable || "Not recorded"}
                  </Typography>
                  <Typography>
                    <b>Speech Defect:</b>{" "}
                    {studentData.speechDefect || "Not recorded"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>
                    <b>Operation History:</b>{" "}
                    {studentData.operation || "None"}
                  </Typography>
                  <Typography>
                    <b>Immunity:</b>{" "}
                    {studentData.immunity || "Not recorded"}
                  </Typography>
                  <Typography>
                    <b>Remarks:</b>{" "}
                    {studentData.remarks || "No remarks"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 4, mb: 1 }} />
              <Typography
                variant="body2"
                textAlign="center"
                sx={{ color: "text.secondary", mt: 1 }}
              >
                © 2025 MediCare | Doctor Portal — Sabaragamuwa University
              </Typography>
            </motion.div>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default DoctorDashboard;
