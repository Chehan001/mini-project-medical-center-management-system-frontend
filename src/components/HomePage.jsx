import React from "react";
import NavBar from "./NavBar";
import Slideshow from "./Slideshow";
import WorkingHours from "./WorkingHours";
import MediCareLocation from "./MediCareLocation";
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

      {/* Slideshow */}
      <Box
        sx={{
          px: { xs: 1, sm: 2 },
          py: { xs: 1.5, sm: 3 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Slideshow />
      </Box>

      {/* Location + Working Hours */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          px: { xs: 1.5, md: 2 },
          pb: { xs: 3, md: 6 }, 
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 380px",
            },
            gap: { xs: 2, md: 4 }, 
            alignItems: "start", 
          }}
        >
          {/* Location */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              transform: { xs: "scale(0.95)", md: "scale(1)" },
            }}
          >
            <MediCareLocation />
          </Box>

          {/* Working Hours */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              transform: { xs: "scale(0.94)", md: "scale(1)" },
            }}
          >
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
          py: { xs: 2, md: 3 },
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: { xs: 11, md: 14 } }}>
          © {new Date().getFullYear()} MediCare — Sabaragamuwa University
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
