import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Slideshow from "./Slideshow";
import WorkingHours from "./WorkingHours";
import MediCareLocation from "./MediCareLocation";

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

      {/* Slideshow */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Slideshow />
      </Box>

      {/* Location + Working Hours Section */}
       {/* Working Hours & Location Section - Side by Side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* Working Hours - Left */}
        <Box
          sx={{
            flex: { md: "1" },
            width: "100%",
            maxWidth: { xs: "420px", md: "100%" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WorkingHours />
        </Box>

        {/* Location - Right */}
        <Box
          sx={{
            flex: { md: "1" },
            width: "100%",
            maxWidth: { xs: "420px", md: "100%" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MediCareLocation />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#0e4d46",
          color: "#fff",
          textAlign: "center",
          py: { xs: 2, md: 2.5 },
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
          mt: "auto",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: { xs: "0.875rem", md: "0.9rem" } }}>
          © {new Date().getFullYear()} MediCare — Sabaragamuwa University
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;