import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  Fade,
  Alert,
  Container,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import API_ROOT from "../services/api";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const OtherMedical = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    regNumber: "",
    faculty: "",
    location: "",
    doctorName: "",
    doctorRegID: "",
    treatmentDate: "",
    file: null,
  });

  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle PDF file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFormData((prev) => ({ ...prev, file: null }));
    } else {
      setError("");
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.studentName ||
      !formData.regNumber ||
      !formData.faculty ||
      !formData.location ||
      !formData.doctorName ||
      !formData.doctorRegID ||
      !formData.treatmentDate
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");
    setNotification("");

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) dataToSend.append(key, value);
      });

      const response = await axios.post(
        `${API_ROOT}/api/other-medical/submit`,
        dataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setNotification(response.data.message || "Form submitted successfully!");
      setFormData({
        studentName: "",
        regNumber: "",
        faculty: "",
        location: "",
        doctorName: "",
        doctorRegID: "",
        treatmentDate: "",
        file: null,
      });

      // Reset -->  file input field
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err.response?.data?.message || "Error submitting form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #b3f3d9, #d4f9e6, #c8f5e2, #a6f1d7)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              bgcolor: "#ffffff",
              boxShadow: "0px 8px 30px rgba(31,143,126,0.25)",
            }}
          >
            {/* Header */}
            <Box textAlign="center" mb={3}>
              <motion.img
                src="/medicare_logo.png"
                alt="Medical Center Logo"
                style={{ height: "70px", objectFit: "contain", marginBottom: "10px" }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", letterSpacing: 0.5, color: "#1f8f7e" }}
              >
                Other Medical Center Form
              </Typography>
              <Divider
                sx={{ mt: 1, borderColor: "#1f8f7e", borderBottomWidth: 2, width: "60%", mx: "auto" }}
              />
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Student Name"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }}
                />
                <TextField
                  label="Register Number"
                  name="regNumber"
                  value={formData.regNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }}
                />
                <TextField
                  label="Faculty Name"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }}
                />
                <TextField
                  label="Medical Center Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }}
                />
                <TextField
                  label="Doctor Name"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }}
                />
                <TextField
                  label="Doctor Register ID"
                  name="doctorRegID"
                  value={formData.doctorRegID}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }}
                />
                <TextField
                  label="Treatment Date"
                  type="date"
                  name="treatmentDate"
                  value={formData.treatmentDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: "#1f8f7e",
                    borderColor: "#1f8f7e",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#0f7f5e", borderColor: "#0f7f5e" },
                  }}
                >
                  Upload PDF
                  <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} />
                </Button>
                {formData.file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {formData.file.name}
                  </Typography>
                )}
              </Box>

              {/* Notifications */}
              {error && (
                <Fade in={Boolean(error)}>
                  <Alert severity="error" sx={{ mt: 3, fontWeight: 600, boxShadow: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}
              {notification && (
                <Fade in={Boolean(notification)}>
                  <Alert severity="success" sx={{ mt: 3, fontWeight: 600, boxShadow: 2 }}>
                    {notification}
                  </Alert>
                </Fade>
              )}

              {/* Submit button */}
              <MotionButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                sx={{
                  mt: 4,
                  py: 1.8,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: "30px",
                  backgroundColor: "#1f8f7e",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#157666" },
                  "&:disabled": { backgroundColor: "#ccc", color: "#666" },
                  transition: "all 0.3s",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </MotionButton>
            </form>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default OtherMedical;
