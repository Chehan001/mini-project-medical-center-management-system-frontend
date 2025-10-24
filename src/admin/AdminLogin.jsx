import React, { useState } from "react";
import {
  Avatar,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  Divider,
  Fade,
} from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useNavigate } from "react-router-dom";
import { adminAuthApi } from "./api";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
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
        background: "linear-gradient(135deg, #b3f3d9, #d4f9e6, #c8f5e2, #a6f1d7)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Fade in timeout={1000}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "#ffffff",
                boxShadow: "0 8px 25px rgba(31, 143, 126, 0.15)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 35px rgba(31, 143, 126, 0.25)",
                },
              }}
            >
              <Box textAlign="center" mb={2}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <Avatar
                    sx={{
                      mx: "auto",
                      bgcolor: "#1f8f7e",
                      width: 60,
                      height: 60,
                      mb: 2,
                    }}
                  >
                    <AdminPanelSettingsOutlinedIcon fontSize="large" />
                  </Avatar>
                </motion.div>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#1f8f7e",
                    mt: 1,
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: 0.5,
                  }}
                >
                  Admin Login
                </Typography>
                <Divider
                  sx={{
                    width: "50%",
                    mx: "auto",
                    my: 2,
                    borderColor: "#1f8f7e",
                    borderBottomWidth: 2,
                  }}
                />
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="email"
                  label="Admin Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{
                    "& .MuiInputBase-root": { bgcolor: "#f5f5f5" },
                  }}
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
                  sx={{
                    "& .MuiInputBase-root": { bgcolor: "#f5f5f5" },
                  }}
                />

                {error && (
                  <Typography
                    color="error"
                    align="center"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    {error}
                  </Typography>
                )}

                <Box textAlign="center" mt={3}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#1f8f7e",
                        px: 6,
                        py: 1.5,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: 3,
                        transition: "0.3s ease",
                        "&:hover": {
                          bgcolor: "#167366",
                          boxShadow: "0 8px 20px rgba(31,143,126,0.3)",
                        },
                      }}
                    >
                      Login
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Fade>
      </Container>
    </Box>
  );
};

export default AdminLogin;
