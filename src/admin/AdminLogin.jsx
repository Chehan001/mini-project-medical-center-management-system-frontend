import React, { useState } from "react";
import {  Avatar,Container,Paper,TextField,Typography,Box,Button,Grid,Link,  } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useNavigate } from "react-router-dom";
import adminApi from "./api";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await adminApi.post("/admin-login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #80e4be, #a9e0cb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2, // padding for small screens
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            padding: { xs: 3, sm: 4 }, // smaller padding on mobile
            borderRadius: "20px",
            width: "100%",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "#26a69a",
              mb: 2,
              width: { xs: 50, sm: 60 }, // scale avatar for mobile
              height: { xs: 50, sm: 60 },
            }}
          >
            <AdminPanelSettingsOutlinedIcon fontSize="large" />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", mb: 2, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          >
            Admin Login
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Admin Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />

            {error && (
              <Typography
                variant="body2"
                sx={{ color: "red", textAlign: "center", mt: 1 }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#26a69a",
                color: "#fff",
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", sm: "1rem" }, // responsive font
                borderRadius: "10px",
                py: { xs: 1.2, sm: 1.5 }, // taller buttons on larger screens
                "&:hover": { backgroundColor: "#1f8f7e" },
              }}
            >
              Login
            </Button>
          </Box>

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Link
                component="button"
                underline="none"
                onClick={() => navigate("/")}
                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
              >
                Back to Home
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
