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
      <Box
        sx={{
          flex: 1,
          width: "100%",
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 3, md: 4 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: { xs: 2, sm: 3, md: 4 },
            alignItems: "start",
          }}
        >
          {/* MediCare Location */}
          <Box sx={{ width: "100%" }}>
            <MediCareLocation />
          </Box>

          {/* Working Hours */}
          <Box sx={{ width: "100%" }}>
            <WorkingHours />
          </Box>
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