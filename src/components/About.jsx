import React from "react";
import NavBar from "./NavBar";
import { Container, Typography, Paper, Box } from "@mui/material";

const About = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(to bottom, #80e4be, #a9e0cb)",
        margin: 0,
        padding: 0,
      }}
    >
      {/* ✅ Navbar inside gradient */}
      <NavBar />

      {/* ✅ Page Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Typography variant="h4" gutterBottom align="center" color="primary">
            About MediCare
          </Typography>

          <Typography variant="body1" paragraph>
            MediCare is a student-driven medical center platform designed to
            improve access to healthcare services and resources. Our goal is to
            integrate technology with healthcare to provide seamless medical
            support for students, staff, and the community.
          </Typography>

          <Typography variant="body1" paragraph>
            The platform allows users to manage personal health data, connect
            with medical channels, and access digital healthcare tools. With a
            secure authentication system and user-friendly interface, MediCare
            ensures both safety and convenience.
          </Typography>

          <Box mt={3}>
            <Typography variant="h6">Our Vision</Typography>
            <Typography variant="body2">
              To empower students and the community with modern healthcare
              solutions through innovation and collaboration.
            </Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Our Mission</Typography>
            <Typography variant="body2">
              To provide an accessible, secure, and reliable healthcare platform
              that connects people with the right medical resources when they
              need them the most.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default About;
