import React from "react";
import { Box, Container } from "@mui/material";
import WorkingHours from "./WorkingHours";
import MediCareLocation from "./MediCareLocation";

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Slideshow Section */}
      <Box sx={{ mb: 4 }}>
        {/* <Slideshow /> */}
        <Box
          sx={{
            height: { xs: "250px", sm: "350px", md: "450px" },
           background: "linear-gradient(135deg, #d4f9e6, #a6f1d7)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Slideshow Placeholder
        </Box>
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
    </Container>
  );
};

export default HomePage;