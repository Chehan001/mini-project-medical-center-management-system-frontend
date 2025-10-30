import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Alert,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import { User, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const StudentMedicine = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [medicines, setMedicines] = useState([
    { id: 1, medicineName: "", dosage: "", frequency: "", timing: "morning" },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Auto-fill date and time
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].substring(0, 5);
    setDate(currentDate);
    setTime(currentTime);
  }, []);

  const handleMedicineChange = (id, field, value) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMedicine = () => {
    const newId =
      medicines.length > 0 ? Math.max(...medicines.map((m) => m.id)) + 1 : 1;
    setMedicines([
      ...medicines,
      { id: newId, medicineName: "", dosage: "", frequency: "", timing: "morning" },
    ]);
  };

  const removeMedicine = (id) => {
    if (medicines.length > 1)
      setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!registerNumber.trim()) {
      setError("Please enter student register number.");
      return;
    }
    if (medicines.some((m) => !m.medicineName || !m.dosage || !m.frequency)) {
      setError("Please fill in all medicine fields before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctor/add-medicine",
        { regNumber: registerNumber, date, time, medicines }
      );

      setMessage(response.data.message || "Medicine record added successfully!");
      setRegisterNumber("");
      setMedicines([{ id: 1, medicineName: "", dosage: "", frequency: "", timing: "morning" }]);
    } catch (err) {
      console.error(" Error adding medicine:", err);
      setError(err.response?.data?.message || "Error adding medicine record. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #b3f3d9, #d4f9e6)",
        minHeight: "100vh",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 5,
          borderRadius: 3,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header_with_Animated-Logo */}
        <Box textAlign="center" mb={4}>
          <motion.img
            src="/medicare_logo.png"
            alt="University Logo"
            style={{ height: "80px", objectFit: "contain", marginBottom: "12px" }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <Divider
            sx={{
              mt: 1,
              borderColor: "#1f8f7e",
              borderBottomWidth: 2,
              width: "60%",
              mx: "auto",
            }}
          />
        </Box>

        <Typography variant="h4" fontWeight="bold" color="#0a5443" textAlign="center" mb={1}>
          Student Medicine Record
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
          Enter and submit prescribed medicines for a student
        </Typography>

        {/* Alerts */}
        {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Register Number"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <User size={18} style={{ marginRight: 8, color: "#0a5443" }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Date" value={date} fullWidth InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Time" value={time} fullWidth InputProps={{ readOnly: true }} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Medicine_Section_Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold" color="#0a5443">
                Medicines
              </Typography>
              <Button
                startIcon={<Plus size={18} />}
                onClick={addMedicine}
                variant="contained"
                sx={{
                  borderRadius: "15px",
                  background: "#0a5443",
                  "&:hover": { background: "#09856e", transform: "scale(1.05)" },
                  textTransform: "none",
                  transition: "all 0.3s",
                }}
              >
                Add Medicine
              </Button>
            </Box>

            {/* Medicine Fields */}
            {medicines.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    border: "1px solid #c8e6c9",
                    borderRadius: 3,
                    backgroundColor: "#f9fffc",
                    mt: 2,
                    "&:hover": {
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                      transition: "all 0.3s",
                    },
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontWeight="bold">Medicine {index + 1}</Typography>
                    {medicines.length > 1 && (
                      <IconButton onClick={() => removeMedicine(m.id)} color="error" size="small">
                        <Trash2 size={20} />
                      </IconButton>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Medicine Name"
                        value={m.medicineName}
                        onChange={(e) =>
                          handleMedicineChange(m.id, "medicineName", e.target.value)
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Dosage (mg)"
                        type="number"
                        value={m.dosage}
                        onChange={(e) => handleMedicineChange(m.id, "dosage", e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Frequency (per day)"
                        type="number"
                        value={m.frequency}
                        onChange={(e) =>
                          handleMedicineChange(m.id, "frequency", e.target.value)
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Timing
                      </Typography>
                      <Stack direction="row" spacing={3}>
                        {["morning", "night", "both"].map((t) => (
                          <label
                            key={t}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              backgroundColor: m.timing === t ? "#0a5443" : "#e0f2f1",
                              color: m.timing === t ? "#fff" : "#0a5443",
                              transition: "all 0.3s",
                            }}
                          >
                            <input
                              type="radio"
                              name={`timing-${m.id}`}
                              value={t}
                              checked={m.timing === t}
                              onChange={(e) =>
                                handleMedicineChange(m.id, "timing", e.target.value)
                              }
                              style={{ display: "none" }}
                            />
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </label>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            ))}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "20px",
                background: "#0a5443",
                py: 1.5,
                fontSize: "1rem",
                mt: 2,
                "&:hover": { background: "#09856e", transform: "scale(1.03)" },
                transition: "all 0.3s",
              }}
            >
              Submit All Medicines
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentMedicine;
