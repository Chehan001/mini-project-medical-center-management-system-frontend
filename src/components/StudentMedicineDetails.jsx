import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Grid,
  Stack,
  Alert,
  Container,
  Collapse,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";
import axios from "axios";
import API_ROOT from "../services/api"; 
const MotionBox = motion(Box);

const StudentMedicineDetails = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchMedicines = async (regNumber) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${API_ROOT}/api/studentMedicine/student/${regNumber}`
      );

      if (res.data.success) {
        if (res.data.data.length === 0) {
          setError("No medicine records found for your registration number.");
        } else {
          setMedicines(res.data.data);
        }
      } else {
        setError(res.data.message || "Failed to fetch medicine records.");
      }
    } catch (err) {
      console.error("Axios error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch medicine records. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedRegNo = localStorage.getItem("regNumber");
    if (!storedRegNo) {
      setError("No registration number found. Please log in again.");
      setLoading(false);
      return;
    }
    fetchMedicines(storedRegNo);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #b3f3d9, #e0fff3)",
        }}
      >
        <CircularProgress sx={{ color: "#067d61" }} />
      </Box>
    );
  }

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #b3f3d9 0%, #e0fff3 50%, #d4f9e6 100%)",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 5,
            background: "linear-gradient(to bottom right, #ffffff, #eafcf4)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          }}
        >
          {/* Logo */}
          <Box textAlign="center" mb={3}>
            <motion.img
              src="/medicare_logo.png"
              alt="University Logo"
              style={{ height: "70px", objectFit: "contain", marginBottom: "10px" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </Box>

          {/* Header */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#065a45", textAlign: "center", mb: 3 }}
          >
            Student Medicine Details
          </Typography>

          <Divider sx={{ mb: 4, borderColor: "#13a67a" }} />

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Medicine Records */}
          {medicines.map((record, index) => (
            <MotionBox
              key={record._id || index}
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(to right, #e0fff3, #f0fff9)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Stack spacing={1.5}>
                {/* Header with Date & Status */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" color="#064e3b">
                    📅 {record.formattedDate || record.date} | 🕓 {record.time}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={() => handleExpand(index)}
                      size="small"
                      sx={{
                        transform: expandedIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Collapsible Medicine List */}
                <Collapse in={expandedIndex === index}>
                  <Stack spacing={1}>
                    {record.medicines.map((med, idx) => (
                      <Paper
                        key={idx}
                        variant="outlined"
                        sx={{
                          p: 2,
                          mb: 1,
                          borderRadius: 2,
                          background: "linear-gradient(to right, #ffffff, #d0f6e2)",
                          borderColor: "#b3e7d3",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Grid container spacing={1.5}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2">
                              💊 <strong>Medicine:</strong> {med.medicineName}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2">
                              💉 <strong>Dosage:</strong> {med.dosage}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2">
                              ⏱️ <strong>Frequency:</strong> {med.frequency}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2">
                              🕑 <strong>Timing:</strong> {med.timing}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Stack>
                </Collapse>
              </Stack>
            </MotionBox>
          ))}

          {/* Footer */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 5, color: "text.secondary" }}
          >
            © {new Date().getFullYear()} MediCare | Student Medicine Details |
            Sabaragamuwa University
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentMedicineDetails;
