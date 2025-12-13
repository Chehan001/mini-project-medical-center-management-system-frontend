import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { Stethoscope, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


const MotionBox = motion(Box);

const Medical = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #b3f3d9, #d4f9e6, #c8f5e2, #a6f1d7)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          boxShadow: "0px 12px 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* Logo & Header */}
        <Box textAlign="center" mb={isMobile ? 3 : 5}>
          <motion.img
            src="/medicare_logo.png"
            alt="Medical Center Logo"
            style={{
              height: isMobile ? "60px" : "80px",
              objectFit: "contain",
              marginBottom: isMobile ? "10px" : "15px",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ fontWeight: "bold", color: "#1f8f7e" }}
          >
            Medical Center Services
          </Typography>
          <Divider
            sx={{
              mt: 1,
              borderColor: "#1f8f7e",
              borderBottomWidth: 2,
              width: isMobile ? "80%" : "60%",
              mx: "auto",
            }}
          />
        </Box>

        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 3, sm: 4 },
            width: "100%",
          }}
        >
          {/* University Medical Center */}
          <Paper
            component={motion.div}
            whileHover={{
              scale: isMobile ? 1 : 1.06,
              boxShadow: "0px 15px 45px rgba(0,0,0,0.25)",
            }}
            transition={{ duration: 0.3 }}
            sx={{
              p: { xs: 3, sm: 5 },
              width: { xs: "100%", sm: "48%", md: 320 },
              textAlign: "center",
              borderRadius: 4,
              cursor: "pointer",
              backgroundColor: "#ffffff",
              mx: { xs: 0, sm: 1 },
              mb: { xs: 3, sm: 0 },
              "&:hover": {
                background: "linear-gradient(135deg, #e0f7f1, #b3f3d9)",
              },
            }}
            onClick={() => navigate("/medical/university")}
          >
            <Stethoscope size={isMobile ? 50 : 60} color="#00acc1" />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
              University Medical Center
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              Submit medical forms for treatments at the university center.
            </Typography>
          </Paper>

          {/* Other Medical Center */}
          <Paper
            component={motion.div}
            whileHover={{
              scale: isMobile ? 1 : 1.06,
              boxShadow: "0px 15px 45px rgba(0,0,0,0.25)",
            }}
            transition={{ duration: 0.3 }}
            sx={{
              p: { xs: 3, sm: 5 },
              width: { xs: "100%", sm: "48%", md: 320 },
              textAlign: "center",
              borderRadius: 4,
              cursor: "pointer",
              backgroundColor: "#ffffff",
              mx: { xs: 0, sm: 1 },
              mb: { xs: 3, sm: 0 },
              "&:hover": {
                background: "linear-gradient(135deg, #d4f9e6, #a6f1d7)",
              },
            }}
            onClick={() => navigate("/medical/external")}
          >
            <Building2 size={isMobile ? 50 : 60} color="#00838f" />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
              Other Medical Center
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              Submit medical reports from external hospitals or clinics.
            </Typography>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Medical;
