import React from "react";
import NavBar from "./NavBar";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(-45deg, #b3f3d9, #a9e0cb, #d4f9e6, #b0f2df)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 10s ease infinite",
        display: "flex",
        flexDirection: "column",
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

      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          mt: 6,
          mb: 6,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={{ width: "100%" }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "20px",
              backgroundColor: "rgba(255,255,255,0.95)",
              boxShadow:
                "0 8px 20px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0,0,0,0.08)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                color: "#1f8f7e",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
                mb: 2,
              }}
            >
              About MediCare
            </Typography>

            <Divider sx={{ mb: 3, borderColor: "#b3e5c1" }} />

            <Typography variant="body1" paragraph sx={{ color: "#333" }}>
              <strong>MediCare</strong> is a student-driven medical center
              platform designed to improve access to healthcare services and
              resources. Our mission is to integrate modern technology with
              healthcare to create a seamless and secure digital medical system
              for students, staff, and the university community.
            </Typography>

            <Typography variant="body1" paragraph sx={{ color: "#333" }}>
              Through MediCare, users can manage their personal health data,
              channel medical appointments online, and stay updated with digital
              healthcare tools. The platform ensures both security and
              convenience with an elegant and easy-to-use interface.
            </Typography>

            <Box mt={3}>
              <Typography
                variant="h6"
                sx={{ color: "#1f8f7e", fontWeight: "bold" }}
              >
                Our Vision
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                To empower students and the community with accessible,
                technology-driven healthcare solutions that enhance well-being
                and medical efficiency.
              </Typography>
            </Box>

            <Box mt={3}>
              <Typography
                variant="h6"
                sx={{ color: "#1f8f7e", fontWeight: "bold" }}
              >
                Our Mission
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                To provide a secure, innovative, and reliable digital healthcare
                system that connects people with the right medical resources at
                the right time.
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1f8f7e",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  px: 3,
                  py: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#157666",
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Learn More
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#1f8f7e",
                  borderColor: "#1f8f7e",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  px: 3,
                  py: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#e8fdf4",
                    transform: "scale(1.05)",
                    borderColor: "#157666",
                  },
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
