import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Alert,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavBar from './NavBar';

import img1 from '../assets/notice1.jpg';
import img2 from '../assets/notice2.jpg';
import img3 from '../assets/notice3.png';
import img4 from '../assets/notice4.jpg';
import img6 from '../assets/notice6.jpg';

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'COVID-19 Vaccination Drive',
      message:
        'All students are requested to participate in the upcoming vaccination drive on campus. Please bring your ID cards and previous vaccination certificates.',
      author: 'Dr. Sarah Johnson',
      timestamp: new Date(Date.now() - 3600000),
      priority: 'high',
      pinned: true,
    },
    {
      id: 2,
      type: 'general',
      title: 'Lab Safety Training Session',
      message:
        'Mandatory safety training for all lab users will be held this Friday at 2 PM in the main auditorium. Attendance is compulsory.',
      author: 'Admin Office',
      timestamp: new Date(Date.now() - 7200000),
      priority: 'medium',
      pinned: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Chemical Spill Protocol Update',
      message:
        'New emergency procedures for chemical spills have been implemented. Please review the updated guidelines on the safety board.',
      author: 'Safety Committee',
      timestamp: new Date(Date.now() - 86400000),
      priority: 'high',
      pinned: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newNotice, setNewNotice] = useState({
    type: 'general',
    title: '',
    message: '',
    priority: 'medium',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const noticeTypes = {
    medical: { label: 'Medical', color: 'primary', icon: <LocalHospitalIcon /> },
    warning: { label: 'Warning', color: 'warning', icon: <WarningAmberIcon /> },
    info: { label: 'Information', color: 'info', icon: <InfoIcon /> },
    general: { label: 'General', color: 'secondary', icon: <AnnouncementIcon /> },
  };

  const priorityColors = { high: '#5edcabff', medium: '#277046ff', low: '#388e3c' };

  const formatTime = (date) => {
    const diff = Math.floor((Date.now() - date) / 1000 / 60);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.message) return;
    const notice = {
      id: Date.now(),
      ...newNotice,
      author: 'Current User',
      timestamp: new Date(),
      pinned: false,
    };
    setNotices([notice, ...notices]);
    setOpenDialog(false);
    setNewNotice({ type: 'general', title: '', message: '', priority: 'medium' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => setNotices(notices.filter((n) => n.id !== id));
  const handlePin = (id) => setNotices(notices.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));

  const sortedNotices = [...notices].sort((a, b) => (b.pinned - a.pinned) || (b.timestamp - a.timestamp));

  const educationalImages = [
    { id: 1, title: 'Types of Heart Disease', description: 'Learn about different cardiovascular conditions.', image: img1 },
    { id: 2, title: 'Diabetes Complications', description: 'Effects of diabetes.', image: img2 },
    { id: 3, title: 'Dangers of Smoking', description: 'Health risks of smoking.', image: img3 },
    { id: 4, title: 'Youth Health Education', description: 'Youth smoking trends.', image: img4 },
    { id: 5, title: 'Stress Response System', description: 'How the body responds to stress.', image: img6 },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #80e4be, #a9e0cb)',
      }}
    >
      <NavBar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Success Alert */}
        {showSuccess && <Alert severity="success" sx={{ mb: 3 }}>Notice posted successfully!</Alert>}

        {/* Educational Images */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'white', textAlign: 'center' }}>
          Medical Education Resources
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {educationalImages.map((img, index) => (
            <Grid
              item
              key={img.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                onClick={() => setSelectedImage(img)}
                sx={{
                  width: 300,
                  height: 400,
                  cursor: 'pointer',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box component="img" src={img.image} alt={img.title} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{img.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{img.description}</Typography>
                </CardContent>
                <CardContent>
                  <Button fullWidth startIcon={<VisibilityIcon />} variant="contained" sx={{ borderRadius: 2 }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/*  Notices */}
        <Typography variant="h5" sx={{ mt: 6, mb: 2, fontWeight: 600, color: 'white', textAlign: 'center' }}>
          Recent Notices
        </Typography>
        <Grid container spacing={3}>
          {sortedNotices.map((notice) => (
            <Grid item xs={12} md={6} key={notice.id}>
              <Card sx={{ borderLeft: `5px solid ${priorityColors[notice.priority]}`, borderRadius: 2 }}>
                {notice.pinned && (
                  <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PushPinIcon fontSize="small" /> Pinned
                  </Box>
                )}
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{notice.title}</Typography>
                    <Chip label={noticeTypes[notice.type].label} color={noticeTypes[notice.type].color} size="small" />
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <PersonIcon fontSize="small" />
                    <Typography variant="caption">{notice.author}</Typography>
                    <AccessTimeIcon fontSize="small" sx={{ ml: 1 }} />
                    <Typography variant="caption">{formatTime(notice.timestamp)}</Typography>
                  </Box>
                  <Typography variant="body2" mb={1}>{notice.message}</Typography>
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton size="small" color={notice.pinned ? 'primary' : 'default'} onClick={() => handlePin(notice.id)}>
                      <PushPinIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(notice.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Floating Button */}
        <IconButton
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
            width: 64,
            height: 64,
          }}
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon fontSize="large" />
        </IconButton>

        {/* Add Notice Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>Create Notice</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <select value={newNotice.type} onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}>
                {Object.entries(noticeTypes).map(([key, config]) => <option key={key} value={key}>{config.label}</option>)}
              </select>
              <TextField label="Title" fullWidth value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} />
              <TextField label="Message" fullWidth multiline rows={4} value={newNotice.message} onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })} />
              <select value={newNotice.priority} onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddNotice} disabled={!newNotice.title || !newNotice.message}>Post</Button>
          </DialogActions>
        </Dialog>

        {/* Image */}
        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md" fullWidth>
          {selectedImage && (
            <>
              <DialogTitle>{selectedImage.title}</DialogTitle>
              <DialogContent>
                <Box component="img" src={selectedImage.image} alt={selectedImage.title} sx={{ width: '100%', borderRadius: 2, mb: 2 }} />
                <Typography variant="body1" mb={1}>{selectedImage.description}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedImage(null)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Channel;
