import React, { useState } from 'react';
import axios from 'axios';
import {
  Avatar, Container, Paper, TextField, Typography,
  Box, Button, Grid, Link
} from '@mui/material';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';

const LoginRegister = () => {
  const [action, setAction] = useState("Sign In");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    universityEmail: '',
    idNumber: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      if (form.newPassword !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Password reset successful!");
      setAction("Sign In");
      setStep(1);
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
        const response = await axios.post('http://localhost:8000/api/user/login', {
         university_reg_number: form.idNumber,
          password: form.password
        });
        alert("Login successful!");
        console.log(response.data);
      } catch (err) {
        alert("Login failed. Check ID or password.");
        console.error(err);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
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
          {action === "Register" && (
            <TextField
              placeholder="Enter University Email"
              name="universityEmail"
              value={form.universityEmail}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
          )}

          {(action === "Sign In" || action === "Register") && (
            <>
              <TextField
                placeholder="Enter University Id Number"
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
            step === 1 ? (
              <TextField
                placeholder="Enter University Email"
                name="universityEmail"
                value={form.university_mail}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            ) : (
              <>
                <TextField
                  placeholder="Enter New Password"
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  placeholder="Re-enter New Password"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
              </>
            )
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            {action === "Forgot Password" && step === 2 ? "Reset Password" : action}
          </Button>
        </Box>

        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          {action !== "Forgot Password" && (
            <Grid>
              <Link component="button" onClick={() => { setAction("Forgot Password"); setStep(1); }}>
                Forgot Password
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
              <Link component="button" onClick={() => { setAction("Sign In"); setStep(1); }}>
                Back to Sign In
              </Link>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginRegister;
