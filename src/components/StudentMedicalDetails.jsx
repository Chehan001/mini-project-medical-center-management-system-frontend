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
  Stack,
  Button,
  CircularProgress,
  Chip,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Refresh as RefreshIcon, CheckCircle, Cancel } from "@mui/icons-material";
import axios from "axios";

const StudentMedical = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAllRecords();
  }, []);

  const fetchAllRecords = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch all types of medical records in parallel
      const [studentRes, universityRes, otherRes] = await Promise.all([
        axios.get("http://localhost:8000/api/student-medical"),
        axios.get("http://localhost:8000/api/university-medical"),
        axios.get("http://localhost:8000/api/other-medical/all"),
      ]);

      // Combine all records with proper mapping
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

      // Filter duplicates by regNumber + date + type
      const uniqueMap = new Map();
      combined.forEach((r) => {
        const key = `${r.regNumber}_${new Date(r.medicalDate).toDateString()}_${r.type}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, r);
        }
      });

      const uniqueRecords = Array.from(uniqueMap.values());

      // Sort descending by date
      uniqueRecords.sort((a, b) => new Date(b.medicalDate) - new Date(a.medicalDate));

      setRecords(uniqueRecords);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update doctor approval
  const handleDoctorApproval = async (record, approval) => {
    try {
      setSuccess("");
      setError("");

      let url = "";
      if (record.source === "Student") {
        url = `http://localhost:8000/api/student-medical/${record._id}/doctor-approval`;
      } else if (record.source === "University") {
        url = `http://localhost:8000/api/university-medical/${record._id}/doctor-approval`;
      } else if (record.source === "Other") {
        url = `http://localhost:8000/api/other-medical/${record._id}/doctor-approval`;
      }

      await axios.put(url, { doctorApproval: approval });

      setSuccess(`Doctor approval updated to "${approval}" for ${record.studentName}`);
      fetchAllRecords();
    } catch (err) {
      console.error("Approval update error:", err);
      setError("Failed to update approval. Please try again.");
    }
  };

  const getApprovalChip = (status) => {
    if (status === "Approved") {
      return <Chip icon={<CheckCircle />} label="Approved" color="success" size="small" sx={{ fontWeight: 600 }} />;
    } else if (status === "Not Approved") {
      return <Chip icon={<Cancel />} label="Not Approved" color="error" size="small" sx={{ fontWeight: 600 }} />;
    }
    return <Chip label="Pending" color="warning" size="small" sx={{ fontWeight: 600 }} />;
  };

  const getDoctorApprovalChip = (status) => {
    if (status === "Yes") {
      return <Chip label="Yes" color="success" size="small" sx={{ fontWeight: 600 }} />;
    } else if (status === "No") {
      return <Chip label="No" color="error" size="small" sx={{ fontWeight: 600 }} />;
    }
    return <Chip label="Pending" color="default" size="small" />;
  };

  return (
    <Box sx={{ background: "linear-gradient(135deg,#b3f3d9,#e0fff3)", minHeight: "100vh", py: 6 }}>
      <Paper elevation={8} sx={{ maxWidth: 1200, mx: "auto", p: 5, borderRadius: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <motion.img
            src="/medicare_logo.png"
            alt="Medicare Logo"
            style={{ height: "80px", marginBottom: "10px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <Typography variant="h4" fontWeight="bold" color="#065a45">
            Medical Records Management
          </Typography>
          <Divider
            sx={{ mt: 1, borderColor: "#13a67a", borderBottomWidth: 2, width: "70%", mx: "auto" }}
          />
        </Box>

        {/* Action Bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" color="#065a45">
            Total Records: {records.length}
          </Typography>
          <Tooltip title="Refresh Records">
            <IconButton onClick={fetchAllRecords} color="primary" disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Notifications */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 3 }} />}

        {!loading && records.length === 0 && (
          <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
            No medical records found.
          </Typography>
        )}

        {!loading && records.length > 0 && (
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#065a45" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Reg No</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Medical Approval</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Doctor Approval</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {records.map((r) => (
                  <TableRow key={r._id} hover>
                    <TableCell>{r.studentName}</TableCell>
                    <TableCell>{r.regNumber}</TableCell>
                    <TableCell>{new Date(r.medicalDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={r.type} 
                        size="small" 
                        color={r.type === "University" ? "primary" : r.type === "Other" ? "secondary" : "default"}
                      />
                    </TableCell>
                    <TableCell>{getApprovalChip(r.medicalApproval)}</TableCell>
                    <TableCell>{getDoctorApprovalChip(r.doctorApproval)}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleDoctorApproval(r, "Yes")}
                          disabled={r.doctorApproval === "Yes"}
                        >
                          Yes
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDoctorApproval(r, "No")}
                          disabled={r.doctorApproval === "No"}
                        >
                          No
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        <Typography variant="body2" align="center" sx={{ mt: 4, color: "text.secondary" }}>
          © MediCare | University Medical Records | Sabaragamuwa University
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentMedical;