import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const StudentMedical = () => {
  const [searchRegNumber, setSearchRegNumber] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");

  const [medicalGiven, setMedicalGiven] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchResult(null);
    setMessage("");
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/api/doctor/search-treatment", {
        params: { regNumber: searchRegNumber, date: searchDate },
      });
      setSearchResult(res.data);
    } catch (err) {
      console.error(err);
      setSearchError(err.response?.data?.message || "No treatment record found for this date.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!medicalGiven) {
      setError("Please select whether medical was given or not.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/doctor/add-medical", {
        regNumber: searchRegNumber,
        date: searchDate,
        medicalGiven: medicalGiven === "yes",
        diagnosis: medicalGiven === "yes" ? diagnosis : "",
        notes: medicalGiven === "yes" ? notes : "No medical treatment given",
      });
      setMessage(res.data.message || "Medical record added successfully!");

      setMedicalGiven("");
      setDiagnosis("");
      setNotes("");
      setSearchResult(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error adding medical record.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #a1f0d1, #c6f8e3)",
        py: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: { xs: "90%", sm: 500 },
          borderRadius: 4,
          background: "white",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* 🩺 Logo Section */}
        <Box textAlign="center" mb={4}>
          <motion.img
            src="/medicare_logo.png"
            alt="Medicare Logo"
            style={{
              height: "85px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <Divider
            sx={{
              mt: 1,
              borderColor: "#0a5443",
              borderBottomWidth: 2,
              width: "70%",
              mx: "auto",
            }}
          />
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          sx={{ color: "#0a5443" }}
        >
          Student Medical Record System
        </Typography>

        {/*  Search Section */}
        <form onSubmit={handleSearch}>
          <Stack spacing={2} mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              Search Treatment Record
            </Typography>
            <TextField
              label="Register Number"
              value={searchRegNumber}
              onChange={(e) => setSearchRegNumber(e.target.value)}
              required
              size="small"
            />
            <TextField
              label="Treatment Date"
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              required
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#0a5443",
                "&:hover": { background: "#09856e" },
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Search
            </Button>
            {searchError && <Alert severity="warning">{searchError}</Alert>}
          </Stack>
        </form>

        {/*  Search Results & Medical Record */}
        {searchResult && (
          <>
            <Divider sx={{ my: 3 }} />
            <Alert severity="info" sx={{ mb: 3 }}>
              {searchResult.found
                ? `Treatment record found for ${searchRegNumber} on ${searchDate}`
                : `No treatment record found for ${searchRegNumber} on ${searchDate}`}
            </Alert>

            {/*  Medical Record Form */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Add Medical Record
                </Typography>

                <FormControl component="fieldset" required>
                  <FormLabel component="legend">Was Medical Given?</FormLabel>
                  <RadioGroup
                    value={medicalGiven}
                    onChange={(e) => setMedicalGiven(e.target.value)}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes - Medical Given" />
                    <FormControlLabel value="no" control={<Radio />} label="No - Medical Not Given" />
                  </RadioGroup>
                </FormControl>

                {medicalGiven === "yes" && (
                  <>
                    <TextField
                      label="Diagnosis"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      required
                      size="small"
                    />
                    <TextField
                      label="Notes"
                      multiline
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      size="small"
                    />
                  </>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "#0a5443",
                    "&:hover": { background: "#09856e" },
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Submit Medical Record
                </Button>

                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
              </Stack>
            </form>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default StudentMedical;
