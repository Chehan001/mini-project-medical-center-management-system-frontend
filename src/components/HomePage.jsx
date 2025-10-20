import React from "react";
import NavBar from "./NavBar";
import Slideshow from "./Slideshow";
import WorkingHours from "./WorkingHours";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(to bottom right, #c8f1e7, #a7e3cf, #80e4be)",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <Box
        sx={{
          padding: "30px 20px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Slideshow />
      </Box>

      {/* Working Hours Section with optional left component */}
      <Box
        sx={{
          mt: 1,
          mb: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // column on mobile, row on desktop
          justifyContent: { xs: "center", md: "space-between" }, // center on mobile, spaced on desktop
          alignItems: { xs: "center", md: "flex-start" },
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          px: 2,
          gap: 2,
        }}
      >
        {/* Left Component */}
        <Box
          sx={{
            flex: 1,
            width: { xs: "100%", md: "auto" },
            mb: { xs: 2, md: 0 }, // margin below on mobile
            textAlign: { xs: "center", md: "left" }, // center on mobile
          }}
        >
          <Typography variant="h6" sx={{ color: "#1f5b50" }}>
            Left Component Here
          </Typography>
        </Box>

        {/* Right Component */}
        <Box
          sx={{ flexShrink: 0, display: "flex",justifyContent: { xs: "center", md: "flex-end" }, width: { xs: "100%", md: "auto" }, // full width on mobile for centering
          }}
        >
          <WorkingHours />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#0e4d46",
          color: "#fff",
          textAlign: "center",
          py: 3, 
          mt: { xs: 4, md: 6 }, // space above footer
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

    </div>
  );
};

export default HomePage;
