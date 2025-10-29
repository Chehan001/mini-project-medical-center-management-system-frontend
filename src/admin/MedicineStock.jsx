import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import HeightIcon from "@mui/icons-material/Height";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CakeIcon from "@mui/icons-material/Cake";
import axios from "axios";

const DoctorDashboard = () => {
  const [regNumber, setRegNumber] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!regNumber.trim()) {
      setError("Please enter a registration number");
      return;
    }

    setLoading(true);
    setError("");
    setStudentData(null);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/doctor/student/${regNumber}`
      );
      if (res.data.success) setStudentData(res.data.data);
      else setError("Student not found");
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || "Student not found");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0f2f1, #b2dfdb, #80cbc4)", py: 4, px: 2 }}>
      <Paper elevation={6} sx={{ maxWidth: 1000, mx: "auto", p: 4, borderRadius: 4, background: "rgba(255, 255, 255, 0.95)" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#00695c", mb: 1 }}>Doctor Dashboard</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>Search and view student medical records</Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ display: "flex", gap: 2, mb: 4, flexDirection: { xs: "column", sm: "row" } }}>
          <TextField
            fullWidth
            label="Student Registration Number"
            variant="outlined"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Enter Reg Number (e.g., EG/2022/1234)"
          />
          <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </Box>

        {loading && <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}><CircularProgress /></Box>}
        {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>{error}</Alert>}

        {studentData && (
          <Card elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ background: "linear-gradient(135deg, #26a69a, #00897b)", p: 3, display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar src={studentData.photo ? `http://localhost:8000${studentData.photo}` : undefined} sx={{ width: 100, height: 100, border: "4px solid white" }}>
                {!studentData.photo && (studentData.name?.charAt(0) || "?")}
              </Avatar>
              <Box sx={{ color: "white" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>{studentData.name || "N/A"}</Typography>
                <Typography variant="body1">{studentData.university_reg_number || studentData.regNumber}</Typography>
                <Typography variant="body2">{studentData.university_mail}</Typography>
                {studentData.faculty && studentData.course && <Typography variant="body2">{studentData.faculty} - {studentData.course}</Typography>}
              </Box>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ color: "#00695c", fontWeight: "bold", mb: 3 }}>Medical Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}><Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><CakeIcon /> <Box><Typography>Age</Typography><Typography>{studentData.age || "N/A"} {studentData.age ? "years" : ""}</Typography></Box></Box></Grid>
                <Grid item xs={12} sm={6}><Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><BloodtypeIcon /> <Box><Typography>Blood Group</Typography><Typography>{studentData.bloodGroup || "N/A"}</Typography></Box></Box></Grid>
                <Grid item xs={12} sm={6}><Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><MonitorWeightIcon /> <Box><Typography>Weight</Typography><Typography>{studentData.weight || "N/A"} {studentData.weight ? "kg" : ""}</Typography></Box></Box></Grid>
                <Grid item xs={12} sm={6}><Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><HeightIcon /> <Box><Typography>Height</Typography><Typography>{studentData.height || "N/A"} {studentData.height ? "cm" : ""}</Typography></Box></Box></Grid>
                <Grid item xs={12}><Box sx={{ display: "flex", gap: 2, alignItems: "center" }}><FavoriteBorderIcon /> <Box><Typography>Blood Pressure</Typography><Typography>{studentData.bloodPressure || "N/A"}</Typography></Box></Box></Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {!studentData && !loading && !error && (
          <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
            <PersonIcon sx={{ fontSize: 80, opacity: 0.3, mb: 2 }} />
            <Typography variant="h6">Enter a registration number to view student details</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DoctorDashboard;
