import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  Fade,
} from "@mui/material";
import { motion } from "framer-motion";
import { PackageCheck, AlertTriangle } from "lucide-react";
import axios from "axios";
import API_ROOT from "../../services/api";

const ShowStock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStock = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_ROOT}/api/medicineStock/stock`);
      setStock(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch stock:", err);
      setError("Failed to fetch stock. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expDate = new Date(expiryDate);
    const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate) => {
    const today = new Date();
    const expDate = new Date(expiryDate);
    return expDate < today;
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: "Out of Stock", color: "error" };
    if (quantity < 10) return { label: "Low Stock", color: "warning" };
    return { label: "In Stock", color: "success" };
  };

  const getExpiryStatus = (expiryDate) => {
    if (isExpired(expiryDate)) return { label: "Expired", color: "error" };
    if (isExpiringSoon(expiryDate)) return { label: "Expiring Soon", color: "warning" };
    return null;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
              <PackageCheck size={28} color="#007B5E" />
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#007B5E",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Medicine Stock Inventory
              </Typography>
            </Box>

            <Divider
              sx={{
                width: 250,
                mx: "auto",
                mb: 3,
                borderBottomWidth: 3,
                borderColor: "#80e4be",
                borderRadius: 5,
              }}
            />

            {/* LOADING */}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#007B5E" }} />
              </Box>
            )}

            {/* ERROR */}
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* NO DATA */}
            {!loading && !error && stock.length === 0 && (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <AlertTriangle size={48} color="#FFA726" />
                <Typography variant="h6" sx={{ mt: 2, color: "#666" }}>
                  No medicines available in stock
                </Typography>
              </Box>
            )}

            {/* TABLE */}
            {!loading && !error && stock.length > 0 && (
              <>
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: 2, borderRadius: 2, overflow: "hidden" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#007B5E" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Medicine Name
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                          Quantity
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                          Status
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          License Number
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Manufacturing Date
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Expiry Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stock.map((med) => {
                        const stockStatus = getStockStatus(med.quantity);
                        const expiryStatus = getExpiryStatus(med.expiryDate);
                        
                        return (
                          <TableRow
                            key={med._id}
                            sx={{
                              "&:hover": { backgroundColor: "#f5f5f5" },
                              backgroundColor: isExpired(med.expiryDate)
                                ? "rgba(255,0,0,0.05)"
                                : "white",
                            }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>{med.name}</TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                                color:
                                  med.quantity === 0
                                    ? "error.main"
                                    : med.quantity < 10
                                    ? "warning.main"
                                    : "success.main",
                              }}
                            >
                              {med.quantity}
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                <Chip
                                  label={stockStatus.label}
                                  color={stockStatus.color}
                                  size="small"
                                  sx={{ fontWeight: 500 }}
                                />
                                {expiryStatus && (
                                  <Chip
                                    label={expiryStatus.label}
                                    color={expiryStatus.color}
                                    size="small"
                                    sx={{ fontWeight: 500 }}
                                  />
                                )}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontFamily: "monospace", color: "#555" }}>
                              {med.licenseNumber}
                            </TableCell>
                            <TableCell>
                              {new Date(med.manufacturingDate).toLocaleDateString("en-GB")}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: isExpired(med.expiryDate)
                                  ? "error.main"
                                  : isExpiringSoon(med.expiryDate)
                                  ? "warning.main"
                                  : "inherit",
                                fontWeight: isExpired(med.expiryDate) || isExpiringSoon(med.expiryDate)
                                  ? "bold"
                                  : "normal",
                              }}
                            >
                              {new Date(med.expiryDate).toLocaleDateString("en-GB")}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
                  <Chip label={`Total Medicines: ${stock.length}`} color="primary" />
                  <Chip
                    label={`Low Stock: ${stock.filter((m) => m.quantity < 10 && m.quantity > 0).length}`}
                    color="warning"
                  />
                  <Chip
                    label={`Expired: ${stock.filter((m) => isExpired(m.expiryDate)).length}`}
                    color="error"
                  />
                </Box>
              </>
            )}

            {/* FOOTER */}
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              © 2025 MediCare | Medicine Stock | Sabaragamuwa University
            </Typography>
          </Paper>
        </motion.div>
      </Fade>
    </Box>
  );
};

export default ShowStock;