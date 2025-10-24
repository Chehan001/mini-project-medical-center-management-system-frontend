import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Fade,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";

const WorkingHours = () => {
  const [hours, setHours] = useState(null);
  const [today, setToday] = useState("");
  const [holiday, setHoliday] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hours")
      .then((res) => {
        setHours(res.data.hours);
        setToday(res.data.today);
        setHoliday(res.data.holiday);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hours:", err);
        setLoading(false);
      });
  }, []);

  const PaperStyles = {
    p: 2.5,
    background: "linear-gradient(135deg, #a6e3d1, #67b8a3)",
    color: "#2c2c2c",
    width: "100%",
    maxWidth: "320px", // responsive max width
    borderRadius: "16px",
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 8px 18px rgba(0, 0, 0, 0.2)",
    },
  };

  if (loading) {
    return (
      <Paper
        elevation={4}
        sx={{
          ...PaperStyles,
          background: "linear-gradient(135deg, #6dcdb8, #3b8d7e)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", color: "#f0f0f0" }}
        >
          <AccessTimeIcon sx={{ mr: 1 }} /> Working Hours
        </Typography>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <CircularProgress size={26} sx={{ color: "#f0f0f0" }} />
        </Box>
      </Paper>
    );
  }

  if (!hours) {
    return (
      <Paper
        elevation={4}
        sx={{
          ...PaperStyles,
          background: "linear-gradient(135deg, #d9534f, #b93b38)",
          color: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <EventBusyIcon sx={{ mr: 1 }} /> Hours:
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Unable to load hours.
        </Typography>
      </Paper>
    );
  }

  return (
    <Fade in timeout={800}>
      <Paper elevation={4} sx={PaperStyles}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            color: "#1f5b50",
          }}
        >
          <AccessTimeIcon sx={{ mr: 1 }} /> Working Hours
        </Typography>

        {Object.entries(hours).map(([day, time]) => (
          <Box
            key={day}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              color:
                today === day
                  ? "#00796b"
                  : time === "Closed"
                    ? "#c62828"
                    : "#2c2c2c",
            }}
          >
            <Typography sx={{ fontWeight: today === day ? "bold" : "normal" }}>
              {day}
            </Typography>
            <Typography sx={{ ml: 2 }}>
              {holiday && today === day
                ? `${holiday} (Hours may differ)`
                : time}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2, backgroundColor: "#2c2c2c33" }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayIcon sx={{ fontSize: 18, color: "#1f5b50" }} />
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", color: "#1f5b50" }}
          >
            Hours update automatically for holidays & weekends
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};

export default WorkingHours;
