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
import PsychologyIcon from "@mui/icons-material/Psychology";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";

import img1 from "../assets/notice1.jpg";
import img2 from "../assets/notice2.jpg";
import img3 from "../assets/notice3.png";
import img4 from "../assets/notice4.jpg";
import img6 from "../assets/notice6.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Channel = () => {
  // ===== State =====
  const [openDetail, setOpenDetail] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newNotice, setNewNotice] = useState({
    type: "general",
    title: "",
    message: "",
    priority: "medium",
  });

  const [notices, setNotices] = useState([
    {
      id: 1,
      type: "medical",
      title: "COVID-19 Vaccination Drive",
      message: "Students are requested to participate in the vaccination drive at the medical center.",
      author: "Medical Officer",
      timestamp: new Date(),
      priority: "high",
      pinned: true,
    },
    {
      id: 2,
      type: "general",
      title: "Lab Safety Training",
      message: "Mandatory lab safety training will be held this Friday at 2 PM.",
      author: "Admin Office",
      timestamp: new Date(),
      priority: "medium",
      pinned: false,
    },
  ]);

  // ===== Slider Images =====
  const slides = [
    { img: img1, key: "heart" },
    { img: img2, key: "stress" },
    { img: img3 },
    { img: img4 },
    { img: img6, key: "diabetes" },
  ];

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Notice Types + colors
  const noticeTypes = {
    medical: { label: "Medical", icon: <LocalHospitalIcon />, gradient: "linear-gradient(135deg,#f093fb,#f5576c)" },
    warning: { label: "Warning", icon: <WarningAmberIcon />, gradient: "linear-gradient(135deg,#fa709a,#fee140)" },
    info: { label: "Info", icon: <InfoIcon />, gradient: "linear-gradient(135deg,#4facfe,#00f2fe)" },
    general: { label: "General", icon: <AnnouncementIcon />, gradient: "linear-gradient(135deg,#667eea,#764ba2)" },
  };
  const priorityColors = { high: "#2aa370ff", medium: "#14893bff", low: "#4caf50" };

  const images = [img1, img2, img3, img4, img6];

  const formatTime = (date) => {
    const diff = Math.floor((new Date() - date) / 60000);
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const handleAddNotice = () => {
    setNotices([
      { id: Date.now(), ...newNotice, author: "Current User", timestamp: new Date(), pinned: false },
      ...notices,
    ]);
    setOpenDialog(false);
    setShowSuccess(true);
    setNewNotice({ type: "general", title: "", message: "", priority: "medium" });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => setNotices(notices.filter((n) => n.id !== id));
  const handlePin = (id) => setNotices(notices.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));

  const sortedNotices = [...notices].sort((a, b) =>
    a.pinned === b.pinned ? b.timestamp - a.timestamp : b.pinned - a.pinned
  );

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#80e4be,#a9e0cb)" }}>
      <NavBar />

      {/* Header */}
      <Box sx={{ background: "linear-gradient(135deg,#16a34a,#15803d)", py: 5 }}>
        <Container>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar sx={{ width: 70, height: 70, bgcolor: "white" }}>
              <NotificationsActiveIcon sx={{ color: "#16a34a", fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800} color="white">
                Medical Awareness Channel
              </Typography>
              <Typography color="#dcfce7">Health education, prevention & medical knowledge</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/*  Image Slider  */}
        <Box sx={{ maxWidth: 1100, mx: "auto", mb: 6 }}>
          <Slider {...sliderSettings}>
            {slides.map((slide, index) => (
              <Box
                key={index}
                onClick={() => slide.key && setOpenDetail(slide.key)}
                sx={{ cursor: slide.key ? "pointer" : "default" }}
              >
                <img
                  src={slide.img}
                  alt={`slide-${index}`}
                  style={{
                    width: "100%",
                    height: "520px",
                    objectFit: "cover",
                    borderRadius: "24px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Image Detail Dialog  */}
        <Dialog open={Boolean(openDetail)} onClose={() => setOpenDetail(null)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700}>Medical Information</Typography>
              <IconButton onClick={() => setOpenDetail(null)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {openDetail === "heart" && (
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <FavoriteIcon color="error" fontSize="large" />
                    <Typography variant="h5" fontWeight={700}>
                      Heart Disease
                    </Typography>
                  </Stack>
                  <Typography mb={2}>
                    Heart disease refers to a group of conditions that affect the heart’s structure and function, often interfering with blood flow and normal heart activity.
                  </Typography>
                  <Typography fontWeight={700}>Types of Heart Disease</Typography>
                  <ul>
                    <li>Coronary Artery Disease (CAD)</li>
                    <li>Heart Attack (Myocardial Infarction)</li>
                    <li>Heart Failure</li>
                    <li>Arrhythmia</li>
                    <li>Congenital Heart Disease</li>
                    <li>Valvular Heart Disease</li>
                    <li>Cardiomyopathy</li>
                  </ul>
                  <Typography fontWeight={700}>Reasons / Causes</Typography>
                  <ul>
                    <li>High blood pressure</li>
                    <li>High cholesterol</li>
                    <li>Smoking</li>
                    <li>Diabetes</li>
                    <li>Obesity</li>
                    <li>Lack of physical activity</li>
                    <li>Unhealthy diet</li>
                    <li>Stress</li>
                    <li>Excessive alcohol intake</li>
                    <li>Family history</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {openDetail === "stress" && (
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <PsychologyIcon color="primary" fontSize="large" />
                    <Typography variant="h5" fontWeight={700}>
                      Stress Response System
                    </Typography>
                  </Stack>
                  <Typography mb={2}>
                    The stress response system is the body’s automatic reaction to stress, helping a person cope with challenges or threats.
                  </Typography>
                  <Typography fontWeight={700}>Types of Stress Response</Typography>
                  <ul>
                    <li>Acute Stress Response</li>
                    <li>Chronic Stress Response</li>
                    <li>Fight Response</li>
                    <li>Flight Response</li>
                    <li>Freeze Response</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {openDetail === "diabetes" && (
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <BloodtypeIcon color="secondary" fontSize="large" />
                    <Typography variant="h5" fontWeight={700}>
                      Diabetes Complications
                    </Typography>
                  </Stack>
                  <Typography mb={2}>
                    Diabetes complications are health problems caused by long-term high blood sugar levels.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </DialogContent>
        </Dialog>

        {/*  Success Alert  */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Notice posted successfully!
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/*  Notice Grid  */}
        <Grid container spacing={3}>
          {sortedNotices.map((notice) => (
            <Grid item xs={12} md={6} key={notice.id}>
              <Card sx={{ borderRadius: 3 }}>
                <Box sx={{ height: 6, background: priorityColors[notice.priority] }} />
                <CardContent>
                  <Stack direction="row" spacing={2} mb={2}>
                    <Avatar sx={{ background: noticeTypes[notice.type].gradient }}>
                      {noticeTypes[notice.type].icon}
                    </Avatar>
                    <Box flexGrow={1}>
                      <Typography fontWeight={700}>{notice.title}</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PersonIcon fontSize="small" />
                        <Typography variant="caption">{notice.author}</Typography>
                        <AccessTimeIcon fontSize="small" />
                        <Typography variant="caption">{formatTime(notice.timestamp)}</Typography>
                      </Stack>
                    </Box>
                    <Chip label={noticeTypes[notice.type].label} />
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2">{notice.message}</Typography>
                  <Stack direction="row" justifyContent="flex-end" mt={2}>
                    <IconButton onClick={() => handlePin(notice.id)}>
                      <PushPinIcon color={notice.pinned ? "primary" : "inherit"} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(notice.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/*  Add Notice Button  */}
        <Fab
          onClick={() => setOpenDialog(true)}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            background: "linear-gradient(135deg,#667eea,#764ba2)",
          }}
        >
          <AddIcon />
        </Fab>

        {/*  Add Notice Dialog  */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>Create Notice</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                select
                SelectProps={{ native: true }}
                label="Type"
                value={newNotice.type}
                onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
              >
                {Object.keys(noticeTypes).map((t) => (
                  <option key={t} value={t}>
                    {noticeTypes[t].label}
                  </option>
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
            <Button variant="contained" onClick={handleAddNotice} disabled={!newNotice.title || !newNotice.message}>
              Post Notice
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Channel;
