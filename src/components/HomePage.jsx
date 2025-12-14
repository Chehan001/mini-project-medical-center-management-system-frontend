import React from "react";
import NavBar from "./NavBar";
import Slideshow from "./Slideshow";
import WorkingHours from "./WorkingHours";
import MediCareLocation from "./MediCareLocation";  
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
