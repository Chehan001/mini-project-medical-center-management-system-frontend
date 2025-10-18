import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import adminApi from "./api"; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminApi.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Fetch users error:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        
        {/* Manage Users Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Manage Users</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Total Registered Users: {users.length}
            </Typography>
            <Button
              component={Link}
              to="/admin/users"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Go to Users
            </Button>
          </Paper>
        </Grid>

        {/* Manage Home Content Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Manage Home Content</Typography>
            <Button
              component={Link}
              to="/admin/home-content"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Go to Home Content
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
