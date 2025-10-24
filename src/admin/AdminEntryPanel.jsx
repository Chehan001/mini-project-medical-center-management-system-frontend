import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const AdminEntryPanel = () => {
  const [regNumber, setRegNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //Handle_Check_Appointment 
  const handleCheckAppointment = async () => {
    if (!regNumber.trim()) {
      setError("Please enter registration number");
      return;
    }

    try {
      setError("");
      setMessage("");
      const res = await axios.get(
        `http://localhost:8000/api/appointments/check/${regNumber}`
      );

      if (res.data.hasAppointment) {
        setMessage(
          ` Student has an appointment today at ${res.data.appointmentTime}`
        );
      } else {
        setError(" No appointment found for today");
      }
    } catch (err) {
      console.error(err);
      setError(" Error connecting to server");
    }
  };

  //Handle_Entry_Recording
  const handleEntry = async (type) => {
    if (!regNumber.trim()) {
      setError("Please enter registration number");
      return;
    }

    try {
      setError("");
      setMessage("");

      const res = await axios.post("http://localhost:8000/api/entries", {
        regNumber,
        entryType: type,
      });

      if (res.data.ok) {
        setMessage(
          ` ${type} recorded successfully for ${regNumber} at ${new Date().toLocaleString()}`
        );
        setRegNumber("");
      } else {
        setError(" Failed to record entry");
      }
    } catch (err) {
      console.error(err);
      setError(" Error connecting to server");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #a0f0d1 0%, #bdf6e5 50%, #e4fff8 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 5,
            width: { xs: 330, sm: 420, md: 450 },
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#009670"
            sx={{ mb: 1 }}
          >
            Student Entry Panel
          </Typography>
          <Divider
            sx={{
              mb: 3,
              width: "60px",
              mx: "auto",
              borderBottomWidth: 3,
              borderColor: "#00b894",
              borderRadius: "2px",
            }}
          />

          <TextField
            label="University Reg Number"
            placeholder="e.g., 20APP1234"
            fullWidth
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            mb={2}
          >
            <Button
              variant="outlined"
              onClick={handleCheckAppointment}
              sx={{
                borderColor: "#00b894",
                color: "#00b894",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#00b894",
                  color: "white",
                },
              }}
            >
              Check Appointment
            </Button>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#27ae60",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#1e8449" },
              }}
              onClick={() => handleEntry("Appointment")}
            >
              Appointment Entry
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e74c3c",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#c0392b" },
              }}
              onClick={() => handleEntry("Emergency")}
            >
              Emergency Entry
            </Button>
          </Stack>

          {/* Message & Error Alerts */}
          <Box sx={{ mt: 3 }}>
            {message && (
              <Alert
                severity="success"
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {message}
              </Alert>
            )}
            {error && (
              <Alert
                severity="error"
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {error}
              </Alert>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AdminEntryPanel;
