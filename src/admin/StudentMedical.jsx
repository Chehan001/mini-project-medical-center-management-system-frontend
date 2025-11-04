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
  Grid,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { User, Search } from "lucide-react";
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
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchResult(null);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctor/search-treatment",
        {
          params: { regNumber: searchRegNumber, date: searchDate },
        }
      );
      setSearchResult(res.data);
    } catch (err) {
      console.error(err);
      setSearchError(
        err.response?.data?.message ||
          "No treatment record found for this date."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!medicalGiven) {
      setError("Please select whether medical was given or not.");
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #b3f3d9 0%, #e0fff3 50%, #d4f9e6 100%)",
        minHeight: "100vh",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 5,
          borderRadius: 4,
          background: "linear-gradient(to bottom right, #ffffff, #eafcf4)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Logo */}
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
              borderColor: "#13a67a",
              borderBottomWidth: 2,
              width: "70%",
              mx: "auto",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
          sx={{ color: "#065a45" }}
        >
          Student Medical Record
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          mb={4}
          color="text.secondary"
        >
          Search and record student medical details efficiently.
        </Typography>

        {/* Alerts */}
        {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {searchError && <Alert severity="warning" sx={{ mb: 3 }}>{searchError}</Alert>}

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <form onSubmit={handleSearch}>
            <Stack spacing={2} mb={3}>
              <Typography variant="subtitle1" fontWeight="bold" color="#065a45">
                Search Treatment Record
              </Typography>

              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Register Number"
                    value={searchRegNumber}
                    onChange={(e) => setSearchRegNumber(e.target.value.toUpperCase())}
                    required
                    fullWidth
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <User
                          size={18}
                          style={{ marginRight: 8, color: "#0a5443" }}
                        />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={14} sm={6}>
                  <TextField
                    label="Treatment Date"
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    required
                    fullWidth
                    disabled={loading}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                startIcon={<Search size={18} />}
                sx={{
                  py: 1.2,
                  borderRadius: "25px",
                  background: "linear-gradient(90deg, #0a5443, #13a67a)",
                  fontWeight: "bold",
                  "&:hover": { background: "#09856e", transform: "scale(1.03)" },
                  "&:disabled": { background: "#ccc" },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={22} sx={{ color: "#fff", mr: 1 }} />
                    Searching...
                  </>
                ) : (
                  "Search Record"
                )}
              </Button>
            </Stack>
          </form>
        </motion.div>

        {/* Medical Record Section */}
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Divider sx={{ my: 3 }} />
            <Alert severity="info" sx={{ mb: 3 }}>
              {searchResult.found
                ? `Treatment record found for ${searchRegNumber} on ${searchDate}`
                : `No treatment record found for ${searchRegNumber} on ${searchDate}`}
            </Alert>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="subtitle1" fontWeight="bold" color="#065a45">
                  Add Medical Record
                </Typography>

                <FormControl component="fieldset" required>
                  <FormLabel component="legend" sx={{ color: "#0a5443" }}>
                    Was Medical Given?
                  </FormLabel>
                  <RadioGroup
                    value={medicalGiven}
                    onChange={(e) => setMedicalGiven(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="success" />}
                      label="Yes - Medical Given"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="error" />}
                      label="No - Not Given"
                    />
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
                      fullWidth
                    />
                    <TextField
                      label="Notes"
                      multiline
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      size="small"
                      fullWidth
                    />
                  </>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth
                  sx={{
                    borderRadius: "25px",
                    py: 1.3,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #0a5443, #13a67a)",
                    "&:hover": {
                      background: "#09856e",
                      transform: "scale(1.03)",
                    },
                    "&:disabled": {
                      background: "#ccc",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1, color: "#fff" }} />
                      Submitting...
                    </>
                  ) : (
                    "Submit Medical Record"
                  )}
                </Button>
              </Stack>
            </form>
          </motion.div>
        )}

        {/* Footer */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, color: "text.secondary" }}
        >
          © MediCare | Student Medical Record | Sabaragamuwa University
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentMedical;
