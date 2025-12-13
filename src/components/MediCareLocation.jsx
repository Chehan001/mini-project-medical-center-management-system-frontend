import React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import locationImage from "../assets/location.png";

const MediCareLocation = () => {
  const locationURL = "https://maps.app.goo.gl/FBELa1QWyeTjwf866";

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff, #e6f5f1)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: "380px",
        mx: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1.5,
          color: "#1f5b50",
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <LocationOnIcon /> MediCare Location
      </Typography>

      {/* Location --> Image */}
      <Box
        component="img"
        src={locationImage}   
        alt="MediCare Location"
        onClick={() => window.open(locationURL, "_blank")}
        sx={{
          width: "100%",
          height: { xs: "160px", sm: "200px" },
          objectFit: "cover",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
          },
        }}
      />
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <IconButton
          onClick={() => window.open(locationURL, "_blank")}
          sx={{ color: "#1f5b50" }}
        >
          <LocationOnIcon />
        </IconButton>
        <Typography variant="body2" sx={{ color: "#1f5b50" }}>
          Tap to open in Google Maps
        </Typography>
      </Box>
    </Paper>
  );
};

export default MediCareLocation;
