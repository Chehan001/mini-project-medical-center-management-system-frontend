import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Avatar,
  TableContainer,
  Divider,
  Fade,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import API_ROOT from "../services/api";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${API_ROOT}/api/user/`);
        setStudents(res.data);
      } catch (err) {
        console.error("Fetch student data error:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress color="success" size={60} />
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Loading student data...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4, fontWeight: 500 }}>
        {error}
      </Typography>
    );

  if (!students.length)
    return (
      <Typography
        variant="body1"
        sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}
      >
        No student data available.
      </Typography>
    );

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
        py: 6,
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={8}
            sx={{
              width: "95%",
              maxWidth: 1200,
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
                alt="University Logo"
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
              Registered Student Data
            </Typography>
            <Divider
              sx={{
                width: 200,
                mx: "auto",
                mb: 3,
                borderBottomWidth: 3,
                borderColor: "#80e4be",
                borderRadius: 5,
              }}
            />

            {/* TABLE */}
            <TableContainer
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    background: "linear-gradient(to right, #80e4be, #a9e0cb)",
                  }}
                >
                  <TableRow>
                    {[
                      "Photo",
                      "Name",
                      "Reg Number",
                      "Faculty",
                      "Course",
                      "Blood Group",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          color: "#004d40",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "0.95rem",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {students.map((s, index) => (
                    <TableRow
                      key={s._id}
                      component={motion.tr}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(128, 224, 190, 0.15)",
                          transition: "0.3s",
                          transform: "scale(1.01)",
                        },
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(245,255,250,0.7)",
                      }}
                    >
                      <TableCell align="center">
                        {s.photo ? (
                          <Avatar
                            src={`${API_ROOT}${s.photo}`}
                            alt="Student"
                            sx={{
                              width: 50,
                              height: 50,
                              mx: "auto",
                              border: "2px solid #80e4be",
                            }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: 50,
                              height: 50,
                              mx: "auto",
                              bgcolor: "#a9e0cb",
                              color: "#004d40",
                              fontWeight: "bold",
                            }}
                          >
                            {s.name?.charAt(0) || "?"}
                          </Avatar>
                        )}
                      </TableCell>

                      <TableCell align="center" sx={{ fontWeight: 500 }}>
                        {s.name}
                      </TableCell>
                      <TableCell align="center">{s.regNumber}</TableCell>
                      <TableCell align="center">{s.faculty}</TableCell>
                      <TableCell align="center">{s.course}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          color: "#00695c",
                        }}
                      >
                        {s.bloodGroup}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* FOOTER */}
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              © 2025 MediCare Admin Portal | Sabaragamuwa University
            </Typography>
          </Paper>
        </motion.div>
      </Fade>
    </Box>
  );
};

export default StudentTable;
