import React, { useState, useEffect } from 'react';
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
  Badge,
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
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Channel = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      type: 'medical',
      title: 'COVID-19 Vaccination Drive',
      message: 'All students are requested to participate in the upcoming vaccination drive on campus. Please bring your ID cards and previous vaccination certificates.',
      author: 'Dr. Sarah Johnson',
      timestamp: new Date('2024-11-28T10:30:00'),
      priority: 'high',
      pinned: true,
    },
    {
      id: 2,
      type: 'general',
      title: 'Lab Safety Training Session',
      message: 'Mandatory safety training for all lab users will be held this Friday at 2 PM in the main auditorium. Attendance is compulsory.',
      author: 'Admin Office',
      timestamp: new Date('2024-11-27T14:20:00'),
      priority: 'medium',
      pinned: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Chemical Spill Protocol Update',
      message: 'New emergency procedures for chemical spills have been implemented. Please review the updated guidelines on the safety board.',
      author: 'Safety Committee',
      timestamp: new Date('2024-11-26T09:15:00'),
      priority: 'high',
      pinned: false,
    },
    {
      id: 4,
      type: 'info',
      title: 'First Aid Kit Locations',
      message: 'First aid kits have been restocked and are available in all laboratories. Please familiarize yourself with their locations.',
      author: 'Medical Department',
      timestamp: new Date('2024-11-25T16:45:00'),
      priority: 'low',
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

  const noticeTypes = {
    medical: {
      color: '#e91e63',
      icon: <LocalHospitalIcon />,
      label: 'Medical',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    warning: {
      color: '#ff9800',
      icon: <WarningAmberIcon />,
      label: 'Warning',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    info: {
      color: '#2196f3',
      icon: <InfoIcon />,
      label: 'Information',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    general: {
      color: '#9c27b0',
      icon: <AnnouncementIcon />,
      label: 'General',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  };

  const priorityColors = {
    high: '#f44336',
    medium: '#ff9800',
    low: '#4caf50',
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); 

    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const handleAddNotice = () => {
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

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const handlePin = (id) => {
    setNotices(
      notices.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
    return b.timestamp - a.timestamp;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(to bottom, #80e4be, #a9e0cb)',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar />

      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                }}
              >
                <NotificationsActiveIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                }}
              >
                Notice Channel
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
              Stay updated with important announcements and medical instructions
            </Typography>
          </Box>
        </motion.div>

        {/* Success Alert */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                }}
              >
                Notice posted successfully!
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(noticeTypes).map(([key, config]) => {
            const count = notices.filter((n) => n.type === key).length;
            return (
              <Grid item xs={6} md={3} key={key}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card
                    sx={{
                      background: config.gradient,
                      color: 'white',
                      borderRadius: 3,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {config.icon}
                        </Box>
                        <Box>
                          <Typography variant="h4" fontWeight={700}>
                            {count}
                          </Typography>
                          <Typography variant="body2">{config.label}</Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Notices Grid */}
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {sortedNotices.map((notice, index) => (
              <Grid item xs={12} md={6} key={notice.id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: notice.pinned
                        ? '0 8px 32px rgba(102, 126, 234, 0.3)'
                        : '0 4px 12px rgba(0,0,0,0.1)',
                      border: notice.pinned ? '2px solid #667eea' : 'none',
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    {/* Priority Indicator */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: priorityColors[notice.priority],
                        borderRadius: '12px 12px 0 0',
                      }}
                    />

                    {/* Pinned Badge */}
                    {notice.pinned && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: 20,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <PushPinIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption" fontWeight={600}>
                          Pinned
                        </Typography>
                      </Box>
                    )}

                    <CardContent sx={{ pt: 3 }}>
                      {/* Header */}
                      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                        <Avatar
                          sx={{
                            background: noticeTypes[notice.type].gradient,
                            width: 48,
                            height: 48,
                          }}
                        >
                          {noticeTypes[notice.type].icon}
                        </Avatar>
                        <Box flexGrow={1}>
                          <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                            <Typography variant="h6" fontWeight={700}>
                              {notice.title}
                            </Typography>
                            <Chip
                              label={noticeTypes[notice.type].label}
                              size="small"
                              sx={{
                                background: noticeTypes[notice.type].gradient,
                                color: 'white',
                                fontWeight: 600,
                              }}
                            />
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {notice.author}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              •
                            </Typography>
                            <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {formatTime(notice.timestamp)}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      {/* Message */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                        {notice.message}
                      </Typography>

                      {/* Actions */}
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => handlePin(notice.id)}
                          sx={{
                            color: notice.pinned ? '#667eea' : 'text.secondary',
                            '&:hover': { background: 'rgba(102, 126, 234, 0.1)' },
                          }}
                        >
                          <PushPinIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ '&:hover': { background: 'rgba(33, 150, 243, 0.1)' } }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(notice.id)}
                          sx={{ '&:hover': { background: 'rgba(244, 67, 54, 0.1)' } }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {/* Empty State */}
        {notices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '60px 20px' }}
          >
            <MedicalServicesIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.5)', mb: 2 }} />
            <Typography variant="h5" color="white" fontWeight={600} mb={1}>
              No notices yet
            </Typography>
            <Typography variant="body1" color="rgba(255,255,255,0.8)">
              Click the + button to create your first notice
            </Typography>
          </motion.div>
        )}

        {/* Floating Add Button */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
            },
          }}
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </Fab>

        {/* Add Notice Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <AddIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={700}>
                Create New Notice
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                select
                label="Notice Type"
                value={newNotice.type}
                onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
                SelectProps={{ native: true }}
                fullWidth
              >
                {Object.entries(noticeTypes).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </TextField>

              <TextField
                label="Title"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                fullWidth
                placeholder="Enter notice title"
              />

              <TextField
                label="Message"
                value={newNotice.message}
                onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
                multiline
                rows={4}
                fullWidth
                placeholder="Enter detailed message"
              />

              <TextField
                select
                label="Priority"
                value={newNotice.priority}
                onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                SelectProps={{ native: true }}
                fullWidth
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddNotice}
              disabled={!newNotice.title || !newNotice.message}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                },
              }}
            >
              Post Notice
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Channel;