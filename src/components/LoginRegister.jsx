import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  Grid,
  Link,
  Divider,
  Fade,
  Alert,
} from "@mui/material";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import { useNavigate } from "react-router-dom";
import API_ROOT from "../services/api";

const LoginRegister = () => {
  const [action, setAction] = useState("Sign In");
  const [form, setForm] = useState({
    universityEmail: "",
    idNumber: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!form.universityEmail) {
      showMessage("warning", "Please enter your university email.");
      return;
    }
    try {
      await axios.post(`${API_ROOT}/api/auth/request-password-reset`, {
        university_mail: form.universityEmail,
      });
      showMessage("success", "Password reset link sent to your university email.");
      setAction("Sign In");
    } catch (err) {
      showMessage("error", "Error sending reset link.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (action === "Register") {
      if (!form.universityEmail || !form.idNumber || !form.password) {
        showMessage("warning", "Please fill in all required fields.");
        return;
      }
      try {
        await axios.post("http://localhost:8000/api/auth/register", {
          university_mail: form.universityEmail,
          university_reg_number: form.idNumber,
          password: form.password,
        });
        showMessage("success", "Registered successfully!");
        setAction("Sign In");
      } catch (err) {
        showMessage("error", "Error registering student.");
        console.error(err);
      }
    } else if (action === "Sign In") {
      if (!form.idNumber || !form.password) {
        showMessage("warning", "Please enter your Register Number and Password.");
        return;
      }
      try {
        const res = await axios.post(`${API_ROOT}/api/auth/login`, {
          university_reg_number: form.idNumber,
          password: form.password,
        });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role || "student");
          localStorage.setItem("regNumber", form.idNumber);
          showMessage("success", "Login successful!");
          setTimeout(() => navigate("/personal-data"), 800);
        }
      } catch (err) {
        showMessage("error", "Login failed. Check credentials.");
        console.error(err);
      }
    }
  };

  const gradientAnimation = `
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #b3f3d9, #d4f9e6, #a9e0cb, #c8f5e2)",
        backgroundSize: "400% 400%",
        animation: "gradientFlow 12s ease infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <style>{gradientAnimation}</style>

      <Fade in timeout={800}>
        <Container maxWidth="xs">
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: "25px",
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 12px 30px rgba(0,0,0,0.2)",
              },
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                mx: "auto",
                bgcolor: "#4EECD1",
                mb: 2,
                width: 70,
                height: 70,
                boxShadow: "0px 0px 10px rgba(78,236,209,0.5)",
              }}
            >
              <MailLockOutlinedIcon fontSize="large" />
            </Avatar>

            {/* Title */}
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#007B5E",
                letterSpacing: 1,
                mb: 1,
              }}
            >
              {action}
            </Typography>
            <Divider
              sx={{
                width: "80px",
                height: "4px",
                backgroundColor: "#4EECD1",
                mx: "auto",
                mb: 3,
                borderRadius: 2,
              }}
            />

            {/* Message Area */}
            {message.text && (
              <Alert
                severity={message.type}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  fontSize: "0.9rem",
                  animation: "fadeIn 0.5s ease-in-out",
                }}
              >
                {message.text}
              </Alert>
            )}

            {/* Form */}
            <Box
              component="form"
              noValidate
              onSubmit={
                action === "Forgot Password"
                  ? handleForgotPasswordSubmit
                  : handleSubmit
              }
            >
              <Fade in key={action} timeout={500}>
                <Box>
                  {action === "Register" && (
                    <TextField
                      label="University Email"
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
                      label="University Register Number"
                      name="idNumber"
                      value={form.idNumber}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                  )}

                  {(action === "Register" || action === "Sign In") && (
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                  )}

                  {action === "Forgot Password" && (
                    <TextField
                      label="University Email"
                      name="universityEmail"
                      value={form.universityEmail}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                  )}

                  {/* Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 1,
                      py: 1.2,
                      fontSize: "1rem",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      background: "linear-gradient(90deg, #4EECD1, #6BEED7)",
                      color: "#000",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(90deg, #6BEED7, #4EECD1)",
                        boxShadow: "0 0 12px rgba(78,236,209,0.6)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {action}
                  </Button>
                </Box>
              </Fade>
            </Box>

            {/* Links */}
            <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
              {action !== "Forgot Password" && (
                <Grid item>
                  <Link
                    component="button"
                    underline="none"
                    onClick={() => setAction("Forgot Password")}
                    sx={{
                      fontSize: "0.9rem",
                      color: "#007B5E",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Grid>
              )}

              {action === "Sign In" ? (
                <Grid item>
                  <Link
                    component="button"
                    underline="none"
                    onClick={() => setAction("Register")}
                    sx={{
                      fontSize: "0.9rem",
                      color: "#007B5E",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Register
                  </Link>
                </Grid>
              ) : (
                <Grid item>
                  <Link
                    component="button"
                    underline="none"
                    onClick={() => setAction("Sign In")}
                    sx={{
                      fontSize: "0.9rem",
                      color: "#007B5E",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Back to Sign In
                  </Link>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </Fade>
    </div>
  );
};

export default LoginRegister;
