// frontend/src/components/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Paper, Typography } from '@mui/material';
import API_ROOT from "../services/api";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${API_ROOT}/api/auth/reset-password/${userId}/${token}`, {
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
      alert(res.data.message || "Password reset successful");
      navigate('/');
    } catch (err) {
      alert("Password reset failed.");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ mt: 8, p: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Reset Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
