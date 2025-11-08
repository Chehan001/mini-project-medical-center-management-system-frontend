import React, { useState } from "react";
import { Box, Typography, TextField, Divider, Button, Fade, Alert, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple_validation  -- > to medical form
        if (!formData.studentName || !formData.regNumber || !formData.faculty || !formData.location || !formData.doctorName || !formData.doctorRegID || !formData.treatmentDate) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setNotification("Form submitted successfully!");
            setError("");
            setLoading(false);
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
        }, 1500);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #b3f3d9, #d4f9e6, #c8f5e2, #a6f1d7)",
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
                <MotionBox initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
                            <Typography variant="h5" sx={{ fontWeight: "bold", letterSpacing: 0.5, color: "#1f8f7e" }}>
                                Other Medical Center Form
                            </Typography>
                            <Divider sx={{ mt: 1, borderColor: "#1f8f7e", borderBottomWidth: 2, width: "60%", mx: "auto", }} />
                        </Box>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField label="Student Name" name="studentName" value={formData.studentName} onChange={handleInputChange} variant="outlined" fullWidth sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }} />
                                <TextField label="Register Number" name="regNumber" value={formData.regNumber} onChange={handleInputChange} variant="outlined" fullWidth sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }} />
                                <TextField label="Faculty Name" name="faculty" value={formData.faculty} onChange={handleInputChange} variant="outlined" fullWidth sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }} />
                                <TextField label="Medical Center Location" name="location" value={formData.location} onChange={handleInputChange} variant="outlined" fullWidth sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }} />
                                <TextField label="Doctor Name" name="doctorName" value={formData.doctorName} onChange={handleInputChange} variant="outlined" fullWidth sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }} />
                                <TextField label="Doctor Register ID" name="doctorRegID" value={formData.doctorRegID} onChange={handleInputChange} variant="outlined" fullWidth sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }} />
                                <TextField label="Treatment Date" type="date" name="treatmentDate" value={formData.treatmentDate} onChange={handleInputChange} InputLabelProps={{ shrink: true }} variant="outlined" fullWidth sx={{ backgroundColor: "#ffffffaa", borderRadius: 2 }} />
                                <Button variant="outlined" component="label" sx={{
                                    color: "#1f8f7e", borderColor: "#1f8f7e", borderRadius: "20px", "&:hover": { backgroundColor: "#0f7f5e", borderColor: "#0f7f5e", },
                                }}
                                >
                                    Upload PDF
                                    <input type="file" hidden onChange={handleFileChange} />
                                </Button>
                            </Box>
                            {error && <Fade in={Boolean(error)}><Alert severity="error" sx={{ mt: 3, fontWeight: 600, boxShadow: 2 }}>{error}</Alert></Fade>}
                            {notification && <Fade in={Boolean(notification)}><Alert severity="success" sx={{ mt: 3, fontWeight: 600, boxShadow: 2 }}>{notification}</Alert></Fade>}
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
