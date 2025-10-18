import React, { useState } from "react";
import { Avatar, Container, Paper, TextField, Typography, Box, Button } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useNavigate } from "react-router-dom";
import { adminAuthApi } from "./api";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async e => {
  e.preventDefault();
  setError("");

  try {
    const res = await adminAuthApi.post("/admin-login", form);

    // Save both token and role
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", "admin");

    navigate("/admin/dashboard");
  } catch (err) {
    console.error("Admin login error:", err);
    setError(err.response?.data?.message || "Login failed.");
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #80e4be, #a9e0cb)",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Avatar sx={{ mx: "auto", bgcolor: "#26a69a", mb: 2 }}>
            <AdminPanelSettingsOutlinedIcon />
          </Avatar>
          <Typography variant="h5" align="center" gutterBottom>
            Admin Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="email"
              label="Admin Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            {error && (
              <Typography color="error" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
