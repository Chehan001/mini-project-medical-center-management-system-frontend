import React, { useState } from 'react'
import { Avatar, Container, Paper, TextField, Typography, Box, Button, Grid, Link } from '@mui/material';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';

const LoginRegister = () => {
  const [action, setAction] = useState("Sign In");
  const [step, setStep] = useState(1); // for Forgot Password flow
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
      // Simulate sending email to backend for verification
      setStep(2); // Move to password reset step
    } else {
      // Simulate submitting new passwords
      if (form.newPassword !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Password reset successful!");
      setAction("Sign In");
      setStep(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic for Sign In / Register
    console.log("Submitted form:", form);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "primary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <MailLockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          {action}
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={
            action === "Forgot Password" ? handleForgotPasswordSubmit : handleSubmit
          }
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

          {action === "Sign In" && (
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

          {action === "Register" && (
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
            <>
              {step === 1 ? (
                <TextField
                  placeholder="Enter University Email"
                  name="universityEmail"
                  value={form.universityEmail}
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
              )}
            </>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            {action === "Forgot Password" && step === 2 ? "Reset Password" : action}
          </Button>
        </Box>

        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          {action !== "Forgot Password" && (
            <Grid item>
              <Link
                component="button"
                onClick={() => {
                  setAction("Forgot Password");
                  setStep(1);
                }}
              >
                Forgot Password
              </Link>
            </Grid>
          )}

          {action === "Sign In" ? (
            <Grid item>
              <Link
                component="button"
                onClick={() => {
                  setAction("Register");
                }}
              >
                Register
              </Link>
            </Grid>
          ) : action === "Register" ? (
            <Grid item>
              <Link
                component="button"
                onClick={() => {
                  setAction("Sign In");
                }}
              >
                Already have an account? Sign In
              </Link>
            </Grid>
          ) : (
            <Grid item>
              <Link
                component="button"
                onClick={() => {
                  setAction("Sign In");
                  setStep(1);
                }}
              >
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