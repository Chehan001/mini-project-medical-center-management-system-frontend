import React, { useState } from "react";
import axios from "axios";
import {
  Avatar, Container, Paper, TextField, Typography,
  Box, Button, Grid, Link
} from "@mui/material";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [action, setAction] = useState("Sign In");
  const [form, setForm] = useState({
    universityEmail: "",
    idNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!form.universityEmail) {
      alert("Please enter your university email.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/auth/request-password-reset", {
        university_mail: form.universityEmail,
      });
      alert("Password reset link sent to your university email.");
      setAction("Sign In");
    } catch (err) {
      alert("Error sending reset link.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (action === "Register") {
      if (!form.universityEmail || !form.idNumber || !form.password) {
        alert("Please fill in all required fields.");
        return;
      }
      try {
        await axios.post("http://localhost:8000/api/auth/register", {
          university_mail: form.universityEmail,
          university_reg_number: form.idNumber,
          password: form.password,
        });
        alert("Registered successfully!");
        setAction("Sign In");
      } catch (err) {
        alert("Error registering student");
        console.error(err);
      }
    } else if (action === "Sign In") {
      if (!form.idNumber || !form.password) {
        alert("Please enter your University Register Number and Password.");
        return;
      }
      try {
        const res = await axios.post("http://localhost:8000/api/auth/login", {
          university_reg_number: form.idNumber,
          password: form.password,
        });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role || "student");
          localStorage.setItem("regNumber", form.idNumber); //  Save registration number
        }
        
        navigate("/personal-data");
      } catch (err) {
        alert("Login failed. Check credentials.");
        console.error(err);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(to bottom, #80e4be, #a9e0cb)",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper elevation={10} sx={{ padding: 4, width: "100%", borderRadius: "20px" }}>
          <Avatar
            sx={{ mx: "auto", bgcolor: "#4EECD1", mb: 2, width: 60, height: 60 }}
            aria-label="login avatar"
          >
            <MailLockOutlinedIcon fontSize="large" />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            {action}
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={action === "Forgot Password" ? handleForgotPasswordSubmit : handleSubmit}
          >
            {action === "Register" && (
              <TextField
                placeholder="Enter University Email"
                name="universityEmail"
                value={form.universityEmail}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="email"
                sx={{ mb: 2 }}
              />
            )}

            {(action === "Register" || action === "Sign In") && (
              <TextField
                placeholder="Enter University Register Number"
                name="idNumber"
                value={form.idNumber}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="username"
                sx={{ mb: 2 }}
              />
            )}

            {(action === "Register" || action === "Sign In") && (
              <TextField
                placeholder="Enter Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                autoComplete={action === "Register" ? "new-password" : "current-password"}
                sx={{ mb: 2 }}
              />
            )}

            {action === "Forgot Password" && (
              <TextField
                placeholder="Enter University Email"
                name="universityEmail"
                value={form.universityEmail}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="email"
                sx={{ mb: 2 }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: "#4EECD1",
                color: "#000",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#42d5c0" },
              }}
            >
              {action}
            </Button>
          </Box>

          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            {action !== "Forgot Password" && (
              <Grid item>
                <Link component="button" underline="none" onClick={() => setAction("Forgot Password")}>
                  Forgot Password
                </Link>
              </Grid>
            )}

            {action === "Sign In" ? (
              <Grid item>
                <Link component="button" underline="none" onClick={() => setAction("Register")}>
                  Register
                </Link>
              </Grid>
            ) : action === "Register" ? (
              <Grid item>
                <Link component="button" underline="none" onClick={() => setAction("Sign In")}>
                  Sign In
                </Link>
              </Grid>
            ) : (
              <Grid item>
                <Link component="button" underline="none" onClick={() => setAction("Sign In")}>
                  Back to Sign In
                </Link>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginRegister;