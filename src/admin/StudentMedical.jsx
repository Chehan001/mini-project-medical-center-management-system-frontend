import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";

const StudentMedical = () => {
  const [regNumber, setRegNumber] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/doctor/add-medical", {
        regNumber,
        diagnosis,
        notes,
      });
      setMessage(res.data.message || "Medical record added successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error adding medical record.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: "linear-gradient(to bottom right, #b3f3d9, #d4f9e6)",
        }}
      >
        <Paper sx={{ p: 4, width: 450, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Add Medical Record
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Register Number"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                required
              />
              <TextField
                label="Diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
              />
              <TextField
                label="Notes"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#0a5443",
                  "&:hover": { background: "#09856e" },
                }}
              >
                Submit
              </Button>
              {message && <Alert severity="success">{message}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default StudentMedical;
