import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import axios from "axios";
import StudentTable from "./StudentTable"; 

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user");
      setStudents(res.data);
      setShowTable(true);
    } catch (err) {
      console.error("Error fetching student data:", err);
      alert("Failed to fetch student data.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Manage Student Data</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              View all registered student profiles
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={fetchStudents}>
              View Student Data
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Student table displays only when loaded */}
      {showTable && <StudentTable students={students} />}
    </Box>
  );
};

export default AdminDashboard;
