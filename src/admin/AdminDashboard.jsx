import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Manage Users</Typography>
            <Typography variant="body2">View, edit, or delete student profiles</Typography>
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

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Manage Home Content</Typography>
            <Typography variant="body2">Add, edit, or delete homepage content</Typography>
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
