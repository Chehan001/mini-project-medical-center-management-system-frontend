import React from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import AdminNavBar from "./AdminNavBar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #b2f7e3, #7fdac4, #a9e0cb)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navbar fixed at top */}
      <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
        <AdminNavBar />
      </Box>

      {/* Central welcome card */}
      <Paper
        elevation={10}
        sx={{
          p: 6,
          borderRadius: 6,
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          backdropFilter: "blur(8px)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#0d554b",
            mb: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
          }}
        >
          Welcome to the Admin Dashboard
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#1f8f7e",
            fontWeight: 500,
            mb: 4,
          }}
        >
          Manage Students, Doctors, and Medicine Records with Ease.
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<LocalHospitalIcon />}
            onClick={() => navigate("/doctor-dashboard")}
            sx={{
              background: "linear-gradient(135deg, #00897b, #00695c)",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: 3,
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(0,137,123,0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #00695c, #004d40)",
                transform: "translateY(-3px)",
              },
            }}
          >
            Doctor Dashboard
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<MedicationIcon />}
            onClick={() => navigate("/medicine-stock")}
            sx={{
              background: "linear-gradient(135deg, #26a69a, #00897b)",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: 3,
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(38,166,154,0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #00897b, #00695c)",
                transform: "translateY(-3px)",
              },
            }}
          >
            Medicine Stock
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default AdminDashboard;
