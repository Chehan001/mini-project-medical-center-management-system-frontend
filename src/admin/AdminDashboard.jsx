import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import AdminNavBar from "./AdminNavBar";

const AdminDashboard = () => {
  return (
    <>
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
              letterSpacing: "1px",
            }}
          >
            Welcome to the Admin Dashboard
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#1f8f7e",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            Manage Students, Doctors, and Medicine Records with Ease.
          </Typography>
        </Paper>

        {/* Decorative floating circles */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            right: 60,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            filter: "blur(10px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 60,
            left: 80,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            filter: "blur(10px)",
          }}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
