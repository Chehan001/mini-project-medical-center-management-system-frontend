import React from "react";
import NavBar from "./NavBar";
import Slideshow from "./Slideshow";
import WorkingHours from "./WorkingHours";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #c8f1e7, #a7e3cf, #80e4be)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <Box
        sx={{
          px: { xs: 1, sm: 2 },
          py: { xs: 2, sm: 3 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Slideshow />
      </Box>

      {/* Location / Working Hours Section */}
      <Box
        sx={{
          mt: 2,
          mb: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          gap: 3,
        }}
      >
        {/* Left Component (placeholder – safe & responsive) */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { md: "50%" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#1f5b50", fontWeight: 600 }}
          >
            Left Component Here
          </Typography>
        </Box>

        {/* Right Component */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "360px",
            display: "flex",
            justifyContent: "center",
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
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
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
