import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  CircularProgress,
  Chip,
  Alert,
  Card,
  CardContent,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import API_ROOT from "../services/api";

const StudentMedical = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    fetchAllRecords();
  }, []);

  const fetchAllRecords = async () => {
    try {
      setLoading(true);
      setError("");

      const [studentRes, universityRes, otherRes] = await Promise.all([
        axios.get(`${API_ROOT}/api/student-medical`),
        axios.get(`${API_ROOT}/api/university-medical`),
        axios.get(`${API_ROOT}/api/other-medical/all`),
      ]);

      const combined = [
        ...studentRes.data.map((r) => ({
          ...r,
          source: "Student",
          medicalApproval: r.medicalApproval || "Pending",
          doctorApproval: r.doctorApproval || "Pending",
          medicalDate: r.medicalDate,
          type: r.type || "Student",
        })),
        ...universityRes.data.map((r) => ({
          _id: r._id,
          studentName: r.studentName,
          regNumber: r.regNumber,
          medicalDate: r.treatmentDate,
          type: "University",
          medicalApproval: r.medicalApproval || "Pending",
          doctorApproval: r.doctorApproval || "Pending",
          pdfFile: r.pdfFile || null,
          source: "University",
        })),
        ...otherRes.data.map((r) => ({
          _id: r._id,
          studentName: r.studentName,
          regNumber: r.regNumber,
          medicalDate: r.treatmentDate,
          type: "Other",
          medicalApproval: r.medicalApproval || "Pending",
          doctorApproval: r.doctorApproval || "Pending",
          pdfFile: r.file || null,
          source: "Other",
        })),
      ];

      const uniqueMap = new Map();
      combined.forEach((r) => {
        const key = `${r.regNumber}_${new Date(r.medicalDate).toDateString()}_${r.type}`;
        if (!uniqueMap.has(key)) uniqueMap.set(key, r);
      });

      const uniqueRecords = Array.from(uniqueMap.values());
      uniqueRecords.sort((a, b) => new Date(b.medicalDate) - new Date(a.medicalDate));
      setRecords(uniqueRecords);
    } catch (err) {
      setError("Failed to fetch records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getApprovalChip = (status) => {
    if (status === "Approved")
      return <Chip label="Approved" color="success" size="small" sx={{ fontWeight: 600 }} />;
    if (status === "Not Approved")
      return <Chip label="Not Approved" color="error" size="small" sx={{ fontWeight: 600 }} />;
    return <Chip label="Pending" color="warning" size="small" sx={{ fontWeight: 600 }} />;
  };

  const getDoctorApprovalChip = (status) => {
    if (status === "Yes") return <Chip label="Yes" color="success" size="small" />;
    if (status === "No") return <Chip label="No" color="error" size="small" />;
    return <Chip label="Pending" size="small" />;
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg,#b3f3d9,#e0fff3)",
        minHeight: "100vh",
        py: isMobile ? 2 : 5,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: isMobile ? 2 : 4,
          borderRadius: 4,
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={isMobile ? 2 : 3}>
          <motion.img
            src="/medicare_logo.png"
            alt="Medicare Logo"
            style={{ height: isMobile ? "60px" : "80px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            color="#065a45"
          >
            Medical Records
          </Typography>
          <Divider
            sx={{
              mt: 1,
              borderColor: "#13a67a",
              borderBottomWidth: 2,
              width: isMobile ? "80%" : "65%",
              mx: "auto",
            }}
          />
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && (
          <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
        )}

        {!loading && records.length === 0 && (
          <Typography
            align="center"
            color="text.secondary"
            sx={{ py: 4, fontSize: isMobile ? "1rem" : "1.1rem" }}
          >
            No medical records available.
          </Typography>
        )}

        {/* MOBILE / TABLET - CARD UI */}
        {(isMobile || isTablet) && records.length > 0 && (
          <Stack spacing={2}>
            {records.map((r) => (
              <Card
                key={r._id}
                elevation={5}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                sx={{
                  borderRadius: 4,
                  px: 2,
                  py: 1.5,
                  background: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent sx={{ pb: "8px !important" }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {r.studentName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Reg No: <strong>{r.regNumber}</strong>
                  </Typography>

                  <Typography fontSize="0.95rem">
                    <strong>Date:</strong>{" "}
                    {new Date(r.medicalDate).toLocaleDateString()}
                  </Typography>

                  <Chip
                    label={r.type}
                    size="small"
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      px: 1.3,
                      py: 0.3,
                      fontSize: "0.75rem",
                    }}
                    color={
                      r.type === "University"
                        ? "primary"
                        : r.type === "Other"
                        ? "secondary"
                        : "default"
                    }
                  />

                  <Box mt={2}>
                    <Typography fontWeight="600" fontSize="0.9rem">
                      Medical Approval
                    </Typography>
                    {getApprovalChip(r.medicalApproval)}
                  </Box>

                  <Box mt={1.5}>
                    <Typography fontWeight="600" fontSize="0.9rem">
                      Doctor Approval
                    </Typography>
                    {getDoctorApprovalChip(r.doctorApproval)}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {/* DESKTOP TABLE VIEW */}
        {!isMobile && !isTablet && records.length > 0 && (
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#065a45" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Reg No</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Medical Approval</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Doctor Approval</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((r) => (
                <TableRow key={r._id} hover>
                  <TableCell>{r.studentName}</TableCell>
                  <TableCell>{r.regNumber}</TableCell>
                  <TableCell>
                    {new Date(r.medicalDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={r.type}
                      size="small"
                      color={
                        r.type === "University"
                          ? "primary"
                          : r.type === "Other"
                          ? "secondary"
                          : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>{getApprovalChip(r.medicalApproval)}</TableCell>
                  <TableCell>{getDoctorApprovalChip(r.doctorApproval)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, color: "text.secondary" }}
        >
          © MediCare | Medical Records | Sabaragamuwa University
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentMedical;
