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
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';

// Icons
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
import FavoriteIcon from '@mui/icons-material/Favorite';

// Images
import img1 from '../assets/notice1.jpg';
import img2 from '../assets/notice2.jpg';
import img3 from '../assets/notice3.png';
import img4 from '../assets/notice4.jpg';
import img5 from '../assets/notice5.jpg';
import img6 from '../assets/notice6.jpg';

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'COVID-19 Vaccination Drive',
      message: 'All students are requested to participate in the vaccination drive.',
      author: 'Medical Officer',
      timestamp: new Date(),
      priority: 'high',
      pinned: true,
    },
    {
      id: 2,
      type: 'general',
      title: 'Lab Safety Training',
      message: 'Mandatory safety training on Friday at 2 PM.',
      author: 'Admin Office',
      timestamp: new Date(),
      priority: 'medium',
      pinned: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newNotice, setNewNotice] = useState({
    type: 'general',
    title: '',
    message: '',
    priority: 'medium',
  });

  const noticeTypes = {
    medical: {
      label: 'Medical',
      icon: <LocalHospitalIcon />,
      gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
    },
    warning: {
      label: 'Warning',
      icon: <WarningAmberIcon />,
      gradient: 'linear-gradient(135deg,#fa709a,#fee140)',
    },
    info: {
      label: 'Info',
      icon: <InfoIcon />,
      gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)',
    },
    general: {
      label: 'General',
      icon: <AnnouncementIcon />,
      gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
    },
  };

  const priorityColors = {
    high: '#f44336',
    medium: '#ff9800',
    low: '#4caf50',
  };

  const images = [img1, img2, img3, img4, img5, img6];

  const formatTime = (date) => {
    const diff = Math.floor((new Date() - date) / 60000);
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const handleAddNotice = () => {
    setNotices([
      {
        id: Date.now(),
        ...newNotice,
        author: 'Current User',
        timestamp: new Date(),
        pinned: false,
      },
      ...notices,
    ]);
    setOpenDialog(false);
    setShowSuccess(true);
    setNewNotice({ type: 'general', title: '', message: '', priority: 'medium' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const handlePin = (id) => {
    setNotices(notices.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const sortedNotices = [...notices].sort((a, b) =>
    a.pinned === b.pinned ? b.timestamp - a.timestamp : b.pinned - a.pinned
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(#80e4be,#a9e0cb)' }}>
      <NavBar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack alignItems="center" spacing={2} mb={4}>
          <Avatar sx={{ bgcolor: '#667eea', width: 60, height: 60 }}>
            <NotificationsActiveIcon />
          </Avatar>
          <Typography variant="h4" fontWeight={800} color="white">
            Medical Notice Channel
          </Typography>
        </Stack>

        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Notice posted successfully!
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Educational Images */}
        <Grid container spacing={3} mb={4}>
          {images.map((img, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <img src={img} alt={`notice-${index}`} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FavoriteIcon color="error" />
                    <Typography fontWeight={700}>Health Awareness</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Notices */}
        <Grid container spacing={3}>
          {sortedNotices.map((notice) => (
            <Grid item xs={12} md={6} key={notice.id}>
              <Card sx={{ borderRadius: 3, position: 'relative' }}>
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

                  <Typography variant="body2">{notice.message}</Typography>

                  <Stack direction="row" justifyContent="flex-end" mt={2}>
                    <IconButton onClick={() => handlePin(notice.id)}>
                      <PushPinIcon color={notice.pinned ? 'primary' : 'inherit'} />
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

        {/* Add Button */}
        <Fab
          onClick={() => setOpenDialog(true)}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg,#667eea,#764ba2)',
          }}
        >
          <AddIcon />
        </Fab>

        {/* Dialog */}
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
                  <option key={t} value={t}>{noticeTypes[t].label}</option>
                ))}
              </TextField>

              <TextField label="Title" value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} />

              <TextField label="Message" multiline rows={4}
                value={newNotice.message}
                onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddNotice} disabled={!newNotice.title || !newNotice.message}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Channel;
