import React, { useEffect, useState } from "react";
import {
  Box, Container, Paper, Typography, CircularProgress,
  Stack, Collapse, IconButton, Alert, Divider, Chip
} from "@mui/material";
import { motion } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";
import axios from "axios";

const MotionBox = motion(Box);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
};

const StudentMedicalDetails = () => {
  const [loading, setLoading] = useState(true);
  const [universityMedical, setUniversityMedical] = useState([]);
  const [otherMedical, setOtherMedical] = useState([]);
  const [expandedIndexUni, setExpandedIndexUni] = useState(null);
  const [expandedIndexOther, setExpandedIndexOther] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicalDetails = async () => {
      try {
        const regNumber = localStorage.getItem("regNumber");
        if (!regNumber) {
          setError("No registration number found. Please log in first.");
          setLoading(false);
          return;
        }

        const uniRes = await axios.get(`http://localhost:8000/api/university-medical/${regNumber}`);
        const otherRes = await axios.get(`http://localhost:8000/api/other-medical/${regNumber}`);

        setUniversityMedical(uniRes.data || []);
        setOtherMedical(otherRes.data || []);
      } catch (err) {
        console.error("Error fetching medical details:", err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalDetails();
  }, []);

  const toggleExpandUni = (index) => setExpandedIndexUni(expandedIndexUni === index ? null : index);
  const toggleExpandOther = (index) => setExpandedIndexOther(expandedIndexOther === index ? null : index);

  const cardStyles = (bg) => ({
    mb: 2, p: 3, borderRadius: 3, background: bg, cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)", transition: "all 0.3s ease",
  });

  const renderUniversityMedical = () =>
    universityMedical.length === 0
      ? <Typography sx={{ color: "#555", textAlign: "center" }}>No University Medical requests found.</Typography>
      : universityMedical.map((item, index) => (
        <MotionBox key={index} sx={cardStyles("linear-gradient(to right, #e0f7f4, #f0fffa)")} whileHover={{ scale: 1.03 }}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#065a45">
                📅 {formatDate(item.treatmentDate)} | 🏫 University
              </Typography>
              <IconButton size="small" onClick={() => toggleExpandUni(index)}
                sx={{ transform: expandedIndexUni === index ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                <ExpandMore />
              </IconButton>
            </Box>
            <Collapse in={expandedIndexUni === index}>
              <Stack spacing={1} mt={2}>
                <Typography variant="body1"><strong>Student Name:</strong> {item.studentName}</Typography>
                <Chip label={item.status || "Pending"} color={item.status === "Completed" ? "success" : "warning"} size="small"
                  sx={{ fontWeight: 600, alignSelf: "flex-start" }} />
              </Stack>
            </Collapse>
          </Stack>
        </MotionBox>
      ));

  const renderOtherMedical = () =>
    otherMedical.length === 0
      ? <Typography sx={{ color: "#555", textAlign: "center" }}>No Other Medical requests found.</Typography>
      : otherMedical.map((item, index) => (
        <MotionBox key={index} sx={cardStyles("linear-gradient(to right, #fff0f7, #ffe6f7)")} whileHover={{ scale: 1.03 }}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" fontWeight="bold" color="#065a45">
                📅 {formatDate(item.treatmentDate)} | 🏥 Other
              </Typography>
              <IconButton size="small" onClick={() => toggleExpandOther(index)}
                sx={{ transform: expandedIndexOther === index ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                <ExpandMore />
              </IconButton>
            </Box>
            <Collapse in={expandedIndexOther === index}>
              <Stack spacing={1} mt={2}>
                <Typography variant="body1"><strong>Student Name:</strong> {item.studentName}</Typography>
                <Typography variant="body2"><strong>Faculty:</strong> {item.faculty}</Typography>
                <Typography variant="body2"><strong>Doctor:</strong> {item.doctorName} ({item.doctorRegID})</Typography>
                {item.file && (
                  <Typography variant="body2">
                    <strong>File:</strong> <a href={`http://localhost:8000${item.file}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                  </Typography>
                )}
              </Stack>
            </Collapse>
          </Stack>
        </MotionBox>
      ));

  if (loading) return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #b3f3d9, #e0fff3)" }}>
      <CircularProgress sx={{ color: "#067d61" }} />
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(to bottom right, #d4fff1, #baf1e0)" }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 8 } }}>
        <Paper sx={{ p: 4, borderRadius: 4, background: "#ffffff", elevation: 6 }}>
          <Box textAlign="center" mb={3}>
            <motion.img src="/medicare_logo.png" alt="University Logo" style={{ height: "80px", objectFit: "contain", marginBottom: "15px" }}
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} />
          </Box>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: "center", color: "#0e4d46" }}>Medical Requests</Typography>
          </motion.div>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <Divider sx={{ my: 2, borderColor: "#b3e7d3" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#065a45" }}>University Medical Requests</Typography>
          {renderUniversityMedical()}
          <Divider sx={{ my: 3, borderColor: "#b3e7d3" }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#065a45" }}>Other Medical Requests</Typography>
          {renderOtherMedical()}
        </Paper>
      </Container>
      <Box sx={{ backgroundColor: "#0e4d46", color: "#fff", textAlign: "center", py: 2, mt: "auto", fontSize: { xs: 12, sm: 14 } }}>
        © {new Date().getFullYear()} MediCare — Sabaragamuwa University
      </Box>
    </Box>
  );
};

export default StudentMedicalDetails;
