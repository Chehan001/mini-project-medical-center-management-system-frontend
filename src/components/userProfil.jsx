import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "./UserNavBar";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #80e4be, #a9e0cb)",
      }}
    >
      {/* Navbar */}
      <NavBar />

      {/* Page Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Add your page content here */}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#0e4d46",
          color: "#fff",
          textAlign: "center",
          py: 3,
          mt: 0,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          cursor: "default",
          "&:hover": {
            backgroundColor: "#0c3e3a",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Typography variant="body2" sx={{ fontSize: { xs: 12, md: 14 } }}>
          © {new Date().getFullYear()} MediCare — Sabaragamuwa University
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
