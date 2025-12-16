import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Avatar,
  Divider,
  Fab,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import NavBar from "./NavBar";

import AddIcon from "@mui/icons-material/Add";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: "medical",
      title: "COVID-19 Vaccination Drive",
      message:
        "All students are requested to participate in the vaccination drive at the university medical center.",
      author: "Dr. Sarah Johnson",
      timestamp: new Date("2024-11-28T10:30:00"),
      priority: "high",
      pinned: true,
    },
    {
      id: 2,
      type: "general",
      title: "Lab Safety Training",
      message:
        "Mandatory lab safety training will be held on Friday at 2 PM.",
      author: "Admin Office",
      timestamp: new Date("2024-11-27T14:20:00"),
      priority: "medium",
      pinned: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [newNotice, setNewNotice] = useState({
    type: "general",
    title: "",
    message: "",
    priority: "medium",
  });

  const noticeTypes = {
    medical: {
      label: "Medical",
      icon: LocalHospitalIcon,
      gradient: "linear-gradient(135deg,#22c55e,#15803d)",
    },
    warning: {
      label: "Warning",
      icon: WarningAmberIcon,
      gradient: "linear-gradient(135deg,#fde047,#f59e0b)",
    },
    info: {
      label: "Information",
      icon: InfoIcon,
      gradient: "linear-gradient(135deg,#38bdf8,#0284c7)",
    },
    general: {
      label: "General",
      icon: AnnouncementIcon,
      gradient: "linear-gradient(135deg,#4ade80,#16a34a)",
    },
  };

  const priorityColors = {
    high: "#dc2626",
    medium: "#f59e0b",
    low: "#16a34a",
  };

  const formatTime = (date) => {
    const diff = Math.floor((new Date() - date) / 60000);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.message) return;

    setNotices([
      {
        id: Date.now(),
        ...newNotice,
        author: "Current User",
        timestamp: new Date(),
        pinned: false,
      },
      ...notices,
    ]);

    setOpenDialog(false);
    setNewNotice({ type: "general", title: "", message: "", priority: "medium" });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const handlePin = (id) => {
    setNotices(notices.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.timestamp - a.timestamp;
  });

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1200,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const slides = [
    "/assets/notice1.jpg",
    "/assets/notice2.jpg",
    "/assets/notice3.png",
    "/assets/notice4.jpg",
    "/assets/notice5.jpg",
    "/assets/notice6.jpg",
  ];

  return (
    <Box minHeight="100vh" sx={{ background: "linear-gradient(135deg,#dcfce7,#ecfeff)" }}>
      <NavBar />

      <Box sx={{ background: "linear-gradient(135deg,#16a34a,#15803d)", py: 5 }}>
        <Container>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar sx={{ width: 64, height: 64, bgcolor: "white" }}>
              <NotificationsActiveIcon sx={{ color: "#16a34a" }} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800} color="white">
                Medical Notice Channel
              </Typography>
              <Typography color="#dcfce7">
                Official medical announcements & health updates
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ maxWidth: 1000, mx: "auto", mb: 6 }}>
          <Slider {...sliderSettings}>
            {slides.map((src, index) => (
              <Box key={index}>
                <img
                  src={src}
                  alt={`notice-${index}`}
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
              <Alert severity="success" sx={{ mb: 4 }}>
                Notice posted successfully
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Grid container spacing={3}>
          {sortedNotices.map((notice) => {
            const Icon = noticeTypes[notice.type].icon;
            return (
              <Grid item xs={12} md={6} key={notice.id}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 6 }}>
                    <Box height={6} bgcolor={priorityColors[notice.priority]} />
                    <CardContent>
                      {notice.pinned && (
                        <Chip
                          icon={<PushPinIcon />}
                          label="Pinned"
                          color="success"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      )}

                      <Stack direction="row" spacing={2}>
                        <Avatar sx={{ background: noticeTypes[notice.type].gradient }}>
                          <Icon />
                        </Avatar>
                        <Box flex={1}>
                          <Typography fontWeight={700} variant="h6">
                            {notice.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {notice.message}
                          </Typography>
                          <Stack direction="row" spacing={1} mt={1}>
                            <PersonIcon fontSize="small" />
                            <Typography variant="caption">{notice.author}</Typography>
                            <AccessTimeIcon fontSize="small" />
                            <Typography variant="caption">
                              {formatTime(notice.timestamp)}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      <Stack direction="row" justifyContent="flex-end">
                        <IconButton onClick={() => handlePin(notice.id)}>
                          <PushPinIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(notice.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {notices.length === 0 && (
          <Stack alignItems="center" mt={8}>
            <MedicalServicesIcon sx={{ fontSize: 90, color: "#16a34a" }} />
            <Typography>No notices available</Typography>
          </Stack>
        )}

        <Fab
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            bgcolor: "#16a34a",
            "&:hover": { bgcolor: "#15803d" },
          }}
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </Fab>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogTitle>Create Notice</DialogTitle>
          <DialogContent>
            <Stack spacing={3} mt={1}>
              <TextField
                select
                SelectProps={{ native: true }}
                label="Notice Type"
                value={newNotice.type}
                onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
              >
                {Object.entries(noticeTypes).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </TextField>
              <TextField
                label="Title"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                value={newNotice.message}
                onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddNotice}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Channel;
