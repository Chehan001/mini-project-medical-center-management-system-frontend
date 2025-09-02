import React, { useState } from 'react';
import axios from 'axios';
import {
  Avatar, Container, Paper, TextField, Typography,
  Box, Button, Grid, Link
} from '@mui/material';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';   // ✅ include NavBar inside gradient

const LoginRegister = () => {
  const [action, setAction] = useState("Sign In");
  const [form, setForm] = useState({
    universityEmail: '',
    idNumber: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/request-password-reset', {
        university_mail: form.universityEmail,
      });
      alert('Password reset link sent to your university email.');
      setAction("Sign In");
    } catch (err) {
      alert('Error sending reset link.');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (action === "Register") {
      try {
        await axios.post('http://localhost:8000/api/user/register', {
          university_mail: form.universityEmail,
          university_reg_number: form.idNumber,
          password: form.password
        });
        alert("Registered successfully!");
        setAction("Sign In");
      } catch (err) {
        alert("Error registering student");
        console.error(err);
      }
    } else if (action === "Sign In") {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
          university_reg_number: form.idNumber,
          password: form.password
        });
        alert("Login successful");
        navigate('/userProfil');
      } catch (err) {
        alert("Login failed. Check ID or password.");
        console.error(err);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(to bottom, #80e4be, #a9e0cb)', // ✅ same gradient as HomePage
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* ✅ Gradient also covers NavBar */}
      <NavBar />

      {/* Page Content */}
      <Container maxWidth="xs" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Paper elevation={10} sx={{ padding: 3, width: '100%' }}>
          <Avatar sx={{ mx: "auto", bgcolor: "primary.main", mb: 1 }}>
            <MailLockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            {action}
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={action === "Forgot Password" ? handleForgotPasswordSubmit : handleSubmit}
          >
            {action !== "Forgot Password" && (
              <>
                {action === "Register" && (
                  <TextField
                    placeholder="Enter University Email"
                    name="universityEmail"
                    value={form.universityEmail}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                )}

                <TextField
                  placeholder="Enter University ID Number"
                  name="idNumber"
                  value={form.idNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {action === "Forgot Password" && (
              <TextField
                placeholder="Enter University Email"
                name="universityEmail"
                value={form.universityEmail}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              {action}
            </Button>
          </Box>

          <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
            {action !== "Forgot Password" && (
              <Grid item>
                <Link component="button" onClick={() => setAction("Forgot Password")}>
                  Forgot Password?
                </Link>
              </Grid>
            )}

            {action === "Sign In" ? (
              <Grid item>
                <Link component="button" onClick={() => setAction("Register")}>
                  Register
                </Link>
              </Grid>
            ) : action === "Register" ? (
              <Grid item>
                <Link component="button" onClick={() => setAction("Sign In")}>
                  Already have an account? Sign In
                </Link>
              </Grid>
            ) : (
              <Grid item>
                <Link component="button" onClick={() => setAction("Sign In")}>
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
