import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  Fade,
} from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle, User, Pill, Hash } from "lucide-react";

const Distribution = () => {
  const [form, setForm] = useState({ regNo: "", medicine: "", quantity: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.regNo || !form.medicine || !form.quantity) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    setMessage({
      text: `Medicine distributed to ${form.regNo} successfully!`,
      type: "success",
    });

    setForm({ regNo: "", medicine: "", quantity: "" });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #b3f3d9, #d4f9e6, #c8f5e2, #a9e0cb)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 8,
        px: 2,
      }}
    >
      <style>
        {`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>

      <Fade in timeout={1000}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={8}
            sx={{
              width: "95%",
              maxWidth: 600,
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": { boxShadow: "0px 12px 30px rgba(0,0,0,0.15)" },
            }}
          >
            {/* LOGO */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img
                src="/medicare_logo.png"
                alt="MediCare Logo"
                style={{ height: "70px", objectFit: "contain" }}
              />
            </Box>

            {/* TITLE */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#007B5E",
                letterSpacing: 1,
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              Medicine Distribution
            </Typography>

            <Divider
              sx={{
                width: 220,
                mx: "auto",
                mb: 3,
                borderBottomWidth: 3,
                borderColor: "#80e4be",
                borderRadius: 5,
              }}
            />

            {/* ALERT MESSAGE */}
            {message.text && (
              <Alert
                severity={message.type === "success" ? "success" : "error"}
                sx={{
                  mb: 3,
                  fontWeight: 500,
                  borderRadius: 2,
                  backgroundColor:
                    message.type === "success"
                      ? "rgba(200,255,230,0.7)"
                      : "rgba(255,230,230,0.7)",
                }}
              >
                {message.text}
              </Alert>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Student Register Number"
                fullWidth
                value={form.regNo}
                onChange={(e) =>
                  setForm({ ...form, regNo: e.target.value.toUpperCase() })
                }
                InputProps={{
                  startAdornment: (
                    <User size={18} style={{ marginRight: 8, color: "#0a5443" }} />
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <TextField
                label="Medicine Name"
                fullWidth
                value={form.medicine}
                onChange={(e) =>
                  setForm({ ...form, medicine: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <Pill size={18} style={{ marginRight: 8, color: "#0a5443" }} />
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <Hash size={18} style={{ marginRight: 8, color: "#0a5443" }} />
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<CheckCircle size={18} />}
                sx={{
                  backgroundColor: "#1f8f7e",
                  py: 1.4,
                  fontWeight: "bold",
                  borderRadius: 2,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#157b68",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(31,143,126,0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Distribute Medicine
              </Button>
            </form>

            {/* FOOTER */}
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              © 2025 MediCare Admin Portal | Sabaragamuwa University
            </Typography>
          </Paper>
        </motion.div>
      </Fade>
    </Box>
  );
};

export default Distribution;
