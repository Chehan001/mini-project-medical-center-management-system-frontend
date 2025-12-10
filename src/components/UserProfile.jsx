import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./UserNavBar";
import { HeartPulse, Pill } from "lucide-react";
import API_ROOT from "../services/api";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedRegNo = localStorage.getItem("regNumber");
        if (!storedRegNo) {
          alert("No registration number found. Please register first.");
          navigate("/registration-form");
          return;
        }

        const response = await axios.get(
          `${API_ROOT}/api/user/${storedRegNo}`
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          alert("Please complete your registration form first.");
          navigate("/registration-form");
          return;
        }

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Server error. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #7dd3b0, #c2f1e4)",
        }}
      >
        <CircularProgress sx={{ color: "#0e4d46" }} />
      </Box>
    );
  }

  if (!userData) {
    navigate("/registration-form");
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom right, #9de3cc, #baf1e0)",
      }}
    >
      <NavBar />

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 8 } }}>

        {/* Profile Card ----> updating by RegistrationForm.jsx */}
        <MotionBox
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 6,
              background: "linear-gradient(to bottom right, #ffffff, #e6f8f1)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={4} textAlign="center">
                <Avatar
                  src={userData.photo ? `${API_ROOT}${userData.photo}` : undefined}
                  sx={{
                    width: { xs: 120, sm: 160, md: 180 },
                    height: { xs: 120, sm: 160, md: 180 },
                    border: "4px solid #2da58f",
                    boxShadow: "0 6px 15px rgba(31,143,126,0.3)",
                    mx: "auto",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    fontWeight: 600,
                    color: "#0e4d46",
                    wordBreak: "break-word",
                  }}
                >
                  {userData.regNumber}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#0e4d46",
                    mb: 2,
                    textAlign: { xs: "center", sm: "left" },
                    fontSize: { xs: 22, sm: 30 },
                  }}
                >
                  {userData.name || "N/A"}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {[
                    { label: "Age", value: calculateAge(userData.dob) },
                    { label: "Blood Group", value: userData.bloodGroup },
                    { label: "Blood Pressure", value: `${userData.bp || "N/A"} mmHg` },
                    { label: "Height", value: `${userData.height || "N/A"} cm` },
                    { label: "Weight", value: `${userData.weight || "N/A"} kg` },
                    { label: "Faculty", value: userData.faculty },
                  ].map((info, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: { xs: 16, sm: 18 },
                          fontWeight: 400,
                          minWidth: '140px'
                        }}
                      >
                        {info.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: 18, sm: 20 },
                          color: "#000",
                        }}
                      >
                        {info.value || "N/A"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </MotionBox>

        {/* Buttons */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mt: { xs: 4, sm: 5 } }}
        >
          <Grid item xs={12} sm={6}>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              variant="contained"
              fullWidth
              startIcon={<Pill />}
              sx={{
                py: 2,
                borderRadius: 5,
                fontWeight: 600,
                fontSize: { xs: 16, sm: 18 },
                textTransform: "none",
                background: "linear-gradient(90deg, #2da58f, #1e7e6f)",
                boxShadow: "0 5px 20px rgba(31,143,126,0.4)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1e7e6f, #2da58f)",
                },
              }}
            onClick={() => navigate("/student-medicine-details")}
            >
              Medicine Detail
            </MotionButton>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              variant="contained"
              fullWidth
              startIcon={<HeartPulse />}
              sx={{
                py: 2,
                borderRadius: 5,
                fontWeight: 600,
                fontSize: { xs: 16, sm: 18 },
                textTransform: "none",
                background: "linear-gradient(90deg, #2da58f, #1e7e6f)",
                boxShadow: "0 5px 20px rgba(31,143,126,0.4)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1e7e6f, #2da58f)",
                },
              }}
              onClick={() => navigate("/student-medical-details")}
            >
              Medical Details
            </MotionButton>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#0e4d46",
          color: "#fff",
          textAlign: "center",
          py: 2,
          mt: "auto",
          fontSize: { xs: 12, sm: 14 },
        }}
      >
        © {new Date().getFullYear()} MediCare — Sabaragamuwa University
      </Box>
    </Box>
  );
};

export default UserProfile;
